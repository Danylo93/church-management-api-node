import { Request, Response } from 'express';
import multer from 'multer';
import { listFilesFromS3, uploadFileToS3 } from '../services/s3';
import { getFileMetadataFromDatabase } from '../services/fileService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// Configuração do multer para o upload de arquivos
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 },  // Limite de 10 MB por arquivo
  fileFilter: (req, file, cb) => {
    // Validar se o arquivo é .docx
    if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return cb(new Error('Somente arquivos .docx são permitidos.'));
    }
    cb(null, true);
  },
}).single('file');  // Espera o campo 'file' no corpo da requisição

// Controlador para o upload de arquivo
export const uploadFile = (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      // Obtém os dados do corpo da requisição (título e data do culto)
      const { titulo, dataCulto } = req.body;

      // Verifica se os dados obrigatórios foram fornecidos
      if (!titulo || !dataCulto || !req.file) {
        return res.status(400).json({ error: 'Faltando título, data do culto ou arquivo.' });
      }

      // Chama a função de upload para o S3
      const fileUrl = await uploadFileToS3(req.file as Express.Multer.File);

      // Salva os dados no banco de dados
      const novoArquivo = await prisma.arquivos.create({
        data: {
          titulo,                  // Título da mensagem
          dataCulto: new Date(dataCulto), // Data do culto
          fileName: req.file.originalname, // Nome original do arquivo
          fileUrl,                // URL do arquivo carregado no S3
        },
      });

      return res.status(200).json({
        message: 'Arquivo carregado e salvo com sucesso!',
        arquivo: novoArquivo, // Retorna os dados do arquivo salvo
      });
    } catch (error) {
      console.error('Erro ao fazer upload e salvar no banco:', error);
      return res.status(500).json({ error: 'Erro no servidor ao fazer o upload e salvar os dados.' });
    }
  });
};



export const listFiles = async (req: Request, res: Response) => {
  try {
    // Busca todos os arquivos no banco de dados
    const files = await prisma.arquivos.findMany({
      select: {
        id: true,
        titulo: true,
        dataCulto: true,
        fileName: true,
        fileUrl: true,
      },
    });

    // Retorna os arquivos encontrados
    return res.status(200).json({
      message: 'Arquivos listados com sucesso!',
      files,
    });
  } catch (error) {
    console.error('Erro ao listar os arquivos:', error);
    return res.status(500).json({ error: 'Erro ao listar os arquivos' });
  }
};

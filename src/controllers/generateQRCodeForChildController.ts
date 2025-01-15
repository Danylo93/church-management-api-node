import { Request, Response } from 'express';
import {  registerChildAndGenerateQRCode, updateChildStatus } from '../services/generateQRCodeService';


export const registerChildController = async (req: Request, res: Response) => {
  try {
    const { name, age, room, parentId } = req.body;

    // Validação básica de campos obrigatórios
    if (!name || !age || !room || !parentId) {
      return res.status(400).json({
        error: 'Todos os campos são obrigatórios: name, age, room, parentId.',
      });
    }

    // Chama o serviço para registrar a criança e gerar o QR Code
    const { newChild, qrCodeUrl } = await registerChildAndGenerateQRCode({
      name,
      age: Number(age),
      room,
      parentId: Number(parentId),
    });

    // Retorna a resposta de sucesso
    return res.status(201).json({
      message: 'Criança cadastrada com sucesso.',
      child: newChild,
      qrCodeUrl,
    });
  } catch (error: any) {
    // Tratamento de erros
    const statusCode = error.message === 'Responsável não encontrado.' ? 404 : 400;

    return res.status(statusCode).json({
      error: error.message || 'Erro ao processar a solicitação.',
    });
  }
};



export const handleChildStatusUpdate = async (req: Request, res: Response) => {
  try {
    const { childName, parentName } = req.body;

    // Valida os campos necessários
    if (!childName || !parentName) {
      return res.status(400).json({ message: "Dados inválidos no QR Code." });
    }

    // Chama o service para atualizar o status
    const updatedChild = await updateChildStatus(childName, parentName);

    res.status(200).json({
      message: "Status da criança atualizado para 'retirada'.",
      child: updatedChild,
    });
  } catch (error) {
    console.error("Erro ao atualizar status da criança:", error);
    res.status(500).json({ message: error });
  }
};
  

  
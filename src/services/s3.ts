// src/services/s3.ts
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadToS3 = async (file: Express.Multer.File) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,  // Forçando o tipo para string
    Key: `photos/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location; // Retorna a URL do arquivo carregado
};

// Função para realizar o upload do arquivo para o S3
export const uploadFileToS3 = async (file: Express.Multer.File) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,  // Forçando o tipo para string
    Key: `esbocos/${Date.now()}-${file.originalname}`,  // Pasta de destino no S3
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',  // Permissão pública para leitura
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;  // Retorna a URL do arquivo carregado
  } catch (error) {
    throw new Error('Erro ao fazer upload do arquivo para o S3');
  }
};

export const listFilesFromS3 = async () => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,  // Nome do bucket
    Prefix: 'esbocos/',  // Opcional: prefixo, se quiser listar somente arquivos dessa pasta
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    if (data.Contents) {
      return data.Contents.map((file) => ({
        key: file.Key,
        fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`,
        lastModified: file.LastModified,
        size: file.Size,
      }));
    }
    return [];
  } catch (error) {
    throw new Error('Erro ao listar arquivos no S3');
  }
};



export const deleteFromS3 = async (fileUrl: string) => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  if (!bucketName) {
    throw new Error('AWS_BUCKET_NAME não está definido');
  }

  const params = {
    Bucket: bucketName,  // Garantido que o Bucket é uma string
    Key: fileUrl.replace(`${process.env.AWS_BUCKET_URL}/`, ''), // Extrai o caminho do arquivo
  };

  await s3.deleteObject(params).promise();
};

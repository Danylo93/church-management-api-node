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

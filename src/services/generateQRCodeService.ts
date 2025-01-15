import { PrismaClient } from '@prisma/client';
import QRCode from 'qrcode';
import jsQR from "jsqr";
import sharp from 'sharp';


const prisma = new PrismaClient();


export const registerChildAndGenerateQRCode = async (data: {
  name: string;
  age: number;
  room: string;
  parentId: number;
}) => {
  // Verifica se o responsável existe
  const parent = await prisma.user.findUnique({
    where: { id: data.parentId },
  });

  if (!parent) {
    throw new Error("Responsável não encontrado.");
  }

  // Cadastra a criança no banco de dados
  const newChild = await prisma.child.create({
    data: {
      name: data.name,
      age: data.age,
      room: data.room,
      parentId: data.parentId,
    },
  });

  // Dados que irão compor o QR Code
  const qrData = {
    childName: newChild.name,
    age: newChild.age,
    room: newChild.room,
    parentName: parent.name,
    parentPhone: parent.phone,
  };

  // Converte os dados para JSON
  const qrDataString = JSON.stringify(qrData);
  console.log("Dados do QR Code em JSON:", qrDataString);

  // Gera a URL do QR Code usando a API do GoQR
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    qrDataString
  )}&size=300x300`;

  console.log("URL do QR Code gerado:", qrCodeUrl);

  return { newChild, qrCodeUrl };
};






export const updateChildStatus = async (childName: string, parentName: string) => {
  // Busca a criança com base no nome e no nome do responsável
  const child = await prisma.child.findFirst({
    where: {
      name: childName,
      parent: {
        name: parentName,
      },
    },
  });

  if (!child) {
    throw new Error("Criança ou responsável não encontrados.");
  }

  // Atualiza o status da criança para "retirada"
  const updatedChild = await prisma.child.update({
    where: { id: child.id },
    data: { status: "retirada" },
  });

  return updatedChild;
};

 

  
  
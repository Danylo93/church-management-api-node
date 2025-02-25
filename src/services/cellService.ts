import { PrismaClient } from '@prisma/client';
import { getAddressFromCep } from '../utils/viacep';
import { geocodeAddress } from '../utils/nominatim';

const prisma = new PrismaClient();

interface CreateCellData {
  leaderId: number;
  disciplerId: number;
  obreiroId: number;
  pastorId: number;
  whatsapp: string;
  cep: string;
  schedule: string;
}

export const createCell = async (data: CreateCellData) => {
  const { leaderId, disciplerId, obreiroId, pastorId, whatsapp, cep, schedule } = data;

  // Verificar se os IDs fornecidos existem na tabela User
  const users = await prisma.user.findMany({
    where: {
      id: { in: [leaderId, disciplerId, obreiroId, pastorId] },
    },
  });

  if (users.length !== 4) {
    throw new Error('Um ou mais IDs fornecidos não existem na tabela User');
  }

  // Get the address from the CEP
  const address = await getAddressFromCep(cep);
  console.log('Endereço completo:', address);

  // Geocode the address to get latitude and longitude
  const { latitude, longitude } = await geocodeAddress(address);
  console.log('Latitude e Longitude:', latitude, longitude);

  // Create the cell in the database
  const cell = await prisma.cell.create({
    data: {
      name: 'Célula',
      leaderId,
      disciplerId,
      obreiroId,
      pastorId,
      whatsapp,
      address,
      latitude,
      longitude,
      schedule,
    },
  });

  return cell;
};
export const getAllCells = async () => {
  const cells = await prisma.cell.findMany({
    include: {
      leader: true,
    },
  });

  return cells.map(cell => ({
    id: cell.id,
    leaderName: cell.leader.name,
    whatsapp: cell.whatsapp,
    address: cell.address,
    schedule: cell.schedule,
    latitude: cell.latitude,
    longitude: cell.longitude,
  }));
};

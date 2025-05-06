import axios from 'axios';

export const geocodeAddress = async (address: string) => {
  const apiKey = process.env.OPENCAGE_API_KEY; // Certifique-se de definir sua chave de API no .env
  try {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: address,
        key: apiKey,
      },
    });

    console.log('Resposta da API OpenCage:', response.data);

    if (response.data.results.length === 0) {
      throw new Error('Erro ao geocodificar o endereço');
    }

    const { lat, lng } = response.data.results[0].geometry;
    return { latitude: lat, longitude: lng };
  } catch (error) {
    console.error('Erro ao geocodificar o endereço:', error);
    throw new Error('Erro ao geocodificar o endereço');
  }
};
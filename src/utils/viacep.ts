import axios from 'axios';

export const getAddressFromCep = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  
      if (response.data.erro) {
        throw new Error('CEP inválido');
      }
  
      const { logradouro, bairro, localidade, uf } = response.data;
      const address = `${logradouro}, ${bairro}, ${localidade}, ${uf}`;
      console.log('Endereço obtido do CEP:', address);
      return address;
    } catch (error) {
      console.error('Erro ao obter endereço do CEP:', error);
      throw new Error('Erro ao obter endereço do CEP');
    }
  };
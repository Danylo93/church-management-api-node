import axios from "axios";

export const getDatabaseUrlForTenant = async (subdomain: string): Promise<string> => {
  const { data } = await axios.get(`http://localhost:5000/api/tenants/status/${subdomain}`);

  if (!data || !data.active || !data.dbUrl) {
    throw new Error("Tenant inativo ou inválido");
  }

  return data.dbUrl; // Exemplo: "postgresql://user:pass@host:5432/dbname"
};

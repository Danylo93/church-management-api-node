# Etapa 1: Construir o ambiente
FROM node:18-alpine AS build

# Definir diretório de trabalho na imagem
WORKDIR /app

# Copiar arquivos de configuração
COPY package.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Compilar TypeScript para JavaScript
RUN npm run build

# Instalar as dependências de produção
RUN npm prune --production

# Etapa 2: Construir a imagem final para produção
FROM node:18-alpine

# Definir diretório de trabalho na imagem
WORKDIR /app

# Copiar arquivos de configuração de prisma
COPY --from=build /app/prisma ./prisma

# Copiar dependências de produção da primeira imagem
COPY --from=build /app/node_modules ./node_modules

# Copiar a build do código compilado
COPY --from=build /app/dist ./dist

# Copiar o arquivo .env se necessário (caso esteja sendo usado)
COPY .env .env

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/index.js"]

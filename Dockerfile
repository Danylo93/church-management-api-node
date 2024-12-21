# Etapa 1: Construir a imagem base
FROM node:18-alpine AS build

# Definir diretório de trabalho na imagem
WORKDIR /app

# Copiar arquivos necessários
COPY package.json yarn.lock ./

# Instalar dependências
RUN yarn install --frozen-lockfile

# Instalar o Prisma como dependência de desenvolvimento
RUN yarn add prisma --dev

# Copiar o restante do código da aplicação
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Compilar TypeScript para JavaScript
RUN yarn build

# Remover dependências de desenvolvimento
RUN yarn install --production --frozen-lockfile

RUN apk add --no-cache openssl

# Etapa 2: Criar a imagem final para produção
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos necessários da etapa anterior
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY .env .env

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/index.js"]

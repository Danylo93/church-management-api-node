Subindo imagem dockerfile no docker hub para x86_x64

docker buildx build --platform linux/amd64,linux/arm64 -t dan1993/api-church:latest --push .

-----------------------

Banco de Dados Prisma:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/db?schema=public"

-----------------------

Ambientes :

Dev: localhost:3000
Stage: http://52.1.122.82:3000
Produção: http://IP_DE_PROD:3000

--------------------------

ANSIBLE / 
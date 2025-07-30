# Church Management API

Esta aplicação Node.js fornece a API do sistema de gestão de igrejas.
Abaixo estão as instruções de uso nos ambientes **dev**, **stage** e **prod**.

## Estrutura de ambientes
- `.env.dev`   - variáveis de ambiente para desenvolvimento
- `.env.stage` - variáveis de ambiente para staging
- `.env.prod`  - variáveis de ambiente para produção

A imagem Docker permite escolher qual arquivo de ambiente será copiado através do argumento `ENV_FILE`.

---

## Desenvolvimento local
1. Instale as dependências (`yarn install`).
2. Copie as variáveis de ambiente:
   ```bash
   cp .env.dev .env
   ```
3. Suba a aplicação e o banco de dados com Docker Compose:
   ```bash
   docker-compose up --build
   ```
   ou rode diretamente com o Node:
   ```bash
   yarn dev
   ```

## Ambiente de staging
1. Construa a imagem usando o arquivo de ambiente de stage:
   ```bash
   docker build --build-arg ENV_FILE=.env.stage -t church-api:stage .
   ```
2. Faça o push para o registro de imagens desejado.
3. Implante no Kubernetes usando Helm:
   ```bash
   helm upgrade --install church-api-stage ./helm/church-api \
     -n stage \
     -f helm/church-api/values-stage.yaml
   ```

## Produção
1. Gere a infraestrutura (AKS, EKS, etc.) com Terraform:
   ```bash
   cd infra
   terraform init
   terraform apply -var-file=terraform.tfvars
   ```
2. Construa e envie a imagem multi-arquitetura com o arquivo de produção:
   ```bash
   docker buildx build --platform linux/amd64,linux/arm64 \
     --build-arg ENV_FILE=.env.prod \
     -t dan1993/church-api:latest --push .
   ```
3. Faça o deploy com Helm:
   ```bash
   helm upgrade --install church-api ./helm/church-api \
     -n production \
     -f helm/church-api/values-prod.yaml
   ```

## Testes
Para validar a compilação do código TypeScript execute:
```bash
yarn build
```
As dependências devem estar instaladas previamente (`yarn install`).

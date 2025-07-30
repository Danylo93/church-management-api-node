Subindo imagem dockerfile no docker hub para x86_x64

docker buildx build --platform linux/amd64,linux/arm64 -t dan1993/api-church:latest --push .

---------------

Banco de Dados Prisma:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/db?schema=public"

-----------------------


# 📦 Helm Chart - Church API

Este chart instala o backend da Church Management API em clusters Kubernetes com suporte a:

- Deploy em multicloud (AKS, EKS, GKE)
- Readiness & Liveness probes
- Autoescalonamento com HPA
- Ingress com TLS (Cert Manager)
- Secrets gerenciados com ExternalSecrets
- Monitoramento com Prometheus

---

## 🛠️ Como usar

### 1. Instalar
```bash
helm upgrade --install church-api ./helm/church-api \
  -n production \
  -f helm/church-api/values-prod.yaml



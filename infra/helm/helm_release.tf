resource "helm_release" "church_api" {
  name       = "church-api"
  repository = "https://charts.example.com" # ou local ./charts
  chart      = "./../../helm/church-api"
  namespace  = "production"
  create_namespace = true

  values = [
    file("../../helm/church-api/values-prod.yaml")
  ]
}

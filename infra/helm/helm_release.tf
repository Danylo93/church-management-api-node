resource "helm_release" "church_api" {
  name       = "church-api"
  repository = "https://charts.example.com" # ou local ./charts
  chart      = "./../../helm/church-api"
  namespace        = var.environment
  create_namespace = true

  values = [
    file("../../helm/church-api/values-${var.environment}.yaml")
  ]
}

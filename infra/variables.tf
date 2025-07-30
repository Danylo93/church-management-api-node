variable "location" {
  type        = string
  description = "Região da Azure"
}

variable "environment" {
  type        = string
  description = "Ambiente de implantação (ex: dev, prod)"
}

variable "cluster_name" {
  type        = string
  description = "Nome do cluster AKS"
}

variable "resource_group_name" {
  type        = string
  description = "Nome do resource group"
}

variable "node_count" {
  type        = number
  default     = 2
}

variable "node_size" {
  type        = string
  default     = "Standard_DS2_v2"
}

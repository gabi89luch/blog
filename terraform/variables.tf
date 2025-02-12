# terraform/variables.tf
variable "github_token" {
  description = "GitHub Personal Access Token"
  type        = string
  sensitive   = true
}

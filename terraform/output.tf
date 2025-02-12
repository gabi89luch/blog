# terraform/outputs.tf
output "repository_url" {
  value       = github_repository.blog.html_url
  description = "URL of the GitHub repository"
}

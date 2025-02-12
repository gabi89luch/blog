# terraform/outputs.tf
output "repository_url" {
  value       = github_repository.blog.html_url
  description = "URL of the GitHub repository"
}

output "pages_url" {
  value       = github_repository.blog.pages[0].html_url
  description = "GitHub Pages URL"
}

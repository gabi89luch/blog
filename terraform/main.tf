# terraform/main.tf
terraform {
  required_version = ">= 1.0.0"
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
  }
}

provider "github" {
  # Token stored as environment variable GITHUB_TOKEN
}

# Example resource (customize as needed)
resource "github_repository" "blog" {
  name        = "blog"
  description = "My tech blog"
  visibility  = "public"

  pages {
    source {
      branch = "main"
      path   = "/"
    }
  }
}

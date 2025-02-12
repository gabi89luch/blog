# terraform/main.tf
terraform {
  required_version = ">= 1.0.0"
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
  }

  backend "local" {}
}

provider "github" {
  token = var.github_token
}

resource "github_repository" "blog" {
  name        = "blog"
  description = "My tech blog"
  visibility  = "public"

  pages {
    build_type = "workflow"
    source {
      branch = "main"
      path   = "/"
    }
  }

  has_issues    = true
  has_projects  = true
  has_wiki      = true
  has_downloads = true
}

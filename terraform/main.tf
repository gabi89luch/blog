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
  description = "Tech Journey"
  visibility  = "public"

  has_issues    = true
  has_projects  = true
  has_wiki      = true
  has_downloads = true

  pages {
    build_type = "workflow"
    source {
      branch = "main"
      path   = "/"
    }
  }

  lifecycle {
    prevent_destroy = true
    ignore_changes = [
      # Ignore changes to these attributes
      description,
      has_downloads,
      has_issues,
      has_projects,
      has_wiki,
      visibility,
      topics,
      pages
    ]
  }
}

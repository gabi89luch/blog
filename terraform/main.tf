tterraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 4.0"
    }
  }
}

provider "github" {
  token = var.github_token
}

resource "github_repository" "blog" {
  name        = "tech-blog"
  description = "My Tech Blog"
  
  visibility = "public"
  has_issues = true
  has_wiki   = true
  
  pages {
    source {
      branch = "gh-pages"
      path   = "/"
    }
  }
}

resource "github_branch" "gh_pages" {
  repository = github_repository.blog.name
  branch     = "gh-pages"
}

resource "github_branch_default" "default" {
  repository = github_repository.blog.name
  branch     = "main"
}erraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 4.0"
    }
  }
}

provider "github" {
  token = var.github_token
}

resource "github_repository" "blog" {
  name        = "tech-blog"
  description = "My Tech Blog"
  
  visibility = "public"
  has_issues = true
  has_wiki   = true
  
  pages {
    source {
      branch = "gh-pages"
      path   = "/"
    }
  }
}

resource "github_branch" "gh_pages" {
  repository = github_repository.blog.name
  branch     = "gh-pages"
}

resource "github_branch_default" "default" {
  repository = github_repository.blog.name
  branch     = "main"
}

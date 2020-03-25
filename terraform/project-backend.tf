data "terraform_remote_state" "gcs" {
    backend = "gcs"
    config = {
        bucket = var.bucket
        prefix = var.project-prefix
    }
}

data google_project "project" {
    project_id = var.project_id
}

resource "google_storage_bucket" "inspector" {
    project = data.google_project.project.project_id
    name = "${var.subdomain}inspector.tykn.tech"
    location = var.region
    force_destroy = true
    storage_class = "MULTI_REGIONAL"

    bucket_policy_only = true

    website {
        main_page_suffix = "index.html"
    }

    cors {
        origin = ["http://${var.subdomain}.tykn.tech"]
        method          = ["GET"]
        response_header = ["*"]
        max_age_seconds = 3600
    }
}

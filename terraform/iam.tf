resource "google_storage_bucket_iam_binding" "inpsector_iam_binding" {
  bucket = google_storage_bucket.inspector.name
  role = "roles/storage.objectViewer"
  members = [
    "allUsers"
  ]
}

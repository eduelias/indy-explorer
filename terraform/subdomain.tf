provider "cloudflare" {
    # api_key = "${var.cloudflare_api_key}"
}

resource "cloudflare_record" "inspector" {
    zone_id = "94d5de375534b60ac33510017bc4fb6e"
    name = "${var.subdomain}inspector"
    type = "CNAME"
    value = "c.storage.googleapis.com"
    proxied = true
}

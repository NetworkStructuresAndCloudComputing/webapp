  source "googlecompute" "custom-image" {
    project_id        = "cloudcomputing-414020"
    source_image_family = "centos-stream-8"
    image_name        = "custom-image-with-mysql"
    ssh_username      = "centos"
    image_family      = "custom-images"
    zone              = "us-east1-b"
  }

  build {
    sources = ["source.googlecompute.custom-image"]

    provisioner "shell" {
      script = "packer-script.ssh"
    }
  }

source "googlecompute" "custom-image" {
  project_id          = "cloudcomputing-414020"
  source_image_family = "centos-stream-8"
  image_name          = "custom-image-with-mysql"
  ssh_username        = "centos"
  image_family        = "custom-images"
  zone                = "us-east1-b"
}

# Set default values for the variables from your .env file
variable "database_username" {
  default = "root"
}

variable "database_password" {
  default = "2108786Z@kir"
}

variable "database_name" {
  default = "CloudComputing"
}

variable "google_application_credentials" {
  default = "/Users/zakirmemon/Downloads/cloudcomputing-414020-d5bd516e8358.json"
}

build {
  sources = ["source.googlecompute.custom-image"]

  provisioner "shell" {
    script = "packer-script.sh"
  }

  provisioner "file" {
    source      = "./webapp"
    destination = "/tmp/webapp"
  }

  provisioner "file" {
    source      = "./csye6225.service"
    destination = "/tmp/csye6225.service"
  }

  provisioner "shell" {
    inline = [
      "sudo groupadd csye6225",
      "sudo useradd csye6225 --shell /usr/sbin/nologin -g csye6225",
      "sudo mv /tmp/csye6225.service /etc/systemd/system/csye6225.service",
      "sudo mv /tmp/webapp /home",
      "sudo chown -R csye6225:csye6225 /home",
      "sudo systemctl daemon-reload",
      "sudo systemctl enable csye6225.service",

      # Use the variables in the shell script
      "export DATABASE_USERNAME=${var.database_username}",
      "export DATABASE_PASSWORD=${var.database_password}",
      "export DATABASE_NAME=${var.database_name}",
      "export GOOGLE_APPLICATION_CREDENTIALS=${var.google_application_credentials}",
    ]
  }
}

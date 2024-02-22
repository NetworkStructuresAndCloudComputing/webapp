source "googlecompute" "custom-image" {
  project_id          = "cloudcomputing-414020"
  source_image_family = "centos-stream-8"
  image_name          = "custom-image-with-mysql"
  ssh_username        = "centos"
  image_family        = "custom-images"
  zone                = "us-east1-b"
}

build {
  sources = ["source.googlecompute.custom-image"]

  variable "env_file" {
  type = string
  default = "${path.cwd}/.env"
}

  provisioner "shell" {
    script = "packer-script.sh"
  }

  provisioner "file" {
    source      = "${path.cwd}/webapp"
    destination = "/tmp/webapp"
  }

  provisioner "file" {
    source      = var.env_file"
    destination = "/tmp/webapp/.env"
  }

  provisioner "file" {
    source      = var.env_file
    destination = "/tmp/webapp/backend/.env"
  }

  provisioner "file" {
    source      = "${path.cwd}/csye6225.service"
    destination = "/tmp/csye6225.service"
  }

  provisioner "shell" {
    inline = [
      "sudo groupadd csye6225",
      "sudo useradd csye6225 --shell /usr/sbin/nologin -g csye6225",
      "chown root:root /tmp/.env",
      "chmod 600 /tmp/.env"  
      "sudo mv /tmp/csye6225.service /etc/systemd/system/csye6225.service",
      "sudo mv /tmp/webapp /home",
      "sudo chown -R csye6225:csye6225 /home",
      "sudo systemctl daemon-reload",
      "sudo systemctl enable csye6225.service",
    ]
  }
}

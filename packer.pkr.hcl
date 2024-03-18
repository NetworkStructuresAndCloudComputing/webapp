source "googlecompute" "custom-image" {
  project_id          = "cloudcomputing-demo-415406"
  source_image_family = "centos-stream-8"
  image_name          = "custom-image-mysql"
  ssh_username        = "centos"
  image_family        = "custom-images-zakir"
  zone                = "us-east1-c"
}

build {
  sources = ["source.googlecompute.custom-image"]

  provisioner "shell" {
    script = "packer-script.sh"
  }

  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "file" {
    source      = "./csye6225.service"
    destination = "/tmp/csye6225.service"
  }

  provisioner "file" {
    source      = "config.yaml"
    destination = "/tmp/config.yaml"
  }

  provisioner "shell" {
    inline = [
      "sudo groupadd csye6225",
      "sudo useradd csye6225 --shell /usr/sbin/nologin -g csye6225",
      "sudo cp /tmp/csye6225.service /etc/systemd/system/csye6225.service",
      "sudo cp /tmp/webapp.zip /home",
      "sudo unzip /home/webapp.zip -d /home/webapp",
      "sudo chown -R csye6225:csye6225 /home",
      "sudo -u csye6225 sh -c 'cd /home/webapp && npm install'",
      "sudo systemctl daemon-reload",
      "sudo systemctl enable csye6225.service",
      "sudo journalctl -u csye6225.service",
      "sudo systemctl start csye6225.service",
      "sudo systemctl status csye6225.service",
      "sudo curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh",
      "sudo bash add-google-cloud-ops-agent-repo.sh --also-install",
      "sudo systemctl enable google-cloud-ops-agent",
      "sudo systemctl start google-cloud-ops-agent",
      "sudo cp /tmp/config.yaml /etc/google-cloud-ops-agent/config.yaml",
      "sudo chown -R csye6225:csye6225 /var/log",
      "sudo chmod 755 /var/log",
      "sudo mkdir /var/log/webapp/app.log",
      "sudo chown -R csye6225:csye6225 /var/log/webapp/app.log",
      "sudo chmod 644 /var/log/webapp/app.log",
      "sudo systemctl restart google-cloud-ops-agent"
    ]
  }
}


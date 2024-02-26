source "googlecompute" "custom-image" {



    project_id          = "cloudcomputing-demo-415406"
  source_image_family = "centos-stream-8"
  image_name          = "custom-image-mysql"
  ssh_username        = "centos"
  image_family        = "custom-images-zakir"
  zone                = "us-east1-c
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

  provisioner "shell" {
    inline = [
      "sudo groupadd csye6225",
      "sudo useradd csye6225 --shell /usr/sbin/nologin -g csye6225",
      "sudo cp /tmp/csye6225.service /etc/systemd/system/csye6225.service",
      "sudo cp /tmp/webapp.zip /home",
      "sudo unzip /home/webapp.zip -d /home",
      "sudo chown -R csye6225:csye6225 /home",
      "sudo -u csye6225 sh -c 'cd /home/webapp-main && npm install'",
      "sudo systemctl daemon-reload",
      "sudo systemctl enable csye6225.service",
      "sudo mysql -u root -p2108786Z@kir -e \"CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'password';\"",
      "sudo mysql -u root -p2108786Z@kir -e \"GRANT ALL PRIVILEGES ON *.* TO 'new_user'@'localhost' WITH GRANT OPTION;\"",
      "sudo mysql -u root -p2108786Z@kir -e \"FLUSH PRIVILEGES;\"",
      "sudo mysql -u new_user -ppassword -e \"CREATE DATABASE CloudComputing;\""
    ]
  }
}


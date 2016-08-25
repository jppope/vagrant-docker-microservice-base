# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  # basic settings
  config.vm.box = "ubuntu/xenial64"
  config.vm.network "forwarded_port", guest: 4000, host: 4000, auto_correct: true
  config.vm.network "forwarded_port", guest: 4001, host: 4001, auto_correct: true
  config.vm.synced_folder ".", "/var/www"
  #, :mount_options => ["dmode=777", "fmode=666"]

  # setup vbox provider
  config.vm.provider "virtualbox" do |vb|
     vb.name = "Microservice App Framework"
     vb.memory = "1024"
  end

  # provision
  config.vm.provision "shell", preserve_order: true do |s|
    s.path = "provision/setup"
  end
  config.vm.provision "shell", preserve_order: true do |s|
    s.path = "provision/containers"
  end

end
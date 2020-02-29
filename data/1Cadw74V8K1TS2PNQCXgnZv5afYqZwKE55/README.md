# web_eibriel
Eibriel website

docker build -t eibriel .
docker create -l eibriel --name=eibriel -v /root/eibriel/web_eibriel/:/usr/local/apache2/htdocs/ eibriel:latest

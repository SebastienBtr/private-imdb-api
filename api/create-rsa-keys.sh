ssh-keygen -t rsa -N "" -b 2048 -m PEM -f ./RSA-keys/jwtRS256.key
openssl rsa -in ./RSA-keys/jwtRS256.key -pubout -outform PEM -out ./RSA-keys/jwtRS256.key.pub
# Calculatrice

Après avoir cloné le dépôt, lancer le conteneur nginx : 

docker run -d \
  --name calculatrice \
  --restart unless-stopped \
  -p 6969:80 \
  -v "$PWD":/usr/share/nginx/html:ro \
  nginx:alpine

## Casper FFG
LFG 🚀🚀🚀

### Docker install steps
1. Pull the images
```
docker pull ghcr.io/0xpsyduck/crypto-tracer-backend:latest && \
docker pull ghcr.io/0xpsyduck/crypto-tracer-frontend:latest
```

2. In a new folder create a new file called `compose.yaml` and copy these content
```
version: '3.8'

services:
  backend:
    image: ghcr.io/0xpsyduck/crypto-tracer-backend:latest
    ports:
      - "34000:5000"
  
  frontend:
    image: ghcr.io/0xpsyduck/crypto-tracer-frontend:latest
    ports:
      - "35000:80"
```

3. Run using docker compose
```
docker compose up -d
```

4. Access the site by going to `http://localhost:35000`
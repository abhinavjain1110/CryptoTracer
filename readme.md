## Casper FFG
LFG 🚀🚀🚀

### 🐳 Docker install steps
0. Install `docker` and `docker compose`, or `docker desktop` for ease of use, refer to [offical documentation](https://docs.docker.com/desktop/)

1. Pull these images
```
docker pull ghcr.io/0xpsyduck/crypto-tracer-backend:latest && \
docker pull ghcr.io/0xpsyduck/crypto-tracer-frontend:latest
```

2. In a new folder create a new file called `compose.yaml` and paste these lines
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
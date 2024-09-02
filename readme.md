## Casper FFG 🚀🚀🚀

### 🐳 Docker install steps
- Install `docker` and `docker compose`, or just `docker desktop` for ease of use, refer to [offical documentation](https://docs.docker.com/desktop/)

- Pull these images
```
docker pull ghcr.io/0xpsyduck/crypto-tracer-backend:local && \
docker pull ghcr.io/0xpsyduck/crypto-tracer-frontend:local
```

> we use `Github's CI/CD pipeline` to automatically publish container images everytime we push on the repo, so you should always check for latest versions, or use something like [watchtower](https://github.com/containrrr/watchtower) for automating container updates


- In a new folder create a new file called `compose.yaml` and paste these lines
```
version: '3.8'

services:
  backend:
    image: ghcr.io/0xpsyduck/crypto-tracer-backend:local
    ports:
      - "5000:5000"
  
  frontend:
    image: ghcr.io/0xpsyduck/crypto-tracer-frontend:local
    ports:
        - "5500:80"
```

- Run using docker compose
```
docker compose up -d
```

- Access the site by going to `http://localhost:5500`

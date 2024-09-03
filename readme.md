## Team Casper FFG 🚀🚀🚀

- Our solution to SIH PS. 1675, demo video ⤵️

[![demo video](https://i.ytimg.com/vi/PmodCBkelw4/maxresdefault.jpg)](https://www.youtube.com/watch?v=PmodCBkelw4)

<br>

## 🐳 Docker install steps
1. Install `docker` and `docker compose`, or just `docker desktop` for ease of use, refer to [offical documentation](https://docs.docker.com/desktop/)
<br>

2. Pull these images
```
docker pull ghcr.io/0xpsyduck/crypto-tracer-backend:local && \
docker pull ghcr.io/0xpsyduck/crypto-tracer-frontend:local
```

> we use `Github Action's CI/CD pipeline` to automatically publish container images everytime we push on the repo, so you should always check for latest versions, or use something like [watchtower](https://github.com/containrrr/watchtower) for automating container updates
<br>

3. In a new folder create a new file called `compose.yaml` and paste these lines
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
<br>

4. Run using docker compose
```
docker compose up -d
```
<br>

5. Access the site by going to `http://localhost:5500`

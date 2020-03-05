# Start project

1. npm install
2. run task in Visual studio code: tsc:watch -tsconfig.json
3. docker-compose up

Go to browser: localhost:3000/docs (Swagger documentation)
# Clean architecture and microservices

# Using NATS to communicate with all system
- This project can scale to run many containers or group all containers to be one (Base on our server memory, it can flexible to change size of containers)

# Future: 
- Apply Redis to cache categories and products, roles ...
- Apply Kubernets to manage containers
- Logging & Tracings
- Apply EventStore & Elasticsearch

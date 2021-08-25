mongo:
	docker run -p 27017:27017 \
		-d \
		--rm \
		--name mongodb \
		--network notes-net \
		--env-file ./config/development.env \
		-v mongo-data:/data/db \
		mongo

backend:
	docker run -p 5000:5000 \
		-d \
		--rm \
		--name notes-backend \
		--network notes-net \
		--env-file ./config/development.env \
		-v /home/vadym/web/my_projects/docker/docker-mern-master/server:/app \
		-v /app/node_modules \
		notes-backend

frontend:
	docker run -p 3000:3000 \
		-d \
		--rm \
		--name notes-frontend \
		-v /home/vadym/web/my_projects/docker/docker-mern-master/client/src:/app/src \
		notes-frontend

stop:
	docker stop mongodb notes-backend notes-frontend

dev:
	docker-compose -f docker-compose.yml up -d

build:
	docker-compose -f docker-compose.production.yml up -d

down:
	docker-compose down

#SSH

SSH_ACCESS:=root@11.111.111.111

ssh:
	ssh $(SSH_ACCESS)

copy-files:
	scp -r ./* $(SSH_ACCESS):/root/app

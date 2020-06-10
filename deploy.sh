docker build -t adamc151/pictionary-client:latest -t adamc151/pictionary-client:$SHA -f ./client/Dockerfile.dev ./client
docker build -t adamc151/pictionary-server:latest -t adamc151/pictionary-server:$SHA -f ./backend/Dockerfile.dev ./backend

docker push adamc151/pictionary-client:latest
docker push adamc151/pictionary-server:latest

docker push adamc151/pictionary-client:$SHA
docker push adamc151/pictionary-server:$SHA

# kubectl apply -f k8s

# kubectl set image deployments/server-deployment server=adamc151/multi-server:$SHA
# kubectl set image deployments/client-deployment client=adamc151/multi-client:$SHA
# kubectl set image deployments/worker-deployment worker=adamc151/multi-worker:$SHA

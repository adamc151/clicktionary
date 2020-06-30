docker build -t adamc151/clicktionary-client:latest -t adamc151/clicktionary-client:$SHA -f ./client/Dockerfile ./client
docker build -t adamc151/clicktionary-server:latest -t adamc151/clicktionary-server:$SHA -f ./backend/Dockerfile.dev ./backend

docker push adamc151/clicktionary-client:latest
docker push adamc151/clicktionary-server:latest

docker push adamc151/clicktionary-client:$SHA
docker push adamc151/clicktionary-server:$SHA

kubectl apply -f k8s

kubectl set image deployments/server-deployment server=adamc151/clicktionary-server:$SHA
kubectl set image deployments/client-deployment client=adamc151/clicktionary-client:$SHA

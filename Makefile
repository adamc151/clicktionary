dev:
	docker-compose build --force-rm && docker-compose up

clean:
	docker-compose down --rmi all -v --remove-orphans

getToken:
	kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')

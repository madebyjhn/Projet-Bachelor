COMPOSE := docker compose
IMAGE   := ghcr.io/madebyjhn/projet-bachelor

.PHONY: help up down build logs ps clean scan

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

up: ## Démarrer tous les services en arrière-plan
	$(COMPOSE) up -d

down: ## Arrêter les services (volumes conservés)
	$(COMPOSE) down

build: ## Reconstruire l'image app sans cache
	$(COMPOSE) build --no-cache app

logs: ## Suivre les logs en temps réel
	$(COMPOSE) logs -f

ps: ## Lister les conteneurs en cours
	$(COMPOSE) ps

clean: ## Arrêter et supprimer les volumes (perte de données !)
	$(COMPOSE) down -v --remove-orphans

scan: ## Scanner l'image avec Trivy (nécessite trivy installé)
	trivy image --exit-code 1 --severity HIGH,CRITICAL $(IMAGE):latest

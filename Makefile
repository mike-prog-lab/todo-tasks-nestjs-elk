.PHONY: help build-dev build-prod test test-e2e start-dev start-prod clean deploy-dev deploy-prod

DOCKER_COMPOSE = docker compose
DOCKER_COMPOSE_DEV = DOCKERFILE=Dockerfile.dev NODE_ENV=development VOLUMES=./backend:/app:delegated docker compose
DOCKER_COMPOSE_PROD = NODE_ENV=production docker compose

init:
	mkdir .state

help:
	@echo "Available targets:"
	@echo "  init          - Inititalize project"
	@echo "  build-dev     - Build development environment"	
	@echo "  build-prod    - Build production environment"
	@echo "  test          - Run unit tests"
	@echo "  test-e2e      - Run end-to-end tests"
	@echo "  start-dev     - Start development environment"
	@echo "  start-prod    - Start production environment"
	@echo "  clean         - Clean up containers and volumes"
	@echo "  deploy-dev    - Deploy to development environment"
	@echo "  deploy-prod   - Deploy to production environment"

build-dev:
	@echo "Building development environment..."
	$(DOCKER_COMPOSE_DEV) build

start-dev: build-dev
	@echo "Starting development environment..."
	$(DOCKER_COMPOSE_DEV) up

build-prod:
	@echo "Building production environment..."
	$(DOCKER_COMPOSE_PROD) build

start-prod: build-prod
	@echo "Starting production environment..."
	$(DOCKER_COMPOSE_PROD) up -d

test:
	@echo "Running unit tests..."
	$(DOCKER_COMPOSE_DEV) run --rm backend npm run test

test-e2e:
	@echo "Running end-to-end tests..."
	$(DOCKER_COMPOSE_DEV) run --rm backend npm run test:e2e

clean:
	@echo "Cleaning up containers and volumes..."
	$(DOCKER_COMPOSE) down -v
	@echo "Removing node_modules..."
	rm -rf backend/node_modules

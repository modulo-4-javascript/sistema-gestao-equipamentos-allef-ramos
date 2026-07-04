NODE_PATH    := ~/.nvm/nvm.sh
NODE_VERSION := 22

node: ## Load the configured Node.js version using NVM
	@. $(NODE_PATH) && nvm use $(NODE_VERSION)

runserver: node
	npm run dev

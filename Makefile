
publish:
ifndef VERSION
	$(error VERSION is undefined for NPM release)
endif
	npm install
	npm version --no-git-tag-version $(VERSION)
	npm run build
	npm publish

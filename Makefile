
publish:
ifndef VERSION
	$(error VERSION is undefined for NPM release)
endif
	npm install
	npm run build
	npm version --no-git-tag-version $(VERSION)
	npm publish

publish-snapshot:
	npm install
	npm run build
	npm version --no-git-tag-version prerelease
	npm publish --tag next
	git add package.json
	git commit -m "Update snapshot version"
	git push origin

test:
	echo "No tests in the CLI repo"

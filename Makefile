
.PHONY: test

version:
	ifndef VERSION
		$(error VERSION is undefined for NPM release)
	endif
	npm version --no-git-tag-version $(VERSION)

publish: version build
	npm publish

publish-snapshot: setup
	npm version --no-git-tag-version prerelease
	npm publish --tag next
	git add package.json
	git commit -m "Update snapshot version"
	git push origin

test:
	yarn
	yarn test

setup:
	yarn install

compile:
	yarn run build

binary:
	pkg distribution/muon-cli.js

build: setup compile binary

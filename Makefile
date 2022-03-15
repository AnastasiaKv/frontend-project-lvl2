install:
				npm ci
				npx simple-git-hooks
publish:
				npm publish --dry-run
lint:
				npx eslint .
gendiff:
				node bin/gendiff.js
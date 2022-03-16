install:
				npm ci
				npx simple-git-hooks
publish:
				npm publish --dry-run
lint:
				npx eslint .
test:
				npm test
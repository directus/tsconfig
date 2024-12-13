# Directus TSConfig

Shared TSConfig files used by projects in the Directus ecosystem.

The following configs are available:

- [`node22`](./configs/node22/tsconfig.json) - Config for Node.js 22 modules
- [`vue3`](./configs/vue3/tsconfig.json) - Config for Vue.js 3 modules
- [`base`](./configs/base/tsconfig.json) - Set of basic rules (included in all of the configs above)

## Usage

```
pnpm add -D @directus/tsconfig
```

To use one of the shared config, extend the local `tsconfig.json` from it:

```json
{
	"extends": "@directus/tsconfig/node22"
}
```

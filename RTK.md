# RTK - Integrated Rinjani

RTK is the default shell wrapper in this repo when an equivalent exists.

- Repo hooks may deny raw Bash commands that `rtk rewrite` can map.
- Use `rtk proxy ...` only when raw passthrough is truly needed.

Common integrated Rinjani examples:

```bash
rtk read package.json
rtk grep shared-ui packages
rtk git diff
rtk npm run build
rtk npm run test --workspace @rinjani/app
```

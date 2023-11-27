## Publishing Packages

1. `yarn && yarn build:js`
    1. Go to package folder and [Customize package.json](#customize-packagejson) from build folder
2. `npm login --registry=https://npm.pkg.github.com`
    1. Or add .npmrc file and add `//npm.pkg.github.com/:_authToken=TOKEN` to it
    2. Or use `npm login` directly to publish npm registry
3. `npm publish --registry=https://npm.pkg.github.com --access public`
    1. Or `npm publish --access public`

## Using Packages

Do these in target repository

1. Add resolution to root package.json to replace old package. e.g:

    ```json
    "resolutions": {
      "@polkadot/wasm-util": "npm:fukaraadam-workspace/polkadot-js-wasm-util"
    }
    ```

2. If using Github Packages, add .npmrc file (**dont commit this**) to root and add following:

    ```json
    @fukaraadam-workspace:registry=https://npm.pkg.github.com/
    //npm.pkg.github.com/:_authToken=Token
    ```

3. `yarn`

## Customize package.json

- Update package name and repository part of package.json to publish according to organization and repository name. e.g:

  ```json
  "name": "@fukaraadam-workspace/polkadot-js-wasm-util",
  "repository": {
    "url": "https://github.com/fukaraadam-workspace/polkadot-js-wasm.git"
  }
  ```

<!-- 
- Add resolution to root package.json for internal usage. e.g:

  ```json
  "resolutions": {
    "@polkadot/wasm-util": "file:./packages/wasm-util",
  }
  ```
 -->
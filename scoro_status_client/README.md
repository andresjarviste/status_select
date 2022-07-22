# vue-project

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Fetching data from backend
All api calls will be made to back end that is located in the same address. All api calls have prefix api

In development mode front end proejct uses proxy (configured on vite.config.ts) to redirect all api calls to localhost:8000

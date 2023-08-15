# Submission api with express

## Project Setup

```sh
copy .env.example file to .env and edit database credentials there
```

```sh
npm install
```

__Migration Table__


```sh
npx sequelize-cli db:migrate
```

```sh
npx sequelize-cli db:migrate:undo
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

```sh
npm run ts
```

### Compile and Minify for Production

```sh
npm run tsc
```

Open [http://localhost:7000/api-docs](http://localhost:7000/api-docs) with your browser to see the documentation API.

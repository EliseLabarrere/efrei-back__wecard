# EFREI dev-manager-fullstack G3

## Installation

```bash
  npm install
```

## Run project locally

```bash
  npm run start:dev
```

### ENV variables

Don't forget to check .env.example file !


## API Documentation
This back end has its routes documented with Swagger. You can access the API documentation at:

```bash
  http://localhost:3000/api-docs
```

## Pour la migration :
migration :
```bash
  npx sequelize-cli db:migrate
```

annuler migration:
```bash
  npx sequelize-cli db:migrate:undo:all
```

seeder :
```bash
  npx sequelize-cli db:seed:all
```

annuler seeder:
```bash
  npx sequelize-cli db:seed:undo:all
```
## Configuration

### 1. Environment Variables

The service reads configuration values from a `.env` file. Create a `.env` file in the root directory (if not already created) and define the following variables:

```env
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=
PORT=
ENV=
```

### 2. Docker Compose Service Configuration

Run command

```
 docker-compose -f docker-compose.yml up -d
```

### 3. Create and run migrations

```
knex migrate:make create-table-resource
knex migrate:latest
```

### 4. Start server

```
npm run start
```

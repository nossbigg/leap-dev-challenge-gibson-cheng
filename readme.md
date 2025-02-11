# leap-dev-challenge-gibson-cheng

LLM App challenge for LEAP Dev
by Gibson Cheng

**Prompts Page**

<img src='./screenshots/prompts-page.png' height=400/>

**Prompt Page**

<img src='./screenshots/prompt-page.png' height=400/>

## Prerequistes

- `node`
- `docker-compose`

## Starting the project

### Backend

- Install dependencies

```sh
cd /backend
npm install

```

- Start the DB

```sh
docker-compose up
```

- Perform DB migrations to get the DB in the right 'shape'

```sh
npx drizzle-kit migrate
```

- Define Google Gemini API key in `.env`

```sh
GOOGLE_GEMINI_API_KEY="<API_KEY_HERE>"
```

You can generate an API key here: [Get API Key | Google AI Studio](https://aistudio.google.com/app/apikey)

- Start the backend server

```sh
npm run start:dev
```

### Frontend

- Install dependencies

```sh
cd /frontend
npm install
```

- Build project

```sh
npm run build
```

- Start the frontend server

```sh
npm run start
```

### Key URLs

- [http://localhost:3001](http://localhost:3001): Landing page for frontend
- [http://localhost:3000](http://localhost:3000): Backend API endpoint
- [Adminer](http://localhost:8080/?pgsql=db&username=postgres&db=postgres&ns=public): UI for Postgres DB

  - Credentials

  ```
    System: Postgres
    Server: db
    Username: postgres
    Password: example
    database: postgres
  ```

## What's included

- Prompts page
  - List all prompts
  - Create new prompt
- Prompt page
  - Edit prompt
  - List prompt responses
  - Edit prompt repsonse
  - Delete prompt response
- Other extras
  - Drizzle DB migrations
  - Backend test suite
  - Frontend test suite

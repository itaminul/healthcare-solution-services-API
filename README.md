# Health Care Solution Service API
This is a HCSSAPI backend repository using NestJS, PostgreSQL, Prisma and Docker.

## Run the App using Script Command

Prerequisites: You have to have installed Postgres in your machine.

- Create a `.env` file at the root and add essential environment variables from `.env.example` file
- Run `npm install` or `yarn`
- Now to run the app in the Dev Environment run `npm run start:dev` or `yarn start:dev`
- For production, first build using `npm run build` or `yarn build` and then run `npm start` or `yarn start`
- Now the server should listen on `http://localhost:9004` based on the port number you set in `.env`

## Run the App using Docker

Prerequisites: You have to have installed Docker and Docker-compose in your computer

- Create a `.env` file at the project root and add essential environment variables from `.env.example` file
- Open any command line tool in your computer like for Windows `Git Bash`, for Linux `Terminal` or `Terminator`, and for Mac `iTerm2`, and so on.
- Change directory to this project in which location you have for example `cd ~/www/Health Care Solution Service API`
- Now run `docker compose up` or `docker-compose up` if you installed docker compose separately
- Now the server should listen on `http://localhost:8000` based on the port number you set in `.env`
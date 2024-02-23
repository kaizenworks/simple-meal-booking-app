This is a demonstration project for NextJS+Mongo based projects.

## Tasks

- [x] Docker + ShadCN setup
- [x] Order + Meal Schema
- [x] Order form
- [ ] Admin login
- [ ] Admin order manage
- [ ] Admin meal manage

## About project structure

Not inteded to be hosted with serverless (SST or Vercel). Instead its designed to be self-hosted on any VPS with Docker.

This project uses
- `shadcn` design library
- `react-hook-form` for form logic (that's the closest thing to angular's reactive forms in react)
- `zod` for schema validation
- `@tanstack/react-query` for data fetching
- `next-auth` for authentication
- `react-table` for data tables
- `mongoose` for db schema


## Getting Started 

To run the local development server,

First, install node packages

```bash
npm i
```

Then, run docker compose up
```bash
docker-compose up
```
Production docker-compose file is `docker-compose.production.yaml`

To use with Docker hub update the docker image name in the production compose file.

Optionally use `refresh.sh` bash script to update projects in server.

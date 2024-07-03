# Import CSV API

This is a simple API that allows you to import a CSV file.
It was developed using NodeJs, DDD, TDD, SOLID and Clean Architecture.

## How to run

1. Clone this repository
2. Run `docker compose up -d`
3. Call the endpoint `POST http://localhost:3000/upload` with a CSV file in the body of the request with the key `file`
4. Running tests: `docker exec -it import_csv npm run test:cov`

## Skills

- NodeJs
- Typescript
- TDD
- DDD
- SOLID
- Docker
- Git

# Import CSV API

This is a simple API that allows you to import a CSV file.
It was developed using NodeJs, DDD, TDD, SOLID and Clean Architecture.

## How to run

1. Clone this repository
2. Run `docker compose up -d` and await the container to be up, you can check the logs with `docker logs -f import_csv --tail 50`
3. Call the endpoint `POST http://localhost:3000/upload` with a CSV file in the body of the request with the key `file`
4. Running tests: `docker exec -it import_csv npm run test:cov`. It can take a while to run the tests, so be patient.

## Skills

- NodeJs
- Typescript
- TDD
- DDD
- Design Patterns
- SOLID
- Docker
- Git

# Film Shelf

Small project for adding, sorting, filtering films.

## Prerequisites

Java JDK > = 22.0.1\
Node >= 20.14.0\
Maven

## Installing

In the project directory run

### `mvn clean install`

For frontend in frontend folder run

### `npm i`

## Running application

Run App.java\
(backend > src > main > java > org.example > App)

Run `npm start` in frontend folder\
Should open http://localhost:3000/

## Running tests

Backend JUnit --> run FilmServiceImpl.java\
(backend > test > java > org.example > FilmServiceImpl)

Frontend e2e run `npx playwright test --ui` or ` npx playwright test` in e2e folder to run following tests

`addAndDeleteFilms.spec.ts`\
`checkMandatoryFields.spec.ts`\
`checkTablePagination.spec.ts`

(Please note that both the frontend and backend applications must be running concurrently in order to execute the tests)
# playwright-typescript-qa-framework
QA Automation Engineer ayant conçu un framework Playwright/TypeScript moderne intégrant POM, tests API, fixtures, CI/CD et Docker.

Playwright and TypeScript QA automation framework featuring Page Object Model, API testing, reporting and CI/CD integration.

A test automation project built with Playwright and TypeScript.

## Features

- UI automated testing
- API testing
- Page Object Model (POM)
- Data-driven testing with JSON files
- TypeScript interfaces for test data and API models
- HTML reporting
- Screenshots on failure
- Cross-browser testing (Chromium, Firefox, WebKit)
- GitHub Actions CI pipeline
- Dockerized test execution


## Test Applications

UI Tests:
- https://www.saucedemo.com

API Tests:
- https://jsonplaceholder.typicode.com


## Tech Stack

- Playwright
- TypeScript
- Git
- GitHub Actions
- Docker


## Run Tests

### Local

npm install
npx playwright test

### Docker

docker build -t playwright-learning .
docker run --rm playwright-learning

# workflow de la pipeline

## Créer un PC Linux

runs-on: ubuntu-latest
↓

## Récupérer mon projet

uses: actions/checkout@v4
↓

## Installer Node

uses: actions/setup-node@v4
↓

## Installer les dépendances

name: Install dependencies
run: npm ci
↓

## Installer Playwright

name: Install Playwright browsers
run: npx playwright install --with-deps
↓

## Lancer les tests

name: Run Playwright tests
run: npx playwright test

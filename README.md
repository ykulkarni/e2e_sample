# e2e_sample

## Introduction

This project is a Vue CLI generated SPA. It contains two routes of interest. Specifically, `/login` is used to sign in users and `/register` is used to register new users. Your task is to expand upon the existing login test and add tests for the registration page. The end-to-end Cypress tests can be found in `tests/e2e/specs/`. Documentation for Cypress can be found here: https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell

## Getting started

- Fork this repository and clone your fork using `git clone <YOUR_REPO>`
- Once you have cloned the repo, run `npm ci` to fetch the required NPM dependencies
- Run `npm run serve` to start the application
- Navigate to `http://localhost:<PORT_FROM_PREVIOUS_STEP>/login` to ensure that you are able to build and interact with the app
- In order to trigger a successful login (given that there is no backend service for this SPA), the credentials are `email: super@secret.com` and `password: 1234567890`
- After you have played around with the `/login` and `/register` routes and exercised the various invalid form inputs, you can run the existing E2E Cypress tests by running: `npm run test:e2e` (or to run the tests in a headless fashion `npm run test:e2e -- --headless`)

## Submitting your solution

Once your fork has the necessary tests added, please make a pull request against this repository.

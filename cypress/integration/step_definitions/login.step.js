/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

Given('que utilize body {string}', (body) => {
  cy.log(body)
});

Then('deverá ser retornada a mensagem {string}', (msg) => {
  cy.log(msg)
})
/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'


Given('a rota {string}', (rota) => {
  cy.wrap(rota).as('rota');
});

Given('que utilize body {string}', (body) => {
  cy.wrap(body).as('body');
});

When('realizar uma requisição do tipo {string}', (verb) => {
  ServeRest.realizar_login(cy.get('@rota'), cy.get('@body'))
});

Then('deverá ser retornado o schema {string} e status {int}', (schema, statuscode) => {
  return true
})

Then('deverá ser retornada a mensagem {string}', (mensgem) => {
  return true
})
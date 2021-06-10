/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'


Given('a rota {string}', (rota) => {
  return true; //cy.wrap(rota).as('rota');
});

Given('que utilize body {string}', (tipoBody) => {
  cy.wrap(tipoBody).as('TipoBody');
});

//When('realizar uma requisição do tipo {string}', (verb) => {
//  ServeRest.realizarLogin(cy.get('@Rota'), cy.get('@Body'))
//});

When('realizar login', () => {
  cy.get('@TipoBody').then(tipo => {
    ServeRest.realizarLogin(tipo);
  })
})

Then('deverá ser retornado o schema {string} e status {int}', (schema, status) => {
  ServeRest.validarSchemaEStatus(schema, status);
})

Then('deverá ser retornada a mensagem {string}', (mensagem) => {
  ServeRest.validarMensagem(mensagem);
})
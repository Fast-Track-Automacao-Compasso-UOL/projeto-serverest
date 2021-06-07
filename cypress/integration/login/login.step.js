/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'


Given('a rota {string}', (rota) => {
  return true; //cy.wrap(rota).as('rota');
});

Given('que utilize body {string}', (tipoBody) => {
  cy.wrap(tipoBody).as('tipoBody');
});

When('realizar uma requisição do tipo {string}', (verb) => {
  ServeRest.realizar_login(cy.get('@rota'), cy.get('@body'))
});

When('realizar login', () => {
  ServeRest.realizar_login();
})

Then('deverá ser retornado o schema {string} e status {int}', (schema, status) => {
  ServeRest.validar_esquema(schema, status);
})

Then('deverá ser retornado o atributo {string} com a mensagem {string}', (atributo, mensagem) => {
  ServeRest.validar_mensagem(atributo, mensagem);
})
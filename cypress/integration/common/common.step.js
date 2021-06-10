/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'

Given('a rota {string}', (rota) => {
  ServeRest.armazenarRota(rota);
});

When('realizar uma requisição do tipo {string}', (tipo) => {
  cy.get('@Body').then(body => {
    ServeRest.realizarRequisicao(tipo, body);
  })
});

Then('deverá ser retornado o schema {string} e status {int}', (schema, status) => {
  ServeRest.validarSchemaEStatus(schema, status);
});

Given('que possua uma autenticação {string}', (auth) => {
  switch (auth) {
    case "válida":
      ServeRest.realizarLogin('admin');
      break;
    case "inválida":
      cy.wrap("AUTHJIUzI1NiIsInRINVALIDA").as('Token')
      break;
  }
});

Then('deverá ser retornada a mensagem {string}', (mensagem) => {
  ServeRest.validarMensagem(mensagem);
});
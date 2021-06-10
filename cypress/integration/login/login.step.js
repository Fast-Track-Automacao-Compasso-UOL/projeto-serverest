/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'

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
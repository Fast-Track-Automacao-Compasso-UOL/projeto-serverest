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
    case "válida comum":
        ServeRest.criarUsuario()
        ServeRest.realizarLogin()
      break;
    case "válida admin":
        ServeRest.criarUsuario({ admin: 'true' })
        ServeRest.realizarLogin()
      break;
    
    case "inválida":
        cy.wrap('AUTENTICACAOINVALIDA').as('Token')
      break;
  
    default:
      break;
  }
})

 
  // switch (auth) {
  //   case "válida admin":
  //     ServeRest.realizarLogin('admin');
  //     break;
  //   case "inválida":
  //     cy.wrap("AUTHJIUzI1NiIsInRINVALIDA").as('Token')
  //     break;
  //   case "válida comum":
  //    ServeRest.realizarLogin('válido')
  //    break;
  // }


Then('deverá ser retornada a mensagem {string}', (mensagem) => {
  ServeRest.validarMensagem(mensagem);
});
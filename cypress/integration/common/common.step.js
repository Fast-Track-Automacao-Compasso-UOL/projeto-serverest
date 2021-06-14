/// <reference types="cypress" />

import { Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { Login } from '../../services/login.service';
import { ServeRest } from '../../services/serveRest.service'

Before(() => {
  // Criando usuário comum e disponibilizando através dos aliases 'idUsuarioComum' e 'UsuarioComum'
  ServeRest.criarUsuario()
  cy.get('@IdUsuario').then(idUsuario => {
    cy.get('@Usuario').then(usuario => {
      cy.wrap(idUsuario).as('idUsuarioComum')
      cy.wrap(usuario).as('UsuarioComum')
    })
  })
  // Criando usuário admin e disponibilizando através dos aliases 'idUsuarioAdmin' e 'UsuarioAdmin'
  ServeRest.criarUsuario({ admin: 'true' })
  cy.get('@IdUsuario').then(idUsuario => {
    cy.get('@Usuario').then(usuario => {
      cy.wrap(idUsuario).as('idUsuarioAdmin')
      cy.wrap(usuario).as('UsuarioAdmin')
    })
  })
});

Given('a rota {string}', (rota) => {
  ServeRest.armazenarRota(rota);
});

When('realizar uma requisição do tipo {string}', (tipo) => {
  if (tipo == 'DELETE') {
    
      ServeRest.realizarRequisicao(tipo);
    
  } else {
    cy.get('@Body').then(body => {
      ServeRest.realizarRequisicao(tipo, body);
    })
  }

});

Then('deverá ser retornado o schema {string} e status {int}', (schema, status) => {
  cy.get("@Body").then((body) => {
    cy.validateSchema(body, `${schema}/${status}`);
  });
});

Given('que possua uma autenticação {string}', (auth) => {
  switch (auth) {
    case "válida comum":
      ServeRest.criarUsuario()
      Login.realizarLogin()
      cy.get('@Token').then(token => {
        cy.wrap(token).as('Autenticacao')
      })
      break;
    case "válida admin":
      ServeRest.criarUsuario({ admin: 'true' })
      Login.realizarLogin()
      cy.get('@Token').then(token => {
        cy.wrap(token).as('Autenticacao')
      })
      break;

    case "inválida":
      cy.wrap('AUTENTICACAOINVALIDA').as('Autenticacao')
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
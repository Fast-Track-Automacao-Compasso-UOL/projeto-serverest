/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'

Given('a rota {string}', (rota) => {
  ServeRest.armazenarRota(rota);
});

Given('que utilize query params {string}', (param) => {
  // Refatorar para uso de fixtures
  let valor;
  switch (param) {
    case "_id":
      valor = "0uxuPY0cbmQhpEz1"
      break;
    case "nome":
      valor = "Fulano%20da%20Silva"
      break;
    case "email":
      valor = "fulano@qa.com"
      break;
    case "password":
      valor = "teste"
      break;
    case "administrador":
      valor = "true"
      break;
    default:
      param = ""
      valor = ""
      break;
  }

  ServeRest.adicionarQueryParams(param, valor);
});

When('realizar uma requisição do tipo {string}', (tipo) => {
  cy.get('@Body').then(body => {
    ServeRest.realizarRequisicao(tipo, body)
  })
});

Given('que utilize complemento de rota {string}', (id) => {
  // Refatorar para uso de fixtures
  switch (id) {
    case "válido":
      id = "0uxuPY0cbmQhpEz1"
      break;
    case "inválido":
      id = "0uxuPY0cbmQhpEz"
      break;
    default:
      id = ""
      break;
  }

  ServeRest.adicionarComplemento(id)
});

Given('que utilize body {string}', (body) => {
  // Refatorar para uso de fixtures
  switch (body) {
    case "válido":
      body = {
        "nome": "Fulano da Silva",
        "email": "teste@qa.com.br",
        "password": "teste",
        "administrador": "true"
      }
      break;
    case "e-mail já utilizado":
      body = {
        "nome": "Fulano da Silva",
        "email": "fulano@qa.com",
        "password": "teste",
        "administrador": "true"
      }
      break;
    case "e-mail inválido":
      body = {
        "nome": "Teste",
        "email": "thatisnotanemail",
        "password": "teste",
        "administrador": "true"
      }
      break;
    case "campos vazios":
      body = {
        "nome": "",
        "email": "",
        "password": "",
        "administrador": ""
      }
      break;
    case "campos inválidos":
      body = {
        "nome": 123,
        "email": 123,
        "password": 123,
        "administrador": 123
      }
      break;
    default:
      body = ""
      break;
  }

  ServeRest.adicionarBody(body)
});

Then('deverá ser retornada a mensagem {string}', (mensagem) => {
  ServeRest.validarMensagem(mensagem)
});

Then('deverá ser retornado o schema {string} e status {int}', (schema, status) => {
  ServeRest.validarSchemaEStatus(schema, status)
});
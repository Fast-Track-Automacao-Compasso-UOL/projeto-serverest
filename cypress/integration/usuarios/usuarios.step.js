/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'

Given('a rota {string}', (rota) => {
  ServeRest.armazenarRota(rota);
});

Given('que utilize query params {string}', (param) => {
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
  ServeRest.realizarRequisicao(tipo)
});

Then('deverá ser retornado o schema {string} e status {int}', (schema, status) => {
  ServeRest.validarSchemaEStatus(schema, status)
})

Given('que utilize complemento de rota {string}', (id) => {
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
})
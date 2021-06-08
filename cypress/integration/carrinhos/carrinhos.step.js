/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'
import Rest from '../../services/_rest.service'


Given('a rota {string}', (rota) => {
  ServeRest.armazenarRota(rota);
});
// GET Cenario: Listar Carrinhos
Given('que utilize query params {string}', (params) => {
  ServeRest.adicionarQueryParams(params);
});

When('realizar uma requisição do tipo {string}', (tipo) => {
  cy.get('@Body').then(body => {
    ServeRest.realizarRequisicao(tipo, body);
  })
});

Then('deverá ser retornado o schema {string} e status {int}', (schema, status) => {
  ServeRest.validarSchemaEStatus(schema, status);
});

//GET Cenario: Buscar carrinhos por ID
// Given('a rota {string}', (rota) => {
//  ServeRest.armazenarRota(rota);

Given ('que utilize complemento de rota {string}', (id) => {
  switch (id) {
    case "válido":
      id = "qbMqntef4iTOwWfg"
      ServeRest.adicionarComplemento(id)
      break;
    case "inválido":
      id = "ID11qntef4iTO11INVALIDO"
      ServeRest.adicionarComplemento(id)
      break;
    }
// When('realizar uma requisição do tipo {string}', (tipo) => {
//  ServeRest.realizarRequisicao(tipo);

//Then('deverá ser retornado o schema {string} e status {int}', (schema, status) => {
//  ServeRest.validarSchemaEStatus(schema, status);
});

//POST Cenario: Cadastrar Carrinho
Given('que possua uma autenticação {string}', (auth) => {
  let token;
    switch (auth) {
      case "válida":
        token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNjIzMTg0OTIxLCJleHAiOjE2MjMxODU1MjF9.nXEjxx18jzPj3VC889JxKKTo_tHFhcyE6eqoKLUo9FA" // Terminar esse caso
        break;
      case "inválida":
        token = "AUTHJIUzI1NiIsInRINVALIDA"
        break;
    }
    cy.wrap(token).as('Token');
});

Given('que utilize body {string}', (body) => {
  let aux;
  switch (body) {
    case "válido":
      aux = {
        "produtos": [
          {
            "idProduto": "BeeJh5lz3k6kSIzA",
            "quantidade": 5
          },
          {
            "idProduto": "K6leHdftCeOJj8BJ",
            "quantidade": 3
          }
        ]
      }
      break;
    case "carrinho já cadastrado":
      aux = {
        "produtos": [
          [
            {
              "idProduto": "BeeJh5lz3k6kSIzA",
              "quantidade": 1,
              "precoUnitario": 470
            },
            {
              "idProduto": "K6leHdftCeOJj8BJ",
              "quantidade": 2,
              "precoUnitario": 5240
            }
          ]
        ],    
      }
      break;
    case "campos vazios":
        aux = {
          "produtos": [
            {
              "idProduto": "",
              "quantidade": ""
            },
            {
              "idProduto": "",
              "quantidade": ""
            }
          ]
        }
        break;
      default:
        aux = ""
        break;

  }
    ServeRest.adicionarBody(aux)
});
Then('deverá ser retornada a mensagem {string}', (mensagem) => {
  ServeRest.validarMensagem(mensagem);

})

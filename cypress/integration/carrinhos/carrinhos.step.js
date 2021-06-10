/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'
import Rest from '../../services/_rest.service'


Given('a rota {string}', (rota) => {
  ServeRest.armazenarRota(rota);
});
// GET Cenario: Listar Carrinhos
Given('que utilize query params {string}', (params) => {
  let valor;
  switch (params) {
    case "precoTotal":
      valor = "6180"
      break;
    case "quantidadeTotal":
      valor = "3"
      break;
    case "idUsuario":
      valor = "oUb7aGkMtSEPf6BZ"
      break;
    default:
      params = ""
      valor = ""
      break;
  }

  ServeRest.adicionarQueryParams(params, valor);
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

Given('que utilize complemento de rota {string}', (id) => {
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
      ServeRest.realizarLogin('admin');

    break;
    case "inválida":
      token = "AUTHJIUzI1NiIsInRINVALIDA"
      break;
  }

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
        "produtos":
          [
            {
              "idProduto": "BeeJh5lz3k6kSIzA",
              "quantidade": 1
            },
            {
              "idProduto": "K6leHdftCeOJj8BJ",
              "quantidade": 2
            }
          ],
      }
      break;
    case "campos vazios":
      aux = {
        "produtos": 123
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

});

//DELETE Cenario: Excluir carrinho concluir-compra/cancelar-compra
Given('{string} carrinho ', (condicao) => {
  let cond;
  switch (condicao) {
    case "possua":
      cond = {
        "produtos": [
          [
            {
              "idProduto": "BeeJh5lz3k6kSIzA",
              "quantidade": 1,
              "precoUnitario": 470
            },
            {                                              // refatorar
              "idProduto": "K6leHdftCeOJj8BJ",
              "quantidade": 2,
              "precoUnitario": 5240
            }
          ]
        ],
      }
      break;
    case "não possua":
      cond = ""
      break;
  }

  cy.wrap(cond).as('Condicao');
});

Given('que utilize complemento de rota {string}', () => {
  ServeRest.adicionarComplemento(complemento);
});



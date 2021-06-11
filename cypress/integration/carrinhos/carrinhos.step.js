/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'
import Rest from '../../services/_rest.service'

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
      // Cenario: excluir carrinho
    case "concluir-compra":
      ServeRest.adicionarComplemento(id)
      break;
    case "cancelar-compra":
      ServeRest.adicionarComplemento(id)
      break;
  }
  // When('realizar uma requisição do tipo {string}', (tipo) => {
  //  ServeRest.realizarRequisicao(tipo);

  //Then('deverá ser retornado o schema {string} e status {int}', (schema, status) => {
  //  ServeRest.validarSchemaEStatus(schema, status);
});

//POST Cenario: Cadastrar Carrinho

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

//DELETE Cenario: Excluir carrinho concluir-compra/cancelar-compra
Given('{string} carrinho', (condicao) => {
  
  switch (condicao) {
    case "possua":
      ServeRest.criarUsuario({ admin: 'true' })
      ServeRest.realizarLogin()
      ServeRest.criarProduto()
      ServeRest.criarCarrinho()                                                           //refatorar
      break;
    case "não possua":
      ServeRest.criarUsuario({ admin: 'true' })
      ServeRest.realizarLogin()
      break;
    default:
      cy.log(`Tipo não identificado: ${condicao}`)
      break;
  }


});

Given('que utilize complemento de rota {string}', () => {
  ServeRest.adicionarComplemento(complemento);
});



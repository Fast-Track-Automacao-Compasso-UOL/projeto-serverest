/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'
import Rest from '../../services/_rest.service'

// Listar Produtos
Given('a rota {string}', (rota) => {
   ServeRest.armazenarRota(rota);
});

Given ('que utilize query params {string}', (param) => {
    let valor;
        switch (param) {
          case "_id":
           valor = "BeeJh5lz3k6kSIzA"
            break;
          case "nome":
            valor = "Logitech%MX%Vertical"
          case "preco":
            valor = "470"
             break;
          case "descricao":
            valor = "Mouse"
             break;
          case "quantidade":
            valor ="382"
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
});

// Buscar produtos por ID

Given('que utilize complemento de rota {string}', (id) => {
        switch (id) {
          case "válido":
             id = "BeeJh5lz3k6kSIzA"
             ServeRest.adicionarComplemento(id)
             break;
          case "inválido":
             id = "BeeJh5lz3k6kSIzA1"
             ServeRest.adicionarComplemento(id)
             break;
                     
    };
     cy.wrap(`${rota}/${id}`).as('Rota')    
      
    ServeRest.adicionarComplemento(id)
   
});

// Cadastrar Produto

Given('que possua uma autenticação {string}', (auth) => {
    let token;
    switch (auth) {
      case "válida":
        token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNjIzMTgyMjY5LCJleHAiOjE2MjMxODI4Njl9.C2LPuX9wKCGGDzjitoHaTuNgQk8sVe6InFGbdooVgKc" // Terminar esse caso
        break;
      case "inválida":
        token = "AUTHJIUzI1NiIsInRINVALIDA"
        break;
    }
    cy.wrap(token).as('Token');
});

Given('que utilize body{string}', (body) => {
    switch (body) {
        case "válido":
         body = {
             "nome": "Logitech MX Vertical",
             "preco": 470,
             "descricao": "Mouse",
             "quantidade": 381,
             "administrador": "true"
         }
        break;
        case "nome já utilizado":
            body = {
                "nome": "Logitech MX Vertical",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381,
                "administrador": "true"
            }
           break;
        case "vazio":
            body = {
                "nome": "",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381,
                "administrador": "true"
            }
           break;
        case "campos vazios":
            body = {
                "nome": "",
                "preco": "",
                "descricao": "",
                "quantidade": "",
                "administrador": ""
            }
           break;
        case "campos inválidos":
            body = {
                "nome": "Logitech MX Vertical",
                "preco": "qqee0",
                "descricao": "Mouse",
                "quantidade": "eqeqeq",
                "administrador": "true"
            }
           break;
        case "Token inválido":
            body = {
                "nome": "Logitech MX Vertical",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381,
                "administrador": "true"
            }
           break;
        case "válido comum":
            body = {
                "nome": "Logitech MX Vertical",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381,
                "administrador": "true"
            }
           break;
           default:
               body =""
               break;
    }
        cy.wrap(body).as('Body')
});

When('realizar uma requisição do tipo{string}', (tipo) => {
    ServeRest.realizarRequisicao(tipo)
});

Then('deverá ser retornada a mensagem {string}', (mensagem) => {
    ServeRest.validarMensagem(mensagem)
  });

Then('deverá ser retornado o schema {string} e status {int}', (schema, status) => {
    ServeRest.validarSchemaEStatus(schema, status)
});



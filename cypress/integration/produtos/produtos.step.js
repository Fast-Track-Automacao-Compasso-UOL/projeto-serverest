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
          case "existente":
             id = "BeeJh5lz3k6kSIzA1"
             ServeRest.adicionarComplemento(id)
             break;
          case "existente sem carrinho":
             id = "0uxuPY0cbmQhpEz1q"
             ServeRest.adicionarComplemento(id)
             break;
          case "inexistente":
             id = "jogfODIlXsqxNFS2"
             ServeRest.adicionarComplemento(id)
             break;
          case "existente com carrinho":
             id = "0uxuPY0cbmQhpEz1q"             
             ServeRest.adicionarComplemento(id)
             break;
          case "existente sem carrinho":
             id = "0uxuPY0cbmQhpEz1q"
             ServeRest.adicionarComplemento(id)
             break;
                               
    };
       
});

// Cadastrar Produto

Given('que possua uma autenticação {string}', (auth) => {
    let token;
    switch (auth) {
      case "válida admin":
        token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNjIzMjcxNjExLCJleHAiOjE2MjMyNzIyMTF9.kL51ENXHryAW3yzMl1Ne_hCNX8AM9wDO_WAEaPpnrG4" // Terminar esse caso
        break;
      case "inválida":
        token = "AUTHJIUzI1NiIsInRINVALIDA"
        break;
      case "válida comum":
        token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNjIzMjcxNjExLCJleHAiOjE2MjMyNzIyMTF9.kL51ENXHryAW3yzMl1Ne_hCNX8AM9wDO_WAEaPpnrG4"
        break;
    }
    cy.wrap(token).as('Token');
});

Given('que utilize body {string}', (body) => {
    switch (body) {
        case "válido":
         body = {
            "nome": "New Name07",
            "preco": 470,
            "descricao": "Mouse",
            "quantidade": 381
        
         }
        break;
        case "nome já utilizado":
            body = {
                "nome": "Logitech MX Vertical",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381
                
            }
           break;
        case "vazio":
            body = {          
            }
           break;
        case "campos vazios":
            body = {
                "nome": "",
                "produtos": 1234               
            }
           break;
        case "campos inválidos":
            body = {
                "nome": 1234,
                "preco": 1234,
                "descricao": 1234,
                "quantidade": 1234
                
            }
           break;
        case "inválido":
            body = {
                "nome": "Logitech MX Vertical",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381
                
            }
           break;
        case "válido comum":
            body = {
                "nome": "Logitech MX Vertical",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381
                
            }
           break;
           default:
               body =""
               break;
    }
        ServeRest.adicionarBody(body)
});

When('realizar uma requisição do tipo {string}', (tipo) => {
    cy.get('@Body').then(body => {
       ServeRest.realizarRequisicao(tipo, body)
    })
    
});

Then('deverá ser retornada a mensagem {string}', (mensagem) => {
    ServeRest.validarMensagem(mensagem)
  });

// Deletar Produto






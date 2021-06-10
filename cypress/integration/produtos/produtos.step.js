/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'
import Rest from '../../services/_rest.service'

// Listar Produtos
Given('a rota {string}', (rota) => {
    ServeRest.armazenarRota(rota);
});

Given('que utilize query params {string}', (param) => {
    let valor;
    switch (param) {
        case "_id":
            valor = "BeeJh5lz3k6kSIzA"
            break;
        case "nome":
            valor = "Logitech%20MX%20Vertical"
            break;
        case "preco":
            valor = "470"
            break;
        case "descricao":
            valor = "Mouse"
            break;
        case "quantidade":
            valor = "382"
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
        case "existente":
            id = "BeeJh5lz3k6kSIzA"            
            ServeRest.adicionarComplemento(id)                       
            break;
        case "inexistente":
            id = "BeeJh5lz3k6kSIzA1"
            ServeRest.adicionarComplemento(id)
            break;
        case "existente com carrinho":
            id = "BeeJh5lz3k6kSIzA1"
            ServeRest.adicionarComplemento(id)
            break;

    };
});

// Cadastrar Produto

Given('que possua uma autenticação {string}', (auth) => {
    let token;
    switch(auth) {
       case "válida admin":
           ServeRest.realizar_login('admin');
           break;
       case "inválida":
           token = "AUTHJIUzI1NiIsInRINVALIDA"
           break;         
    }        
    
});

Given('que utilize body {string}', (body) => {
    switch (body) {
        case "válido":
            body = {
                "nome": "oUTRO PRODUTO",
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
        case "campo ausente":
            body = {
                "nome": "",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381

            }
            break;
        case "campos vazios":
            body = {
                "nome": "",
                "preco": "",
                "descricao": "",
                "quantidade": ""

            }
            break;
        case "campos inválidos":
            body = 
                {
                    "nome": 123,
                    "preco": 123,
                    "descricao": 123,
                    "quantidade": 123
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
        case "válida comum":
            body = {
                "nome": "Logitech MX Vertical",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381               
            }
            break;
        default:
            body = ""
            break;
    }
    ServeRest.adicionarBody(body)
});

When('realizar uma requisição do tipo {string}', (tipo) => {
    cy.get('@Body').then(body => {
        cy.log(body)
        ServeRest.realizarRequisicao(tipo, body)
    })

});

Then('deverá ser retornada a mensagem {string}', (mensagem) => {
    ServeRest.validarMensagem(mensagem)
});
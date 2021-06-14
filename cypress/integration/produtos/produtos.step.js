/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'
import Rest from '../../services/_rest.service'

// Listar Produtos

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
});

// Cadastrar Produto

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
        case "vazio":
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
            body = {
                "nome": "Logitech MX Vertical",
                "preco": "qe",
                "descricao": "Mouse",
                "quantidade": "qe"

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
            body = ""
            break;
    }
    ServeRest.adicionarBody(body)
});
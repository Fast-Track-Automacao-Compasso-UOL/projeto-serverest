/// <reference types="cypress" />

import Rest from './_rest.service';

const URL_BASE = Cypress.config("baseUrl");
const URL_USUARIOS = "/usuarios";
const URL_LOGIN = "/login";
const URL_PRODUTOS = "/produtos";
const URL_CARRINOS = "/carrinhos";

export class ServeRest extends Rest {

    static realizar_login(rota, body) {
        return super.post(rota, body);
    }

    static validar_esquema(res, schema) {
        cy.validateSchema(res, schema);
    }

}

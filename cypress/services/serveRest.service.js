/// <reference types="cypress" />
import Rest from "./_rest.service"

export class ServeRest extends Rest {
  // Armazena rota baseado no parâmetro recebido
  static armazenarRota(rota) {
    cy.wrap(rota).as('Rota');
  }

  // Adiciona query params à rota recebida pelo cy.wrap()
  static adicionarQueryParams(params) {
    cy.get('@Rota').then(rota => {
      switch (params) {
        case "_id":
          cy.wrap(`${rota}?${params}=0uxuPY0cbmQhpEz1`).as('Rota')
          break;
        case "nome":
          cy.wrap(`${rota}?${params}=Fulano%20da%20Silva`).as('Rota')
          break;
        case "email":
          cy.wrap(`${rota}?${params}=fulano@qa.com`).as('Rota')
          break;
        case "password":
          cy.wrap(`${rota}?${params}=teste`).as('Rota')
          break;
        case "administrador":
          cy.wrap(`${rota}?${params}=true`).as('Rota')
          break;
        default:
          cy.wrap(rota).as('Rota')
          break;
      }
    })
  }

  // Realiza requisição com rota recebida pelo cy.wrap() e tipo recebido no parâmetro
  static realizarRequisicao(tipo) {
    cy.get('@Rota').then(rota => {
      switch (tipo) {
        case "GET":
          Rest.get(rota).then(res => {
            cy.wrap(res.body).as('Body')
          })
          break;
        default:
          break;
      }
    })
  }

  // Valida schema e status com body da requisição recebido pelo cy.wrap() e parâmetros
  static validarSchemaEStatus(schema, status) {
    cy.get('@Body').then(body => {
      cy.validateSchema(body, `${schema}/${status}`)
    })
  }

  static adicionarComplemento(complemento) {
    cy.get('@Rota').then(rota => {
      cy.wrap(`${rota}/${complemento}`).as('Rota')
    })
  }
}
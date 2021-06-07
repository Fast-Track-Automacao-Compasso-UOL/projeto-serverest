/// <reference types="cypress" />
import Rest from "./_rest.service"

export class ServeRest extends Rest {
  static armazenarRota(rota) {
    cy.wrap(rota).as('Rota');
  }

  static adicionarQueryParams(params) {
    cy.get('@Rota').then(rota => {
      switch (params) {
        case "_id":
         cy.wrap(`${rota}?_id=BeeJh5lz3k6kSIzA`).as('Rota')
          break;
        case "nome":
          cy.wrap (`${rota}?nome=Logitech%MX%Vertical`).as('Rota')
           break;
        case "preco":
          cy.wrap (`${rota}?preco=470`)
           break;
        case "descricao":
          cy.wrap (`${rota}?descricao=Mouse`).as('Rota')
           break;
        case "quantidade":
          cy.wrap (`${rota}?quantidade=382`).as('Rota')
            break;
        default:
          cy.wrap(rota).as('Rota')
           break;
      }
    })
  }   

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
     
  static validarSchemaEStatus(schema, status) {
    cy.get('@Body').then(body => {
      cy.validateSchema(body, `${schema}/${status}`)
    })
  }
  
}
  
  

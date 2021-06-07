/// <reference types="cypress" />
import Rest from './_rest.service' 

export class ServeRest extends Rest {
    // armazena rota de acordo com o parametro recebido
    static armazenarRota(rota) {
        cy.wrap(rota).as('Rota');
    }
    // GET Cenario: Listar Carrinho
    // adciona query params a rota recebida pelo cy.wrap()
    static adicionarQueryParams(params) {
        cy.get('@Rota').then(rota => {
            switch (params) {
                case "precoTotal":
                    cy.wrap(`${rota}?precoTotal=6180`).as('Rota')
                    break;
                  case "quantidadeTotal":
                    cy.wrap(`${rota}?quantidadeTotal=3`).as('Rota')
                    break;
                  case "idUsuario":
                    cy.wrap(`${rota}?idUsuario=oUb7aGkMtSEPf6BZ`).as('Rota')
                    break;
                  default:
                    cy.wrap(rota).as('Rota')
                    break;  
            }
        })
    }

    // realiza requisiçao com rota recebida pelo cy.wrap() e tipo recebido pelo parametro
    static realizarRequisicao(tipo) {
        cy.get('@Rota').then(rota => {
            switch (tipo) {
                case "GET":    //parte importante da requisiçao encontrado na pasta _rest.service
                  Rest.get(rota).then(res => {
                      cy.wrap(res.body).as('Body')
                  })
                  break;
                default:
                  break;

            }
        })
    }
    
    // valida schema e status com body da requisiçao recebido pelo cy.wrap() e parametros
    static validarSchemaEStatus(schema, status) {
        cy.get('@Body').then(body => {    
            cy.validateSchema(body, `${schema}/${status}`)
        })
    }

    //GET Cenario: Buscar carrinhos por ID
    // Adiciona complemento recebido pelo parametro na rota recebida pelo cy.wrap()
    static adicionarComplemento(id) {
        cy.get('@Rota').then(rota => {
            switch (id) {
                case "válido":
                  id = "qbMqntef4iTOwWfg"
                  break;
                case "inválido":
                  id = "ID11qntef4iTO11INVALIDO"
                  break;
              };
            cy.wrap(`${rota}/${id}`).as('Rota')
        })
    }
}
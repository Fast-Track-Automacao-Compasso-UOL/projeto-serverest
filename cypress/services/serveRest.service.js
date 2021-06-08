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

  //Adiciona complemento recebido pelo parâmetro na rota recebida pelo cy.wrap()
  static adicionarComplemento(id) {
    cy.get('@Rota').then(rota => {
      switch (id) {
        case "válido":
           id = "BeeJh5lz3k6kSIzA"
           break;
        case "inválido":
           id = "BeeJh5lz3k6kSIzA1"
           break;
                   
  };
   cy.wrap(`${rota}/${id}`).as('Rota')    
    
  })
  }
  // Realiza requisição com rota recebida pelo cy.wrap() e tipo recebido no parâmetro
  static realizarRequisicao(tipo) {
    cy.get('@Rota').then(rota => {
      switch (tipo) {
        case "GET":
          super.get(rota).then(res => {
            cy.wrap(res).as('Response')
            cy.wrap(res.body).as('Body')
            cy.wrap(res.status).as('Status')
          })
          break;
          case "POST":
            cy.get('@Token').then(token => {
                super.post(rota, body, { authorization: token }).then(res => {
                    cy.wrap(res).as('Response')
                    cy.wrap(res.body).as('Body')
                    cy.wrap(res.status).as('Status')
                })
            })
          break;
        case "DELETE":
          super.delete(rota, body).then(res => {
            cy.wrap(res).as('Response')
            cy.wrap(res.body).as('Body')
            cy.wrap(res.status).as('Status')
          })
          break;
        case "PUT":
          super.put(rota, body).then(res => {
            cy.wrap(res).as('Response')
            cy.wrap(res.body).as('Body')
            cy.wrap(res.status).as('Status')
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
  //  static addBody (body) {
  //   switch (body) {
  //     case "válido":
  //      body = {
  //          "nome": "Logitech MX Vertical",
  //          "preco": 470,
  //          "descricao": "Mouse",
  //          "quantidade": 381,
  //          "administrador": "true"
  //      }
  //     break;
  //     case "nome já utilizado":
  //         body = {
  //             "nome": "Logitech MX Vertical",
  //             "preco": 470,
  //             "descricao": "Mouse",
  //             "quantidade": 381,
  //             "administrador": "true"
  //         }
  //        break;
  //     case "vazio":
  //         body = {
  //             "nome": "",
  //             "preco": 470,
  //             "descricao": "Mouse",
  //             "quantidade": 381,
  //             "administrador": "true"
  //         }
  //        break;
  //     case "campos vazios":
  //         body = {
  //             "nome": "",
  //             "preco": "",
  //             "descricao": "",
  //             "quantidade": "",
  //             "administrador": ""
  //         }
  //        break;
  //     case "campos inválidos":
  //         body = {
  //             "nome": "Logitech MX Vertical",
  //             "preco": "qqee0",
  //             "descricao": "Mouse",
  //             "quantidade": "eqeqeq",
  //             "administrador": "true"
  //         }
  //        break;
  //     case "Token inválido":
  //         body = {
  //             "nome": "Logitech MX Vertical",
  //             "preco": 470,
  //             "descricao": "Mouse",
  //             "quantidade": 381,
  //             "administrador": "true"
  //         }
  //        break;
  //     case "válido comum":
  //         body = {
  //             "nome": "Logitech MX Vertical",
  //             "preco": 470,
  //             "descricao": "Mouse",
  //             "quantidade": 381,
  //             "administrador": "true"
  //         }
  //        break;
  // }
  //     cy.wrap(body).as('Body')
  
  
  // static validarAuthorization (auth){
  //   switch (Token) {
  //     case "válida":
  //       token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNjIzMTgyMjY5LCJleHAiOjE2MjMxODI4Njl9.C2LPuX9wKCGGDzjitoHaTuNgQk8sVe6InFGbdooVgKc" // Terminar esse caso
  //       break;
  //     case "inválida":
  //       token = "AUTHJIUzI1NiIsInRINVALIDA"
  //       break;
  //   }
  //   cy.wrap(token).as('Token');    
       
  // }

   static validarMensagem(mensagem) {
    cy.get('@Body').then(body => {
      expect(Object.values(body)).to.contain(mensagem)
    })
  }
}


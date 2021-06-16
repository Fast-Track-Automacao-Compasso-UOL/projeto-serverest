/// <reference types="cypress" />
import Rest from "./_rest.service"
import { criarBodyProduto } from '../factories/dynamic';

const URL_LOGIN = "/login";
const URL_PRODUTOS = "/produtos";
const URL_CARRINHOS = "/carrinhos";

export class ServeRest extends Rest {
  // Armazena rota baseado no parâmetro recebido
  static armazenarRota(rota) {
    cy.wrap(rota).as('Rota');
    cy.wrap('').as('Body')
    cy.wrap('').as('Token')
    cy.wrap('').as('Autenticacao')
  }

  // Adiciona query params à rota recebida pelo cy.wrap()
  static adicionarQueryParams(param, valor) {
    cy.get('@Rota').then(rota => {
      if (param && valor) {
        cy.wrap(`${rota}?${param}=${valor}`).as('Rota')
      } else {
        cy.wrap(rota).as('Rota')
      }
    })
  }

  // Adiciona complemento recebido pelo parâmetro na rota recebida pelo cy.wrap()
  static adicionarComplemento(complemento) {
    cy.get('@Rota').then(rota => {
      cy.wrap(`${rota}/${complemento}`).as('Rota')
    })
  }

  // Realiza requisição com rota recebida pelo cy.wrap() e tipo recebido no parâmetro
  static realizarRequisicao(tipo, body = "") {
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
          cy.get('@Autenticacao').then(token => {
            super.post(rota, body, { authorization: token }).then(res => {
              cy.wrap(res).as('Response')
              cy.wrap(res.body).as('Body')
              cy.wrap(res.status).as('Status')
            })
          })
          break;
        case "DELETE":
          cy.get('@Autenticacao').then(token => {
            super.delete(rota, body, { authorization: token }).then(res => {
              cy.wrap(res).as('Response')
              cy.wrap(res.body).as('Body')
              cy.wrap(res.status).as('Status')
            })
          })
          break;
        case "PUT":
          cy.get('@Autenticacao').then(token => {
            super.put(rota, body, { authorization: token }).then(res => {
              cy.wrap(res).as('Response')
              cy.wrap(res.body).as('Body')
              cy.wrap(res.status).as('Status')
            })
          })
          break;
        default:
          break;
      }
    })
  }

  // Valida mensagem contida no body da requisição
  static validarMensagem(mensagem) {
    cy.get('@Body').then(body => {
      expect(Object.values(body)).to.contain(mensagem)
    })
  }



  // Realiza Login com body recebido pelo cy.wrap()
  static buscarDadosUsuario(tipo = false) {
    let admin;
    if (tipo == 'admin') {
      admin = true;
    } else {
      admin = false;
    }
    super.get(`${URL_USUARIOS}?administrador=${admin}`).then((res) => {
      cy.wrap(res.body.usuarios[0].email).as("Email");
      cy.wrap(res.body.usuarios[0].password).as("Password");
    });
  }  



}

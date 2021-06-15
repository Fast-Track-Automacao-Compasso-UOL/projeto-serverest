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
    cy.log(param, valor)
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

  // Realiza Login com body recebido pelo cy.wrap() por padrão, ou conforme o parâmetro passado
  static realizarLogin(tipo = 'padrao') {
    let body;
    cy.fixture('login/req_body').then(loginBody => {
      switch (tipo) {
        case 'válido':
          body = loginBody.tipos.valido;
          cy.wrap(body).as('LoginBody');
          break;
        case 'e-mail inválido':
          body = loginBody.tipos.emailInvalido;
          cy.wrap(body).as('LoginBody');
          break;
        case 'senha inválida':
          body = loginBody.tipos.senhaInvalida;
          cy.wrap(body).as('LoginBody');
          break;
        case 'vazio':
          body = loginBody.tipos.vazio;
          cy.wrap(body).as('LoginBody');
          break;
        case 'campos vazios':
          body = loginBody.tipos.emBranco;
          cy.wrap(body).as('LoginBody');
          break;
        case 'campos inválidos':
          body = loginBody.tipos.tiposInvalidos;
          cy.wrap(body).as('LoginBody');
          break;
        case 'admin':
          cy.log('INICIO BUSCAR DADOS USUÁRIO')

          this.buscarDadosUsuario(tipo);
          cy.get('@Email').then(email => {
            cy.get('@Password').then(password => {
              body = {
                "email": email,
                "password": password
              };
              cy.wrap(body).as('LoginBody');
            })
          })
          break;
        case 'comum':
          this.buscarDadosUsuario(tipo);
          body = {
            "email": cy.get('@Email'),
            "password": cy.get('@Password')
          };
          cy.wrap(body).as('LoginBody');
          break;
        case 'padrao':
          cy.get('@Usuario').then(usuario => {
            body = {
              "email": usuario.email,
              "password": usuario.password
            };
            cy.wrap(body).as('LoginBody');
          })
          break;
        default:
          cy.log(`Tipo não reconhecido: ${tipo}`);
          break;
      }

      cy.get('@LoginBody').then(body => {
        super.post(URL_LOGIN, body).then(res => {
          cy.wrap(res.body).as('LoginBody');
          cy.wrap(res.body.authorization).as('Token');
        });
      })
    })
  }

  // Cria um produto aleatório com Token recebido pelo cy.wrap()
  // static criarProduto() {
  //   cy.get('@Token').then(authorization => {
  //     super.post(URL_PRODUTOS, criarBodyProduto(), { authorization }).then(res => {
  //       cy.wrap(res.body._id).as('IdProduto')
  //       cy.wrap(JSON.parse(res.requestBody)).as('Produto')
  //     })
  //   })
  // }

}

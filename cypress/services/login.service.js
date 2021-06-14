/// <reference types="cypress" />
import Rest from "./_rest.service"
import { criarBodyUsuario, criarBodyProduto, criarBodyLogin } from '../factories/dynamic';
import { ServeRest } from "./serveRest.service";

//const URL_USUARIOS = "/usuarios";
const URL_LOGIN = "/login";
//const URL_PRODUTOS = "/produtos";
//const URL_CARRINHOS = "/carrinhos";

export class Login extends ServeRest {

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
      
      

}
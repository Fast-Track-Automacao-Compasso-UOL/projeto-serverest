/// <reference types="cypress" />
import Rest from "./_rest.service"
import { criarBodyUsuario, criarBodyProduto, criarBodyLogin } from '../factories/dynamic';
import { ServeRest } from "./serveRest.service";


const URL_LOGIN = "/login";


export class Login extends ServeRest {

    static realizarLogin(tipo = 'padrao') {
        let body;
        cy.fixture('login/req_body').then(loginBody => {

          let {valido,
               emailInvalido,
               senhaInvalida,
               vazio,
               emBranco,
               tiposInvalidos} = loginBody.tipos
          switch (tipo) {
            case 'válido':
              body = criarBodyLogin(valido.email, valido.password)
              break;
            case 'e-mail inválido':
              body = criarBodyLogin(emailInvalido.email, emailInvalido.password)
              break;
            case 'senha inválida':
              body = criarBodyLogin(senhaInvalida.email, senhaInvalida.password)
              break;
            case 'vazio':
              body = vazio;
              cy.wrap(body).as('LoginBody');
              break;
            case 'campos vazios':
              body = criarBodyLogin(emBranco.email, emBranco.password)
              break;
            case 'campos inválidos':
              body = criarBodyLogin(tiposInvalidos.email, tiposInvalidos.password)
              break;
            case 'admin':
              cy.log('INICIO BUSCAR DADOS USUÁRIO')
    
              this.buscarDadosUsuario(tipo);
              cy.get('@Email').then(email => {
                cy.get('@Password').then(password => {
                  body = criarBodyLogin(email, password)
                })
              })
              break;
            case 'comum':
              this.buscarDadosUsuario(tipo);
              cy.get('@Email').then(email => {
                cy.get('@Password').then(password => {
                  body = criarBodyLogin(email, password)
                })
              })
              break;
            case 'padrao':
              cy.get('@Usuario').then(usuario => {
                body = criarBodyLogin(usuario.email, usuario.password)
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
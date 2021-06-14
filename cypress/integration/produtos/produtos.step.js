/// <reference types="cypress" />
import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { ServeRest } from "../../services/serveRest.service";
import { criarBodyProduto } from "../../factories/dynamic";

// Listar Produtos

Given("que utilize query params {string}", (param) => {
  //  ServeRest.criarUsuario()
  //  ServeRest.realizarLogin()    
   ServeRest.criarProduto()
    let valor;
    cy.get('@Produto').then(produto => {
        cy.get('@IdProduto').then(id => {
            switch(param) {
                case "_id":
                    valor = id
                    break;
                case "nome":
                    valor = produto.nome
                    break;
                case "preco":
                    valor = produto.preco
                    break;
                case "descricao":
                    valor = produto.descricao
                    // cy.log(produto.descricao)
                    break;
                case "quantidade":
                    valor = produto.quantidade
                    break;
                default:
                    param = ""
                    valor = ""
                    break;
            }
            ServeRest.adicionarQueryParams(param, valor);
        })
    })
    });

// Buscar produtos por ID

Given('que utilize complemento de rota {string}', (id) => {
    switch (id) {
      case "existente":
        ServeRest.criarUsuario({ admin: 'true' })
        ServeRest.realizarLogin()
        ServeRest.criarProduto() 
        cy.get('@IdProduto').then(id => {
          ServeRest.adicionarComplemento(id)
        })
        break;        
      case "existente com carrinho":
        ServeRest.criarUsuario({ admin: 'true' }) 
        ServeRest.realizarLogin() 
        ServeRest.criarProduto() 
        ServeRest.criarCarrinho()
        cy.get('@IdProduto').then(id => {
          ServeRest.adicionarComplemento(id)
        })
        break;
      case "inexistente":
        id = "00000000000"
        ServeRest.adicionarComplemento(id)
        break;
      default:
        id = ""
        ServeRest.adicionarComplemento(id)
        break;
    }
  

//   switch (id) {
//     case "existente":
//       id = "BeeJh5lz3k6kSIzA";
//       ServeRest.adicionarComplemento(id);
//       break;
//     case "inexistente":
//       id = "BeeJh5lz3k6kSIzA1";
//       ServeRest.adicionarComplemento(id);
//       break;
//     case "existente com carrinho":
//       id = "BeeJh5lz3k6kSIzA1";
//       ServeRest.adicionarComplemento(id);
//       break;
//   }
});

// Cadastrar Produto

Given("que utilize body {string}", (body) => {    
  switch (body) {
    case "válido":
      body = criarBodyProduto();
      ServeRest.adicionarBody(body);
      break;
    case "nome já utilizado":
      ServeRest.criarProduto();
      cy.get('@Produto').then(produto => { 
          body = criarBodyProduto ({ nome: produto.nome })
          ServeRest.adicionarBody(body);
        })    
       break;
    case "campo ausente":
      body = criarBodyProduto({ vazio: true });
      ServeRest.adicionarBody(body);
      break;
    case "campos vazios":
      body = criarBodyProduto({ vazio: true });
      ServeRest.adicionarBody(body);
      break;
    case "campos inválidos":
      body = criarBodyProduto({ nome: 1234 });
      ServeRest.adicionarBody(body);
      break;
    case "inválido":
      body = criarBodyProduto();
      ServeRest.adicionarBody(body);
      break;
    case "válida comum":
      body = criarBodyProduto();
      ServeRest.adicionarBody(body);
      break;
  }
});

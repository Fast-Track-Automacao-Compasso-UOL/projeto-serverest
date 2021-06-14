import faker from 'faker';

export const criarBodyUsuario = (options = { nome: null, email: null, password: null, administrador: null, vazio: false }) => {
  return options.vazio ? {
    "nome": "",
    "email": "",
    "password": "",
    "administrador": ""
  } : {
    "nome": options.nome || faker.name.findName(),
    "email": options.email || faker.internet.email(),
    "password": options.password || faker.internet.password(),
    "administrador": options.administrador || `${faker.datatype.boolean()}`
  }
}

export const criarBodyProduto = (options = { nome: null, preco: null, descricao: null, quantidade: null, vazio: false }) => {
  return options.vazio ? {
    "nome": "",
    "preco": "",
    "descricao": "",
    "quantidade": ""
  } : {
    "nome": options.nome || faker.commerce.productName(),
    "preco": options.preco || parseInt(faker.commerce.price()),
    "descricao": options.descricao || faker.commerce.productDescription(),
    "quantidade": Math.floor(Math.random() * 999) + 1
  }
}

export const criarBodyCarrinho = (options = { produtos: null, vazio: false }) => {
  return options.vazio ? {
    "produtos": [
      {
        "idProduto": "",
        "quantidade": ""
      }
    ]
  } : {
    "produtos": options.produtos
  }
}

export const criarBodyLogin = (email = "", password = "", vazio = false) => {
  return vazio ? {
  } : {
    "email": email,
    "password": password
  }

}
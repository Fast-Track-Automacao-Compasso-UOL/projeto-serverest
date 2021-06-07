# language: pt

Funcionalidade: Produtos
  Contexto: Rota de produtos
    Dada a rota "/produtos"

  Esquema do Cenário: Listar produtos
    Dado que utilize query params "<params>"
    Quando realizar uma requisição do tipo "GET"
    Então deverá ser retornado o schema "get_produtos" e status 200

    Exemplos:
      | params     |
      | nenhum     |
      | _id        |
      | nome       |
      | preco      |
      | descricao  |
      | quantidade |

  Esquema do Cenário: Buscar produto por ID
    Dado que utilize complemento de rota "<id>"
    Quando realizar uma requisição do tipo "GET"
    Então deverá ser retornado o schema "get_produtos_id" e status <status>

    Exemplos:
      | id       | status |
      | válido   | 200    |
      | inválido | 400    |

  Esquema do Cenário: Cadastrar produto
    Dado que possua uma autenticação "<auth>"
    E que utilize body "<body>"
    Quando realizar uma requisição do tipo "POST"
    Então deverá ser retornado o schema "post_produtos" e status <status>
    E deverá ser retornada a mensagem "<mensagem>"

    Exemplos:
      | auth         | body              | status | mensagem                                                                        |
      | válida admin | válido            | 201    | Cadastro realizado com sucesso                                                  |
      | válida admin | nome já utilizado | 400    | Já existe produto com esse nome                                                 |
      | válida admin | vazio             | 400    | é obrigatório                                                                   |
      | válida admin | campos vazios     | 400    | não pode ficar em branco                                                        |
      | válida admin | campos inválidos  | 400    | deve ser uma string                                                             |
      | inválida     | válido            | 401    | Token de acesso ausente, inválido, expirado ou usuário do token não existe mais |
      | válida comum | válido            | 403    | Rota exclusiva para administradores                                             |

  Esquema do Cenário: Excluir produto
    Dado que possua uma autenticação "<auth>"
    E que utilize complemento de rota "<id>"
    Quando realizar uma requisição do tipo "DELETE"
    Então deverá ser retornado o schema "delete_produtos" e status <status>
    E deverá ser retornada a mensagem "<mensagem>"

    Exemplos:
      | auth         | id                     | status | mensagem                                                                        |
      | válida admin | existente sem carrinho | 200    | Registro excluído com sucesso                                                   |
      | válida admin | inexistente            | 200    | Nenhum registro excluído                                                        |
      | válida admin | existente com carrinho | 400    | Não é permitido excluir produto que faz parte de carrinho                       |
      | inválida     | existente sem carrinho | 401    | Token de acesso ausente, inválido, expirado ou usuário do token não existe mais |
      | válida comum | existente sem carrinho | 403    | Rota exclusiva para administradores                                             |

  Esquema do Cenário: Editar produto
    Dado que possua uma autenticação "<auth>"
    Dado que utilize body "<body>"
    E que utilize complemento de rota "<id>"
    Quando realizar uma requisição do tipo "PUT"
    Então deverá ser retornado o schema "put_produtos" e status <status>

    Exemplos:
      | auth         | body              | id          | status | mensagem                                                                        |
      | válida admin | válido            | existente   | 200    | Registro alterado com sucesso                                                   |
      | válida admin | válido            | inexistente | 201    | Cadastro realizado com sucesso                                                  |
      | válida admin | nome já utilizado | existente   | 400    | Já existe produto com esse nome                                                 |
      | válida admin | vazio             | existente   | 400    | é obrigatório                                                                   |
      | válida admin | campos vazios     | existente   | 400    | não pode ficar em branco                                                        |
      | válida admin | campos inválidos  | existente   | 400    | deve ser uma string                                                             |
      | inválida     | válido            | existente   | 401    | Token de acesso ausente, inválido, expirado ou usuário do token não existe mais |
      | válida comum | válido            | existente   | 403    | Rota exclusiva para administradores                                             |
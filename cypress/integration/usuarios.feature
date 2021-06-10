#language: pt

Funcionalidade: Usuários
  Contexto: Rota de usuários
    Dada a rota "/usuarios"

  Esquema do Cenário: Listar usuários
    Dado que utilize query params "<params>"
    Quando realizar uma requisição do tipo "GET"
    Então deverá ser retornado o schema "get_usuarios" e status 200

    Exemplos:
      | params        |
      | nenhum        |
      | _id           |
      | nome          |
      | email         |
      | password      |
      | administrador |

  Esquema do Cenário: Buscar usuário por ID
    Dado que utilize complemento de rota "<id>"
    Quando realizar uma requisição do tipo "GET"
    Então deverá ser retornado o schema "get_usuarios_id" e status <status>

    Exemplos:
      | id          | status |
      | existente   | 200    |
      | inexistente | 400    |

  Esquema do Cenário: Cadastrar usuário
    Dado que utilize body "<body>"
    Quando realizar uma requisição do tipo "POST"
    Então deverá ser retornado o schema "post_usuarios" e status <status>
    E deverá ser retornada a mensagem "<mensagem>"

    Exemplos:
      | body                | status | mensagem                       |
      | válido              | 201    | Cadastro realizado com sucesso |
      | e-mail já utilizado | 400    | Este email já está sendo usado |
      | vazio               | 400    | nome é obrigatório             |
      | e-mail inválido     | 400    | email deve ser um email válido |
      | campos vazios       | 400    | nome não pode ficar em branco  |
      | campos inválidos    | 400    | nome deve ser uma string       |

  # Falta validar campos obrigatórios um por um
  # Falta validar Mensagem do campo de Administrador
  # Falta validar campo extra no body da requisição

  Esquema do Cenário: Excluir usuário
    Dado que utilize complemento de rota "<id>"
    Quando realizar uma requisição do tipo "DELETE"
    Então deverá ser retornado o schema "delete_usuarios" e status <status>
    E deverá ser retornada a mensagem "<mensagem>"

    Exemplos:
      | id                     | status | mensagem                                                |
      | existente              | 200    | Registro excluído com sucesso                           |
      | inexistente            | 200    | Nenhum registro excluído                                |
      | existente com carrinho | 400    | Não é permitido excluir usuário com carrinho cadastrado |

  Esquema do Cenário: Editar usuário
    Dado que utilize body "<body>"
    E que utilize complemento de rota "<id>"
    Quando realizar uma requisição do tipo "PUT"
    Então deverá ser retornado o schema "put_usuarios" e status <status>
    E deverá ser retornada a mensagem "<mensagem>"

    Exemplos:
      | body                | id          | status | mensagem                       |
      | válido              | existente   | 200    | Registro alterado com sucesso  |
      | válido              | inexistente | 201    | Cadastro realizado com sucesso |
      | e-mail já utilizado | existente   | 400    | Este email já está sendo usado |
      | vazio               | existente   | 400    | nome é obrigatório             |
      | e-mail inválido     | existente   | 400    | email deve ser um email válido |
      | campos vazios       | existente   | 400    | nome não pode ficar em branco  |
      | campos inválidos    | existente   | 400    | nome deve ser uma string       |
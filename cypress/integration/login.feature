#language: pt

Funcionalidade: Login

  @Post @Login
  Esquema do Cenário: Realizar Login
    Dado que utilize body "<body>"
    Quando realizar login
    Então deverá ser retornado o schema "post_login" e status <status>
    E deverá ser retornado o atributo "<atributo>" com a mensagem "<mensagem>"

    Exemplos:
      | body             | status | atributo | mensagem                       |
      | válido           | 200    | message  | Login realizado com sucesso    |
      | e-mail inválido  | 400    | email    | email deve ser um email válido |
#      | senha inválida   | 401    | Email e/ou senha inválidos     |
#      | vazio            | 400    | é obrigatório                  |
#      | campos vazios    | 400    | não pode ficar em branco       |
#      | campos inválidos | 400    | deve ser uma string            |
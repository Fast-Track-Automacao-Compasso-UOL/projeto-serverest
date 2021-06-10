#language: pt

Funcionalidade: Login

  @Post
  Esquema do Cenário: Realizar Login
    Dado que utilize body "<body>"
    Quando realizar login
    Então deverá ser retornado o schema "post_login" e status <status>
    E deverá ser retornada a mensagem "<mensagem>"

    Exemplos:
      | body             | status | mensagem                       |
      | válido           | 200    | Login realizado com sucesso    |
      | e-mail inválido  | 400    | email deve ser um email válido |
      | senha inválida   | 401    | Email e/ou senha inválidos     |
      | vazio            | 400    | email é obrigatório            |
      | campos vazios    | 400    | email não pode ficar em branco |
      | campos inválidos | 400    | email deve ser uma string      |
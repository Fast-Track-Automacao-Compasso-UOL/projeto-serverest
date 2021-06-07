#language: pt

Funcionalidade: Login

  Contexto: Rota de login
    Dada a rota "/login"

  Esquema do Cenário: Realizar Login
    Dado que utilize body "<body>"
    Quando realizar uma requisição do tipo "POST"
    Então deverá ser retornado o schema "post_login" e status <status>
    E deverá ser retornada a mensagem "<mensagem>"

    Exemplos:
      | body             | status | mensagem                       |
      | válido           | 200    | Login realizado com sucesso    |
      | e-mail inválido  | 400    | email deve ser um email válido |
      | senha inválida   | 401    | Email e/ou senha inválidos     |
      | vazio            | 400    | é obrigatório                  |
      | campos vazios    | 400    | não pode ficar em branco       |
      | campos inválidos | 400    | deve ser uma string            |
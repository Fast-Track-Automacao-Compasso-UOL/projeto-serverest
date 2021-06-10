#language: pt

Funcionalidade: Carrinhos
        Contexto: Rota de carrinhos
            Dada a rota "/carrinhos"

        Esquema do Cenário: Listar carrinhos
            Dado que utilize query params "<params>"
             Quando realizar uma requisição do tipo "GET"
             Então deverá ser retornado o schema "get_carrinhos" e status 200

        Exemplos:
                  | params          |
                  | nenhum          |
                  | precoTotal      |
                  | quantidadeTotal |
                  | idUsuario       |

        Esquema do Cenário: Buscar carrinho por ID
            Dado que utilize complemento de rota "<id>"
             Quando realizar uma requisição do tipo "GET"
             Então deverá ser retornado o schema "get_carrinhos_id" e status <status>

        Exemplos:
                  | id       | status |
                  | válido   | 200    |
                  | inválido | 400    |

        Esquema do Cenário: Cadastrar carrinho
            Dado que possua uma autenticação "<auth>"
              E que utilize body "<body>"
             Quando realizar uma requisição do tipo "POST"
             Então deverá ser retornado o schema "post_carrinhos" e status <status>
              E deverá ser retornada a mensagem "<mensagem>"

        Exemplos:
                  | auth     | body                   | status | mensagem                                                                        |
                  | válida   | válido                 | 201    | Cadastro realizado com sucesso                                                  |
                  | válida   | carrinho já cadastrado | 400    | Não é permitido ter mais de 1 carrinho                                          |
                  | válida   | vazio                  | 400    | produtos é obrigatório                                                          |
                  | válida   | campos vazios          | 400    | produtos deve ser um array                                                      |
                  | inválida | válido                 | 401    | Token de acesso ausente, inválido, expirado ou usuário do token não existe mais |

        Esquema do Cenário: Excluir carrinho
            Dado que possua uma autenticação "<auth>"
              E "<condicao>" carrinho
              E que utilize complemento de rota "concluir-compra"
             Quando realizar uma requisição do tipo "DELETE"
             Então deverá ser retornado o schema "delete_carrinhos_concluir" e status <status>
              E deverá ser retornada a mensagem "<mensagem>"

        Exemplos:
                  | auth     | condicao   | status | mensagem                                                                        |
                  | válida   | possua     | 200    | Registro excluído com sucesso                                                   |
                  | válida   | não possua | 200    | Não foi encontrado carrinho para esse usuário                                   |
                  | inválida | não possua | 401    | Token de acesso ausente, inválido, expirado ou usuário do token não existe mais |

        Esquema do Cenário: Excluir carrinho e retornar produtos para estoque
            Dado que possua uma autenticação "<auth>"
              E "<condicao>" carrinho
              E que utilize complemento de rota "cancelar-compra"
             Quando realizar uma requisição do tipo "DELETE"
             Então deverá ser retornado o schema "delete_carrinhos_cancelar" e status <status>
              E deverá ser retornada a mensagem "<mensagem>"

        Exemplos:
                  | auth     | condicao   | status | mensagem                                                                        |
                  | válida   | possua     | 200    | Registro excluído com sucesso. Estoque dos produtos reabastecido                |
                  | válida   | não possua | 200    | Não foi encontrado carrinho para esse usuário                                   |
                  | inválida | não possua | 401    | Token de acesso ausente, inválido, expirado ou usuário do token não existe mais |
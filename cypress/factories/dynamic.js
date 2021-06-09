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
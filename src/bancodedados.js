module.exports = {
    banco: {
        nome: 'Cubos Bank',
        numero: '123',
        agencia: '0001',
        senha: 'rs'
    },
    contas: [
        {
            numero: 1,
            saldo: 500,
            usuario: {
                nome: "Foo Bar 2",
                cpf: "00011122231",
                data_nascimento: "2021-03-15",
                telefone: "71999998888",
                email: "foo@bar6.com",
                senha: "12345"
            }
        },
        {
            numero: 2,
            saldo: 0,
            usuario: {
                nome: "Foo Bar 2",
                cpf: "00011122234",
                data_nascimento: "2021-03-15",
                telefone: "71999998888",
                email: "foo@bar8.com",
                senha: "12345"
            }
        },
        {
            numero: 3,
            saldo: 500,
            usuario: {
                nome: "Foo Bar 2",
                cpf: "00011122233",
                data_nascimento: "2021-03-15",
                telefone: "71999998888",
                email: "foo@bar0.com",
                senha: "12345"
            }
        }
    ],
    id: 0,
    saques: [],
    depositos: [],
    transferencias: []
}


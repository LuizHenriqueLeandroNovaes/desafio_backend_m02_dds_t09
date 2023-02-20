let { contas, id, depositos } = require('../bancodedados');
const Bancodedados = require('../bancodedados');

function encontrando(encontrar){
    if (!encontrar) {
        return res.status(400).json('Conta não encontrada.');
    }
}

const cadastrar = (req, res) => {

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json("Todos os campos tem que ser preenchidos!");
    }

    const cpfencontrado = contas.find(personagem => {
        return personagem.usuario.cpf === cpf;
    })

    const emailencontrado = contas.find(personagem => {
        return personagem.usuario.email === email;
    })

    if (emailencontrado || cpfencontrado) {
        return res.status(400).json(`Já existe uma conta com o cpf ou e-mail informado!`);
    }

    const personagem = {

        numero: ++id,
        saldo: 0,
        usuario: {

            nome,
            cpf,
            data_nascimento,
            telefone,
            email
        }

    }

    contas.push(personagem);

    return res.status(201).json(contas);

}

const listar = (req, res) => {
    return res.status(200).json(contas);
}

const atualizar = (req, res) => {

    const { numeroConta } = req.params;

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json("Todos os campos tem que ser preenchidos!");
    }

    const encontrar = contas.find((personagem) => {
        return personagem.numero === Number(numeroConta);
    });

    encontrando(encontrar);

    const encontrarcpf = contas.find((personagem) => {
        return personagem.usuario.cpf === cpf;
    });

    const encontrarEmail = contas.find((personagem) => {
        return personagem.usuario.email === email;
    });


    if (encontrarcpf || encontrarEmail) {

        if (encontrarcpf && encontrarEmail) {
            return res.status(400).json('O CPF ,e o Email informados já existem !');
        }

        if (encontrarcpf)
            return res.status(400).json('O CPF informado já existe cadastrado!');
        if (encontrarEmail)
            return res.status(400).json('O Email informado já existe cadastrado!');

    }

    encontrar.usuario.nome = nome;
    encontrar.usuario.cpf = cpf;
    encontrar.usuario.data_nascimento = data_nascimento;
    encontrar.usuario.telefone = telefone;
    encontrar.usuario.email = email;
    encontrar.usuario.senha = senha;

    return res.status(204).json();
}

const deletar = (req, res) => {

    const { numero } = req.params;

    const encontrar = contas.find((personagem) => {
        return personagem.numero === Number(numero);
    });

    encontrando(encontrar);

    if (encontrar.saldo > 0) {
        return res.status(400).json('Conta não pode ser apagada se o saldo for positivo !');
    }

    contas = contas.filter((conta) => {
        return conta.numero !== Number(numero);
    });

    return res.status(204).json('Conta apagada !');

}

const depositar = (req, res) => {

    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json();
    }

    const numero_conta_encontrado = Bancodedados.contas.find((number) => {
        return number.numero === Number(numero_conta);
    })

    if (valor <= 0) {
        return res.status(400).json(`O número da conta e o valor são obrigatórios`);
    }

    numero_conta_encontrado.saldo += valor;

    let objeto = {
        data: new Date(),
        numero_conta: numero_conta,
        valor: valor
    }

    depositos.push(objeto);

    return res.json();
}

const sacar = (req, res) => {

    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json("Todos os campos são obrigatórios!");
    }

    const numero_conta_encontrado = Bancodedados.contas.find((number) => {
        return number.numero === Number(numero_conta);
    })

    if (!numero_conta_encontrado) {
        return res.status(400).json("O numero da conta não existe!");
    }

    console.log(numero_conta_encontrado);

    if (Number(numero_conta_encontrado.usuario.senha) !== Number(senha)) {
        return res.status(400).json("A senha não existe!");
    }

    if (valor < 0 || numero_conta_encontrado.saldo < valor) {

        return res.status(400).json(`O valor não pode ser menor ou igual a zero!
         E o dinheiro disponivel tem que ser maior que o valor`);

    }

    numero_conta_encontrado.saldo -= valor;

    let objeto = {
        data: new Date(),
        numero_conta: numero_conta,
        valor: valor
    }

    Bancodedados.saques.push(objeto);

    return res.json();

}

const transferir = (req, res) => {

    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json();
    }

    Bancodedados.contas.find((conta) => {

        if (conta.numero === numero_conta_origem) {
            if (conta.usuario.senha !== senha) {
                res.status(400).json({
                    mensagem: "Senha inválida"
                });
            }

        }

    })
    
    let conta_destino = [];

    let conta_origem = [];

    Bancodedados.contas.find((conta) => {
        if (conta.numero === Number(numero_conta_origem)) {
            conta_origem = conta;
        }

        if (conta.numero === Number(numero_conta_destino)) {
            conta_destino = conta;
        }
    })

    if (conta_origem.saldo < valor) {
        return res.status(400).json(`Saldo insuficiente!`);
    }

    conta_origem.saldo -= valor;
    conta_destino.saldo += valor;

    Bancodedados.transferencias.push({
        data: new Date(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    })

    return res.json();
}

const saldo = (req, res) => {

    const { numero_conta, senha } = req.query;

    const validarConta = Bancodedados.contas.find((conta) => {
        
        if (conta.numero === Number(numero_conta)) {
            return conta;
        }
        return false;
    })

    console.log(validarConta);

    if(validarConta.usuario.senha !== senha){
        return res.status(400).json('Senha não encontrada !');
    }

    if (!validarConta) {
        return res.status(400).json('Conta bancária não encontrada!');
    }

    return res.status(200).json({ Saldo : `${validarConta.saldo}` });

}

const extrato = (req, res) => {

    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json('Conta ou senha não informado!');
    }

    const numero_conta_encontrado = Bancodedados.contas.find((number) => {
        return number.numero === Number(numero_conta);
    })

    if (!numero_conta_encontrado) {
        return res.status(400).json("Conta bancária não encontrada!");
    }

    if (senha === numero_conta_encontrado.usuario.senha) {

        const procurar_deposito = depositos.filter((deposito) => {
            return deposito.numero_conta === numero_conta;
        })

        const sacagem = Bancodedados.saques.filter((sac) => {
            return sac.numero_conta === numero_conta;
        })

        const tranfer_origem = Bancodedados.transferencias.filter((transf) => {
            return transf.numero_conta_origem === numero_conta;
        })

        const tranfer_destino = Bancodedados.transferencias.filter((transf) => {
            return transf.numero_conta_destino === numero_conta;
        })

        let objeto = {
            depositos: procurar_deposito,
            saques: sacagem,
            transferenciasEnviadas: tranfer_origem,
            transferenciasRecebidas: tranfer_destino
        }

        Bancodedados.transferencias.push(objeto);

        return res.status(200).json(Bancodedados.transferencias);

    }

}

module.exports = {
    cadastrar,
    listar,
    deletar,
    atualizar,
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}
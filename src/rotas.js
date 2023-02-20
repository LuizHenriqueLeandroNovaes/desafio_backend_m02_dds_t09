const express = require('express');
const { cadastrar, listar, deletar, atualizar, depositar, sacar,
     transferir, saldo, extrato } = require('./controladores/contas');

const validarsenha = require('./middleware/ValidadorDeSenha');

const roteador = express();

roteador.post('/contas', cadastrar);
roteador.get('/contas', validarsenha , listar); 
roteador.delete('/contas/:numero', deletar);
roteador.put('/contas/:numeroConta/usuario', atualizar);
roteador.post('/transacoes/depositar', depositar);
roteador.post('/transacoes/sacar', sacar);
roteador.post('/transacoes/tranferir', transferir);
roteador.get('/contas/saldo', saldo);
roteador.get('/contas/extrato', extrato);

module.exports = roteador;
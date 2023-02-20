/*Seu papel é construir uma RESTful API que permita:

-   Criar conta bancária
-   Listar contas bancárias
-   Atualizar os dados do usuário da conta bancária
-   Excluir uma conta bancária
-   Depósitar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emiti
*/ 

const express = require('express');

const rotas = require('./rotas');

const app = express();
app.use(express.json());
app.use(rotas);

app.listen(3000, ()=>{
    console.log("on line");
});




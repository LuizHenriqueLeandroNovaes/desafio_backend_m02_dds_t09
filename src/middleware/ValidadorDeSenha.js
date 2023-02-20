const validarsenha = (req, res, next) =>{

    const { senha_banco } = req.query;

    if(senha_banco !== "Cubos123Bank" || !senha_banco){
        return res.status(401).json("Senha invaida, ou inexistente");
    }

    next();
}

module.exports = validarsenha;
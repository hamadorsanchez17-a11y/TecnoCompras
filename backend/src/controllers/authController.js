const authService = require("../services/authService");

exports.register = async (req, res) => {
    
    try {

        const resultado = await authService.register(req.body);

        res.status(201).json(resultado);

    } catch (error) {

        res.status(400).json({
            mensaje: error.message
        });

    }
};

exports.login = async (req, res) => {
    try {

        const { correo, password } = req.body;

        const resultado = await authService.login(correo, password);

        res.status(200).json(resultado);

    } catch (error) {

        res.status(400).json({
            mensaje: error.message
        });

    }
};
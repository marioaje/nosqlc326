const express = require("express");
const router = express.Router();
const Usuario = require('../models/Usuario');

//Get 
router.get('/', async (req, res) => {

    try {

        const usuariosDatos = await Usuario.find();
        res.json(usuariosDatos);
        // if (!usuario){
        //     return.status(500).json({mensaje: })
        //     //return res.status(404).json({mensaje: "Usuario no encontrado"})
        // }

    } catch (error) {
        res.status(500).json({ mensaje: error.message })
    }


});

module.exports = router;

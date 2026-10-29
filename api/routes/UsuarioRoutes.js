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
        res.status(400).json({ mensaje: error.message })
    }


});


//Get por ID
router.get('/:id', async (req, res) => {

    try {

        const usuariosDatos = await Usuario.findById(req.params.id);

        if (!Usuario) {

            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json(usuariosDatos);

    } catch (error) {
        res.status(400).json({ mensaje: error.message })
    }


});



//Post 
router.post('/', async (req, res) => {

    try {

        const usuariosDatos = new Usuario(req.body);
        const usuarioGuardado = await usuariosDatos.save();

        return res.status(201).json({ mensaje: "Usuario creado correctamente", data: usuarioGuardado });

    } catch (error) {
        res.status(400).json({ mensaje: error.message })
    }


});




//Put por ID
router.put('/:id', async (req, res) => {

    try {

        const usuariosDatos = await Usuario.findByIdAndUpdate(req.params.id, req.body);

        if (!usuariosDatos) {

            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        return res.status(202).json({ mensaje: "Usuario actualizado correctamente", data: req.body });

    } catch (error) {
        res.status(400).json({ mensaje: error.message })
    }


});



//delete por ID
router.delete('/:id', async (req, res) => {

    try {

        const usuariosDatos = await Usuario.findByIdAndDelete(req.params.id);

        if (!usuariosDatos) {

            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        return res.status(202).json({ mensaje: "Usuario eliminado correctamente", data: req.params.id });

    } catch (error) {
        res.status(400).json({ mensaje: error.message })
    }


});



module.exports = router;

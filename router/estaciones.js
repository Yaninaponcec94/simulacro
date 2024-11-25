const express = require("express");
const router = express.Router();
const Estacion = require("../models/estacion.entity");
const upload = require("../storage/storage");


router.get("/", async (req, res, next) => {
    const estaciones = await Estacion.findAll({
        where:{
            activo:true,
        },
    });
    res.render("estaciones", {
        estaciones,
        //nombre: "Yanin",  
        //apellido: "Ponce"  
    });
});
 
router.post("/", upload.single("imagen"), async (req, res, next) => {
    try {
        const { nombre, precioEntrada } = req.body;

        if (!isNaN(Number(precioEntrada)) && typeof nombre === "string") {
            await Estacion.create({
                ...req.body,
                imagen: req.file ? req.file.filename : null 
            });

            res.render("mensaje", { mensaje: "todo un exito" });
        } else {
            res.render("mensaje", { mensaje: "error en los datos" });
        }
    } catch (err) {
        res.render("mensaje", { mensaje: err.message });
    }
});

router.put("/:id", upload.single("imagen"), async (req, res, next) => {
    try {
        const updateData = req.file 
            ? { ...req.body, imagen: req.file.filename } 
            : req.body;

        await Estacion.update(updateData, {
            where: { id: req.params.id },
        });
        res.render("mensaje", { mensaje: "todo salio bien " });
        
    } catch (err) {
        res.render("mensaje", { mensaje: "algo salio mal en put: " + err.message });
    }
});


router.delete("/:id", async (req, res, next) =>{
    try{
        await Estacion.update(
            {activo: false},
            {where: {id:req.params.id}},
        );
        res.render("mensaje", {mensaje: "todo un exito"});
    }catch(err){
        res.render("mensaje", {mensaje: err.message });
    }
});

module.exports = router;

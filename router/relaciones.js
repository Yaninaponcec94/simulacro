const express = require("express");
const router = express.Router();
const Relacion = require("../models/relacion.entity");
const Tren = require("../models/tren.entity");
const Estacion = require("../models/estacion.entity");


const upload = require("../storage/storage");

router.post("/",upload.none(), async (req, res) => {
    try{
        const { idTren, idEstacion } =req.body;
        await Relacion.create({ TrenId: idTren, EstacionId: idEstacion});
        res.render('mensaje', {
            mensaje: "toodo un exito",   
            //nombre: "Yanina",             
            //apellido: "Ponce"
          });
    }catch(e){
        res.render("mensaje", { mensaje: e.message});
    }
});

router.get("/trenes/:id", async (req, res) => {
    const tren = await Tren.findOne({ where: {id: req.params.id}});
    const estaciones = await tren.getEstacions();

    res.render("relaciones-trenes", { 
        tren, 
        estaciones,
        //nombre: "Yanina",  
        //apellido: "Ponce"  
    });
});

router.get("/estaciones/:id", async (req, res) => {
    try {
        // Obtiene la estación por su ID
        const estacion = await Estacion.findOne({ where: { id: req.params.id } });

        // Si la estación no existe, devolver un 404
        if (!estacion) {
            return res.status(404).send("Estación no encontrada");
        }

        // Obtiene los trenes relacionados con esa estación
        const trenes = await estacion.getTrens();

        // Renderiza la vista pasando el objeto 'estacion' y los 'trenes'
        res.render("relaciones-estaciones", { 
            estacion, 
            trenes,
            //nombre: "Yanina",  
            //apellido: "Ponce"  
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener la estación o los trenes");
    }
});

module.exports = router;

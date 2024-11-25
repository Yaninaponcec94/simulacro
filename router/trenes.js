const express = require("express");
const router = express.Router();
const Tren = require("../models/tren.entity");
const upload = require("../storage/storage");


router.get("/", async (req, res, next) => {
    try {
        const trenes = await Tren.findAll({
            where: { activo: true },
        });
        console.log(trenes); 
        res.render("trenes", { 
            trenes,
            //nombre: "Yanin",  
            //apellido: "Ponce"  
        });
    } catch (err) {
        console.error(err); 
        res.status(500).send("Error al obtener los trenes");
    }
});


router.post("/", upload.none(), async (req, res, next) => {
    const { nombre, capacidad } = req.body;
    if (Number.isInteger(Number(capacidad)) && typeof nombre === "string") {
        try {
            await Tren.create(req.body);
            res.render("mensaje", { mensaje: "todo un éxito" });
        } catch (err) {
            res.render("mensaje", { mensaje: err.message });
        }
    } else {
        res.render("mensaje", { mensaje: "error en los datos" });
    }
});

router.put("/:id", upload.none(), async (req, res, next) => {
    try{
        await Tren.update(req.body, {
            where: { id: req.params.id},
        });
        res.render("mensaje", {mensaje: "actualizo nombre y capacidad"});
        
    }catch{
        res.render("mensaje", {mensaje: "algo salio mal en put"});
    }
});

router.delete("/:id", async (req, res, next) =>{
    try{
        await Tren.update(
            {activo: false},
            {where: {id:req.params.id}},
        );
        res.render("mensaje", {mensaje: "paso de activo a no activo"});
    }catch(err){
        res.render("mensaje", {mensaje: err.message });
    }
});

module.exports = router;



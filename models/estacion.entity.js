const sequelize = require("../db/sequelize");
const {DataTypes} = require("sequelize");

const Estacion = sequelize.define(
    "Estacion",
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre:{
            type: DataTypes.STRING,        
            allowNull: false,
        },
        precioEntrada:{
            type: DataTypes.FLOAT,        
            allowNull: false,
        },
        imagen:{
            type: DataTypes.STRING,        
            allowNull: false,
        },
        //baja logica = true
        activo:{
            defaultValue:true,
            type: DataTypes.BOOLEAN,        
            allowNull: false,
        },
    },
    {
        timestamps: true,
        createdAt: "creado_en",
        updatedAt: "modificado_en",
    }
);

module.exports=Estacion;
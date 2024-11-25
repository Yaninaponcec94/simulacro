const sequelize = require("../db/sequelize");
const {DataTypes} = require("sequelize");

const Tren = sequelize.define(
    "Tren",
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
        capacidad:{
            type: DataTypes.INTEGER,        
            allowNull: false,
        },
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

module.exports=Tren;
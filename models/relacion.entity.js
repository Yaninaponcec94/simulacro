const sequelize = require("../db/sequelize");
const { DataTypes } = require ("sequelize");

const Relacion = sequelize.define("Relacion", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});

module.exports= Relacion;
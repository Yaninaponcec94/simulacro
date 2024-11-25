require('dotenv').config();  // Asegúrate de tener esto al principio de tu archivo

const { Sequelize } = require('sequelize');

const sequelizeInstance = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

sequelizeInstance.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

  // Sincronización de modelos
sequelizeInstance.sync({ force: false })  // 'force: false' evita eliminar tablas existentes
.then(() => {
  console.log('Las tablas se han sincronizado correctamente.');
})
.catch(error => {
  console.error('Error al sincronizar las tablas:', error);
});

module.exports = sequelizeInstance;


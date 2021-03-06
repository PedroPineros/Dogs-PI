const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    peso: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    anos_de_vida: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    raza:{
      type: DataTypes.STRING,
      allowNull: true
    },
  });
};

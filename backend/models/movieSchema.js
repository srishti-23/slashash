const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import your Sequelize instance

const Movie = sequelize.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    release_date: {
        type: DataTypes.DATE,
    },
    Type: {
        type: DataTypes.STRING,
    },
    director: {
        type: DataTypes.STRING,
    },
    duration: {
        type: DataTypes.INTEGER,
    },
    rating: {
        type: DataTypes.FLOAT,
    },
    poster_url: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true, // Enables createdAt and updatedAt
});

module.exports = Movie;

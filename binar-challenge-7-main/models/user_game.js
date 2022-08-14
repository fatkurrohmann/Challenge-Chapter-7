"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class user_game extends Model {
        static associate(models) {
            user_game.hasOne(models.user_game_biodata, {
                foreignKey: "id_user",
                sourceKey: "id",
            }); 
            user_game.hasMany(models.user_game_history, {
                foreignKey: "id_user",
                sourceKey: "id",
            }); 
        }
    }
    user_game.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "user_game",
        }
    );
    return user_game;
};

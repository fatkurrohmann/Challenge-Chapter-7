"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class user_game_biodata extends Model {
        static associate(models) {
            user_game_biodata.belongsTo(models.user_game, {
                foreignKey: "id_user",
                sourceKey: "id",
            }); 
        }
    }
    user_game_biodata.init(
        {
            id_user: DataTypes.INTEGER,
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "user_game_biodata",
        }
    );
    return user_game_biodata;
};

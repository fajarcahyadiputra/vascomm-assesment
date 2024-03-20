'use strict';
module.exports = (db, DataTypes) => {
    return db.define("users", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        name: DataTypes.STRING,
        is_active: DataTypes.INTEGER(1),
        role: DataTypes.ENUM("user","admin"),
        phone_no: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        freezeTableName: true,
        timestamps: false,
    });
}
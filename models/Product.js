
'use strict';

module.exports = (db, DataTypes) => {
    return db.define("products", {
        id: {
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            type: DataTypes.UUID,
          },
          name: DataTypes.STRING,
          image: DataTypes.STRING,
          slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          is_active: DataTypes.INTEGER(1),
          price: DataTypes.INTEGER,
          created_at: {
            type: DataTypes.STRING,
          },
          updated_at: {
            type: DataTypes.STRING,
          }
    }, {
        freezeTableName: true,
        timestamps: false,
    });
}
"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Spots",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        ownerId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        address: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        state: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        country: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        lat: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        lng: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(150),
          allowNull: false,
          unique: true,
        },
        description: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        numReviews: {
          type: Sequelize.INTEGER,
        },
        avgRating: {
          type: Sequelize.FLOAT,
        },
        previewImage: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await queryInterface.dropTable(options);
  },
};

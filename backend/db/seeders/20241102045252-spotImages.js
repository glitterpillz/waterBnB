"use strict";

/** @type {import('sequelize-cli').Migration} */
const { SpotImage } = require("../models");
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1, // Assuming this corresponds to an existing spot
          url: "https://example.com/images/spot1.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://example.com/images/spot2.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://example.com/images/spot3.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://example.com/images/spot4.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://example.com/images/spot5.jpg",
          preview: true,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SpotImages", {});
  },
};
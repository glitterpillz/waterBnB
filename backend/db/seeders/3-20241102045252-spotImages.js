"use strict";

/** @type {import('sequelize-cli').Migration} */
const { SpotImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://i.ibb.co/xHT5MJT/standard-house.png",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.ibb.co/tqv4Q2T/standard-layout.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.ibb.co/y84zfmg/standard-zoom.png",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.ibb.co/jkDfGvp/standard-zoom2.png",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.ibb.co/GHt6kg2/standard-zoom3.png",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.ibb.co/DkPrtJ5/forest-house.png",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.ibb.co/nwBj03y/forest-layout.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.ibb.co/sWqpZ6z/forest-zoom.png",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.ibb.co/8NB3HCk/forest-zoom2.png",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.ibb.co/NYzmQ7c/forest-zoom3.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ibb.co/XSy7w92/river-house.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ibb.co/SdSwGws/river-layout.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ibb.co/BzrmYkC/river-zoom.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ibb.co/Wk6BHz5/river-zoom2.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ibb.co/yQtswjV/river-zoom3.png",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ibb.co/HrTkDct/hilltop-farm.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ibb.co/c3yMnnX/hilltop-layout.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ibb.co/FsKzgh1/hilltop-zoom.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ibb.co/0sLkpMp/hilltop-zoom1.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ibb.co/59Rn0YB/hilltop-zoom2.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ibb.co/mF09LxD/beach-farm.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ibb.co/bsXGnDc/beach-interior.png",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ibb.co/dj6FxMF/beach-zoom.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ibb.co/r7dPwDg/beach-zoom1.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ibb.co/8Dh7jnG/beach-zoom2.jpg",
          preview: true,
        },
        // {
        //   spotId: 6,
        //   url: "https://ibb.co/Ssc6wt5",
        //   preview: true,
        // },
        // {
        //   spotId: 6,
        //   url: "https://ibb.co/9VQHT1d",
        //   preview: true,
        // },
        // {
        //   spotId: 6,
        //   url: "https://ibb.co/jJf1NmM",
        //   preview: true,
        // },
        // {
        //   spotId: 6,
        //   url: "https://ibb.co/XD1Y5Hm",
        //   preview: true,
        // },
        // {
        //   spotId: 5,
        //   url: "https://i.ibb.co/8Dh7jnG/beach-zoom2.jpg",
        //   preview: true,
        // },
      ],
      
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await queryInterface.bulkDelete(options, {});
  },
};

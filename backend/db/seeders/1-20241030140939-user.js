"use strict";

/** @type {import('sequelize-cli').Migration} */
const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          firstName: "Abigail",  // 1
          lastName: "Carpenter",
          email: "abigail@example.com",
          username: "abigail_carpenter",
          hashedPassword: bcrypt.hashSync("amethystlover"),
        },
        {
          firstName: "Sebastian",  // 2
          lastName: "Rider",
          email: "sebastian@example.com",
          username: "sebastian_rider",
          hashedPassword: bcrypt.hashSync("froglife"),
        },
        {
          firstName: "Penny",  // 3
          lastName: "Teacher",
          email: "penny@example.com",
          username: "penny_teacher",
          hashedPassword: bcrypt.hashSync("booklover"),
        },
        {
          firstName: "Haley",  // 4
          lastName: "Photographer",
          email: "haley@example.com",
          username: "haley_photographer",
          hashedPassword: bcrypt.hashSync("fashionqueen"),
        },
        {
          firstName: "Sam",  // 5
          lastName: "Musician",
          email: "sam@example.com",
          username: "sam_musician",
          hashedPassword: bcrypt.hashSync("skaterboy"),
        },
        {
          firstName: "Leah",  // 6
          lastName: "Sculptor",
          email: "leah@example.com",
          username: "leah_sculptor",
          hashedPassword: bcrypt.hashSync("forestartist"),
        },
        {
          firstName: "Harvey",  // 7
          lastName: "Doctor",
          email: "harvey@example.com",
          username: "harvey_doctor",
          hashedPassword: bcrypt.hashSync("healthyhearts"),
        },
        {
          firstName: "Elliott",  // 8
          lastName: "Writer",
          email: "elliott@example.com",
          username: "elliott_writer",
          hashedPassword: bcrypt.hashSync("beachpoet"),
        },
        {
          firstName: "Maru",  // 9
          lastName: "Engineer",
          email: "maru@example.com",
          username: "maru_engineer",
          hashedPassword: bcrypt.hashSync("stardust"),
        },
        {
          firstName: "Alex",  // 10
          lastName: "Athlete",
          email: "alex@example.com",
          username: "alex_athlete",
          hashedPassword: bcrypt.hashSync("gridballstar"),
        },
        {
          firstName: "Emily",  // 11
          lastName: "Tailor",
          email: "emily@example.com",
          username: "emily_tailor",
          hashedPassword: bcrypt.hashSync("crystaldreams"),
        },
        {
          firstName: "Shane",  // 12
          lastName: "Farmer",
          email: "shane@example.com",
          username: "shane_farmer",
          hashedPassword: bcrypt.hashSync("bluechickens"),
        },
        {
          firstName: "Caroline",  // 13
          lastName: "Gardener",
          email: "caroline@example.com",
          username: "caroline_gardener",
          hashedPassword: bcrypt.hashSync("greenhousequeen"),
        },
        {
          firstName: "Pierre",  // 14
          lastName: "Merchant",
          email: "pierre@example.com",
          username: "pierre_merchant",
          hashedPassword: bcrypt.hashSync("shopkeeper"),
        },
        {
          firstName: "Clint",  // 15
          lastName: "Blacksmith",
          email: "clint@example.com",
          username: "clint_blacksmith",
          hashedPassword: bcrypt.hashSync("ironforge"),
        },
        {
          firstName: "Jas",  // 16
          lastName: "Student",
          email: "jas@example.com",
          username: "jas_student",
          hashedPassword: bcrypt.hashSync("ponytails"),
        },
        {
          firstName: "Vincent",  // 17
          lastName: "Student",
          email: "vincent@example.com",
          username: "vincent_student",
          hashedPassword: bcrypt.hashSync("toycars"),
        },
        {
          firstName: "Lewis",  // 18
          lastName: "Mayor",
          email: "lewis@example.com",
          username: "lewis_mayor",
          hashedPassword: bcrypt.hashSync("truffleoil"),
        },
        {
          firstName: "Marnie",  // 19
          lastName: "Rancher",
          email: "marnie@example.com",
          username: "marnie_rancher",
          hashedPassword: bcrypt.hashSync("animalfriend"),
        },
        {
          firstName: "Robin",  // 20
          lastName: "Carpenter",
          email: "robin@example.com",
          username: "robin_carpenter",
          hashedPassword: bcrypt.hashSync("workbench"),
        },
        {
          firstName: "Demo",  // 21
          lastName: "User",
          email: "demo@example.com",
          username: "DemoUser",
          hashedPassword: bcrypt.hashSync("password123")
        }
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "alice_smith",
            "bob_johnson",
            "charlie_brown",
            "diana_prince",
          ],
        },
      },
      {}
    );
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Spot } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
          {
            ownerId: 1,
            address: "123 Stardrop Lane",
            city: "Pelican Town",
            state: "Valley",
            country: "Stardew",
            lat: 34.0522,
            lng: -118.2437,
            name: "Cozy Farmhouse",
            description: "Escape to this charming farmhouse in Pelican Town, surrounded by lush farmland and mountain views. Enjoy cozy interiors, a spacious kitchen, and a peaceful porch for relaxing. Explore nearby nature trails, visit local markets, or unwind in the serene countryside atmosphere. This rustic retreat is ideal for those seeking tranquility and scenic beauty in the heart of the Valley.",
            price: 120,
            previewImage: "https://i.ibb.co/xLjRh5F/standard-house.png"
          },
          {
            ownerId: 2,
            address: "456 Junimo Grove",
            city: "Cindersap Forest",
            state: "Valley",
            country: "Stardew",
            lat: 34.0922,
            lng: -118.2937,
            name: "Forest Retreat",
            description: "Nestled in Cindersap Forest, this enchanting cabin offers a tranquil escape surrounded by towering trees. Relax by the fireplace or enjoy the cozy interiors after a day of exploring forest trails. Perfect for nature lovers, it’s a great spot for birdwatching, stargazing, or unwinding with a good book. The serene setting and rustic charm make it a perfect peaceful retreat.",
            price: 95,
            previewImage: "https://i.ibb.co/c2wmtG3/forest-house.png"
          },
          {
            ownerId: 3,
            address: "101 Riverbank Road",
            city: "Pelican Town",
            state: "Valley",
            country: "Stardew",
            lat: 34.1522,
            lng: -118.2837,
            name: "Riverbank Cottage",
            description: "This riverside cottage in Pelican Town provides a serene escape with picturesque water views. Enjoy fishing, peaceful riverside walks, or relaxing in the cozy interiors. Featuring a welcoming living space and outdoor seating, it’s perfect for quiet reflection or quality time with loved ones. Ideal for a restful vacation surrounded by nature’s beauty.",
            price: 140,
            previewImage: "https://i.ibb.co/ZJkzC4y/river-house.png"
          },
          {
            ownerId: 4,
            address: "808 Stardrop Hill",
            city: "Stardew Mountain",
            state: "Valley",
            country: "Stardew",
            lat: 34.1923,
            lng: -118.3838,
            name: "Stardrop Hill Retreat",
            description: "Located on Stardrop Hill, this retreat offers breathtaking views of starry skies and lush landscapes. The home features modern comforts, a spacious deck, and access to nearby trails. Relax in the peaceful mountain setting, enjoy stargazing, or explore the natural beauty of the Valley. A perfect getaway for those seeking serenity and adventure.",
            price: 190,
            previewImage: "https://i.ibb.co/DLq05yK/hilltop-house.png"
          },
          {
            ownerId: 5,
            address: "303 Beach Boulevard",
            city: "Pelican Town",
            state: "Valley",
            country: "Stardew",
            lat: 34.0529,
            lng: -118.2417,
            name: "Seaside Getaway",
            description: "Set along Pelican Town’s coastline, this beachfront home offers stunning ocean views and a private dock. Enjoy beachside relaxation, water activities, and cozy indoor comforts. The airy interiors and outdoor spaces provide the perfect setting for unwinding by the sea. Great for families or couples looking for a coastal retreat with plenty of charm.",
            price: 220,
            previewImage: "https://i.ibb.co/7VVzdVS/beach-house.png"
          },


          // {
          //   ownerId: 3,
          //   address: "789 Saloon Street",
          //   city: "Pelican Town",
          //   state: "Valley",
          //   country: "Stardew",
          //   lat: 34.0524,
          //   lng: -118.2440,
          //   name: "Saloon Studio",
          //   description: "A cozy room above the Saloon with easy access to town nightlife.",
          //   price: 75,
          // },
          // {
          //   ownerId: 3,
          //   address: "111 Mountain Path",
          //   city: "Stardew Mountain",
          //   state: "Valley",
          //   country: "Stardew",
          //   lat: 34.1822,
          //   lng: -118.3837,
          //   name: "Mountain Cabin",
          //   description: "A rustic cabin located at the base of Stardew Mountain.",
          //   price: 150,
          // },
          // {
          //   ownerId: 12,
          //   address: "222 Fisherman's Wharf",
          //   city: "Pelican Town",
          //   state: "Valley",
          //   country: "Stardew",
          //   lat: 34.0526,
          //   lng: -118.2439,
          //   name: "Dockside Haven",
          //   description: "A charming cottage right by the water, perfect for fishing enthusiasts.",
          //   price: 100,
          // },
          // {
          //   ownerId: 12,
          //   address: "333 Miner’s Cavern",
          //   city: "Mines",
          //   state: "Valley",
          //   country: "Stardew",
          //   lat: 34.1122,
          //   lng: -118.3137,
          //   name: "Underground Hideaway",
          //   description: "An adventurous stay inside the Stardew Mines, for the bold at heart.",
          //   price: 80,
          // },
          // {
          //   ownerId: 14,
          //   address: "444 Orchard Lane",
          //   city: "Pelican Town",
          //   state: "Valley",
          //   country: "Stardew",
          //   lat: 34.0422,
          //   lng: -118.2037,
          //   name: "Apple Blossom Inn",
          //   description: "A lovely B&B surrounded by apple orchards and sweet countryside air.",
          //   price: 110,
          // },
          // {
          //   ownerId: 20,
          //   address: "555 Spa Drive",
          //   city: "Hot Springs",
          //   state: "Valley",
          //   country: "Stardew",
          //   lat: 34.1622,
          //   lng: -118.3137,
          //   name: "Hot Springs Retreat",
          //   description: "A luxury villa near the Stardew Hot Springs for a relaxing spa experience.",
          //   price: 200,
          // },
          // {
          //   ownerId: 8,
          //   address: "666 Desert Trail",
          //   city: "Calico Desert",
          //   state: "Valley",
          //   country: "Stardew",
          //   lat: 34.1922,
          //   lng: -118.4237,
          //   name: "Desert Oasis",
          //   description: "A unique stay in the Calico Desert with breathtaking sunsets and clear skies.",
          //   price: 170,
          // },
          // {
          //   ownerId: 6,
          //   address: "777 Island Road",
          //   city: "Ginger Island",
          //   state: "Tropics",
          //   country: "Stardew",
          //   lat: 34.2522,
          //   lng: -118.5037,
          //   name: "Tropical Escape",
          //   description: "A tropical paradise with palm trees, white sand beaches, and crystal-clear water.",
          //   price: 300,
          // },
          // {
          //   ownerId: 17,
          //   address: "888 Quarry Lane",
          //   city: "Pelican Town",
          //   state: "Valley",
          //   country: "Stardew",
          //   lat: 34.0322,
          //   lng: -118.1837,
          //   name: "Quarry Cottage",
          //   description: "A small, cozy cottage near the quarry for adventurous explorers.",
          //   price: 90,
          // },
          // {
          //   ownerId: 13,
          //   address: "999 Cliffside Terrace",
          //   city: "Cindersap Forest",
          //   state: "Valley",
          //   country: "Stardew",
          //   lat: 34.1022,
          //   lng: -118.2337,
          //   name: "Cliffside Retreat",
          //   description: "A breathtaking retreat perched on the cliffs with panoramic views of the valley.",
          //   price: 180,
          // },
          // {
          //   ownerId: 11,
          //   address: "202 Lavender Lane",
          //   city: "Cindersap Forest",
          //   state: "Valley",
          //   country: "Stardew",
          //   lat: 34.0722,
          //   lng: -118.2137,
          //   name: "Lavender Inn",
          //   description: "A picturesque inn surrounded by fields of blooming lavender.",
          //   price: 130,
          // },
          // {
          //   ownerId: 15,
          //   address: "404 Valley Heights",
          //   city: "Stardew Mountain",
          //   state: "Valley",
          //   country: "Stardew",
          //   lat: 34.2022,
          //   lng: -118.3637,
          //   name: "Valley Heights Lodge",
          //   description: "A luxurious lodge high in the mountains with a hot tub and hiking trails.",
          //   price: 250,
          // },
          // {
          //   ownerId: 18,
          //   address: "505 Deepwood Hollow",
          //   city: "Cindersap Forest",
          //   state: "Valley",
          //   country: "Stardew",
          //   lat: 34.0921,
          //   lng: -118.2635,
          //   name: "Deepwood Cabin",
          //   description: "A rustic cabin deep in the woods, perfect for disconnecting from the world.",
          //   price: 85,
          // },
          // {
          //   ownerId: 16,
          //   address: "606 Island Peak",
          //   city: "Ginger Island",
          //   state: "Tropics",
          //   country: "Stardew",
          //   lat: 34.2721,
          //   lng: -118.5135,
          //   name: "Island Peak Resort",
          //   description: "A stunning hilltop villa with views of the entire Ginger Island.",
          //   price: 350,
          // },
          // {
          //   ownerId: 17,
          //   address: "707 Hidden Meadow",
          //   city: "Pelican Town",
          //   state: "Valley",
          //   country: "Stardew",
          //   lat: 34.0421,
          //   lng: -118.1935,
          //   name: "Hidden Meadow Cottage",
          //   description: "A hidden gem in the meadows, surrounded by wildflowers and lush greenery.",
          //   price: 125,
          // },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: [
          "Cozy Cottage",
          "Mountain Retreat",
          "Sunny Villa",
          "Tropical Escape",
          "Modern Loft",
        ],
      },
    });
  },
};

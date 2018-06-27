const staticData = require('../staticData/tweetsData');

module.exports = {
  up: function (queryInterface, Sequelize) {

    let date = new Date();

    staticData.forEach(sd => {
      sd.createdAt = date;
      sd.updatedAt = date;
    });

    queryInterface.bulkDelete('Tweets', null, {});

    return queryInterface.bulkInsert('Tweets', staticData, {});
  },

  down: function (queryInterface, Sequelize) {
      // return queryInterface.bulkDelete('Tweet', null, {});
  }
};

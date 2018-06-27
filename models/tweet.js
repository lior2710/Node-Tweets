module.exports = (sequelize, DataTypes) => {
    const Tweet = sequelize.define('Tweet', {
        // id: DataTypes.INTEGER,
        text_content: DataTypes.STRING,
        username: DataTypes.STRING,
        timestamp: DataTypes.DATE
    });

    Tweet.associate = function(models) {
        models.Tweet.hasMany(models.Engagement, {foreignKey: 'post_id', as: 'Like'});
        models.Tweet.hasMany(models.Engagement, {foreignKey: 'post_id', as: 'ReTweet'});
    };

    return Tweet;
};

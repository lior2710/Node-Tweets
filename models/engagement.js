module.exports = (sequelize, DataTypes) => {
    const Engagement = sequelize.define('Engagement', {
        username: DataTypes.STRING,
        timestamp: DataTypes.DATE,
        type: DataTypes.INTEGER /// ==> Enum: 1 - Like, 2 - ReTweet
    });

    Engagement.associate = (models) => {
        models.Engagement.belongsTo(models.Tweet, {
            onDelete: 'CASCADE',
            foreignKey: {
                fieldName: 'post_id',
                allowNull: false,
            },
        });
    };

    return Engagement;
};
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            notNull: true,
            notEmpty: true
        },
        profilePicture: {
            type: Sequelize.STRING,
            notNull: true,
        },
        email: {
            type: Sequelize.STRING,
            notNull: true,
            notEmpty: true,
            isEmail: true,
            unique: true
        },
        isReceivingStatus: {
            type: Sequelize.BOOLEAN,
            notNull: true,
            defaultValue: true
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
    });

    return User;
};

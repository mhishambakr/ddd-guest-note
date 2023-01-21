module.exports = (sequelize, Sequelize) => {
    const NoteType = sequelize.define("NoteType", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            notNull: true,
            notEmpty: true,
        },
        isDisabled: {
            type: Sequelize.BOOLEAN,
            notNull: true,
            defaultValue: false
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
    return NoteType;
};

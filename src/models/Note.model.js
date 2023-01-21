module.exports = (sequelize, Sequelize) => {
    const Note = sequelize.define("Note", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            notNull: true,
            notEmpty: true,
            len: [2, 30],
        },
        body: {
            type: Sequelize.STRING,
            notNull: true,
            notEmpty: true,
            len: [10, 200],
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
    },{
        paranoid: true
    });

    return Note;
};

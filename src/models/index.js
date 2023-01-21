const { DB, USER, PASSWORD, HOST, dialect } = require('../../config/db.config');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
        host: HOST,
        dialect: dialect,
        operatorsAliases: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    }
);

const User = require('./User.model')(sequelize, Sequelize);
const Note = require('./Note.model')(sequelize, Sequelize);
const NoteType = require('./NoteType.model')(sequelize, Sequelize);
const NoteFile = require('./NoteFile.model')(sequelize, Sequelize);

// User Note One to Many relation
User.hasMany(Note, {
    foreignKey: 'userId',
    as: 'notes'
});
Note.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

// NoteType Note One to Many relation
NoteType.hasMany(Note, {
    foreignKey: 'typeId',
    as: 'notes'
});
Note.belongsTo(NoteType, {
    foreignKey: 'typeId',
    as: 'type'
});

// Note NoteFile One to Many relation
Note.hasMany(NoteFile, {
    foreignKey: 'noteId',
    as: 'files'
});
NoteFile.belongsTo(Note, {
    foreignKey: 'noteId',
    as: 'note'
});

module.exports = {
    sequelize,
    User,
    Note,
    NoteType,
    NoteFile
}

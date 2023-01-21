const { User, Note, NoteFile, NoteType } = require('../models');

const { sendEmail } = require('../services/mail.services')

let { Op } = require('sequelize');

let { schedule } = require('node-cron')

schedule('0 0 * * *', async () => {
    console.log('running a task everyday at 12AM, Cairo time');

    let users = await User.findAndCountAll({
        where: {
            isReceivingStatus: true
        },
        include: [{
            model: Note,
            as: 'notes',
            include: [{
                model: NoteType,
                as: 'type'
            }]
        }]
    })

    let newUsers = users.rows.map(user => {
        let types = {};
        if (user.notes.length>0){

            user.notes.map(note => {
                types[note.type.name] = (types[note.type.name] || 0) + 1;
                return types
            })
            let msg ='You got new '
            for (const type in types) {
                msg += `${types[type]} ${type} notes, `;
              }
            return {
                email: user.email, msg: msg.substring(0, msg.length - 2)
            }
        }
    })


    newUsers.forEach(async user => {
        if (user){
            let mailOptions = {
                from: process.env.NODEMAILER_SENDER_MAIL,
                to: user.email,
                subject: `DDD app: daily updates`,
                html: `<h2>Daily updates:</h2>
                <p>${user.msg}</p>`
            };
            await sendEmail(mailOptions);
        }
    })
    
}, {
    scheduled: true,
    timezone: "Africa/Cairo"
});


const createNote = async (req, res) => {
    try {

        let { title, body, userId } = req.body;

        let {user, type} = res.locals;

        console.log(req.files);

        let query = (req.files?.length > 0) ? [{
            title,
            body,
            typeId: type.id,
            userId,
            files: req.files.map(file => {
                return { name: file.filename }
            })
        }, {
            include: [{
                model: NoteFile,
                as: 'files'
            }]
        }] : [{
            title,
            body,
            typeId: type.id,
            userId,
        }];

        let note = await Note.create(...query);

        let mailOptions = {
            from: process.env.NODEMAILER_SENDER_MAIL,
            to: user.email,
            subject: `DDD app: ${title}`,
            html: `<h2>Note for you:</h2>
            <h3>${title}</h3>
            <p>${body}</p>`
        };
        await sendEmail(mailOptions);

        res.status(200).json({
            message: 'Note sent successfully',
        });
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).json({
                message: "File size cannot be larger than 1.7MB!",
            });
        }

        res.status(err.status || 500).json({
            message: err.message || 'Something went wrong',
        });
    }
};

const getUserNotes = async (req, res) => {
    try {
        let { id: userId } = res.locals.user;

        let offset = (req.query.offset && Number(req.query.offset));
        let limit = (req.query.limit && Number(req.query.limit));

        let { types } = req.query;

        let typeQuery = types ? {
            id: types && types,
            isDisabled: false
        } : {
            isDisabled: false
        }

        let notes = await Note.findAndCountAll({
            where: {
                userId,
                createdAt: {
                    [Op.and]: {
                        [Op.lte]: new Date(new Date().getTime()),
                        [Op.gte]: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
                    }
                }
            },
            offset,
            limit,
            include: [{
                model: NoteType,
                as: 'type',
                where: typeQuery,
                required: true,
            }]
        })

        res.status(200).json({
            message: 'Notes fetched successfully',
            data: {
                notes
            }
        })


    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message || 'Something went wrong',
        });
    }
}

const deleteUserNotes = async (req, res) => {
    try {
        let {notes} = req.query;

        await Note.destroy({ where: { id: notes } })

        res.status(200).json({
            message: 'Notes deleted successfully',
        })

    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message || 'Something went wrong',
        });
    }
}

module.exports = {
    createNote,
    getUserNotes,
    deleteUserNotes
}
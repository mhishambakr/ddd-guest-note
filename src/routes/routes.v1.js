const userRoutes = require('./user.routes');
const noteRoutes = require('./note.routes');

module.exports = (app,base) => {
    app.use(`${base}/user`, userRoutes);
    app.use(`${base}/note`, noteRoutes);
}

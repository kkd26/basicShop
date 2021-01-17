const mongoose = require('mongoose');

const { DB_PASS, DB_LOGIN } = require('./credentials');

const db_name = 'database';
const db_uri = `mongodb+srv://${DB_LOGIN}:${DB_PASS}@shopdb.prb7q.mongodb.net/${db_name}?retryWrites=true&w=majority`;
mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * Returns mongoose model by name
 * @param {String} name model name
 * @return {mongoose.Model}
 */
const getModelByName = name => {
    return require(`../models/${name}`);
}

module.exports.getModelByName = getModelByName;

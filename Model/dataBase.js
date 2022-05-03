var conn = {
    host: 'localhost',
    user: 'root',
    password: '@Laddu123',
};

var knex = require('knex')({ client: 'mysql', connection: conn });

knex.raw('CREATE DATABASE Blog_App')
    .then((data) => {
        console.log("database created.");
    })
    .catch((err) => {
        console.log("database already exist");
    })

conn.database = 'Blog_App';
knex = require('knex')({ client: 'mysql', connection: conn });

knex.schema
    .createTable('usersDetail', function (table) {
        table.increments('ID').primary()
        table.string('EMAIL').unique()
        table.string('NAME')
        table.string('PASSWORD')
    })
    .then((data) => {
        console.log("table Created.");
    })
    .catch((err) => {
        console.log("table already exist.");
    })

knex.schema
    .createTable('postUsersDetail', function (table) {
        table.increments('POST_ID').primary()
        table.integer('USER_ID').unsigned().references('usersDetail.ID')
        table.string('TITLE')
        table.string('DESCRIPTION')
    })
    .then((data) => {
        console.log(`table Created.`);
    })
    .catch((err) => {
        console.log(`table already exist`);
    })



module.exports = knex;
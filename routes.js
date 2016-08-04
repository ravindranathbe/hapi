// routes.js
'use strict';
const Pages = require('./handlers/pages');

module.exports = [{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        return reply('Home');
    }
},
{
    method: 'GET',
    path: '/wines',
    handler: function (request, reply) {
        this.db.query('SELECT * FROM WINE', function(e, rows) {
            reply(rows);
        });
    }
},
{
    method: 'GET',
    path: '/json',
    config: {
        auth: 'jsonAuth'
    },
    handler: function (request, reply) {
        reply({ hello: 'World' });
    }
},
{
    method: 'GET',
    path: '/home',
    /*
    handler: function (request, reply) {
        console.log(Pages.home);
        reply({ hello: 'World' });
    }
    */
    handler: Pages.home
}];
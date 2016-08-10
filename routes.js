// routes.js
'use strict';
const Pages = require('./handlers/pages');
const Joi = require('Joi');

module.exports = [{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        return reply('Home');
    }
},
{
    method: 'GET',
    path: '/home2',
    handler: function (request, reply) {
        console.log(request);
        return reply('Home 2');
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
},
{
    method: 'GET',
    path: '/form',
    handler: function(request, reply) {
        reply.view('form', {title: 'Sample form'});
    }
},
{
    method: 'POST',
    path: '/form',
    handler: function(request, reply) {
        if (request.payload.username) {
            reply(request.payload.username);
        } else {
            reply('time unknown');
        }

    },
    config: {
        validate: {
            payload: { 
                username: Joi.string().min(5).required(),
                firstname: Joi.string(),
                lastname: Joi.string(),
                formSubmit: Joi.string()
            },
            failAction: function (request, reply, source, error) {
                return reply.view('form', {title: 'Sample form', error: error, postValues: request.payload});
                // error.output.payload.message = 'custom';
                // return reply(error).code(400);
            }
        }
    }
}
];
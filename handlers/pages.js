// pages.js
'use strict';
module.exports = {
    home: function (request, reply) {
        reply.file('./index.html');
    }
};

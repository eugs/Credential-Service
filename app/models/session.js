const keygen = require('keygenerator');

function getSessionId() {
    return keygen._();
}

module.exports = {getSessionId};
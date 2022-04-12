var mongoConfigs = require('./mongoConfigs');

function getUsername(db, username, callback){
    var filters = { };

    if(username !== undefined) filters.username = username;
    db.collection('users').find(filters).toArray(function(err,result){
        callback(result);
    });
}

function ChangeUsername(db, username, newUsername, callback){
    var filters = {};
    var novo = {};
    if(username !== undefined && newUsername !== undefined){
        filters.username = username;
        novo.username = newUsername;
    }
    db.collection('users').updateOne(filters, {$set: novo})
}

function ChangePassword(db, password, newPassword, callback){
    var filters = {};
    var novo = {};
    if(password !== undefined && newPassword !== undefined){
        filters.password = password;
        novo.password = newPassword;
    }
    db.collection('users').updateOne(filters, {$set: novo})
}

function ChangeImage(db, imagem, newImagem, callback){
    var filters = {};
    var novo = {};
    if(imagem !== undefined && newImagem !== undefined){
        filters.imagem = imagem;
        novo.imagem = newImagem;
    }
    db.collection('users').updateOne(filters, {$set: novo})
}

module.exports = {
    getUsername,
    ChangeUsername,
    ChangePassword,
    ChangeImage
}
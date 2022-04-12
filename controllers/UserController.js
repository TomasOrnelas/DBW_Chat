const User = require('../model/User');

function UsernameTaken(db, req, callback){
    User.getUsername(db, req.body.username, callback);
}

function ChangeUsername(db, req, callback){
    User.ChangeUsername(db,req.user.username, req.body.username,callback);
}

function ChangePassword(db, req, callback){
    User.ChangePassword(db,req.user.password, req.body.newPassword,callback);
}
function ChangeImage(db, req, callback){
    User.ChangeImage(db,req.user.imagem, req.file.filename,callback);
}



module.exports = {
    UsernameTaken,
    ChangeUsername,
    ChangePassword,
    ChangeImage,

};
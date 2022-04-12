var mongoConfigs = require('./mongoConfigs');

function getChat(db, chatname, callback){
    var filters = { };

    if(chatname !== undefined) filters.nome = chatname;
    db.collection('chats').find(filters).toArray(function(err,result){
        callback(result);
    });
}

function getPendentes(db,username,callback){
    var filters = { };

    if(username !== undefined) filters.username = username;
    db.collection('pendentes').find(filters).toArray(function(err,result){
        callback(result);
    });
}

function pedidosReadmicao(db,username,callback){
    var filters = { };
    
    if(username !== undefined) filters.username = username;
    db.collection('saiu').find(filters).toArray(function(err,result){
        callback(result);
    });
}

function pedidosReadmicaoCriador(db,username,callback){
    var filters = { };

    if(username !== undefined) filters.criador = username;
    db.collection('readmitir').find(filters).toArray(function(err,result){
        callback(result);
    });
}

function pertenceConversa(db, username, callback){
    var filters = {};
    if(username !== undefined) filters.username = username;
    db.collection('membrochats').find(filters).toArray(function(err, result){
        callback(result);
    });
}

function removePendentes(db,username,nome){
    if(username!==undefined && nome!==undefined) {
        db.collection('pendentes').remove({username: username, nome: nome});
    }
}

function removeSaiu(db,username,nome){
    if(username!==undefined && nome!==undefined) {
        db.collection('saiu').remove({username: username, nome: nome});
    }
}

function sairChat(db,chatAcedido,username,callback){
    if(chatAcedido!==undefined && username!==undefined) {
        db.collection('membrochats').remove({username: username, nome: chatAcedido});
        db.collection('saiu').insertOne({username: username, nome: chatAcedido},(error,result)=>{
            callback(error);
        });
    }
}

function getMsgId(db,id ,callback){
    var filters = { };
    if(id !== undefined) filters.id = id;
    db.collection('mensagens').find(filters).toArray((err,result)=>{
        callback(result)
    });
}

function imagemConversa(db, imagem, callback){
    var filters = {};
    if(imagem !== undefined) filters.username = imagem;
    db.collection('users').find(filters).toArray(function(err, result){
        callback(result);
    });
}

function colocarNoChat(db,username,nome){
    if(username!==undefined && nome!==undefined) {
        var filters = { };
        filters.nome = nome;
        db.collection('chats').find(filters).toArray(function(err,result){
            if(err) return console.error(err);
            db.collection('membrochats').insertOne({username: username, nome: nome, criador: result[0].criador});
        });

    }
}

function colocarReadmicao(db,username,nome){
    if(username!==undefined && nome!==undefined) {
        var filters = { };
        filters.nome = nome;
        filters.participante = username;
        db.collection('chats').find(filters).toArray(function(err,result){
            if(err) return console.error(err);
            db.collection('readmitir').insertOne({username: username, nome: nome, criador: result[0].criador});
        });

    }
}

function colocarNoChatReadmitir(db,pessoas){
    if(pessoas!==undefined) {
        var filters = { };
        var newStuff=pessoas.split(",");
        var username=newStuff[1].split("]");
        var chat=newStuff[0].split("[");
        filters.nome = chat[1];
        filters.participante=username[0];
        db.collection('chats').find(filters).toArray(function(err,result){
            if(err) return console.error(err);
            db.collection('membrochats').insertOne({username: username[0], nome: chat[1], criador: result[0].criador});
            removeReadmitir(db,pessoas);
        });

    }
}

function removeReadmitir(db,pessoas){
    var filters = { };

    if(chatname !== undefined) filters.nome = chatname;
    db.collection('chats').find(filters).toArray(function(err,result){
        callback(result);
    });


}

function ChangeUsernameParticipante(db, username, newUsername, callback){
    var filters = {};
    var filtroCriador = {};
    var filtroMensagens = {};
    var filtroPendentes = {};
    var filtroMembroUsername = {};
    var filtroMembroCriador = {};
    var novo = {};
    var novoCriador = {};
    var novoMensagens = {};
    var novoPendentes = {};
    var novoMembroUsername = {};
    var novoMembroCriador = {};
    if(username !== undefined && newUsername !== undefined){
        filters.participante = username;
        filtroCriador.criador = username;
        filtroMensagens.username = username;
        filtroPendentes.username = username;
        filtroMembroUsername.username = username;
        filtroMembroCriador.criador = username;
        novo.participante = newUsername;
        novoCriador.criador = newUsername;
        novoMensagens.username = newUsername;
        novoPendentes.username = newUsername;
        novoMembroUsername.username = newUsername;
        novoMembroCriador.criador = newUsername;
    }
    //participantes no chat
    db.collection('chats').updateMany(filters, {$push: novo})
    db.collection('chats').updateMany(filters, {$pull: filters})
    //criador do chat
    db.collection('chats').updateMany(filtroCriador, {$set: novoCriador})
    //quem mandou a msg
    db.collection('mensagens').updateMany(filtroMensagens, {$set: novoMensagens})
    //pendentes
    db.collection('pendentes').updateMany(filtroPendentes, {$set: novoPendentes})
    //membro chats
    db.collection('membrochats').updateMany(filtroMembroCriador, {$set: novoMembroCriador})
    db.collection('membrochats').updateMany(filtroMembroUsername, {$set: novoMembroUsername})

}



function MensagemPertence(db,id,callback){
    var filters = { };

    if(id !== undefined) filters.pertence = id;
    db.collection('mensagens').find(filters).toArray(function(err,result){
        callback(result);
    });
}

function procuraMensagem(db,id, callback){
    var filters = { };
    if(id !== undefined){
        var Id=parseInt(id);
        filters.id=Id;
    }

    db.collection('mensagens').find(filters).toArray(function (err,res){
        callback(res);
    });
}

function deletemsg(db,id, callback){
    if (id!==undefined){
        var variavelx=parseInt(id);
        db.collection('mensagens').remove({id:variavelx});
    }
}

function mudarNomeChat(db, antigo, novo, callback){
    var filters = {};
    var antigoArray = {};
    var novoArray = {};
    var pertenceArray = {};
    var pertenceAntigo = {};
    if(antigo !== undefined){
        filters.nome = antigo;
        antigoArray.antigos = antigo;
        pertenceAntigo.pertence = antigo;
    }
    if(novo !== undefined){
        novoArray.nome = novo;
        pertenceArray.pertence = novo;
    }
    db.collection('chats').updateOne(filters, {$push: antigoArray})
    db.collection('membrochats').updateMany(filters, {$set: novoArray})
    db.collection('pendentes').updateMany(filters, {$set: novoArray})
    db.collection('readmitir').updateMany(filters, {$set: novoArray})
    db.collection('mensagens').updateMany(pertenceAntigo, {$set: pertenceArray})
    db.collection('saiu').updateMany(filters, {$set: novoArray})
    db.collection('chats').updateOne(filters,{$set: novoArray} )

}


function adicionarResposta(db, msgid,id,reply,username,callback){
    var filters = { };
    var replyArray = [];
    var Id=parseInt(msgid);

    if(Id !== undefined) filters.id = Id;
    db.collection('mensagens').find(filters).toArray(function(err,result){
        if(result[0].replys!==undefined) {
            for (var i = 0; i < result[0].replys.length; i++) {
                replyArray[i] = result[0].replys[i];
            }
            replyArray[result[0].replys.length] = [result[0].conteudo, result[0].username];
        }
        else{
            replyArray[0] = [result[0].conteudo , result[0].username];
        }
        db.collection('mensagens').insertOne({username: username, conteudo:reply, id:id, data:new Date, pertence:result[0].pertence, replys:replyArray},(error,result)=>{
            callback(error);
        });
    });

}

//-----------------------------------------------------------

function editarMensagem(db, id, newMsg, oldMsg){
    var filters = {};
    var novo = {};
    var antigoMsg = {};

    if(oldMsg !== undefined && newMsg !== undefined){
        antigoMsg.old = oldMsg;
        filters.id = id;
        novo.conteudo = newMsg;
    }
    db.collection('mensagens').updateOne(filters, {$push: antigoMsg})
    db.collection('mensagens').updateOne(filters, {$set: novo})
}

function Addlike(db, id, quanto){
    var filters = {};
    if(id !== undefined){
        var variavely=parseInt(id);
        filters.id = variavely;
        db.collection("mensagens").updateOne(filters, {$inc: {like: quanto}})
    }

}
function liking(db, username, id, callback) {
    var filters = {};
    var liked = {};
    if (id !== undefined) {
        var variavelL = parseInt(id);
        filters.id = variavelL;
        liked.whoLiked = username;
        db.collection("mensagens").find(filters).toArray(function (err, result) {
            if (result[0].whoLiked === undefined) {
                db.collection("mensagens").updateOne(filters, {$push: liked});
                Addlike(db, id, 1);
            }
            else {
                if (result[0].whoLiked.includes(username)) {
                    db.collection("mensagens").updateOne(filters, {$pull: liked})
                    Addlike(db, id, -1);
                } else {
                    db.collection("mensagens").updateOne(filters, {$push: liked});
                    Addlike(db, id, 1);
                }
            }
        });
    }
}
function wholiked(db,username,msg,callback){
    var filters = {};
    if (msg!== undefined) {
        filters.id = msg;
        db.collection("mensagens").find(filters).toArray(function (err, result) {
            if (result[0].whoLiked === undefined) {
                callback("false",result[0])
            }else{
                if (result[0].whoLiked.includes(username)){
                    callback("true",result[0])
                }else{
                    callback("false",result[0])
                }
            }
        })
    }
}



module.exports = {
    getChat,
    getPendentes,
    pedidosReadmicao,
    removePendentes,
    colocarNoChat,
    pertenceConversa,
    MensagemPertence,
    imagemConversa,
    getMsgId,
    colocarReadmicao,
    pedidosReadmicaoCriador,
    removeSaiu,
    colocarNoChatReadmitir,
    sairChat,
    removeReadmitir,
    deletemsg,
    ChangeUsernameParticipante,
    mudarNomeChat,
    editarMensagem,
    adicionarResposta,
    procuraMensagem,
    Addlike,
    liking,
    wholiked
}
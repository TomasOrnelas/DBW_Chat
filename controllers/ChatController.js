const Chat = require('../model/Chat');

function ChatTaken(db, req, callback){ //retorna todos os chats da base de dados na collection chats com o nome em chatname
    Chat.getChat(db, req.body.chatname, callback);
}

function Pendentes(db,socket,callback){ //retorna todos os chats da base de dados na collection pendentes com o username na socket
    Chat.getPendentes(db,socket.request.user.username,callback);
}

function Aceitar(db,req){ //remover o user da base de dados com o nome e username e colocar em membroChats
    if(Array.isArray(req.body.chatsPendentes)){
        for(var i=0;i<req.body.chatsPendentes.length;i++){
            Chat.colocarNoChat(db,req.body.username,req.body.chatsPendentes[i]);
        }
    }
    else
        Chat.colocarNoChat(db,req.body.username,req.body.chatsPendentes);
    Rejeitar(db,req);
}

function Rejeitar(db,req){ //remover o user da base de dados com o nome e username
    if(Array.isArray(req.body.chatsPendentes)){
        for(var i=0;i<req.body.chatsPendentes.length;i++){
            Chat.removePendentes(db,req.body.username,req.body.chatsPendentes[i]);
        }
    }
    else
        Chat.removePendentes(db,req.body.username,req.body.chatsPendentes);
}

function aceitarReadmicao(db,req){ //remover o user da base de dados com o nome e username e colocar em membroChats
    if(Array.isArray(req.body.readmitir)){
        for(var i=0;i<req.body.readmitir.length;i++){
            Chat.colocarNoChatReadmitir(db,req.body.readmitir[i]);
        }
    }
    else
        Chat.colocarNoChatReadmitir(db,req.body.readmitir);
}

function rejeitarReadmicao(db,req){ //remover o user da base de dados com o nome e username
    if(Array.isArray(req.body.readmitir)){
        for(var i=0;i<req.body.readmitir.length;i++){
            Chat.removeReadmitir(db,req.body.readmitir[i]);
        }
    }
    else
        Chat.removeReadmitir(db,req.body.readmitir);
}

function deletemsg(db,id, callback){
    Chat.deletemsg(db, id, callback);
}

function ChatsDisponiveis(db, socket, callback){
    Chat.pertenceConversa(db, socket.request.user.username, callback);
}

function getMsgId(db,i,callback){
    Chat.getMsgId(db,i,function cb(x){
        if(x.length===0){
            callback(i);
        }
        else{
            i++;
            getMsgId(db,i,callback);
        }
    })
}

function sairChat(db,req,callback){
    Chat.sairChat(db,req.body.chat,req.body.username,callback);
}

function MensagensChat(db,pertence ,callback){
    Chat.MensagemPertence(db, pertence,callback);
}

function imagemConversa(db, socket, callback){
    Chat.imagemConversa(db, socket.request.user.username, callback);
}

function pedidosReadmicao(db,socket,callback){ //retorna todos os chats da base de dados na collection saiu com o username na socket
    Chat.pedidosReadmicao(db,socket.request.user.username,callback);
}

function pedidosReadmicaoCriador(db,socket,callback){ //retorna todos os chats da base de dados na collection saiu com o username na socket
    Chat.pedidosReadmicaoCriador(db,socket.request.user.username,callback);
}

function submeterReadmicao(db,req){ //remover o user da base de dados com o nome e username e colocar em por readmitir
    if(Array.isArray(req.body.chatsReadmicao)){
        for(var i=0;i<req.body.chatsReadmicao.length;i++){
            Chat.colocarReadmicao(db,req.body.username,req.body.chatsReadmicao[i],()=>{
                Chat.removeSaiu(db,req.body.username,req.body.chatsReadmicao[i]);
            });

        }

    }
    else{
        Chat.colocarReadmicao(db,req.body.username,req.body.chatsReadmicao);
        Chat.removeSaiu(db,req.body.username,req.body.chatsReadmicao);
    }
}

function ChangeNomeParticipante(db, req, callback){
    Chat.ChangeUsernameParticipante(db,req.user.username, req.body.username,callback);
}

function changeChatName(db, req, callback){
    Chat.mudarNomeChat(db, req.body.antigo, req.body.novoNome, callback)
}



function procuraMensagem(db,id,callback){
    Chat.procuraMensagem(db,id,callback);
}

//--------------------------------------------------

function editarMensagem(db, id, newMsg,oldMsg){
    Chat.editarMensagem(db,id,newMsg,oldMsg);
}


function adicionarResposta(db,msgid,reply,username,callback){
    getMsgId(db,0,(id)=>{
        Chat.adicionarResposta(db, msgid,id,reply,username,callback);
    });

}
function like(db, socket, id, callback){
    Chat.liking(db, socket.request.user.username, id, callback);
}

function wholikedit(db,username,msg,callback){
    Chat.wholiked(db,username,msg,callback);
}

module.exports = {
    ChatTaken,
    Pendentes,
    Aceitar,
    Rejeitar,
    ChatsDisponiveis,
    getMsgId,
    imagemConversa,
    MensagensChat,
    adicionarResposta,
    sairChat,
    pedidosReadmicao,
    pedidosReadmicaoCriador,
    submeterReadmicao,
    rejeitarReadmicao,
    deletemsg,
    aceitarReadmicao,
    ChangeNomeParticipante,
    changeChatName,
    editarMensagem,
    procuraMensagem,
    like,
    wholikedit
};
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
var dbs;

module.exports = {
    connect: function (callback) {
        //Insert the connection string which was shared with you in moodle
        MongoClient.connect('mongodb+srv://G11:VpJZUb2O9NtUV7Va@clusterdbw.1dbjr.mongodb.net/G11?authSource=admin&replicaSet=atlas-bek8xj-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', { useNewUrlParser: true, useUnifiedTopology: true },function (err, database) {
            console.log('Connected the database on port 27017');
            //Insert DB name as the group id - G[id]
            dbs = database.db('G11');
            callback(err);
        })},
    getDB:function(){
        return dbs;
    }
}
'use strict';


/*
   Version 0.0
      initial version, using mongoose

   Version 1.0, 2020-10-12
      refactored into two version, one for handling multiple databases and one for only a single database connection
      refactored to use native node-mongodb driver instead of mongoose

 */


const MongoClient = require('mongodb').MongoClient;
const schemas0 = require('./models.js');


/**
 * Handles connection to a single mongo database
 * get_db() returns an object with two properties, db and models.  db is just the raw mongo driver connection to the db
 * models is an object intended to provide an abstraction layer to collections, provides provides properties for
 * validation as well as convenience functions to getting the associated collection.
 */
class DBConnection {


   /**
    *
    * @param db_name : str, name of default db to return
    * @param models  : object,
    */
   constructor({db_name, schemas = schemas0}={}) {
      this._client = null;
      this._schemas = schemas;

      if (db_name == undefined) {
         this._db_name = process.env.MONGODB_DB;
      }else{
         this._db_name = db_name;
      }

      this._models = null;

      this._connection_options = {useNewUrlParser: true, useUnifiedTopology: true };
   }


   async close(){
      if (this._client !== null){
         await this._client.close();
      }
   }


   async connect({host, port,  user, pass}={}){

      let connect_str;


      if (host == undefined) {
         host = process.env.MONGODB_SERVER;
      }

      if (port == undefined) {
         port = process.env.MONGODB_PORT;
      }

      if (user == undefined) {
         user = process.env.MONGODB_USER;
      }

      if (pass == undefined) {
         pass =  process.env.MONGODB_PASSWORD;
      }



      if (process.env.NODE_ENV === "production"){
         connect_str = `mongodb://${user}:${pass}@${host}:${port}/?authSource=admin`;
      }
      else {
         connect_str = `mongodb://${host}:${port}`;
      }

      try{
         //https://stackoverflow.com/questions/47370487/node-js-mongodb-driver-async-await-queries
         this._client = await MongoClient.connect(connect_str, this._connection_options);
         return;
      }
      catch(e){
         throw e; //todo: turn this into a warning

      }
   }


   /**
    * returns db connection
    * @returns {Promise}
    */
   get_db(db_name=null){
      if (db_name == null && this._db_name == null){
         throw Error('db_name must be either passed in or specified on class construction')
      }

      try{
         if (db_name == null){
            db_name = this._db_name;
         }

         let db = this._client.db(db_name);
         //******load models for this connection***********************************************
         if (this._models == null){
            let models_local = {};
            let keys = Object.keys(this._schemas);
            for (let k of keys){
               let m = this._schemas[k]();
               console.log('Adding model: '+ m.name);

               m.collection = db.collection(m.collection_name);

               models_local[m.name] = m;
            }

            this._models = models_local;
         }


       return {
            db: this._client.db(db_name),
            models: this._models
         }
      }
      catch(e){
         console.log(e);
         return null;
      }

   }

   // async _add_models(client_id){
   //
   //    try{
   //       if (this._connections.get(client_id) == undefined){
   //
   //          let uri = await this._get_connection_str(client_id);
   //
   //          let conn = mongoose.createConnection(uri, this._connection_options);
   //
   //
   //          //******load models for this connection***********************************************
   //          let models_local = {};
   //          let keys = Object.keys(this._models);
   //          for (let k of keys){
   //             let m = models[k]();
   //             console.log('Adding model: '+ m.name);
   //
   //             models_local[k] = conn.model(m.name, m.schema);
   //          }
   //          this._connections.set(client_id, {connection: conn, models: models_local});
   //
   //          //******check if we need to remove connection*****************************************
   //          if (this._connections.size >= this._max_connections){
   //             //get oldest entry key, disconnect and remove
   //             let del_id = this._connections.keys().next().value;
   //             await this._connections.get(del_id).connection.close();
   //             this._connections.delete(del_id);
   //          }
   //
   //       }
   //
   //    }
   //    catch (e) {
   //       throw e;
   //       // console.log(e)
   //
   //    }
   // } //_connect_to_db()

}//class DBConnection









//
//
// /***********************************************************************************************************************
//  * DBConnectionM
//  * Handles connection to multiple databases
//  **********************************************************************************************************************/
//
// class DBConnectionM {
//
//
//    constructor({multipleDBs=false}={}) {
//
//       this._client_dbs = {}; // used to cache the mappings between client_id's and dbs.  Basically the espy_client's collection cache
//       this._connections = new Map();      //used to hold mongoose connections.  format is {client_id: mongooseConnection}
//       // this._connections_list = []; //used as que to know which connections to remove if limit is reached
//       this._max_connections = 5;   // number of connections allowed
//
//       this.connection_options = {useNewUrlParser: true, useUnifiedTopology: true };
//    }
//
//
//    async close(){
//
//       let promises = [];
//
//       for (let [key, conn] of this._connections){
//          let tmp = conn.connection.close();
//          promises.push(tmp)
//       }
//
//       await Promise.all(promises);
//
//    }
//
//    /**
//     * updates in-memory cached version of espy_clients.clients collection
//     * @returns {Promise<void>}
//     * @private
//     */
//    async update_client_db_cache(){
//
//       let connect_str;
//       let user = process.env.MONGODB_USER;
//       let pass = process.env.MONGODB_PASSWORD;
//       let host = process.env.MONGODB_SERVER;
//       let port = process.env.MONGODB_PORT;
//
//       let db_name = process.env.MONGODB_CLIENT_DB;
//
//       if (process.env.NODE_ENV === "production"){
//          connect_str = `mongodb://${user}:${pass}@${host}:${port}/?authSource=admin`;
//       }
//       else {
//          connect_str = `mongodb://${host}:${port}`;
//       }
//
//       try{
//          //https://stackoverflow.com/questions/47370487/node-js-mongodb-driver-async-await-queries
//          const client = await MongoClient.connect(connect_str, this.connection_options);
//
//          const db = client.db(db_name);
//          let collection = db.collection('clients');
//          let query = { };
//          let res = await collection.find(query).toArray();
//
//          this._client_dbs = {};
//          for (let r of res){
//             this._client_dbs[r.client_id] = r;
//          }
//
//          // console.log(res);
//
//          await client.close();
//
//          return;
//       }
//       catch(e){
//
//          throw e; //todo: turn this into a warning
//
//       }
//    }
//
//    get_client_records(){
//       return this._client_dbs;
//    }
//
//    get_client_info(client_id){
//       return this._client_dbs[client_id];
//    }
//
//    /**
//     * returns a mongoose connection object connected to the client's db
//     * @returns {Promise<void>}
//     */
//    async  get_client_db(client_id){
//       try{
//          let conn = this._connections.get(client_id);
//
//          if (conn === undefined){
//             await this._connect_to_db(client_id);
//
//             conn = this._connections.get(client_id);
//          }
//          return conn;
//       }
//       catch(e){
//          console.log(e);
//          return null;
//       }
//
//
//
//    }
//
//
//    /**
//     *
//     * @returns {Promise<void>}
//     */
//    async _connect_to_db(client_id){
//
//       try{
//          if (this._connections.get(client_id) == undefined){
//
//             let uri = await this._get_connection_str(client_id);
//
//             let conn = mongoose.createConnection(uri, this.connection_options);
//
//
//             //******load models for this connection***********************************************
//             let models_local = {};
//             let keys = Object.keys(models);
//             for (let k of keys){
//                let m = models[k]();
//                console.log('Adding model: '+ m.name);
//
//                models_local[k] = conn.model(m.name, m.schema);
//             }
//             this._connections.set(client_id, {connection: conn, models: models_local});
//
//             //******check if we need to remove connection*****************************************
//             if (this._connections.size >= this._max_connections){
//                //get oldest entry key, disconnect and remove
//                let del_id = this._connections.keys().next().value;
//                await this._connections.get(del_id).connection.close();
//                this._connections.delete(del_id);
//             }
//
//          }
//
//       }
//       catch (e) {
//          throw e;
//          // console.log(e)
//
//       }
//    } //_connect_to_db()
//
//
//    /**
//     * creates the connection string to the correct db, based on client_id.  Refreshes local client_dbs cache if necessary
//     * @param client_id  : string,
//     * @returns {Promise<*>}
//     * @private
//     */
//    async _get_connection_str(client_id){
//       let connect_str;
//       let user = process.env.MONGODB_USER;
//       let pass = process.env.MONGODB_PASSWORD;
//       let host = process.env.MONGODB_SERVER;
//       let port = process.env.MONGODB_PORT;
//
//
//       let rec  = this._client_dbs[client_id];
//
//       //refresh cache if necessary
//       if (rec == undefined){
//          await this.update_client_db_cache();
//          rec  = this._client_dbs[client_id];
//
//          //check if still failed to find client's db
//          if (rec == undefined){
//             // this.server.log('error', `DBService._get_connection_str(): Couldn't find entry for client_id=${client_id} in espy_clients db`);
//             console.log(`DBService._get_connection_str(): Couldn't find entry for client_id=${client_id} in espy_clients db`);
//             return null;
//          }
//       }
//
//
//
//       if (process.env.NODE_ENV === "production"){
//          connect_str = `mongodb://${user}:${pass}@${host}:${port}/${rec.db_name}?authSource=admin`;
//       }
//       else {
//          connect_str = `mongodb://${host}:${port}/${rec.db_name}`;
//       }
//
//       return connect_str;
//    }
//
// }
//




module.exports = DBConnection;














































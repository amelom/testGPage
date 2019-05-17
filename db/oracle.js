'use strict';
const path          = require('path');
const appDir        = path.dirname(require.main.filename);
const config      = require(appDir + '/config.js');
const oracledb = require('oracledb');


const oracleDbRelease = function(conn) {
  conn.release(function (err) {
    if (err)
      console.log(err.message);
  });
};

function queryArray(sql, bindParams, options) {
    options.isAutoCommit = false;
    return new Promise(function(resolve, reject) {
        oracledb.getConnection(config.oracleDB)
        .then(function(connection){
            connection.execute(sql, bindParams, options)
            .then(function(results) {
                resolve(results);
                process.nextTick(function() {
                    oracleDbRelease(connection);
                });
            })
            .catch(function(err) {
                reject(err);
 
                process.nextTick(function() {
                    oracleDbRelease(connection);
                        });
                    });
            })
            .catch(function(err) {
                reject(err);
            });
    });
}

function queryObject(sql, bindParams, options) {
    options['outFormat'] = oracledb.OBJECT; 
    return queryArray(sql, bindParams, options);
}

module.exports = queryArray; 
module.exports.queryArray = queryArray; 
module.exports.queryObject = queryObject;
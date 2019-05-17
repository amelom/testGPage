const express       = require('express');
const router        = express.Router();
const bodyParser    = require('body-parser');
const path          = require('path');
const appDir        = path.dirname(require.main.filename);
const oracle        = require(appDir+'/db/oracle.js')
const time          = require(appDir+'/helper/time.js')


router.use(bodyParser.json());
router.route('/save').post(postSaveCrm);

function postSaveCrm(req, res) {   
    var temp = req.body
    const sql = sqlParse(temp)
    oracle.queryObject(sql, {}, {autoCommit: true}).then(function(result) {
        res.json({msm:'exito',success:true})
    }).catch(function(err) {
        console.log(err)
        res.json({msm:'error al cargar',success:false})
    });
}

function sqlParse(temp){
    var sql = 'INSERT ALL '
    var fecha = time.current()
    var idCampana = time.epoch()
    for(var i = 1;i<temp.length;i++){
        sql = sql+'  INTO CRMCAMPANA (ID, NOMBRES, APELLIDOS, TELEFONOS, DIRECCIONES,FECHA,IDCAMPANA) VALUES '
        var id = time.epoch()
        sql = sql + "("
        sql = sql + "'"+id+"',"
        sql = sql + "'"+temp[i].nombre+"',"
        sql = sql + "'"+temp[i].apellidos+"'," 
        sql = sql + "'"+temp[i].telefonos+"'," 
        sql = sql + "'"+temp[i].direcciones+"'," 
        sql = sql + "'"+fecha+"'," 
        sql = sql + "'camp_"+idCampana+"'" 
        sql = sql + ") "
        if(temp.length-1!==parseInt(i)){
            sql = sql + ""
        }
    }   
    sql = sql + " SELECT * FROM dual "
    return sql
}

module.exports = router;
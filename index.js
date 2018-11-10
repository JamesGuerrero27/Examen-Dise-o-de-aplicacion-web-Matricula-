// Todas las dependencias que usare para el API.
var express = require('express');
var sql = require('mssql');
var cors = require('cors');
var bodyparser = require('body-parser');
var env = require('dotenv');
var multer = require('multer');
var path = require('path');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'.'+getExtension(file.originalname))
    }
})

var app = express();

const result = env.config();
app.use(cors());
app.use(bodyparser());

function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

var upload = multer({ storage: storage })

const sqlconfig={
    server: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    debug: true,
    options: {
        encrypt: false,
        instanceName: process.env.DB_INSTANCE_NAME
    }
}
// La funcion que me atrapará errores.
app.use(function(err, req, res, next){
    console.log(err);
    res.send({success: false, message: err});
});

app.listen(parseInt(process.env.APP_PORT), () => {
    console.log("Esta corriendo el servidor!!!")
    console.log(result.parsed);
    console.log(sqlconfig);
});

app.get('/app/v1/clases/matricula/estudiantes', (req, res, next) =>{
   
    var AlumnoId = req.query.AlumnoId || "Todos";

   
    sql.connect(sqlconfig).then(() => {
        return sql.query(`select Alumno.nombreDelAlumno, Matricula.nombreDeLaMateria
         from Alumno join Matricula on Alumno.MatriculaId = Matricula.MatriculaId where nombreDelAlumno = '${AlumnoId}'`);
    }).then(result => {
        var data = {
            seccess: true,
            message: '',
            data: result.recordset,
        }
        res.send(data);
        sql.close();
    }).catch(err => {
        return next(err);
    });
});
app.get('/app/v1/Maestro/Clases', (req, res, next) =>{
   
    var MaestroId = req.query.MaestroId || "Todos";

    
    sql.connect(sqlconfig).then(() => {
        return sql.query(`select Maestro.nombreDelMaestro, Matricula.nombreDeLaMateria from Maestro join Matricula on Maestro.MatriculaId = Matricula.MatriculaId where nombreDeLaClase = '${MaestroId}';`);
    }).then(result => {
        var data = {
            seccess: true,
            message: '',
            data: result.recordset,
        }
        res.send(data);

        sql.close();
    }).catch(err => {
        return next(err);
    });
});

app.get('/app/v1/Matriculados/Clases/Maestros', (req, res, next) =>{
    
    var nombreDelAlumno= req.query.nombreDelAlumno;

    sql.connect(sqlconfig).then(() => {
        return sql.query(`select Maestro.nombreDelMaestro, Alumno.nombreDelAlumno, Matricula.nombreDeLaMateria from Maestro join Alumno on Maestro.MaestroId = Alumno.AlumnoId join Matricula on Maestro.MaestroId = Matricula.MatriculaId where nombreDelAlumno ='${nombreDelAlumno}'`);
    }).then(result => {
        var data = {
            seccess: true,
            message: '',
            data: result.recordset,
        }
        res.send(data);

    
        sql.close();
    }).catch(err => {
        return next(err);
    });
});
app.post('/app/v1/estudiante/nuevo', upload.single('file'), (req, res, next) =>{

    var NoCuenta = req.body.noCuenta;
    var nombreDelAlumno = req.body.nombreDelAlumno;
    var pictureStudent = req.file != null ? req.file.pictureStudent : 'null';

    if(!NoCuenta && !nombreDelAlumno && !pictureStudent ){
        res.send("hubo un error " +NoCuenta + nombreDelAlumno + pictureStudent );
    }
    sql.connect(sqlconfig).then(() => {
        return sql.query(`insert into Alumno (NoCuenta, nombreDelAlumno, pictureStudent) values(${NoCuenta}, '${nombreDelAlumno}', '${pictureStudent}')`);
    }).then(result => {
        var data = {
            seccess: true,
            message: `Se ha creado ${result.rowsAffected} registro nuevo`
        }
        res.send(data);
        sql.close();
    }).catch(err => {
        return next(err);
    });
});
app.post('/app/v1/Asistencia/student', (req, res, next) =>{
    
    var diaDeAsistencia = req.body.diaDeAsistencia;
    var checkAsistencia = req.body.checkAsistencia;
    var MatriculaId = req.body.MatriculaId;

    if(!diaDeAsistencia && !checkAsistencia && !MatriculaId){
        res.send("Hubo un error");
    }

    sql.connect(sqlconfig).then(() => {
        return sql.query(`insert into Asistencia(diaDeAsistencia,checkAsistencia, MatriculaId) values('${diaDeAsistencia}', '${checkAsistencia}','${MatriculaId}')`);
    }).then(result => {
        var data = {
            seccess: true,
            message: `Se ha creado ${result.rowsAffected} registro nuevo`
        }
        res.send(data);

        
        sql.close();
    }).catch(err => {
        return next(err);
    });
});
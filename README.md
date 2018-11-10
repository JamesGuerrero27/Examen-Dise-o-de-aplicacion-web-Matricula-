**Defina:**
    * Cree la DB con SQL Server
    * Desarrolle API con Node JS
    * Suba su proyecto a github.com
    * Tome en cuenta el uso de variables de entorno +1
---
## || Esquema Relacional ||
**Tablas**

**Maestro**
```
MaestroId
nombreDelMaestro
MatriculaId
```


**Asistencia**
```
 AsistenciaId
 diaDeAsistencia
 checkAsistencia
 MatriculaId

```


**Matricula**
```
MatriculaId
nombreDeLaMateria
```

**Alumno**
```
AlumnoId
NoCuenta
nombreDelAlumno
MatriculaId
```
---


//ver las clases a las que se encuentran matriculados
localhost:8090/app/v1/clases/matricula/estudiantes 
//ver las clases a las que se encuentran matriculados
//Los Maestros pueden ver los alumnos que están matriculados
localhost:8090/app/v1/Maestro/Clases

//Los Maestros pueden ver los alumnos que están matriculados en una clase
localhost:8090/app/v1/Matriculados/Clases/Maestros

//El administrador puede crear nuevos estudiantes
localhost:8090/app/v1/estudiante/nuevo
//Los Maestros pueden marcar asistencia de un alumnos a una clase en particular
localhost:8090/app/v1/Asistencia/student
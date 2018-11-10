

//Insertar en Matricula
insert into Matricula (nombreDeLaMateria) values ('Programacion Web II')
insert into Matricula (nombreDeLaMateria) values ('Diseño de aplicaciones web')
insert into Matricula (nombreDeLaMateria) values ('Herramienta al diseño web')

//Insertar en Alumno
insert into Alumno(NoCuenta, nombreDelAlumno, MatriculaId) values ('T61751046', 'James Guerrero','1')
insert into Alumno(NoCuenta, nombreDelAlumno, MatriculaId) values ('T61784929', 'Francisco Ayala','2')
insert into Alumno(NoCuenta, nombreDelAlumno, MatriculaId) values ('T61795053', 'Victor Sandoval','3')

//Insertar Maestro
insert into Maestro (nombreDelMaestro, MatriculaId) values ('Sergio Peralta', '2')
insert into Maestro (nombreDelMaestro, MatriculaId) values ('Carlos Varela', '1')
insert into Maestro (nombreDelMaestro, MatriculaId) values ('Elsenora Palacios', '3')

//El alumno esta matriculado materias
select Alumno.nombreDelAlumno, Matricula.nombreDeLaMateria from Alumno join Matricula on Alumno.MatriculaId = Matricula.MatriculaId;

//El Maestro solo puede ver en las materias que esta matriculado
select Maestro.nombreDelMaestro, Matricula.nombreDeLaMateria from Maestro join Matricula on Maestro.MatriculaId = Matricula.MatriculaId;

//Los Maestros pueden ver los alumnos que están matriculados en una clase. 
select Maestro.nombreDelMaestro, Alumno.nombreDelAlumno, Matricula.nombreDeLaMateria from Maestro join Alumno on Maestro.MaestroId = Alumno.AlumnoId join Matricula on Maestro.MaestroId = Matricula.MatriculaId where nombreDelAlumno ='James Guerrero'

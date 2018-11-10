create database escuelaMatricula

create table Alumno
(
 AlumnoId int primary key not null identity (1,1)
NoCuenta varchar(10) not null,
nombreDelAlumno varchar (30) null,
pictureStudent varchar(300),
MatriculaId int not null,
Constraint Fk_MatriculaId foreign key (MatriculaId) references Matricula (MatriculaId)
)

create table Asistencia 
(
    AsistenciaId int primary key not null identity (1,1),
    diaDeAsistencia date,
    checkDia varchar(20) not null,
    Matricula int not null,
    Constraint Fk_MatriculaId foreign key (MatriculaId) references Alumno(MatriculaId)
)
create table Maestro
 (
MaestroId int primary key not null Identity (1,1), 
nombreDelMaestro varchar(30) not null,
MatriculaId int not null,
Constraint Fk_MatriculaId foreign key (MatriculaId) references Matricula (MatriculaId)

)

create table Matricula (
MatriculaId int primary key not null identity(1,1),
nombreDeLaMateria varchar(30)


)
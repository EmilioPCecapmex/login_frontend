export const rows = [
	{ Id: "1", Nombre: "Pedro", ApellidoPaterno: "Perez", ApellidoMaterno: "Martinez", NombreUsuario: "pedro.perez", CorreoElectronico: "pedro.perez@test.com", CreadoPor: "admin.admin", ModificadoPor: "admin.admin", EstaActivo: { type: "Buffer", "data": [ 1 ] } },
	{ Id: "2", Nombre: "Arturo", ApellidoPaterno: "Gonzalez", ApellidoMaterno: "Ramirez", NombreUsuario: "arturo.ramirez", CorreoElectronico: "arturo.ramirez@test.com", CreadoPor: "admin.admin", ModificadoPor: "admin.admin", EstaActivo: { type: "Buffer", "data": [ 1 ] } },
	{ Id: "3", Nombre: "Brenda", ApellidoPaterno: "Cantu", ApellidoMaterno: "Alonso", NombreUsuario: "brenda.cantu", CorreoElectronico: "brenda.cantu@test.com", CreadoPor: "admin.admin", ModificadoPor: "admin.admin", EstaActivo: { type: "Buffer", "data": [ 1 ] } },
	{ Id: "4", Nombre: "Maricela", ApellidoPaterno: "Almazan", ApellidoMaterno: "Suarez", NombreUsuario: "maricela.almazan", CorreoElectronico: "maricela.almazan@test.com", CreadoPor: "admin.admin", ModificadoPor: "admin.admin", EstaActivo: { type: "Buffer", "data": [ 1 ] } },
	{ Id: "5", Nombre: "Francisco", ApellidoPaterno: "Rodriguez", ApellidoMaterno: "Juarez", NombreUsuario: "francisco.rodriguez", CorreoElectronico: "francisco.rodriguez@test.com", CreadoPor: "admin.admin", ModificadoPor: "admin.admin", EstaActivo: { type: "Buffer", "data": [ 1 ] } },
	{ Id: "6", Nombre: "Juan Antonio", ApellidoPaterno: "Leal", ApellidoMaterno: "Diaz", NombreUsuario: "juan.leal", CorreoElectronico: "juan.leal@test.com", CreadoPor: "admin.admin", ModificadoPor: "admin.admin", EstaActivo: { type: "Buffer", "data": [ 0 ] } },
];

export const columns = [
	// { field: "acciones", headerName: "Acciones", width: 100 },
	{ field: "Nombre", headerName: "Nombre", width: 180, hideable: false },
	{ field: "ApellidoPaterno", headerName: "Apellido Paterno", width: 180 },
	{ field: "ApellidoMaterno", headerName: "Apellido Materno", width: 180 },
	{ field: "NombreUsuario", headerName: "Nombre Usuario", width: 180 },
	{ field: "CorreoElectronico", headerName: "Correo Electrónico", width: 200 },
	{ field: "CreadoPor", headerName: "Creado Por", width: 150 },
	{ field: "ModificadoPor", headerName: "Modificado Por", width: 150 },
	{ field: "EstaActivoL", headerName: "Esta Activo", width: 110 },
];

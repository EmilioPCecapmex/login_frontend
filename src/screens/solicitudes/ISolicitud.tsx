export interface ISolicitud {
  Respuesta: string;
  Mensaje: string;
  Id: string;
  IdUsuario: string;
  NombreUsuario: string;
  DatosAdicionales: string;
  Estatus: number;
  TipoSolicitud: string;
  CreadoPor: string;
  NombreSolicitante: string;
  FechaDeCreacion: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  IdApp: string;
  AppNombre: string;
  tipoSoli: string;
}

export interface IDetalleSolicitud {
  ApellidoMaterno: string;
  ApellidoPaterno: string;
  Celular: string;
  CorreoElectronico: string;
  CreadoPor: string;
  Curp: string;
  Estatus: number;
  Ext: string;
  FechaDeCreacion: string;
  Id: string;
  IdTipoUsuario: string;
  Nombre: string;
  NombreApp: string;
  NombreSolicitante: string;
  NombreUsuario: string;
  Perfiles: string;
  PuedeFirmar: number;
  Puesto: string;
  Rfc: string;
  Roles: string;
  Telefono: string;
  TpoUsuario: string;
  UResponsable: string;
}

export interface iOnChangeInfo {
  ApellidoMaterno: boolean;
  ApellidoPaterno: boolean;
  Celular: boolean;
  CorreoElectronico: boolean;
  Curp: boolean;
  Ext: boolean;
  Id: boolean;
  IdTipoUsuario: boolean;
  Nombre: boolean;
  NombreApp: boolean;
  NombreSolicitante: boolean;
  NombreUsuario: boolean;
  PuedeFirmar: boolean;
  Puesto: boolean;
  Rfc: boolean;
  Roles: boolean;
  Telefono: boolean;
  TpoUsuario: boolean;
  UResponsable: boolean;
}
export interface iDetalleUsuario {
  Id: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  NombreUsuario: string;
  CorreoElectronico: string;
  Puesto: string;
  Curp: string;
  Rfc: string;
  Telefono: string;
  Ext: string;
  Celular: string;
  IdTipoUsuario: string;
  UResponsable: string;
}

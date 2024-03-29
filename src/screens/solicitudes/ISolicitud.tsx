export interface ISolicitud{
        Respuesta:          string;
        Mensaje:            string;
        Id:                 string;
        IdUsuario:          string;
        NombreUsuario:      string;
        DatosAdicionales:   string;
        Estatus:            number;
        TipoSolicitud:      string;
        CreadoPor:          string;
        NombreSolicitante:  string;
        FechaDeCreacion:    string;
        UltimaModificacion: string;
        ModificadoPor:      string;
        IdApp:              string;
        AppNombre:             string;
        tipoSoli: string;
      
}


export interface IDetalleSolicitud {
        Respuesta:         string;
        Mensaje:           string;
        Id:                string;
        Nombre:            string;
        ApellidoPaterno:   string;
        ApellidoMaterno:   string;
        NombreUsuario:     string;
        CorreoElectronico: string;
        Puesto:string;
        Curp:              string;
        Rfc:               string;
        Telefono:          string;
        Ext:               string;
        Celular:           string;
        IdTipoUsuario:     string;
        EstaActivo:        number;
        Deleted:           number;
        FechaDeCreacion:   string;
        CreadoPor:         string;
        Estatus:           number;
        DatosAdicionales:  string;
        NombreApp:      string;
        NombreSolicitante: string;
}

export interface iOnChangeInfo{
        Nombre: boolean,
        ApellidoPaterno:boolean,
        ApellidoMaterno:boolean,
        NombreUsuario:boolean,
        CorreoElectronico:boolean,
        Puesto:boolean,
        Curp:boolean,
        Rfc:boolean,
        Telefono:boolean,
        Ext:boolean,
        Celular:boolean,


}
export interface iDetalleUsuario{
Id: string,
Nombre: string,
ApellidoPaterno: string,
ApellidoMaterno: string,
NombreUsuario: string,
CorreoElectronico: string,
Puesto: string,
Curp: string,
Rfc: string,
Telefono: string,
Ext: string,
Celular: string,
IdTipoUsuario: string,

}
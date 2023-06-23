export interface IDependencia {
    Id: string;
    Nombre: string;
    Direccion: string;
    Telefono: string;
    IdTipoDependencia: string;
    TipoDependencia: string;
    IdTitular: string;
    Titular: string;
    IdPerteneceA: string;
    PerteneceA: string;
    Deleted: string;
}

export interface ITpoDependencia {
    Id: string;
    Nombre: string;
    Descripcion: string;
    Deleted: string;
}

export interface IDepartamento {
    Id: string;
    Descripcion: string;
    NombreCorto: string;
    IdResponsable: string;
    Responsable: string;
    UltimaActualizacion: string;
    FechaCreacion: string;
    ModificadoPor: string;
    Modificador: string;
    CreadoPor: string;
    Creador: string;
    Deleted: string;
}

export interface IRol {
    ControlInterno: string;
    Deleted: string;
    Descripcion: string;
    Id: string;
    Nombre: string;
}

export interface IPerfil {
    Deleted: string;
    Descripcion: string;
    Id: string;
    Referencia: string;
}

export interface IUResponsable {
    Clave: string;
    Deleted: string;
    Descripcion: string;
    Id: string;
}
export interface ISecretaria {
    Deleted: string;
    Direccion: string;
    Id: string;
    IdTitular: string;
    Nombre: string;
    Nombre_corto: string;
    PerteneceA: string;
    Titular: string;
}

export interface IUsuarios{
    Id:string;
    Nombre:string;
}
export interface User{
   name?:string,
   email:string,
   password:string,
   repeatPassword?:string
}

export interface UserLogin{
   IdUsuario:string,
   NombreUsuario:string,
   exp:number,
   iat:number
}

export interface imagen {
   CreadoPor: string;
   Descripcion: string;
   FechaCreacion: string;
   FechaFin: string;
   FechaInicio: string;
   Imagen: string;
   ModificadoPor: string;
   Nombre: string;
   UltimaActualizacion: string;
   deleted: string;
   id: string;
 }

 export default interface ResponseCatalogos {
   Id: string,
   Nombre?: string,
   Clave?: string,
   Descripcion?: string,
   id?: string
   NombreCorto?: string
   ControlInterno?: string
   Referencia?: string
}
export interface IHistorico {
    Id: string;
    IdRegistro: string;
    Tabla: string;
    Accion: string;
    IdPrevio: string;
     Contenido: string;//IHApp | IHRol | IHRolMenu | IHMenu;
    Fecha: string;
    Hora: string;
    Modificador: string;
}

export interface IHApp{
    Nombre: string;
    Descripcion: string;
    Path: string;
    EstaActivo: string;
}

export interface IHRol{
    Nombre: string;
    Descripcion: string;
    ControlInterno: string;
    IdApp: string;
    App: string;
}

export interface IHRolMenu{
    IdRol: string,
    Rol: string,
    IdMenu: string,
    Menu: string,
    IdApp: string,
    App: string
}

export interface IHMenu {
    Menu: string;
    IdApp: string;
    App: string;
    Descripcion: string;
    Nivel: number;
    Orden: number;
    IdMenuPadre: string;
    MenuPadre: string;
    Icon: string;
    Path: string;
    ControlInterno: string;
}

export interface IHPermiso{
    Permiso: string;
    Descripcion: string;
    ControlInterno: string;
    IdMenu: string;
    Menu: string;
    IdApp: string;
    App: string;
}

export interface IHMenuPermisoRol {
    IdMenu: string;
    Menu: string;
    IdPermiso: string;
    Permiso: string;
    IdRol: string;
    Rol: string;
}


function isValidString<T>(str: string, keys: Array<keyof T>): boolean {
    try {
        const obj = JSON.parse(str) as T;
        return keys.every(key => typeof obj[key] !== 'undefined');
    } catch (error) {
        return false;
    }
}

export function isIHApp(str: string): boolean {
    const keys: Array<keyof IHApp> = ['Nombre', 'Descripcion', 'Path', 'EstaActivo'];
    return isValidString<IHApp>(str, keys);
}

export function isIHRol(str: string): boolean {
    const keys: Array<keyof IHRol> = ['Nombre', 'Descripcion', 'ControlInterno', 'IdApp', 'App'];
    return isValidString<IHRol>(str, keys);
}

export function isIHRolMenu(str: string): boolean {
    const keys: Array<keyof IHRolMenu> = ['IdRol', 'Rol', 'IdMenu', 'Menu', 'IdApp', 'App'];
    return isValidString<IHRolMenu>(str, keys);
}

export function isIHMenu(str: string): boolean {
    const keys: Array<keyof IHMenu> = ['Menu', 'IdApp', 'App', 'Descripcion', 'Nivel', 'Orden', 'IdMenuPadre', 'MenuPadre', 'Icon', 'Path', 'ControlInterno'];
    return isValidString<IHMenu>(str, keys);
}

export function isIHPermiso(str: string): boolean {
    const keys: Array<keyof IHPermiso> = ['Permiso', 'Descripcion', 'ControlInterno', 'IdMenu', 'Menu', 'IdApp', 'App'];
    return isValidString<IHPermiso>(str, keys);
}

export function isIHMenuPermisoRol(str: string): boolean {
    const keys: Array<keyof IHMenuPermisoRol> = ['IdMenu', 'Menu', 'IdPermiso', 'Permiso', 'IdRol', 'Rol'];
    return isValidString<IHMenuPermisoRol>(str, keys);
}

export interface IUsuarios {
    codigo: string;
    correo: string;
    nombre: string;
    password: string;
    roles?: [];
    creado?: Date;
    ultimoAcceso?:Date;
    observacion?:string;
}
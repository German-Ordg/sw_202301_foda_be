import { ObjectId } from "mongodb";
import { IAuditable } from "../IAuditable";

export enum EStates{
    "ACT"="Active",
    "INA"= "Inactive",
    "BLQ"="Blocked"
}

export interface IUsuarios extends IAuditable {
    _id?: string| ObjectId;
    codigo: string;
    correo: string;
    nombre: string;
    password: string;
    state?: EStates;
    roles: [];
    creado?: Date;
    ultimoAcceso?:Date;
    observacion?:string;
}

export const DefaultUsuarios:IUsuarios={
    codigo: "",
    correo: "",
    nombre: "",
    password: "",
    createdAt: undefined,
    updatedAt: undefined,
    roles: []
}
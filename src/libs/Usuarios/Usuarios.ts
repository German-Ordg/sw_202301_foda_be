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


export class Usuarios{
    private usuarios : IUsuarios[];
    constructor(){
        this.usuarios = [];
    }
    add(nuevoUsuario : IUsuarios){
        const date = new Date();
        const nueva: IUsuarios = {
            ...nuevoUsuario,
        codigo: (Math.random()*1000).toString()+new Date().getTime().toString(),
        creado: date,
        ultimoAcceso: date
    }
    this.usuarios.push(nueva);
    return true;
    }
    getAll(){
        return this.usuarios;
    }
    getById(codigo: string){
        const usuarioToReturn = this.usuarios.find((emp)=>{
        return emp.codigo === codigo;
    });
    return usuarioToReturn;
}
    update(updateUsuario: IUsuarios){
        const newUsuario: IUsuarios[]= this.usuarios.map((emp)=>{
            if(emp.codigo === updateUsuario.codigo){
                return {...emp, ...updateUsuario, ultimoAcceso:new Date()};
            }
            return emp;
        });
        this.usuarios=newUsuario;
        return true;
    }
    delete(codigo:string){
        const usuariosToDelete = this.usuarios.find((emp)=>{
            return emp.codigo === codigo;
        });
        if(usuariosToDelete){
            const newUsuarios: IUsuarios[] = this.usuarios.filter((emp)=>{
                return emp.codigo !== codigo;
            });
            this.usuarios = newUsuarios;
            return true;
        }
        return false;
    }
}
//interfaces es propio de typescript no de javascript
//endpoint es la ruta de una red api que me devuelve una entidad
//estructura que define un tipo de dato
//al poner signo de interrogacion es que puede que venga o no
//metodo find recibe el valor de indice, el valor como tal, va uno por uno cuando encuentra true, ese elemento va ser deveulto
export interface IEmpresas {
    codigo: string;
    nombre: string;
    status: string;
    created?: Date;
    updated?: Date;
    observacion?: string;
}


export class Empresas{
    //objeto vacio
    /*private currentEmpresa: IEmpresas= {
        codigo: "",
        nombre: "",
        status: "",
        created: undefined,
        updated: undefined
    }*/
    private empresas : IEmpresas[];//dice que va ser un arreglo de iempresas
    constructor(){
        this.empresas = [];
    }

    

    getById(codigo: string){
        const empresaToReturn = this.empresas.find((emp)=>{
        return emp.codigo === codigo;
    });
    return empresaToReturn;
    }
    add(nuevaEmpresa : IEmpresas){
        const date = new Date();
        const nueva: IEmpresas = {
            ...nuevaEmpresa,
        codigo: (Math.random()*1000).toString()+new Date().getTime().toString(),
        created: date,
        updated: date
    }
    this.empresas.push(nueva);
    return true;
    }
    getAll(){
        return this.empresas;
    }
    update(updateEmpresa: IEmpresas){
        //vamos hacer inmutabilidad; map recorre el arreglo
        const newEmpresas: IEmpresas[]= this.empresas.map((emp)=>{
            if(emp.codigo === updateEmpresa.codigo){
                return {...emp, ...updateEmpresa, updated:new Date()};
            }
            return emp;
        });
        this.empresas=newEmpresas;
        return true;
    }
    delete(codigo:string){
        const empresaToDelete = this.empresas.find((emp)=>{
            return emp.codigo === codigo;
        });
        //validar si existe
        if(empresaToDelete){
            const newEmpresa: IEmpresas[] = this.empresas.filter((emp)=>{
                return emp.codigo !== codigo;//todos los que no son igual los agrega como verdadero al arreglo de new empresa y el falso no entra a la coleccion
            });
            this.empresas = newEmpresa;
            return true;
        }
        return false;
    }
}
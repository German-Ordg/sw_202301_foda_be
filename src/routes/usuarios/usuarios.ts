import express from 'express';
const router = express.Router();

import {Usuarios, IUsuarios} from '@libs/Usuarios/Usuarios';

const usuariosModel = new Usuarios();

usuariosModel.add({
    codigo: '',
    correo: 'usuario@gmail.com',
    nombre: 'Mi Usuario',
    password: "123456789"
    
});

router.get('/',(_req, res)=>{
    const jsonUrls = {
        "getAll": {"method":"get", "url":"usuario/all"},
        "getById": {"method":"get", "url":"usuario/byid/:id"},
        "new":{"method":"post", "url":"usuario/new"},
        "update": {"method":"put", "url":"usuario/upd/:id"},
        "delete":{"method":"delete", "url":"usuario/del/:id"}
    }
    res.status(200).json(jsonUrls);

});


router.get('/all',(_req, res)=>{
    res.status(200).json(usuariosModel.getAll());
    });

router.get('/byid/:id',(req,res)=>{
    const {id:codigo}=req.params;
    const usuario= usuariosModel.getById(codigo);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({"Error":"No se encontro usuario"});
    
});

router.post('/new', (req, res)=>{
    console.log("Usuarios /new request body:", req.body);
    const {
        correo="Jonh@gmail.com",
        nombre="John Doe Corp",
        password="123456789",
        roles=[]
    } = req.body;
    const newEmpresa: IUsuarios = {
    codigo: "",
    correo,
    nombre,
    roles,
    password
    }
    if (usuariosModel.add(newEmpresa)){ 
        return res.status(200).json({"created":true});
    }
    return res.status(404).json(
        {"error":"Error al agregar un nuevo usuario"});
});

router.put('/upd/:id',(req, res)=>{
    const {id} =req.params;
    const {
        correo="Jonh@gmail.com",
        nombre="John Doe Corp",
        password="123456789",
        roles=[],
        observacion=""
    }=req.body;

    const updateUsuario: IUsuarios={
        codigo:id,
        correo,
        nombre,
        password,
        roles,
        observacion
    };

    if(usuariosModel.update(updateUsuario)){
       return res.status(200).json({"updated": true});
    }
    return res.status(404).json({"error": "Error al registrar usuario"});
})

router.delete('/del/:id', (req,res)=>{
    const {id:codigo}=req.params;
    if(usuariosModel.delete(codigo)){
        return res.status(200).json({"deleted":true});
    }
    return res.status(404).json({"error":"No se pudo eliminar usuario"})
})
export default router;
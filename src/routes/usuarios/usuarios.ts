import express from 'express';
const router = express.Router();
import { UsuariosDao } from '@dao/models/Usuarios/UsuariosDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IUsuarios } from '@dao/models/Usuarios/IUsuarios';
import { usuarios } from '@libs/Usuarios/Usuarios';
const usuariosDao = new UsuariosDao(MongoDBConn);
let usuariosModel:usuarios;
usuariosDao.init().then(()=>{
  usuariosModel = new usuarios(usuariosDao);
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


router.get('/all', async(_req, res)=>{
    res.status(200).json(await usuariosModel.getAll());
    });

router.get('/byid/:id',async(req,res)=>{
    const {id:codigo}=req.params;
    const usuario= await usuariosModel.getById(codigo);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({"Error":"No se encontro usuario"});

});

router.post('/new', async (req, res)=>{
    console.log("Usuarios /new request body:", req.body);
    const {
        codigo="NA",
        correo="Jonh@gmail.com",
        nombre="John Doe Corp",
        password="123456789",
        roles=[]
    } = req.body;
    const newIUsuario: IUsuarios = {
        codigo,
        correo,
        nombre,
        roles,
        password,
        createdAt: undefined,
        updatedAt: undefined
    }
    if (await usuariosModel.add(newIUsuario)){ 
        return res.status(200).json({"created":true});
    }
    return res.status(404).json(
        {"error":"Error al agregar un nuevo usuario"});
});

router.put('/upd/:id', async(req, res)=>{
    const {id} =req.params;
    const {
        correo="----NotRecieved------",
        nombre="----NotRecieved------",
        password="----NotRecieved------",
        roles=[],
        observacion="",
        codigo="",
    }=req.body;

    if (
        nombre === "----NotRecieved------"
        || correo === "----NotRecieved------"
        || password === "----NotRecieved------"
      ) {
        return res.status(403).json({"error":"Debe venir el nombre, correo y password correctos"});
      }

    const updateUsuario: IUsuarios={
        codigo,
        correo,
        nombre,
        password,
        roles,
        observacion,
        createdAt: undefined,
        updatedAt: undefined
    };

    if(await usuariosModel.update(id,updateUsuario)){
       return res.status(200).json({"updated": true});
    }
    return res.status(404).json({"error": "Error al registrar usuario"});
})

router.delete('/del/:id', async (req,res)=>{
    const {id:codigo}=req.params;
    if(await usuariosModel.delete(codigo)){
        return res.status(200).json({"deleted":true});
    }
    return res.status(404).json({"error":"No se pudo eliminar usuario"})
})
export default router;
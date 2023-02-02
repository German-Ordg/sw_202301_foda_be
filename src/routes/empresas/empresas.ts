import express from 'express';
const router = express.Router();
//las rutas las llamaremos endpoint
//registrar los endpoint en router
//los request de http vienen algo especifico
//funcion de flecah gorda
import {Empresas, IEmpresas} from '@libs/Empresas/Empresas';

const empresasModel = new Empresas();

empresasModel.add({
    codigo: '',
    nombre: 'Mi EMpresa',
    status: 'Activo'
});

router.get('/',(_req, res)=>{
    const jsonUrls = {
        "getAll": {"method":"get", "url":"empresa/all"},
        "getById": {"method":"get", "url":"empresa/byid/:id"},
        "new":{"method":"post", "url":"empresa/new"},
        "update": {"method":"put", "url":"empresa/upd/:id"},
        "delete":{"method":"delete", "url":"empresa/del/:id"}
    }
    res.status(200).json(jsonUrls);
    //res es el handler
    //res.status(404); es pagina no encontrada
    //res.status(401); es pagina no autorizada
    //res.status(401); no esta autorizado el acceso
    //res.status(500); error de server
    //res.status(304); use cache de server
    //res.status(302); que se redirija
    //res.status(200); todo bien
});
/*ruter.get('/', function(_req,res){

});*/

router.get('/all',(_req, res)=>{
    res.status(200).json(empresasModel.getAll());
    });

router.get('/byid/:id',(req,res)=>{
    const {id:codigo}=req.params;
    const empresa= empresasModel.getById(codigo);
    if(empresa){
        return res.status(200).json(empresa);
    }
    return res.status(404).json({"Error":"No se encontro EMpresa"});
  
} );

   /* router.get('/all',(_req, res)=>{
        res.status(200).json({'msg':'not Implemented yet'})
        });*/


        //body es un registro de objetos json
router.post('/new', (req, res)=>{
    console.log("Empresas /new request body:", req.body);
    const {
        nombre="John Doe Corp",
        status="Activo"
    } = req.body;
    const newEmpresa: IEmpresas = {
    codigo: "",
    nombre,
    status
    }
    if (empresasModel.add(newEmpresa)){ 
        return res.status(200).json({"created":true});
    }
    return res.status(404).json(
        {"error":"Error al agregar una nueva empresa"});
});

router.put('/upd/:id',(req, res)=>{
    const {id} =req.params;
    const {
        nombre="John DOe Corp",
        status="Activo",
        observacion=""
    }=req.body;

    const UpdateEmpresa: IEmpresas={
        codigo:id,
        nombre,
        status,
        observacion
    };

    if(empresasModel.update(UpdateEmpresa)){
       return res.status(200).json({"updated": true});
    }
    return res.status(404).json({"error": "Error al registrar empresa"});
})

router.delete('/del/:id', (req,res)=>{
    const {id:codigo}=req.params;
    if(empresasModel.delete(codigo)){
        return res.status(200).json({"deleted":true});
    }
    return res.status(404).json({"error":"No se pudo eliminar Empresa"})
})

export default router;
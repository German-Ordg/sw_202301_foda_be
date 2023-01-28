import express from 'express';
const router = express.Router();
//las rutas las llamaremos endpoint
//registrar los endpoint en router
//los request de http vienen algo especifico
//funcion de flecah gorda
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
    //res.status(500); error de server
    //res.status(304); use cache de server
    //res.status(200); todo bien
});
/*ruter.get('/', function(_req,res){

});*/

export default router;
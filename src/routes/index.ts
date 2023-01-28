import express from 'express';
const router  = express.Router();
//REST API
//Internet -> HTTP -> REST API -> DB
// SOAP XML wsdl
//{} -> Json
//[] -> JSON
//{llave : valor}
//valor: texto, numerico, booleano, array [valores], objeto{lave:valor}
//Un objeto json puede contener otro objeto JSON

//Rest stateless, resource unique representation
//CRUD Create, Read, Update, Delete
// POST, Get, Update, Delete
//req recibe la petcion http
//res es lo que se va devolver al cliente


router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

 router.get('/version', (_req,res)=>{
  const version: string ="1.0.0";
  const jsonResp = {"name":"FODA Be", "Version": version};
  //String, number, boolean, types, interfaces, classes, enumerators
  res.json(jsonResp);
})

import empresasRouter from './empresas/empresas';
router.use('/empresas',empresasRouter);
//router.get royter.post router.put router.delete router.use
export default router;

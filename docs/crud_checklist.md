# create CRUD Checklist

 - /src/lib/entidad/entidad.ts
  - definir la clase, interfaz
  - /src/routes/entidad/entidad.ts
   - definir los endpoints usando express.Router y exportar la instancia del router
- /src/routes/index.ts
 - importar el router de la entidad y registrar el path (router.use)

Nota:son 5 EndPoints y 5 metodos en la libreria

- getAll
- getById
- add
- update
- delete
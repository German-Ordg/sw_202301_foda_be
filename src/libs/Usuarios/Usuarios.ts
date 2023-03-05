import { IUsuarios } from "@dao/models/Usuarios/IUsuarios";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class usuarios {
  private dao: IDataAccessObject;
  constructor(dao: IDataAccessObject) {
    this.dao = dao;
  }
  getAll() {
    return this.dao.findAll();
  }
  getById(id: string) {
    return this.dao.findByID(id);
  }
  add(nuevousuario: IUsuarios) {
    const date = new Date();
    const nueva: IUsuarios = {
      ...nuevousuario,
      creado: date,
      ultimoAcceso: date
    }
    return this.dao.create(nueva);
  }

  update(id: string, updateUsuario: IUsuarios) {
    const updateObject = { ...updateUsuario, ultimoAcceso: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}

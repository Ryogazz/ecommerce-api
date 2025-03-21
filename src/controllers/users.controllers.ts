import  { Request, Response }   from 'express';

type User = {
  id: number,
  name: string,
  email: string
}


let id = 0;
let usuarios: {id: number, name: string, email: string}[] = [];


export class UsersController {
  static getAllUsers(req: Request, res: Response) {
    res.send(usuarios);
  }

  static getUserById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const user = usuarios.find((u: User) => u.id === id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "Usuário não encontrado" });
    }
  }

  static createUser(req: Request, res: Response) {
    let user = req.body;
    user.id = ++id;
    usuarios.push(user);
    res.send({ message: "Usuário criado com sucesso!" });
  }

  static updateUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const indexOf = usuarios.findIndex((u: User) => u.id === id);
    usuarios[indexOf].name = req.body.name;
    usuarios[indexOf].email = req.body.email;
      res.send({ message: "Usuário atualizado com sucesso!" });
}

  static deleteUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
  const index = usuarios.findIndex((u: User) => u.id === id);
  if (index !== -1) {
    const deletedUser = usuarios.splice(index, 1)[0];
    res.send({ message: "Usuário excluído com sucesso!", user :deletedUser });
  } else {
    res.status(404).send({ message: "Usuário não encontrado", });
  }
  }

}
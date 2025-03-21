import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World! v2 - Node.js');
});

app.get("/users",(req: Request, res: Response) => {
  let usuarios = [{
    nome: "João",
    idade: 30
  },
  {
    nome: "Maria",
    idade: 25
  }]

  res.send(usuarios);
  
})

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
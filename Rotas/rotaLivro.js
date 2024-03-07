import { Router } from "express";
import LivroCtrl from "../Controle/livroCtrl.js";

const livroCtrl = new LivroCtrl();
const rotaLivro = new Router();

rotaLivro
.get('/', livroCtrl.consultar)
.get('/:termo', livroCtrl.consultar)
.post('/', livroCtrl.gravar)
.patch('/', livroCtrl.atualizar)
.put('/', livroCtrl.atualizar)
.delete('/', livroCtrl.excluir);

export default rotaLivro;
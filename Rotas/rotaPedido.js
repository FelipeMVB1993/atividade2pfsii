import { Router } from "express";
import PedidoCtrl from "../Controle/pedidoCtrl.js";

const rotaPedido = new Router();
const pedidoCtrl = new PedidoCtrl();

rotaPedido
.get('/', pedidoCtrl.consultarTodos)
.get('/:termo', pedidoCtrl.consultar)
.post('/', pedidoCtrl.gravar)
.put('/', pedidoCtrl.atualizar)
.delete('/', pedidoCtrl.excluir);
//.patch('/', pedidoCtrl.atualizar)
//.put('/', pedidoCtrl.atualizar)

export default rotaPedido;
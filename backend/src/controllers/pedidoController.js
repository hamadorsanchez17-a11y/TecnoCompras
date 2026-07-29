const PedidoService = require("../services/pedidoService");

class PedidoController {

    static async crearPedido(req, res) {

        try {
    
            const { id_direccion, id_metodo } = req.body;
            const idUsuario = req.usuario.id;

            const resultado = await PedidoService.crearPedido(
                idUsuario,
                id_direccion,
                id_metodo
            );

            return res.status(200).json({
                ok: true,
                ...resultado
            });

        } catch (error) {

            return res.status(400).json({
                ok: false,
                mensaje: error.message
            });

        }

    }
    static async obtenerPedidos(req,res){

    try{

        const idUsuario = req.usuario.id;

        const pedidos =
            await PedidoService.obtenerPedidos(
                idUsuario
            );

        return res.status(200).json({
            ok:true,
            pedidos
        });

    }catch(error){

        return res.status(400).json({
            ok:false,
            mensaje:error.message
        });

    }
    

}

static async obtenerDetallePedido(req, res) {

    try {

        const idPedido = req.params.id;
        const idUsuario = req.usuario.id;

        const detalle = await PedidoService.obtenerDetallePedido(
            idPedido,
            idUsuario
        );

        if (detalle.length === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: "Pedido no encontrado."
            });
        }

        return res.status(200).json({
            ok: true,
            pedido: {
                ...detalle[0],
                nombre: detalle[0].cliente
            },
            productos: detalle.map(p => ({
                nombre: p.producto,
                cantidad: p.cantidad,
                precio: p.precio
            }))
        });

    } catch (error) {

        return res.status(400).json({
            ok: false,
            mensaje: error.message
        });

    }

}


static async obtenerTodosLosPedidos(req,res){

    try{

        const pedidos =
            await PedidoService.obtenerTodosLosPedidos();

        return res.status(200).json({
            ok:true,
            pedidos
        });

    }catch(error){

        return res.status(400).json({
            ok:false,
            mensaje:error.message
        });

    }

}
static async actualizarEstadoPedido(req,res){

    try{

        const idPedido = req.params.id;
        const { id_estado_pedido } = req.body;

        const resultado =
            await PedidoService.actualizarEstadoPedido(
                idPedido,
                id_estado_pedido
            );

        return res.status(200).json({
            ok:true,
            ...resultado
        });

    }catch(error){

        return res.status(400).json({
            ok:false,
            mensaje:error.message
        });

    }

}
}

module.exports = PedidoController;
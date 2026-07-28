const brandService = require("../services/brandService");

exports.getAllBrands = async (req, res) => {

    try {

        const marcas = await brandService.getAllBrands();

        res.json(marcas);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

exports.getBrandById = async (req, res) => {

    try {

        const { id } = req.params;

        const marca = await brandService.getBrandById(id);

        res.json(marca);

    } catch (error) {

        if (error.message === "Marca no encontrada.") {
            return res.status(404).json({
                mensaje: error.message
            });
        }

        res.status(500).json({
            mensaje: error.message
        });

    }

};

exports.createBrand = async (req, res) => {

    try {

        await brandService.createBrand(req.body);

        res.status(201).json({
            mensaje: "Marca creada correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

exports.updateBrand = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await brandService.updateBrand(id, req.body);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Marca no encontrada."
            });
        }

        res.json({
            mensaje: "Marca actualizada correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

exports.deleteBrand = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await brandService.deleteBrand(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Marca no encontrada."
            });
        }

        res.json({
            mensaje: "Marca eliminada correctamente."
        });

    } catch (error) {

    console.error(error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
        return res.status(400).json({
            mensaje: "No se puede eliminar la marca porque tiene productos asociados."
        });
    }

    res.status(500).json({
        mensaje: "Error interno del servidor."
    });
    }
};


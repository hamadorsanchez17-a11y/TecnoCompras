const categoryService = require("../services/categoryService");

exports.getAllCategories = async (req, res) => {

    try {

        const categorias = await categoryService.getAllCategories();

        res.json(categorias);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

exports.getCategoryById = async (req, res) => {

    try {

        const { id } = req.params;

        const categoria = await categoryService.getCategoryById(id);

        res.json(categoria);

    } catch (error) {

        if (error.message === "Categoría no encontrada.") {
            return res.status(404).json({
                mensaje: error.message
            });
        }

        res.status(500).json({
            mensaje: error.message
        });

    }

};

exports.createCategory = async (req, res) => {

    try {

        await categoryService.createCategory(req.body);

        res.status(201).json({
            mensaje: "Categoría creada correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

exports.updateCategory = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await categoryService.updateCategory(id, req.body);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Categoría no encontrada."
            });
        }

        res.json({
            mensaje: "Categoría actualizada correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

exports.deleteCategory = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await categoryService.deleteCategory(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Categoría no encontrada."
            });
        }

        res.json({
            mensaje: "Categoría eliminada correctamente."
        });

    } catch (error) {

        console.error(error);

        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(400).json({
                mensaje: "No se puede eliminar la categoría porque tiene productos asociados."
            });
        }

        res.status(500).json({
            mensaje: "Error interno del servidor."
        });
    }
};
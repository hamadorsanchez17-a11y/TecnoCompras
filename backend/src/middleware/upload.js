const multer = require("multer");
const path = require("path");

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/products/");
    },

    filename: (req, file, cb) => {

        const extension = path.extname(file.originalname);

        cb(null, Date.now() + extension);

    }
});

// Validar tipo de archivo
const fileFilter = (req, file, cb) => {

    const tiposPermitidos = /jpeg|jpg|png|webp/;

    const extension = tiposPermitidos.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mime = tiposPermitidos.test(file.mimetype);

    if (extension && mime) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten imágenes."));
    }

};

module.exports = multer({
    storage,
    fileFilter
});
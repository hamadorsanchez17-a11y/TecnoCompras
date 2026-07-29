const dashboardService = require("../services/dashboardService");

const getDashboard = async (req, res) => {
    try {

        const dashboard = await dashboardService.getDashboard();

        res.status(200).json({
            success: true,
            data: dashboard
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            mensaje: "Error al obtener el dashboard"
        });

    }
};

module.exports = {
    getDashboard
};
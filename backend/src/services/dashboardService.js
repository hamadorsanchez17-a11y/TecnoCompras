const dashboardModel = require("../models/dashboardModel");

const getDashboard = async () => {
    return await dashboardModel.getDashboard();
};

module.exports = {
    getDashboard
};
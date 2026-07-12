const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`servidor ejecutandose en http:/localhost:${PORT}`);
});
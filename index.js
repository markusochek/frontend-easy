const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async function (request, response) {
    response.sendFile(__dirname + "/index.html")
})
app.get("/main.js", async function (request, response) {
    response.sendFile(__dirname + "/main.js")
})
app.get("/style.css", async function (request, response) {
    response.sendFile(__dirname + "/style.css")
})

app.listen(3001);
// app.listen(process.env.PORT, () => {
//     console.log(`App listening at port ${process.env.PORT}`);
// });
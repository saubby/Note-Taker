const path = require("path");
const PORT = process.env.PORT || 300;
const express = require('express');
const app = express();
const api = require("./routes/api.js");
const html = require("./routes/html.js");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(api);
app.use(html);

app.listen(PORT, function () {
    console.log(`App listening on port number ${PORT}`);
});
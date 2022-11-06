const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

app.get('/mail', (req, res) => {
    const data = {
        sender: req.body.name,
        email: req.body.email,
        text: req.body.text
    }
});

app.listen(port, () => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("server started at port:", port);
    }
})
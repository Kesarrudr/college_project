const express = require("express");

const PORT = 3001;

const app = express();

app.get("/", (req, res) => res.json({ msg: "hey from the rudr and skasham" }));

app.listen(PORT, () => console.log(`Serer Strted on port ${PORT}`));

const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");

app.use(express.static(path.join(__dirname, "/")));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "index.html");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.err(err);
      return;
    } else {
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

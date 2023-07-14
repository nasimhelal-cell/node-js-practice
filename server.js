const app = require("./app");

// create a server
let port = 8001;
app.listen(port, (req, res) => {
  console.log("Server has started at PORT : " + port);
});

const app = require("./app");
// create a server
let port = 8001;
app.listen(port, (req, res) => {
  console.log("App is running at port : " + port);
});

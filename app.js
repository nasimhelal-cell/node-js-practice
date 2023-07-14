/*=================================================================================
            Day - 1 -->> readline module
=================================================================================*/
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("please enter your name:", (name) => {
//   console.log("you entered : " + name);
//   rl.close();
// });

// rl.on("close", () => {
//   console.log("interface closed");
//   process.exit(0);
// });

/*=================================================================================
            Day - 2  --> reading & writing files synchronously
=================================================================================*/
// const fs = require("fs");
// const textInput = fs.readFileSync("./files/input.txt", "utf-8");
// console.log(textInput);

// fs.writeFileSync(
//   "./files/output.txt", // non existing file name dile notun kore create hbe
//   "Ami janina ami ei playlist at sesh korte parbo kina "
// );

/*=================================================================================
            Day - 3  -->asynchronous nature of Node JS
=================================================================================*/
//non blocking code
// const fs = require("fs");
// fs.readFile("./files/output.txt", "utf-8", (err, data) => {
//   console.log(err ? "no such file or directory" : data);
// });
// console.log("Reading file.....");
/*=================================================================================
            Day - 4  --> creating a simple web server
=================================================================================*/
// const http = require("http");
// // step-1:CREATE THE SERVER
// const server = http.createServer((req, res) => {
//   res.end("Hello from the server");
//   //   console.log(res);
// });
// //step-2: START THE SERVER
// server.listen(8000, "127.0.0.1", () => {
//   console.log("server has started");
// });

/*=================================================================================
            Day - 5  --> How the web works
=================================================================================*/
// const http = require("http");
// const fs = require("fs");
// const html = fs.readFileSync("./template/index.html", "utf-8");

// //step - 1 : create server
// const server = http.createServer((req, res) => {
//   console.log("A new request received");
//   res.end(html);
//   console.log(req.url);
// });

// //step - 2 : listen the server
// server.listen(8000, "127.0.0.1", () => {
//   console.log("server is running at port : " + "8000");
// });

/*=================================================================================
            Day - 6  --> Creating routes
=================================================================================*/
// const http = require("http");
// const fs = require("fs");

// //step - 1 : create server
// const server = http.createServer((req, res) => {
//   let path = req.url;
//   if (path === "/" || path === "/home") {
//     res.end("Home page ");
//   } else if (path === "/about") {
//     res.end("About page");
//   } else if (path === "/contact") {
//     res.end("contact page");
//   } else {
//     res.end("404 ! Page not found");
//   }
// });

// //step - 2 : listen the server
// server.listen(8000, "127.0.0.1", () => {
//   console.log("server is running at port : " + "8000");
// });
/*=================================================================================
            Day - 7  --> Sending Dunamic HTML response and set Response header
=================================================================================*/
//const http = require("http");
//const fs = require("fs");
//const url = require("url");
//
//const homeHTML = fs.readFileSync("./template/index.html", "utf-8");
//let usersArray = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
//let userHtml = fs.readFileSync("./template/users.html", "utf-8");
//let userhtmlarray = usersArray.map((user) => {
//  let output = userHtml.replace("{{%ID%}}", user.id);
//  output = output.replace("{{%NAME%}}", user.name);
//  output = output.replace("{{%USERNAME%}}", user.username);
//  output = output.replace("{{%EMAIL%}}", user.email);
//  output = output.replace("{{%USER_DETAILS_ID%}}", user.id);
//  return output;
//});

// step-1:Create server
//server emmiter inherits from eventemmiter
//const server = http.createServer();
//
//server.on("request", (req, res) => {
//  console.log("A new request is received");
//  // let path = req.url.toLocaleLowerCase();
//  let { query, pathname: path } = url.parse(req.url, true);
//
//  if (path === "/" || path === "/home") {
//    res.end(homeHTML.replace("{{%content%}}", userHtml));
//  } else if (path === "/contact") {
//    res.end(homeHTML.replace("{{%content%}}", "Contact Page"));
//  } else if (path === "/about") {
//    res.end(homeHTML.replace("{{%content%}}", "About Page"));
//  } else if (path === "/portfolio") {
//    res.end(homeHTML.replace("{{%content%}}", "Portfolio page "));
//  }
//  //wirte here
//  else if (path === "/users") {
//    if (!query.id) {
//      res.writeHead(200, {
//        "Content-Type": "text/html",
//      });
//      res.end(homeHTML.replace("{{%content%}}", userhtmlarray.join(",")));
//    } else res.end(`This is a product and id is = ${query.id}`);
//  } else {
//    res.writeHead(404, {
//      "Content-Type": "text/html",
//    });
//    res.end(homeHTML.replace("{{%content%}}", "404! Page"));
//  }
//});
////step-2: listen the server
//server.listen(8000, (req, res) => {
//  console.log("server is running at port : 8000");
//});
/*=================================================================================
            Day - 8  --> Working with json Data
=================================================================================*/

let express = require("express");

const {
  getAllMovies,
  getASingleMovie,
  createAMovie,
  updateAMovie,
  deleteAMovie,
} = require("./handlers/routeHandlers");
let app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// app.get("/api/v1/movies", getAllMovies);
// app.get("/api/v1/movies/:id", getASingleMovie);
// app.post("/api/v1/movies", createAMovie);
// app.patch("/api/v1/movies/:id", updateAMovie);
// app.delete("/api/v1/movies/:id", deleteAMovie);

app.route("/api/v1/movies").get(getAllMovies).post(createAMovie);
app
  .route("/api/v1/movies/:id")
  .get(getASingleMovie)
  .patch(updateAMovie)
  .delete(deleteAMovie);

// create a server
let port = 8001;
app.listen(port, (req, res) => {
  console.log("App is running at port : " + port);
});

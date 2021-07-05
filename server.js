const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);
server.listen(port);

var db = require("./db.json");
server.get("/get/carousel", (req, res) => {
  let id = req.query["id"];
  if (id != null && id >= 0) {
    let result = db.carouselList.find((carousel) => {
      return carousel.id == id;
    });
    if (result) {
      let { id, ...carousel } = result;
      res.status(200).jsonp(carousel);
    } else {
      res.status(400).jsonp({
        error: "Bad userId",
      });
    }
  } else {
    res.status(400).jsonp({
      error: "No valid userId",
    });
  }
});

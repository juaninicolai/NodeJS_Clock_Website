const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const nytProxy = createProxyMiddleware({
  target: "https://api.nytimes.com",
  changeOrigin: true,
});

app.use(express.json());
app.use("/svc", nytProxy);
app.get("/", (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(8080, () => {
  console.log("This port runs on port 8080");
});

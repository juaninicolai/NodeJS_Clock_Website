const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const { createProxyMiddleware } = require("http-proxy-middleware");
const nytProxy = createProxyMiddleware({
  target: "https://api.nytimes.com",
  changeOrigin: true,
});

app.use(express.json());
app.use("/svc", nytProxy);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log("This port runs on port 8080");
});

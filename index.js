const express = require("express");
const cors = require("cors");

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1708865",
  key: "7009eab708767ebfa63a",
  secret: "febc1a28b1dff7f1b3e0",
  cluster: "ap1",
  useTLS: true,
});

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:4200",
    ],
  })
);

app.use(express.json());

app.post("/api/messages", async (req, res) => {
  await pusher.trigger("chat", "message", {
    username: req.body.username,
    message: req.body.message,
  });
  res.json([]);
});

console.log("listening to port 8080");
app.listen(8000);

const express = require("express");
const ordersRouter = require("./routes/orders.js")
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/orders", ordersRouter);

app.listen(PORT, () => {console.log("Server Listening on PORT:", PORT);});
  
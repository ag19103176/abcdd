var express = require("express");
var app = express();
const dotenv = require("dotenv");
dotenv.config();
const db = require("./db");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const createCustomerTable = require("./routes/createCustomerTable");
// const createInvoiceTable = require("./routes/createInvoiceTable");
// const createTicketTable = require("./routes/createTicketTable");
// const demoTable = require("./routes/demo");
// const getAll = require("./routes/getAll");

app.get("/", function (req, res) {
  res.send("API is running");
  console.log("API is running");
});

app.use("/api", createCustomerTable);
// app.use("/api", createInvoiceTable);
// app.use("/api", createTicketTable);
// app.use("/api", demoTable);
// app.use("/api", getAll);

app.listen(8000, () => {
  console.log("listening on port 8000");
});

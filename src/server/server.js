import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import contactsRouter from "./routes/contacts.js";
import net from "net";

const app = express();
const DEFAULT_PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/contacts", contactsRouter);

// Function to check if the port is available
const checkPortAvailability = (port) =>
  new Promise((resolve, reject) => {
    const tester = net
      .createServer()
      .once("error", (err) =>
        err.code === "EADDRINUSE" ? resolve(false) : reject(err)
      )
      .once("listening", () =>
        tester.once("close", () => resolve(true)).close()
      )
      .listen(port);
  });

// Start the server
const startServer = async () => {
  let port = DEFAULT_PORT;
  while (!(await checkPortAvailability(port))) {
    console.log(`Port ${port} is in use. Trying ${port + 1}...`);
    port++;
  }

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();

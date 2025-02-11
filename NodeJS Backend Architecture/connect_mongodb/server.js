import app from "./src/app.js";

const POST = 3000;

const server = app.listen(POST, () => {
  console.log("Server is running on port 3000");
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
  });
});

import app from "./src/app.js";

const POST = process.env.DEV_APP_POST || 3000;

const server = app.listen(POST, () => {
  console.log(`Server is running on port ${POST}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
  });
});

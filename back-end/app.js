const express = require("express");
const app = express();
const port = 3000;

const initialAppMetadata = {
  appCode: "SB1",
  DBTier: "DEV",
  appID: 21,
};

app.get("/get-app-metadata", (req, res) => {
  const items = [{ result: JSON.stringify(initialAppMetadata) }];
  res.send({
    items: items,
  });
});

app.get("/change-app-data", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server started");
});

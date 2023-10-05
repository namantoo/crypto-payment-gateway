const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../db/conn");

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "this is create message api get",
  });
});

router.post("/", async (req, res) => {
  const date = new Date();
  collectionName = `trx${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  const collectionList = await mongoose.connection.db
    .listCollections()
    .toArray();

  let Model;
  if (!collectionList.map((c) => c.name).includes(collectionName)) {
    const newCollectionSchema = new mongoose.Schema({
      amount: String,
      transaction_id: String,
      username: String,
      email_id: String,
      currency: String,
      payment_status: String,
      sixdigitcode: String,
    });

    Model =
      mongoose.models[collectionName] ||
      mongoose.model(collectionName, newCollectionSchema);
  } else if (mongoose.models[collectionName]) {
    Model = mongoose.models[collectionName];
  } else {
    return res.status(500).send("Unable to find or create model");
  }
  const pendingTransactions = await Model.find({ payment_status: "pending" });

  let usedCodes = pendingTransactions
    .map((doc) => Number(doc.sixdigitcode))
    .filter((code) => !isNaN(code))
    .sort((a, b) => a - b);

  let sixdigitcode;

  if (usedCodes.length > 0) {
    for (let i = 0; i < usedCodes.length; i++) {
      if (usedCodes[i + 1] - usedCodes[i] > 1) {
        sixdigitcode = String(usedCodes[i] + 1).padStart(6, "0");
        break;
      }
    }

    if (!sixdigitcode) {
      sixdigitcode = String(usedCodes[usedCodes.length - 1] + 1).padStart(
        6,
        "0"
      );
    }
  } else {
    sixdigitcode = "000001";
  }
  const register = new Model({
    amount: req.body.amount,
    username: req.body.username,
    transaction_id: req.body.transaction_id,
    email_id: req.body.email_id,
    currency: req.body.currency,
    payment_status: "pending",
    sixdigitcode: sixdigitcode,
  });
  await register.save();

  res.send(collectionName);
});

module.exports = router;

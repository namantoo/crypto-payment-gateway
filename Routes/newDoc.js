const express = require("express");
const router = express.Router();
// const Admin = require("../models/CreateAdmin");
const mongoose = require("mongoose");
require("../db/conn");
//new doc code
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "this is create message api get",
  });
});
// create new admin
router.post("/", async (req, res) => {
  const date = new Date();
  collectionName = `trx${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  const collectionList = await mongoose.connection.db
    .listCollections()
    .toArray();

  let Model;
  if (!collectionList.map((c) => c.name).includes(collectionName)) {
    const newCollectionSchema = new mongoose.Schema({
      // define the schema as needed
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

  // Check if there are any used codes
  if (usedCodes.length > 0) {
    for (let i = 0; i < usedCodes.length; i++) {
      // If there's a gap in the sequence, use it
      if (usedCodes[i + 1] - usedCodes[i] > 1) {
        sixdigitcode = String(usedCodes[i] + 1).padStart(6, "0");
        break;
      }
    }

    // If no gap was found, use the next number
    if (!sixdigitcode) {
      sixdigitcode = String(usedCodes[usedCodes.length - 1] + 1).padStart(
        6,
        "0"
      );
    }
  } else {
    // If no used codes, start from 000001
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
  //     const register = new newCollectionSchema({
  //         amount: req.body.amount,
  //         transaction_id: req.body.transaction_id,
  //         username: req.body.username,
  //         email_id: req.body.email_id,
  //         currency: req.body.currency,
  //       });
  //    register.save();
});

module.exports = router;

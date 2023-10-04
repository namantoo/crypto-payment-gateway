const express = require("express");
const router = express.Router();
const Address = require("../models/AddressesBalances");
const mongoose = require("mongoose");
require("../db/conn");

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "this is create message api get",
  });
});
// create new admin
router.post("/", async (req, res) => {
  try {
    const newDocument = new Address({
      address: req.body.address,
      status: req.body.status,
     balance: req.body.balance
    });
    await newDocument.save();
    return res.status(200).json({
      message: "New address document created",
    });
  } catch (error) {
    // Server error
    return res.status(500).json({
      error: error.message,
    });
  }
});
// Define the endpoint
const sortBalances = (addresses) => {
  const pendingBalances = [];
  const nonPendingBalances = [];

  for (let address of addresses) {
    const balance = parseFloat(address.balance);
    const balanceObject = { balance, addressDoc: address };
    if (address.status === "pending") {
      pendingBalances.push(balance);
    } else {
      nonPendingBalances.push(balanceObject);
    }
  }

  return { pendingBalances, nonPendingBalances };
};


router.post('/balances', async (req, res) => {
  try {
    const addresses = await Address.find({});
    const{senderAddress, amount} = req.body
    console.log(senderAddress, amount)
    
    const { pendingBalances, nonPendingBalances } = sortBalances(addresses);
    console.log(pendingBalances, nonPendingBalances)
    nonPendingBalances.sort((a, b) => a.balance - b.balance);

    let zeroCount = 0;
    for (let balanceObject of nonPendingBalances) {
      if (balanceObject.balance === 0) {
        zeroCount++;
      }
    }
    

    console.log(nonPendingBalances[zeroCount])

    let responseMessage = zeroCount === nonPendingBalances.length 
      ? "All zeros" 
      : `Number of zeros: ${zeroCount}`;
      const addressToUpdate = nonPendingBalances[zeroCount].addressDoc;
      addressToUpdate.status = 'pending';
      await addressToUpdate.save();
      responseMessage += `; Address at index ${zeroCount} has been updated to 'pending'`;
    res.json({
      pendingBalances,
      nonPendingBalances,
      message: responseMessage,
    });
  } catch(err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});






module.exports = router;

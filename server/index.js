const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "111e4a10c97e3bb4c6bdf391c4965a61bc4f44ec": 100,
  "192999660efa3472ea92bb94e1c469efb8cdfa0b": 50,
  "13632aa67c2499d9898178990d3fa5767b7eeeab": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature from client-side application
  //recover the public key and address from the signature

  const { signature, msgHash, amount, recipient } = req.body;

  const sendersPublicKey = signature.recoverPublicKey(msgHash).toRawBytes();
  const sendersAddress = toHex(keccak256(sendersPublicKey.slice(1)).slice(-20));
  console.log(sendersAddress);
  console.log(amount, recipient);

  setInitialBalance(sendersAddress);
  setInitialBalance(recipient);

  if (balances[sendersAddress] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sendersAddress] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sendersAddress] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

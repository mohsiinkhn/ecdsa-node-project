import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

function Transfer({ privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const msg = sendAmount + recipient;
  const msgHash = keccak256(utf8ToBytes(msg));

  async function transfer(evt) {
    evt.preventDefault();

    const signature = await secp256k1.sign(msgHash, privateKey);
    // const key = signature.recoverPublicKey(msgHash).toRawBytes();
    // const address = toHex(keccak256(key.slice(1)).slice(-20));
    // console.log(address);

    try {
      console.log("try");
      console.log("balance");
      const {
        data: { balance },
      } = await server.post(`send`, {
        signature: signature,
        msgHash: msgHash,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
      console.log("balance");
    } catch (ex) {
      console.log("catch");
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;

const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey);
const address = keccak256(publicKey.slice(1)).slice(-20);

console.log("private key:", toHex(privateKey));
console.log("public key:", toHex(publicKey));
console.log("address:", toHex(address));

/*
private key: d7b3ced2da7bff4f9680fd1027fb165940a8252417284e8345c6f6aa91531a59
public key: 021d4b3c73258f19be9f8635b54e3727bc7c4adf177eda01f4e8db4bca995dac16
address: 111e4a10c97e3bb4c6bdf391c4965a61bc4f44ec

private key: e59f80655753cc59959d9449176881f649be877e9345438314990069e52e52f7
public key: 03d27695eb0a175ea18af483bce76b690bb4fd18093124643065a3111f6b2c539b
address: 192999660efa3472ea92bb94e1c469efb8cdfa0b

private key: 83eec04c76d40396f990c7b17975f03193862d20050bc6ab3a0511ca92b9a5cc
public key: 0350b2617e2b2cf74970815995f966d9571d149b2f8d2394e8ccd0fc3fac44cc2b
address: 13632aa67c2499d9898178990d3fa5767b7eeeab
*/

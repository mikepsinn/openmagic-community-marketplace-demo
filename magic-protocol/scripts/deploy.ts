import { ethers } from "hardhat";

async function main() {
  const OrderBook = await ethers.getContractFactory("OrderBook");
  const orderbook = await OrderBook.deploy();
  await orderbook.deployed();

  console.log("Contract deployed to:", orderbook.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

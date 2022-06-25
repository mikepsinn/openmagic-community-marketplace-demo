import { ethers, upgrades } from "hardhat";

const proxyAddress = "0x3aE1be68Ce9828Bc7684A6181Ee6B140ED0AD212";

async function main() {
  const OrderBook = await ethers.getContractFactory("OrderBook");
  const upgraded = await upgrades.upgradeProxy(proxyAddress, OrderBook);

  console.log("Contract Successfully upgraded to:", proxyAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

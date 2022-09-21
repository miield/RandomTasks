import { ethers } from "hardhat";
import hre from "hardhat";

async function main() {

  const [deployer] = await hre.ethers.getSigners();

  const name =  "OYIN TOKEN";
  const symbol = "OYIN";
  const totalSupply = hre.ethers.utils.parseUnits("100000", 18);

  const OyinToken = await ethers.getContractFactory("contracts/ERC20.sol:OyinToken");
  // const oyinToken = await OyinToken.connect(deployer).deploy(name, symbol, totalSupply, decimals);
  const oyinToken = await OyinToken.connect(deployer).deploy();

  await oyinToken.deployed();

  console.log("OyinToken is deployed to:", oyinToken.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

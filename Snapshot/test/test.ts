import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";

describe("OyinToken contract", function () {

  let oyinToken: Contract;
  let owner: SignerWithAddress;
  // let other: SignerWithAddress;
  let id;

  before(async function() {

    [owner] = await ethers.getSigners();

    const name = "OyinToken";
    const symbol = "OYIN";
    const totalSupply = ethers.utils.parseUnits("100000", 18);

    const OyinToken = await ethers.getContractFactory("contracts/ERC20.sol:OyinToken");
    oyinToken = await OyinToken.connect(owner).deploy();

    await oyinToken.deployed();
    console.log("OyinToken is deployed to:", oyinToken.address);
  })

  it("Snapshot should revert if not called by the owner", async function () {
    const snapmeshot = await oyinToken.connect(owner).snapshot();
    expect(snapmeshot).to.be.revertedWith("Ownable: caller is not the owner"); 
  });

  it("Snapshot should snapshot", async function () {
    const snapmeshot = await oyinToken.connect(owner).snapshot();

  });

});

import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
const { BigNumber } = require("ethers");

describe("OyinToken contract", function () {

  let oyinToken: Contract;
  let owner: SignerWithAddress;
  let other: SignerWithAddress;
  let id;

  before(async function() {

    [owner] = await ethers.getSigners();

    const name = "OyinToken";
    const symbol = "OYIN";
    const totalSupply = ethers.utils.parseUnits("100000", 18);

    const OyinToken = await ethers.getContractFactory("OyinToken");
    oyinToken = await OyinToken.connect(owner).deploy();

    await oyinToken.deployed();
    console.log("OyinToken is deployed to:", oyinToken.address);

    const decimals = await oyinToken.decimals();

  })

  it("Snapshot should revert if not called by the owner", async function () {
    const snapmeshot = await oyinToken.connect(owner).snapshot();
    expect(snapmeshot).to.be.revertedWith("Ownable: caller is not the owner"); 
  });

  it('Has a valid decimal', async function () {
    expect((await oyinToken.decimals()).toString()).to.equal('18');
  })

  it('Has a valid total supply', async function () {
    const expectedSupply = ethers.utils.parseUnits('100000');
    expect((await oyinToken.totalSupply()).toString()).to.equal(expectedSupply);
  });

  it("Transfer and Snapshot", async function () {
    const transferAmount = 1000;
    await expect(oyinToken.transfer(other, transferAmount)).to.changeTokenBalances(oyinToken, other, transferAmount);
    const takesnap = await oyinToken.connect(owner).snapshot();
  });

});
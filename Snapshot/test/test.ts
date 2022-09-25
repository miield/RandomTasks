import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { parseEther } from "ethers/lib/utils";
import {OyinToken} from "../typechain-types"
const { BigNumber } = require("ethers");
require("@nomicfoundation/hardhat-chai-matchers")

describe("OyinToken contract", function () {

  let oyinToken: OyinToken
  let owner: SignerWithAddress;
  let other1: SignerWithAddress;
  let other2: SignerWithAddress;
  let id;

  before(async function() {

    [owner, other1, other2] = await ethers.getSigners();


    const OyinToken = await ethers.getContractFactory("OyinToken");
    oyinToken = await OyinToken.connect(owner).deploy();

    await oyinToken.deployed();
    console.log("OyinToken is deployed to:", oyinToken.address);


  })

  // how is this passing, the person calling it is the owner
  // so this call is cannot revert

  it("Snapshot should revert if not called by the owner", async function () {
    await expect(oyinToken.connect(other1).snapshot()).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it('Has a valid decimal', async function () {
    expect((await oyinToken.decimals()).toString()).to.equal('18');
  })

  it('Creates the token symbol', async function () {
    // expect(await oyinToken.symbol()).to.exist;
    expect(await oyinToken.symbol()).to.equal('OYIN');
  });

  it('Creates the token name', async function () {
    // expect(await oyinToken.name()).to.exist;
    expect(await oyinToken.name()).to.equal('OYIN TOKEN');
  });

  it('Has a valid total supply', async function () {
    const expectedSupply = ethers.utils.parseUnits('100000', "18");
    expect((await oyinToken.totalSupply()).toString()).to.equal(expectedSupply);
  });

  it('Checks for Snapshot ID', async function () {
    await oyinToken.connect(owner).snapshot();
    expect(await oyinToken.checkSnapshot()).to.be.equal(1);
  });

  it("Transfer and Snapshot", async function () {
    const transferAmount1 = parseEther("1000")
    const transferAmount2 = parseEther("2000")
    await expect(oyinToken.transfer(other1.address, transferAmount1)).to.changeTokenBalance(oyinToken,other1, transferAmount1);
    await expect(oyinToken.transfer(other2.address, transferAmount2)).to.changeTokenBalance(oyinToken,other2, transferAmount2);
    await oyinToken.connect(owner).snapshot();
  });

  it("other1 and other2 should have have a balance of 0 at snapshotId one", async function(){
    expect(await oyinToken.balanceOfAt(other1.address, 1)).to.be.equal(0)
    expect(await oyinToken.balanceOfAt(other2.address, 1)).to.be.equal(0)
  } )

  it("other1 and other2 should have have a balance of 1000 and 2000 respectively at snapshotId two", async function(){
    const transferAmount1 = parseEther("1000")
    const transferAmount2 = parseEther("2000")
    expect(await oyinToken.balanceOfAt(other1.address, 2)).to.be.equal(transferAmount1)
    expect(await oyinToken.balanceOfAt(other2.address, 2)).to.be.equal(transferAmount2)
  } )



});
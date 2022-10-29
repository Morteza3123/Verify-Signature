import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const VerifySig = await ethers.getContractFactory("VerifySig");
    const verifySig = await VerifySig.deploy();

    return { verifySig, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { verifySig, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);

      const messageHash = await verifySig.connect(owner).getMessageHash(
        owner.address,
        123,
        "coffee and donuts",
        1
      );
      const signature = await owner.signMessage(messageHash);
      const ethSigMassageHash = await verifySig.getEthSignedMessageHash(messageHash);

      const signerAddress = await verifySig.recoverSigner(ethSigMassageHash, signature);
      console.log(signerAddress);
      console.log(owner.address);

      // const verifed = await verifySig.verify(
      //   owner.address,
      //   otherAccount.address,
      //   123,
      //   "coffee and donuts",
      //   1,
      //   signature
      // )
      // console.log(verifed)
      // return 
      

    });

  });
});

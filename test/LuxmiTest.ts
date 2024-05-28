import { expect } from "chai";
import { ethers } from "hardhat";
import { Luxmi, PriceOracle } from "../typechain";

describe("Luxmi with Dutch Auction", function () {
    let Luxmi: Luxmi;
    let PriceOracle: PriceOracle;
    let owner: any, bidder1: any, bidder2: any;

    const initialPrice = ethers.utils.parseEther("1.818");
    const finalPrice = ethers.utils.parseEther("1.618");
    const totalTokens = ethers.utils.parseEther("1000000");
    const targetPrice = ethers.utils.parseEther("1.618");
    const alpha = ethers.utils.parseEther("0.1");

    beforeEach(async function () {
        [owner, bidder1, bidder2] = await ethers.getSigners();

        // Deploy the Price Oracle
        const PriceOracleFactory = await ethers.getContractFactory("PriceOracle");
        PriceOracle = (await PriceOracleFactory.deploy()) as PriceOracle;
        await PriceOracle.deployed();

        // Deploy the Luxmi contract
        const LuxmiFactory = await ethers.getContractFactory("Luxmi");
        Luxmi = (await LuxmiFactory.deploy(
            PriceOracle.address,
            initialPrice,
            finalPrice,
            totalTokens,
            targetPrice,
            alpha
        )) as Luxmi;
        await Luxmi.deployed();
    });

    it("should start the auction correctly", async function () {
        const startTime = await Luxmi.auctionStartTime();
        const endTime = await Luxmi.auctionEndTime();
        const auctionInitialPrice = await Luxmi.initialPrice();
        const auctionFinalPrice = await Luxmi.finalPrice();

        expect(startTime.toNumber()).to.be.greaterThan(0);
        expect(endTime.toNumber()).to.be.greaterThan(startTime.toNumber());
        expect(auctionInitialPrice).to.equal(initialPrice);
        expect(auctionFinalPrice).to.equal(finalPrice);
    });

    it("should place a bid and update tokens sold", async function () {
        await Luxmi.connect(bidder1).placeBid({ value: ethers.utils.parseEther("1") });
        const tokensSold = await Luxmi.tokensSold();
        const bidAmount = await Luxmi.bids(bidder1.address);

        expect(tokensSold).to.equal(bidAmount);
    });

    it("should claim tokens after the auction ends", async function () {
        await Luxmi.connect(bidder1).placeBid({ value: ethers.utils.parseEther("1") });
        await Luxmi.connect(owner).endAuction();

        const initialBalance = await Luxmi.balanceOf(bidder1.address);
        await Luxmi.connect(bidder1).claimTokens();
        const finalBalance = await Luxmi.balanceOf(bidder1.address);

        expect(finalBalance).to.be.gt(initialBalance);
    });

    it("should allow the owner to withdraw funds after the auction", async function () {
        const initialOwnerBalance = await ethers.provider.getBalance(owner.address);

        await Luxmi.connect(bidder1).placeBid({ value: ethers.utils.parseEther("1") });
        await Luxmi.connect(owner).endAuction();
        await Luxmi.connect(owner).withdrawFunds();

        const finalOwnerBalance = await ethers.provider.getBalance(owner.address);
        expect(finalOwnerBalance).to.be.gt(initialOwnerBalance);
    });

    it("should not allow bids after the auction ends", async function () {
        await Luxmi.connect(owner).endAuction();
        await expect(Luxmi.connect(bidder1).placeBid({ value: ethers.utils.parseEther("1") }))
            .to.be.revertedWith("Auction is not ongoing");
    });

    it("should update the current price using the oracle", async function () {
        const newPrice = ethers.utils.parseEther("2");
        await PriceOracle.setPrice(newPrice);

        await Luxmi.connect(owner).updateCurrentPrice();
        const currentPrice = await Luxmi.initialPrice();

        expect(currentPrice).to.equal(newPrice);
    });
});

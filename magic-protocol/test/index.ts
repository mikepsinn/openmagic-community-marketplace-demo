import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { v4 as uuid }  from "uuid";

describe("OrderBook", () => {
  let OrderBook: ContractFactory;
  let orderbook: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async () => {
    OrderBook  = await ethers.getContractFactory("OrderBook");
    [owner, addr1, addr2] = await ethers.getSigners();
    orderbook = await OrderBook.deploy();
  });

  describe("transaction", () => {
    it("seller list an item", async () => {
        const orderId = uuid();

        await orderbook.connect(addr1).listItem(orderId, "item 1");
        const item = await orderbook.getOrder(orderId);

        expect(item.orderId).to.equal(orderId)
        expect(item.seller).to.equal(addr1.address)
        expect(item.orderDetailsMetadata).to.equal("item 1")
        expect(item.isOpen).to.equal(true);
    });

    it ('buyer buys an item', async () => {
        const orderId = uuid();
        await orderbook.connect(addr1).listItem(orderId, "item 1");
        await orderbook.connect(addr2).acceptItem(orderId);
        const item = await orderbook.getOrder(orderId);
        expect(item.isOpen).to.equal(false);
    })

    it('seller self-purchas', async () => {
        const orderId = uuid();
        await orderbook.connect(addr1).listItem(orderId, "item 1");
        await expect(
            orderbook.connect(addr1).acceptItem(orderId)
        ).to.be.revertedWith("seller cannot self-purchase")
    });

    it('buyer re-purchas', async () => {
        const orderId1 = uuid();
        const orderId2 = uuid();

        await orderbook.connect(addr1).listItem(orderId1, "item 1");
        await orderbook.connect(addr1).listItem(orderId2, "item 2");
        await orderbook.connect(addr2).acceptItem(orderId1);
        await expect(
            orderbook.connect(addr2).acceptItem(orderId1)
        ).to.be.revertedWith("Listing accepted must be open!")
    });

    it('getting all the orders', async () => {
        const orderId1 = uuid();
        const orderId2 = uuid();

        await orderbook.connect(addr1).listItem(orderId1, "item 1");
        await orderbook.connect(addr1).listItem(orderId2, "item 2");

        const orders = await orderbook.exportOrders();
        expect(orders.length).to.equal(4);
        expect(orders[1].length).to.equal(2);
    })

  })
})

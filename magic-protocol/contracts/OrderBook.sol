//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract OrderBook {
    struct Listing {
        string orderId;
        address seller;
        string orderDetailsMetadata;
        bool isOpen;
        uint price;
        uint orderNum;
    }

    constructor() {
        numOrders = 0;
    }

    uint private numOrders;
    mapping(string => Listing) private openOrders;
    
    string[] orderIds;
    address[] sellers;
    bool[] orderStatus;
    string[] orderMeta;
    uint[] prices;
    address[] soldTo;

    // seller list an item that's recorded on chain
    function listItem(string memory orderId, string memory orderDetails, uint price) external {
        openOrders[orderId] = Listing(
            orderId,
            msg.sender,
            orderDetails,
            true,
            price,
            numOrders
        );

        orderIds.push(orderId);
        sellers.push(msg.sender);
        orderStatus.push(true);
        orderMeta.push(orderDetails);
        prices.push(price);
        soldTo.push(address(0));

        numOrders++;
    }

    // buyer accepts an order. pays the money, and emit an order confirmation
    function acceptItem(string memory openOrderId) external payable {
        // assert that the order is still open
        require(_checkOrderOpen(openOrderId), "Listing accepted must be open!");
        // assert that the person buying is not the person selling
        require(msg.sender != openOrders[openOrderId].seller, "seller cannot self-purchase");        
        // assert that price is right
        require(msg.value == openOrders[openOrderId].price, "wrong price listed");

        openOrders[openOrderId].isOpen = false;
        payable(openOrders[openOrderId].seller).transfer(openOrders[openOrderId].price); // seller gets paid.
        
        emit OrderConfirmed(
            openOrders[openOrderId].seller,
            msg.sender,
            openOrderId,
            openOrders[openOrderId].orderDetailsMetadata,
            openOrders[openOrderId].price
        );

        soldTo[openOrders[openOrderId].orderNum] = msg.sender;
        orderStatus[openOrders[openOrderId].orderNum] = false;
    }

    // Getter functions that we can use to query blockchain data!
    function getOrder(string memory orderId) external view returns(Listing memory) {
        return openOrders[orderId];
    }

    function exportOrders() external view returns(
        string[] memory,
        address[] memory,
        bool[] memory,
        string[] memory,
        uint[] memory,
        address[] memory
    ) {
        return ( orderIds, sellers, orderStatus, orderMeta, prices, soldTo);
    }

    // private functions
    function _checkOrderOpen(string memory orderIdToCheck) internal view returns (bool) {
        return openOrders[orderIdToCheck].isOpen;
    }

    // events
    event OrderConfirmed(address indexed seller, address indexed buyer, string indexed orderId, string metadata, uint price);
}

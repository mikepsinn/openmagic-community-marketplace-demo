//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract OrderBook {
    struct Listing {
        string orderId;
        address seller;
        string orderDetailsMetadata;
        bool isOpen;
    }

    mapping(string => Listing) private openOrders;

    // seller list an item that's recorded on chain
    function listItem(string memory orderId, string memory orderDetails) external returns(string memory) {
        openOrders[orderId] = Listing(orderId, msg.sender, orderDetails, true);
        return orderId;
    }

    // buyer accepts an order. pays the money, and emit an order confirmation
    function acceptItem(string memory openOrderId) external {
        // need to assert that the order is still open
        require(_checkOrderOpen(openOrderId), "Listing accepted must be open!");

        // need to assert that the person buying is not the person selling
        require(msg.sender != openOrders[openOrderId].seller, "seller cannot self-purchase");        
        openOrders[openOrderId].isOpen = false;
        emit OrderConfirmed(
            openOrders[openOrderId].seller,
            msg.sender,
            openOrderId,
            openOrders[openOrderId].orderDetailsMetadata
        );
    }

    function getOrder(string memory orderId) external view returns(Listing memory) {
        return openOrders[orderId];
    }

    function _checkOrderOpen(string memory orderIdToCheck) internal view returns (bool) {
        return openOrders[orderIdToCheck].isOpen;
    }

    event OrderConfirmed(address indexed seller, address indexed buyer, string indexed orderId, string metadata);
}

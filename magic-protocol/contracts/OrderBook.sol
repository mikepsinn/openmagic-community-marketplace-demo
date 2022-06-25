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
    
    string[] orderIds;
    address[] sellers;
    bool[] orderStatus;
    string[] orderMeta;

    // seller list an item that's recorded on chain
    function listItem(string memory orderId, string memory orderDetails) external {
        openOrders[orderId] = Listing(orderId, msg.sender, orderDetails, true);
        orderIds.push(orderId);
        sellers.push(msg.sender);
        orderStatus.push(true);
        orderMeta.push(orderDetails);
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

    // Getter functions that we can use to query blockchain data!
    function getOrder(string memory orderId) external view returns(Listing memory) {
        return openOrders[orderId];
    }

    function exportOrders() external view returns(
        string[] memory,
        address[] memory,
        bool[] memory,
        string[] memory
    ) {
        return (orderIds, sellers, orderStatus, orderMeta);
    }

    // private functions
    function _checkOrderOpen(string memory orderIdToCheck) internal view returns (bool) {
        return openOrders[orderIdToCheck].isOpen;
    }

    // events
    event OrderConfirmed(address indexed seller, address indexed buyer, string indexed orderId, string metadata);
}

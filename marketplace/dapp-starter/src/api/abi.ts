export const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "string",
          "name": "orderId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "metadata",
          "type": "string"
        }
      ],
      "name": "OrderConfirmed",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "openOrderId",
          "type": "string"
        }
      ],
      "name": "acceptItem",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "exportOrders",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        },
        {
          "internalType": "bool[]",
          "name": "",
          "type": "bool[]"
        },
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "orderId",
          "type": "string"
        }
      ],
      "name": "getOrder",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "orderId",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "orderDetailsMetadata",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isOpen",
              "type": "bool"
            }
          ],
          "internalType": "struct OrderBook.Listing",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "orderId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "orderDetails",
          "type": "string"
        }
      ],
      "name": "listItem",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]
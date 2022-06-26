import Web3 from "web3";
import { v4 as uuid } from "uuid"; 
import { uploadMetadataToIPFS, readMetadataFromIPFS, readImageFromIPFS } from "./ipfs";

import { abi } from "./abi";

export const WEIS_PER_ETHER = 1000000000000000000;

const contractAddress: string = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_RPC_PROVIDER));
const orderbook = new web3.eth.Contract((abi as any), contractAddress);

// Getting Functions for the Address
export async function getOrderById(id: string) {
    const orderDetails = await orderbook.methods.getOrder(id).call();

    // no order exists. blockchain is too shy to report the error
    if (orderDetails.seller === "0x0000000000000000000000000000000000000000") {
        return null;
    }

    const { isOpen, seller, orderId, orderDetailsMetadata, price, soldTo } = orderDetails;
    const { imageSrc, ...metadata } = await readMetadataFromIPFS(orderDetailsMetadata);
    const imageSrcUrl = await readImageFromIPFS(imageSrc);

    return {
        id: orderId,
        seller,
        isOpen,
        price: price / WEIS_PER_ETHER,
        soldTo: soldTo === "0x0000000000000000000000000000000000000000" ? null : soldTo,
        imageSrc: imageSrcUrl,
        ...metadata,
    };
}

export async function getAllOrders() {
    const flattened = await orderbook.methods.exportOrders().call();
    const orders = await zip(flattened);
    return orders;
}

export async function getAllActiveOrders() {
    const orders = await getAllOrders();
    return orders.filter(order => order.isOpen);
}

export async function getHistoryForAddress(address: string) {
    const orders = await getAllOrders();
    return orders.filter(order => order.seller == address);
}

export async function getOpenListingForSeller(address: string) {
    const orders = await getAllOrders();
    return orders.filter(order => order.seller == address && order.isOpen);
}

export async function getCompletedOrdersForSeller(address: string) {
    const orders = await getAllOrders();
    return orders.filter(order => order.seller == address && !order.isOpen);
}

export async function getPurchaseHistoryForBuyer(address: string) {
    const orders = await getAllOrders();
    return orders.filter(order => order.soldTo == address && !order.isOpen);
}

// Functions that mutates state
export async function listItem(address: string, orderMetadata: any, price: number) {
    console.log('calling list item!')
    const orderId = uuid();
    const orderDetailIPFS = await uploadMetadataToIPFS({ id: orderId, ...orderMetadata });
    await (window as any).ethereum?.request({
        method: "eth_sendTransaction",
        params:[{
            from: address,
            to: contractAddress,
            data: orderbook.methods.listItem(
                orderId,
                orderDetailIPFS,
                // price
                // WEIS_PER_ETHER
                web3.utils.numberToHex(price * WEIS_PER_ETHER)
            ).encodeABI(),
        }]
    });
}

export async function acceptItem(address: string, orderId: string, price: number) {
    await (window as any).ethereum?.request({
        method: "eth_sendTransaction",
        params:[{
            from: address,
            to: contractAddress,
            value: web3.utils.numberToHex(price * WEIS_PER_ETHER),
            data: orderbook.methods.acceptItem(orderId).encodeABI(),
        }]
    })
}

// Helper Functions
export const zip = async (rows) => {
    const loadedMetadata = await Promise.all(rows[3].map(ipfsHash => {
        return readMetadataFromIPFS(ipfsHash)
    }));
    
    const metadataWithImages = await Promise.all(loadedMetadata.map(async (metadata) => {
        const { imageSrc , ...meta } = metadata 
        const imageSrcUrl = await readImageFromIPFS(imageSrc);
        return {
            imageSrc: imageSrcUrl,
            ...meta
        }
    }))
    console.log(rows);
    const formedRows = [rows[0], rows[1], rows[2], metadataWithImages, rows[4], rows[5]];
    const zipped = formedRows[0].map((_ ,c)=>formedRows.map(row=>row[c]))
    return zipped.map(([ id, seller, isOpen, metadata, price, soldTo]) => ({
        id,
        seller,
        isOpen,
        ...metadata,
        price: price / WEIS_PER_ETHER,
        soldTo: soldTo === "0x0000000000000000000000000000000000000000" ? null : soldTo
    }));
}


import Web3 from "web3";
import { v4 as uuid } from "uuid"; 
import { uploadMetadataToIPFS, readMetadataFromIPFS, readImageFromIPFS } from "./ipfs";

const contractAddress: string = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
import { abi } from "./abi";

const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_RPC_PROVIDER));
const orderbook = new web3.eth.Contract((abi as any), contractAddress);

// Getting Functions for the Address
export async function getAllOrders() {
    const flattened = await orderbook.methods.exportOrders().call();
    const orders = await zip(flattened);
    return orders;
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

// Functions that mutates state
export async function listItem(address: string, orderMetadata: any) {
    const orderId = uuid();
    const orderDetailIPFS = await uploadMetadataToIPFS({ id: orderId, ...orderMetadata });
    await (window as any).ethereum?.request({
        method: "eth_sendTransaction",
        params:[{
            from: address,
            to: contractAddress,
            data: orderbook.methods.listItem(orderId, orderDetailIPFS).encodeABI(),
        }]
    });
}

export async function acceptItem(address: string, orderId: string) {
    await (window as any).ethereum?.request({
        method: "eth_sendTransaction",
        params:[{
            from: address,
            to: contractAddress,
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
    const formedRows = [rows[0], rows[1], rows[2], metadataWithImages];
    const zipped = formedRows[0].map((_ ,c)=>formedRows.map(row=>row[c]))
    return zipped.map(([ id, seller, isOpen, metadata]) => ({id, seller, isOpen, ...metadata}));
}


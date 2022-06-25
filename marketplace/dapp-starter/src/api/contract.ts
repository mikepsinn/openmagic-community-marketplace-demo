import Web3 from "web3";
import { v4 as uuid } from "uuid"; 

const contractAddress: string = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
import { abi } from "./abi";

const web3 = new Web3(process.env.NEXT_PUBLIC_RPC_PROVIDER);
const orderbook = new web3.eth.Contract((abi as any), contractAddress);

// Getting Functions for the Address
export async function getAllOrders() {
    const flattened = await orderbook.methods.exportOrders().call();
    const orders = zip(flattened);
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

// Helper Functions
export const zip = (rows) => {
    const zipped = rows[0].map((_ ,c)=>rows.map(row=>row[c]))
    return zipped.map(([ id, seller, isOpen, metadata]) => ({id, seller, isOpen, metadata}));
}


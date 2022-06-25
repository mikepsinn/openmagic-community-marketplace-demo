import { create as IpfsHttpClient } from 'ipfs-http-client'

const authorization =
    'Basic ' + Buffer.from(
        process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID
        + ':' 
        + process.env.NEXT_PUBLIC_INFURA_IPFS_SECRET).toString('base64');
console.log(process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID, process.env.NEXT_PUBLIC_INFURA_IPFS_SECRET)
const client = IpfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: { authorization, },
});
console.log(client);

export async function uploadToIPFS() {
    const input = {
        orderId: "1",
        name: "my bike",
        image: "henlo",
    };
    console.log(await client.add(Buffer.from(JSON.stringify(input))))
    // client.add(Buffer.from(JSON.stringify(input)))
    //     .then(res => {
    //     const hash = res[0].hash
    //     console.log('added data hash:', hash)
    //     return client.cat(hash)
    // })
}

export async function readFromIPFS() {}
export async function uploadImageToIPFS() {}
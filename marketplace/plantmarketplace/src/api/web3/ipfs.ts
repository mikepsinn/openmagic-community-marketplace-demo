import { CID, create as IpfsHttpClient } from 'ipfs-http-client'
import toBuffer from "it-to-buffer"

const authorization =
    'Basic ' + Buffer.from(
        process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID
        + ':' 
        + process.env.NEXT_PUBLIC_INFURA_IPFS_SECRET).toString('base64');
const client = IpfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: { authorization, },
});

export async function uploadMetadataToIPFS(input: Object) {
    const response = await client.add({
        content: Buffer.from(JSON.stringify(input))
    });
    return response.cid.toString();
}

export async function readMetadataFromIPFS(cidStr: string) {
    const cid = CID.parse(cidStr);
    const buffer = await toBuffer(client.cat(cid))
    return JSON.parse(Buffer.from(buffer).toString('utf8'))
}

export async function uploadImageToIPFS(file: File) {
    const response = await client.add({
        content: file
    });
    return response.cid.toString();
}

export async function readImageFromIPFS(cidStr: string) {
    const cid = CID.parse(cidStr);
    const data = []
    for await (const chunk of client.cat(cid)) {
        data.push(chunk)
    }
    const blob = new Blob(data);
    const url = URL.createObjectURL(blob);
    return url;
}
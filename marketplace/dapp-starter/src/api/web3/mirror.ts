import Arweave from "arweave";
const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https"
});

/**
 * return data looks like the following for mirror:
 * {
 *      authorship: { contributor (eth addr), ...}
 *      content: { body, timestamp, title },
 *      ...
 * }
 */
export async function getMirrorArticleFromHash(hash: string) {
    const dataStr= await arweave.transactions.getData( hash, { decode: true, string: true })
    const data = JSON.parse(dataStr as string)
    return data;
}


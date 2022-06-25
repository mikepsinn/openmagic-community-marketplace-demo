export const groupByCollection = (nfts) => {
  const collections = [];

  const inCollection = (name) => {
    return collections.find(collection => collection.name === name);
  }
  nfts.map((nft) => {
    if (!inCollection(nft.collection.name)) {
      collections.push(nft.collection)
    }
  })
  
  return collections;
}
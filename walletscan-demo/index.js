const axios = require('axios');
const ethers = require("ethers");

const ALCHEMY_KEY = process.env.ALCHEMY_KEY;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;
const POAP_API_KEY = process.env.POAP_API_KEY;

const ETHGLOBAL_ADDR = "0xba17eeb3f0413b76184ba8ed73067063fba6e2eb";

const provider = new ethers.providers.AlchemyProvider();
const getENSByAddress = async (address) => {
  return await provider.lookupAddress(address);
}

const getAddressByENSName = async (ensName) => {
  return await provider.resolveName(ensName);
}

const getNFTsFromAlchemy = async(address) => {
  try {
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${ALCHEMY_KEY}/getNFTs/`;
    var config = {
      method: 'get',
      url: `${baseURL}?owner=${address}`
    };
    
    const response = await axios(config);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.toJSON().message,
    }
  }
}

const getPOAPsByAddress = async (address) => {
  try {
    const response = await axios({
      url: `https://api.poap.tech/actions/scan/${address}`,
      method: "get",
      Headers: {
        "X-API-Key": POAP_API_KEY,
        "Accept": "application/json"
      }
    });
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      message: error.toJSON().message
    }
  }
}

const getTransactionForHackNYC = async (address) => {
  const requestURL = "https://api.etherscan.io/api" + 
                      "?module=account" +
                      "&action=txlist" +  
                      `&address=${address}` + 
                      `&apikey=${ETHERSCAN_KEY}`
  try {
    const res = await axios({
      method: 'post',
      url: requestURL
    })
    const txs = res.data.result;
    const hasStakedEth = txs.find(tx => tx.to === ETHGLOBAL_ADDR);

    let firstTx = null;
    if (txs.length > 0) {
      firstTx = {
        hash: txs[0].hash,
        timestamp: parseInt(txs[0].timestamp, 10)
      }
    }

    return {
      success: true,
      firstTx,
      isParticipant: !!hasStakedEth
    };
  } catch (error) {
    return {
      success: false,
      message: error.toJSON().message,
    };
  }
}


const getArticlesFromMirror = async (address) => {
    const query = `
    query GetMirrorTransactions {
        transactions(tags:[
          {
            name:"App-Name",
            values:["MirrorXYZ"],
          },
          {
            name:"Contributor",
            values:["${address}"]
          }
        ], sort:HEIGHT_DESC){
          edges {
            node {
              id
              data {
                size
              }
              recipient
            }
          }
        }
      }
    `

    try {
      const response = await axios({
        method: "post",
        url: "https://arweave.net/graphql",
        data: {
          query
        }
      });

      const articles = response.data.data.transactions.edges.map(edge => edge.node.id);
      return {
        success: true,
        data: articles,
      }
    } catch (error) {
      return {
        success: false,
        message: error.toJSON().message
      }
    }
}

const getDAOMembership = async (address) => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://golden-gate-server.deepdao.io/user/2/${address}`
    })

    const {
      totalDaos,
      totalProposals,
      totalVotes,
      daos,
    } = response.data;

    const newDAOs = daos.map(dao => {
      let {
        name,
        address,
        image,
      } = dao;

      if (!!image && !image.startsWith("https://")) {
        image = `https://deepdao-uploads.s3.us-east-2.amazonaws.com/assets/snapshots/spaces/${image}`
      }
      return { name, address, image };
    });

    return {
      success: true,
      data: {
        totalDaos,
        totalProposals,
        totalVotes,
        daos: newDAOs
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  };
}

const getLensProfile = async (address) => {
  const query = `
  query Profiles {
    profiles(request: { ownedBy: ["${address}"], limit: 5 }) {
      items {
        id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
        followNftAddress
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
           type
          }
          ... on RevertFollowModuleSettings {
           type
          }
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }`

  try {
    const response = await axios({
      method: "post",
      url: "https://api.lens.dev/playground",
      data: {
        query
      }
    });

    return {
      success: true,
      data: response.data.data.profiles.items,
    }
  } catch (error) {
    return {
      success: false,
      message: error.toJSON().message,
    }
  }
}

exports.walletscan_demo = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'GET');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
      res.status(204).send('');
      return;
    }

    try {
        let address = req.query.address;
        let ensName = '';

        // First check if the provided address is null 
        if (!address) {
            res.status(400).send("No Address Provided");
            return;
        }

        // check if the provided address/ensname is valid
        if (!ethers.utils.isAddress(address) &&
            !address.endsWith(".eth")) {
            res.status(400).send("Please provide a valid address or ENS name");
            return;
        }

        if (ethers.utils.isAddress(address)) { // looked up eth address
          ensName = await getENSByAddress(address);
        } else {
          ensName = address;
          address = await getAddressByENSName(ensName);
        }

        if (!address) {
          res.status(400).send(`Provided ens name ${ensName} is not claimed`);
        }

        // 1. get NFT data
        const nftPromise = getNFTsFromAlchemy(address); // need error catching!

        // 2. get mirror data
        const mirrorPromise = getArticlesFromMirror(address);

        // 3. get lens protocol data
        const lensPromise = getLensProfile(address);

        // 4. get DAO membership data
        const daoPromise = getDAOMembership(address);
        
        // 5. get POAPs
        const poapPromise = getPOAPsByAddress(address);
        
        // 6. check if the person is part of this hackathon
        const hackathonPromise = getTransactionForHackNYC(address);

        const [
          nfts,
          articles,
          lensProfiles,
          daos,
          poaps,
          hacker,
        ] = await Promise.all([
          nftPromise,
          mirrorPromise,
          lensPromise,
          daoPromise,
          poapPromise,
          hackathonPromise
        ]);
        // check for success
        if (
          !nfts.success ||
          !articles.success ||
          !lensProfiles.success ||
          !daos.success ||
          !poaps.success ||
          !hacker.success
        ) {
          res.status(500).send(`Error encountered while looking up ${address}`);
          return;
        }
        
        res.status(200).send({
          address,
          ensName,
          daos: daos.data,
          nfts: nfts.data,
          poaps: poaps.data,
          lens: lensProfiles.data,
          mirror: articles.data,
          is_participant: hacker.isParticipant,
          first_tx: hacker.firstTx,
        });
    } catch (error) {
        //return an error
        console.log("got error: ", error);
        res.status(500).send(error);
    }
};
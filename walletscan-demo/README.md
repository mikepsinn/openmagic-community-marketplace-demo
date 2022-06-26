# Walletscan APIs

Walletscan offers an easy way to get holistic overview about a wallet to determine if an address is trust worthy at a glance

### Current API:
```
GET api.walletscan.info/scan
```

Currently Walletcan has one endpoint that gives the following information:
    - NFTs
    - DAOs said address participates in and proposals they voted on
    - Events (POAPs)
    - badges based on historical transactions like whether they are EthNewYork2022 participant! (has sent 0.02E to `0xba17eeb3f0413b76184ba8ed73067063fba6e2eb`)

### Future Work

There are a lot of utilities a wallet-centric api could benefit. For example, the same trust problem can be applied to when someone tries to join a DAO or buy into an NFT project. Currently, with existing APIs, it is very hard to get who from my other communities are also participating in that DAO.
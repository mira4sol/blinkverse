// import {
//   Connection,
//   PublicKey,
//   Transaction,
//   sendAndConfirmTransaction,
// } from '@solana/web3.js'
// import {
//   Metaplex,
//   keypairIdentity,
//   bundlrStorage,
// } from '@metaplex-foundation/js'
// import { createCreateMetadataAccountV2Instruction } from '@metaplex-foundation/mpl-token-metadata'

// // Initialize Solana connection and Metaplex
// const connection = new Connection('https://api.mainnet-beta.solana.com')
// const metaplex = Metaplex.make(connection)
//   .use(keypairIdentity(/* Your keypair here */))
//   .use(bundlrStorage())

// /**
//  * Upload NFT metadata and image to Arweave
//  * @param {Object} nftData - NFT metadata and image
//  * @returns {Promise<string>} - URI of the uploaded metadata
//  */
// export async function uploadNFTData(nftData) {
//   const { uri } = await metaplex.nfts().uploadMetadata(nftData)
//   return uri
// }

// /**
//  * Mint a new NFT
//  * @param {Object} nftData - NFT metadata and image
//  * @param {Keypair} mintAuthority - Keypair of the mint authority
//  * @returns {Promise<PublicKey>} - Mint address of the new NFT
//  */
// export async function mintNFT(nftData, mintAuthority) {
//   const { nft } = await metaplex.nfts().create({
//     uri: await uploadNFTData(nftData),
//     name: nftData.name,
//     sellerFeeBasisPoints: nftData.sellerFeeBasisPoints,
//     creators: nftData.creators,
//   })
//   return nft.address
// }

// /**
//  * List an NFT for sale
//  * @param {PublicKey} nftMint - Mint address of the NFT
//  * @param {number} price - Price in SOL
//  * @param {Keypair} owner - Keypair of the NFT owner
//  * @returns {Promise<string>} - Transaction signature
//  */
// export async function listNFTForSale(nftMint, price, owner) {
//   const listing = await metaplex.nfts().list({
//     nftOrSft: nftMint,
//     price: price,
//     seller: owner.publicKey,
//   })
//   return listing.response.signature
// }

// /**
//  * Cancel an NFT listing
//  * @param {PublicKey} nftMint - Mint address of the NFT
//  * @param {Keypair} owner - Keypair of the NFT owner
//  * @returns {Promise<string>} - Transaction signature
//  */
// export async function cancelNFTListing(nftMint, owner) {
//   const cancelListing = await metaplex.nfts().cancelListing({
//     nftOrSft: nftMint,
//     seller: owner.publicKey,
//   })
//   return cancelListing.response.signature
// }

// /**
//  * Buy a listed NFT
//  * @param {PublicKey} nftMint - Mint address of the NFT
//  * @param {Keypair} buyer - Keypair of the buyer
//  * @returns {Promise<string>} - Transaction signature
//  */
// export async function buyNFT(nftMint, buyer) {
//   const purchase = await metaplex.nfts().buy({
//     nftOrSft: nftMint,
//     buyer: buyer.publicKey,
//   })
//   return purchase.response.signature
// }

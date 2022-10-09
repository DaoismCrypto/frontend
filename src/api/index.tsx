import { ethers } from 'ethers'
import Token_Market_abi from './Token_Market_abi.json'
import Hack_Token_abi from './Hack_Token_abi.json'
import { isAddress } from 'ethers/lib/utils'

const contractAddress = '0x617871c357C4335DF041737eA21E246aDe5317E7'
const tokenMarketAddress = '0x039d83bbc8a0674950460658afF1CDA1c6103b24'
const myAddress = '0xF2842fb04291d002d27F1E78279F65994870a0be'
const gasLimit = 210000

// HackToken

// - mint(): takes gas
// - **transferFrom(): takes gas**
// - getInfo()
// - **getPrevOwner()**
// - getSupply(): get the total supply of a certain resources
// - getQuota(tokenId):  get the quota(amount of resources) of that token
// - getUnit(): get the unit the resource(e.g. tonnes)

// TokenMarket

// - buyToken(tokenId): buy a token if msg.value≥price (buyer side)
// - changePrice(tokenId, price): set price of the token if sender is the owner
// - list(tokenId, price)
// - unlist(tokenId): unlist a token(set the price to 0)(Bug?It’s possible that price is indeed zero, if someone just wanna give for free)
// - getUnit(): get the unit the resource(e.g. tonnes)
// - getUnit(): get the unit the resource(e.g. tonnes)
// - getInfo()

type getContractResponseType = {
  contract: ethers.Contract
  signerAddress: string
}

const getContract = async (isUsingSigner: boolean, isUsingTokenMarket: boolean): Promise<getContractResponseType> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum!)
  await provider.send('eth_requestAccounts', [])
  const signer = await provider.getSigner()
  const signerAddress = await signer.getAddress()
  // return { provider, signer, signerAddress }

  const contract = new ethers.Contract(
    isUsingTokenMarket ? tokenMarketAddress : contractAddress,
    isUsingTokenMarket ? Token_Market_abi : Hack_Token_abi,
    isUsingSigner ? signer : provider
  )
  return { contract, signerAddress }
}

// admin/owner HackToken contract function
export const mint = async (
  addressTo: string,
  serialNumber: string,
  name: string,
  information: string,
  unit: string,
  quota: number
) => {
  const { contract, signerAddress } = await getContract(true, false)
  await contract.mint(addressTo, serialNumber, name, information, unit, quota, { gasLimit })
}

export const transferFrom = async (addressFrom: string, addressTo: string, tokenId: number) => {
  const { contract } = await getContract(true, false)
  await contract.transferFrom(addressFrom, addressTo, tokenId, { gasLimit })
}

// public HackToken contract function
export const getTokenInfo = async (tokenId: number) => {
  const { contract } = await getContract(false, false)
  await contract.getInfo(tokenId)
}

export const getPrevOwner = async (tokenId: number) => {
  const { contract } = await getContract(false, false)
  await contract.getPrevOwner(tokenId)
}

export const getSupply = async (tokenId: number) => {
  const { contract } = await getContract(false, false)
  await contract.getSupply(tokenId)
}

export const getQuota = async (tokenId: number) => {
  const { contract } = await getContract(false, false)
  await contract.getQuota(tokenId)
}

export const getUnit = async (tokenId: number) => {
  const { contract } = await getContract(false, false)
  await contract.getUnit(tokenId)
}

// tokenMarket API

export const buyToken = async (tokenId: number) => {
  const { contract } = await getContract(false, true)
  await contract.buyToken(tokenId, { gasLimit })
}

export const changePrice = async (tokenId: number, price: number) => {
  const { contract } = await getContract(false, true)
  await contract.changePrice(tokenId, price, { gasLimit })
}

export const list = async (tokenId: number, price: number) => {
  const { contract } = await getContract(true, true)
  await contract.list(tokenId, price, { gasLimit })
}

export const unlist = async (tokenId: number) => {
  const { contract } = await getContract(true, true)
  await contract.unlist(tokenId, { gasLimit })
}

// const fetcher =
//   (library: ethers.providers.Web3Provider, abi?: any) =>
//   (...args: [any, any, ...any[]]) => {
//     const [arg1, arg2, ...params] = args
//     // it's a contract
//     if (isAddress(arg1)) {
//       const address = arg1
//       const method = arg2
//       const contract = new ethers.Contract(address, abi, library.getSigner())
//       return contract[method](...params)
//     }
//     // it's a eth call
//     const method = arg1
//     return library[method](arg2, ...params)
//   }

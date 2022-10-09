import { ethers } from 'ethers'
import Token_Market_abi from './Token_Market_abi.json'
import Hack_Token_abi from './Hack_Token_abi.json'
import { isAddress } from 'ethers/lib/utils'

const hackTokenAddress = '0x3d33C785AcC4Ef00EB7eeEf97d452a0290249952'
const tokenMarketAddress = '0xa56af4256da004D217239a0c87204938b9e95cA7'
const myAddress = '0xF2842fb04291d002d27F1E78279F65994870a0be'
const gasLimit = 2100000
const ETH_VALUE_AS_STRING = "0.0101"
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
    isUsingTokenMarket ? tokenMarketAddress : hackTokenAddress,
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
  const info = await contract.getInfo(tokenId)
  console.log(info)
  return info
}

export const getPrevOwner = async (tokenId: number) => {
  const { contract } = await getContract(false, false)
  const ownerId = await contract.getPrevOwner(tokenId)
  console.log(ownerId)
}

export const getSupply = async (tokenId: number) => {
  const { contract } = await getContract(false, false)
  const supply = await contract.getSupply(tokenId)
  console.log(supply)
}

export const getQuota = async (tokenId: number) => {
  const { contract } = await getContract(false, false)
  const quota = await contract.getQuota(tokenId)
  console.log(quota)
}

export const getUnit = async (tokenId: number) => {
  const { contract } = await getContract(false, false)
  const unit = await contract.getUnit(tokenId)
  console.log(unit)
}

// tokenMarket API

export const buyToken = async (tokenId: number, price: string) => {
  const { contract } = await getContract(true, true)
  await contract.buyToken(tokenId, { gasLimit:gasLimit, value: ethers.utils.parseEther(price) })
}


export const list = async (tokenId: number, price: number) => {
  const { contract } = await getContract(true, true)
  await contract.list(tokenId, price, { gasLimit })
}

export const unlist = async (tokenId: number) => {
  const { contract } = await getContract(true, true)
  await contract.unlist(tokenId, { gasLimit })
}

export const getAllListedTokens = async () => {
  const { contract } = await getContract(false, true)
  const tokens = await contract.getAllListedToken()
  const promises: Promise<string>[] = tokens.map((token: any) => {
    // console.log(token)
    return getToken(token)
  })
  Promise.all(promises).then(values => {
    console.log(values)
  })
}

export const getToken = async (tokenId: number) => {
  const { contract } = await getContract(false, false)
  const token = await contract.getToken(tokenId)
  console.log(token)
  return token

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

import { ethers } from "ethers";
import Token_Market_abi from "./Token_Market_abi.json";
import Hack_Token_abi from "./Hack_Token_abi.json";
import { isAddress } from "ethers/lib/utils";

const hackTokenAddress = "0x3c0d62795d185C8cD3eddE597593Ac46Dac1Ce86";
const tokenMarketAddress = "0x68F15d4FdF7566f9F31b2aE305167933aB2BC777";
const gasLimit = 2100000;
const ETH_VALUE_AS_STRING = "0.0101";
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
  contract: ethers.Contract;
  signerAddress: string;
};

export const getUser = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum!);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const signerAddress = await signer.getAddress();
  sessionStorage.setItem("user", signerAddress);
  return signerAddress;
};

const getContract = async (
  isUsingSigner: boolean,
  isUsingTokenMarket: boolean
): Promise<getContractResponseType> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum!);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const signerAddress = await signer.getAddress();
  // return { provider, signer, signerAddress }

  const contract = new ethers.Contract(
    isUsingTokenMarket ? tokenMarketAddress : hackTokenAddress,
    isUsingTokenMarket ? Token_Market_abi : Hack_Token_abi,
    isUsingSigner ? signer : provider
  );
  return { contract, signerAddress };
};

// admin/owner HackToken contract function
export const mint = async (
  addressTo: string,
  serialNumber: string,
  name: string,
  information: string,
  unit: string,
  quota: number
) => {
  const { contract, signerAddress } = await getContract(true, false);
  await contract.mint(addressTo, serialNumber, name, information, unit, quota, {
    gasLimit,
  });
};

export const transferFrom = async (
  addressFrom: string,
  addressTo: string,
  tokenId: number
) => {
  const { contract } = await getContract(true, false);
  await contract.transferFrom(addressFrom, addressTo, tokenId, { gasLimit });
};

// public HackToken contract function
export const getTokenInfo = async (tokenId: number) => {
  const { contract } = await getContract(false, false);
  const info = await contract.getInfo(tokenId);
  console.log(info);

  return info;
};

export const getPrevOwner = async (tokenId: number) => {
  const { contract } = await getContract(false, false);
  const ownerId = await contract.getPrevOwner(tokenId);
  console.log(ownerId);
};

export const getSupply = async (tokenId: number) => {
  const { contract } = await getContract(false, false);
  const supply = await contract.getSupply(tokenId);
  console.log(supply);
};

export const getQuota = async (tokenId: number) => {
  const { contract } = await getContract(false, false);
  const quota = await contract.getQuota(tokenId);
  console.log(quota);
};

export const getUnit = async (tokenId: number) => {
  const { contract } = await getContract(false, false);
  const unit = await contract.getUnit(tokenId);
  console.log(unit);
};

// tokenMarket API

export const buyToken = async (tokenId: number, price: string) => {
  const { contract } = await getContract(true, true);
  await contract.buyToken(tokenId, {
    gasLimit: gasLimit,
    value: ethers.utils.parseEther(price),
  });
};

export const list = async (tokenId: number, price: number) => {
  const { contract } = await getContract(true, true);
  await contract.list(tokenId, price, { gasLimit });
};

export const unlist = async (tokenId: number) => {
  const { contract } = await getContract(true, true);
  await contract.unlist(tokenId, { gasLimit });
};

export const transferBack = async (tokenId: number) => {
  const { contract } = await getContract(true, true);
  await contract.transferBack(tokenId, { gasLimit });
};

export const getAllListedToken = async (isOnlyUser: boolean = false) => {
  const { contract, signerAddress } = await getContract(false, true);
  const tokens = await contract.getAllListedToken();
  const promises: Promise<any>[] = tokens.map((token: any) => {
    return getTokenFromTokenMarket(token);
  });

  const pricePromises: Promise<any>[] = tokens.map((token: any) => {
    return getPrice(token);
  });

  const prices = await Promise.all(pricePromises);
  const response = await Promise.all(promises);
  console.log(response);
  const mappedResponse = response.map((res, i) => [
    ...res,
    prices[i],
    tokens[i],
  ]);
  console.log(mappedResponse);
  if (isOnlyUser) {
    return mappedResponse.filter((value) => value[6] === signerAddress);
  } else {
    return mappedResponse;
  }
};

export const getPrice = async (tokenId: number) => {
  const { contract } = await getContract(false, true);
  const price = await contract.getPrice(tokenId, { gasLimit });
  return price;
};

export const getTokenFromHackToken = async (tokenId: number) => {
  const { contract } = await getContract(false, false);
  const token = await contract.getToken(tokenId);
  console.log(token);
  return token;
};

export const getTokenFromTokenMarket = async (tokenId: number) => {
  const { contract } = await getContract(false, true);
  const token = await contract.getToken(tokenId);
  console.log(token);
  return token;
};

export const getTokenList = async () => {
  const { contract, signerAddress } = await getContract(false, false);
  console.log(signerAddress);
  const tokenList = await contract.getTokenList(signerAddress);
  console.log(tokenList);
  const promises: Promise<any>[] = tokenList.map((token: any) => {
    return getTokenFromHackToken(token);
  });
};

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

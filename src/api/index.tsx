import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import erc721abi from './ERC721abi.json'

// const handleSubmit = async e => {
//   e.preventDefault()
//   const data = new FormData(e.target)
//   const provider = new ethers.providers.Web3Provider(window.ethereum)

//   const erc721 = new ethers.Contract(data.get('addr'), erc721abi, provider)

//   const tokenName = await erc721.name()
//   const tokenSymbol = await erc721.symbol()
//   // const totalSupply = await erc721.totalSupply();

//   setContractInfo({
//     address: data.get('addr'),
//     tokenName,
//     tokenSymbol
//     // totalSupply
//   })
// }

// const handleApprove = async  => {
//   e.preventDefault()
//   const data = new FormData(e.target)
//   const provider = new ethers.providers.Web3Provider(window.ethereum!)
//   await provider.send('eth_requestAccounts', [])
//   // we wanna sign the transaction, hence get the signer
//   const signer = await provider.getSigner()
//   const erc721 = new ethers.Contract(contractInfo.address, erc721abi, signer)
//   await erc721.approve(data.get('to'), data.get('tokenId'))
// }

// export const getContract = async (address: string) => {
//   const contract = localStorage.getItem('contract')
//   if (contract != null) {
//     const provider = new ethers.providers.Web3Provider(window.ethereum!)
//     const erc721 = new ethers.Contract(address, erc721abi, provider)
//     const tokenName = await erc721.name()
//     const tokenSymbol = await erc721.symbol()
//     const contractInfo = {
//       address,
//       tokenName,
//       tokenSymbol
//       // totalSupply
//     }
//   }
// }

export const getMyBalance = async (address: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum!)

  const erc721 = new ethers.Contract(address, erc721abi, provider)

  await provider.send('eth_requestAccounts', [])
  const signer = await provider.getSigner()
  const signerAddress = await signer.getAddress()
  const balance = await erc721.balanceOf(signerAddress)

  console.log(balance, signerAddress)
  localStorage.setItem('signerAddress', signerAddress)
}

// const handleTransferFrom = async e => {
//   e.preventDefault()
//   const data = new FormData(e.target)
//   // take the provider
//   const provider = new ethers.providers.Web3Provider(window.ethereum)
//   await provider.send('eth_requestAccounts', [])
//   // we wanna sign the transaction, hence get the signer
//   const signer = await provider.getSigner()
//   const erc721 = new ethers.Contract(contractInfo.address, erc721abi, signer)
//   await erc721.transferFrom(data.get('from'), data.get('to'), data.get('tokenId'))
// }

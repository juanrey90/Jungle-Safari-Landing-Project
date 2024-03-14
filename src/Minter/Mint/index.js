/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import './index.css'
import Button from '../../Component/Common/Button'
import '../../Component/Common/Discover/styles.scss'
import { connectWallet, getCurrentWalletConnected, getContract } from '../../util/interact';
import { chainId } from 'constants/address';
import { whiteList } from 'constants/whitelist';

import MyToastContainer from '../../Container/ToastContainer';
import { toast } from 'react-toastify'

import { BigNumber } from 'ethers';
import { MerkleTree } from "merkletreejs";
import { keccak256 } from 'ethers/lib/utils';

export default function Mint() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [status, setStatus] = useState(null);
  const [count, setCount] = useState(1)
  const [loading, setMintLoading] = useState(false)
  const [totalSupply, setTotalSupply] = useState(0)
  const [numberOfWallet, setNumberOfWallet] = useState(0)
  const [presale, setPresale] = useState(null)
  const [price, setPrice] = useState(0)
  const [whiteListAddress, setWhiteListAddress] = useState(null)

  const onClickConnectWallet = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWalletAddress(walletResponse.address);
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWalletAddress(walletResponse.address);
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log('accountchain')
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          // setStatus("👆🏽 You can mint new now.");
        } else {
          setWalletAddress(null);
          setStatus("🦊 Connect to Metamask and choose the correct chain using the top right button.");
        }
      });
      window.ethereum.on("chainChanged", (chain) => {
        console.log('chainchange')
        connectWalletPressed()
        console.log(chain)
        if (chain !== chainId) {
          setWalletAddress(null);
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          {/* <a target="_blank" href={`https://metamask.io/download.html`}> */}
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.(https://metamask.io/download.html)
          {/* </a> */}
        </p>
      );
    }
  }

  const notify = () => toast.info(status, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  const decrease = () => {
    if(count > 1) {
      setCount(count-1)
    }
  }
  const increase = () => {
    if(count < (presale ? 3 : 6))
    setCount(count+1)
  }

  const onMint = async () => {
    
    if(!walletAddress) {
      setStatus('Please connect with Metamask')
      return
    }
    if(parseInt(numberOfWallet) === 6) {
      setStatus(`You already minted all of 6 tokens`)
    } else if(parseInt(numberOfWallet) + count > 6) {
      setStatus(`Exceeded max token purchase per wallet, you can mint only ${6 - parseInt(numberOfWallet)} toknes`)
      return
    }
    setMintLoading(true)

    const contract = getContract()

    try {
      console.log(price)
      if(presale) {
        if(!whiteListAddress.includes(walletAddress.toString().toLowerCase())) {
            setStatus('Please wait for the public sale time')
            setMintLoading(false)
            return
        } else {
          const leafNodes  = whiteListAddress.map(addr => keccak256(addr))
          const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true})
          let claimingAddress = keccak256(walletAddress);
          let hexProof = merkleTree.getHexProof(claimingAddress);
          let tx = await contract.PreMint(hexProof, count, { value: BigNumber.from(1e9).mul(BigNumber.from(1e9)).mul(price).div(1000).mul(count), from: walletAddress })
          let res = await tx.wait()
          if (res.transactionHash) {
            setStatus(`You minted ${count} JungleSafari Successfully`)
          }
        }
      } else {
        console.log(price)
        let tx = await contract.PubMint(count, { value: BigNumber.from(1e9).mul(BigNumber.from(1e9)).mul(price).div(1000).mul(count), from: walletAddress })
        let res = await tx.wait()
        if (res.transactionHash) {
          setStatus(`You minted ${count} JungleSafari Successfully`)
        }
      }
      setMintLoading(false)
    } catch(err) {
      console.log(err)
      let status = "Transaction failed because you have insufficient funds or sales not started"
      setStatus(status)
      setMintLoading(false)
    }
  }

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected()
    setWalletAddress(address)
    setStatus(status)
    addWalletListener()
    let whitelist = whiteList.map(addr => addr.toString().toLowerCase())
    setWhiteListAddress(whitelist)
  }, [])

  useEffect(async () => {
    if (status) {
      notify()
      setStatus(null)
    }
  }, [status, presale])
  
  {/* useEffect(async () => {
    let contract = getContract()
    await contract.presale().then(res =>{
      console.log(presale)
      setPresale(res)
    })
    setPrice(presale ? 6 : 7)
  }, [presale]) */}

  useEffect( async () => {
    if(!loading && walletAddress) {
      let contract = getContract()
      let res = await contract.totalSupply()
      setTotalSupply(BigNumber.from(res).toString())
      let numofwallet = await contract.numberOfwallets(walletAddress)
      setNumberOfWallet(BigNumber.from(numofwallet).toString())
      await contract.presale().then(res =>{
        console.log(res)
        setPrice(res ? 6 : 7)
        setPresale(res)
      })
    }
  }, [loading, walletAddress] )  

  return(
    <div style={{flex: 1, display:'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'rgba(0, 0, 0, 0.35)'}}>
      <div>
        <div className='mint-top'>
          <p className='mint-ptop'>Become a Tribe member of Jungle Safari</p>
        </div>
        <div className='mint-bottom'>
          <p className='mint-pbottom'>The journey of the lost tigers is going to be the most craziest journey ever</p>
        </div>
        <div style={{ paddingTop: '20px', textAlign: 'center' }}>
         
            <>
            <h1 className='mint-amount'>{walletAddress &&( presale ? 'Presale is Live' : 'Public sale is Live')}</h1>
            <h1 className='mint-amount'>Total Minted {totalSupply}/3333</h1>
            <h6 className='mint-price'>Total Price: {(count * (presale ? 0.006 : 0.007)).toFixed(3)} MATIC</h6>
              <div className='div-counter'>
                <button className='minus' onClick={decrease}>-</button>
                <h1 className='counter'>{count}</h1>
                <button className='plus' onClick={increase}>+</button>
              </div>
            </>
          
          {!walletAddress ? <Button 
            text={'Connect Wallet'} 
            onClick = {() => {onClickConnectWallet()} }
            className = {
              loading && 'loading'
            }
          />:
          <Button 
            text={loading ? 'Minting...' : 'Mint'} 
            onClick = {
                () => {
                    !loading && onMint()
                }
            }
            className = {
              loading && 'loading'
            }
          />}
        </div>
      </div>
      <MyToastContainer />
    </div>
  )
}
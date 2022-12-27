import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { ethers } from "hardhat";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const WethAddr = "0x1a237400185127d8b19d6ba7cad5d952a661dd56";
  const FactoryAddr = "0x53D213eE429ef1a3A75Fc09FBbfc5e4a01A66F17";
  let accounts = await ethers.getSigners();
  let Router: Contract, Erc20: Contract, Weth: Contract;

  let wallet: SignerWithAddress;
  wallet = accounts[0];
  const _Weth = await ethers.getContractFactory("WETH9", wallet);
  const _Router = await ethers.getContractFactory("UniswapV2Router02", wallet);
  const _Erc20 = await ethers.getContractFactory("BEP20Ethereum", wallet);
  Weth = await _Weth.deploy();
  await Promise.all([Weth.deployed(), sleep(3000)]);
  Router = await _Router.deploy(FactoryAddr, WethAddr);

  Erc20 = await _Erc20.deploy();
  await sleep(3000);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

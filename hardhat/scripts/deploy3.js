const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 编译合约并准备部署
    const Token = await ethers.getContractFactory("SimpleERC20Token");
    const token = await Token.deploy(
        ["Token Name", "SYM"],  // 字符串参数数组：名称和符号
        [18, 1000000],  // 数字参数数组：小数位和总供应量
        "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",  // tokenA的地址
        "0x8bDac7c23Bbf8EAe561E52df32060a7A0A97ef5d",  // 收费地址
        ethers.utils.parseEther("0.001"),  // 部署费用
        "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",  // LP代币地址
        "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",  // WETH代币地址
        "0x86dcd3293C53Cf8EFd7303B57beb2a3F671dDE98",  // Uniswap路由器地址
        500000   // 最大钱包余额
        , {value: ethers.utils.parseEther("0.01")}  // 部署时发送ETH
    );

 
    await token.deployed();
    console.log("Token deployed to:", token.address);

   
    const initializeTx = await token.initialize(1000, 1000);
    await initializeTx.wait(); // 等待交易被挖矿确认

    console.log("Liquidity added");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });


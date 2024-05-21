// scripts/deploy.js
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

   
    const tokenAddress = '0x26A12F7f6Bc1F64153244a842a360874CE97A8E2';

  
    const InvestmentContract = await ethers.getContractFactory("InvestmentContract");
    const investmentContract = await InvestmentContract.deploy(tokenAddress);

    console.log("InvestmentContract deployed to:", investmentContract.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

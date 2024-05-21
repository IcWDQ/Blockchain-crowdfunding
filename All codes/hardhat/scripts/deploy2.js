// scripts/deploy.js
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const SupplierFinance = await ethers.getContractFactory("SupplierFinance");
    const supplierFinance = await SupplierFinance.deploy();

    console.log("SupplierFinance contract deployed to:", supplierFinance.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

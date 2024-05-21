// scripts/deploy.js
async function main() {
    // 获取合约工厂
    const ProjectFunding = await ethers.getContractFactory("ProjectFunding");
  
    // 部署合约
    const projectFunding = await ProjectFunding.deploy();
  
    await projectFunding.deployed();
  
    console.log("ProjectFunding deployed to:", projectFunding.address);
  }
  
  // 运行脚本
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  
require('@nomiclabs/hardhat-ethers');
require('@nomicfoundation/hardhat-verify');




module.exports = {
  solidity: "0.8.22",
  networks: {
    bsc: {  
      url: "https://bsc-dataseed.binance.org/",  
      accounts: [`0x${"031226125ef75be7f2d1bdce838d739d6fcad22f4eeb646ca0af21b2d758a3cf"}`] 
    },
   sepolia: {
      url: "https://sepolia.infura.io/v3/67b45802391d48df96dac5da17647dba",
      accounts: [`0x${"9bb1ae96db264d7abf3805138ca40edf0ce718d1ebd1c6f17da909dc19308a46"}`]
  }
  },
  etherscan: {
    apiKey:{
    bsc: "777HNSBFI9RYE26U9XWNY63516S8UBV36E"
  }
},
sourcify: {
  enabled: true
}

}

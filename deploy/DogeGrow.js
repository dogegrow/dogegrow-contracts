module.exports = async (hre) => {
  const accounts = await hre.getNamedAccounts();
  const deployer = accounts.admin;

  console.log((await hre.ethers.provider.getBalance(deployer)).toString());

  const {address: lib} = await hre.deployments.deploy("IterableMapping", {from: deployer, log: true,});

  const {address} = await hre.deployments.deploy("DogeGrow", {
    from: deployer,
    args: [
      // bsc
      "0xba2ae424d960c26247dd6c32edc70b295c744c43",
      "0x10ed43c718714eb63d5aa57b78b54704e256024e",
      "0xB5bac7844A8F2B52199E37b5930e0Dd13853d511",
    ],
    log: true,
    libraries: {
      IterableMapping: lib,
    }
  });

  console.log((await hre.ethers.provider.getBalance(deployer)).toString());
};

module.exports.tags = ["DogeGrow"];

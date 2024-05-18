const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProjectFunding", function () {
  let ProjectFunding, projectFunding, owner, addr1, addr2;

  beforeEach(async function () {
    ProjectFunding = await ethers.getContractFactory("ProjectFunding");
    [owner, addr1, addr2] = await ethers.getSigners();
    projectFunding = await ProjectFunding.deploy();
    await projectFunding.deployed();
  });

  it("should create a project", async function () {
    await projectFunding.createProject(
      ethers.utils.parseEther("10"),
      [ethers.utils.parseEther("5"), ethers.utils.parseEther("5")],
      [30 * 24 * 60 * 60, 60 * 24 * 60 * 60],
      15 * 24 * 60 * 60
    );
    const project = await projectFunding.projects(1);
    expect(project.fundingGoal).to.equal(ethers.utils.parseEther("10"));
  });

  it("should approve a project", async function () {
    await projectFunding.createProject(
      ethers.utils.parseEther("10"),
      [ethers.utils.parseEther("5"), ethers.utils.parseEther("5")],
      [30 * 24 * 60 * 60, 60 * 24 * 60 * 60],
      15 * 24 * 60 * 60
    );
    await projectFunding.approveProject(1);
    const project = await projectFunding.projects(1);
    expect(project.status).to.equal(1); // 1 corresponds to ProjectStatus.Active
  });

  it("should fund a project", async function () {
    await projectFunding.createProject(
      ethers.utils.parseEther("10"),
      [ethers.utils.parseEther("5"), ethers.utils.parseEther("5")],
      [30 * 24 * 60 * 60, 60 * 24 * 60 * 60],
      15 * 24 * 60 * 60
    );
    await projectFunding.approveProject(1);
    await projectFunding.connect(addr1).fundProject(1, { value: ethers.utils.parseEther("10") });
    const project = await projectFunding.projects(1);
    expect(project.amountRaised).to.equal(ethers.utils.parseEther("10"));
    expect(project.status).to.equal(2); // 2 corresponds to ProjectStatus.Funded
  });

  it("should approve a milestone", async function () {
    await projectFunding.createProject(
      ethers.utils.parseEther("10"),
      [ethers.utils.parseEther("5"), ethers.utils.parseEther("5")],
      [30 * 24 * 60 * 60, 60 * 24 * 60 * 60],
      15 * 24 * 60 * 60
    );
    await projectFunding.approveProject(1);
    await projectFunding.connect(addr1).fundProject(1, { value: ethers.utils.parseEther("10") });
    await projectFunding.approveMilestone(1, 0);
    const milestone = await projectFunding.getMilestone(1, 0);
    expect(milestone[2]).to.equal(1); // 1 corresponds to MilestoneStatus.Approved
  });

  it("should withdraw funds for a milestone", async function () {
    await projectFunding.createProject(
      ethers.utils.parseEther("10"),
      [ethers.utils.parseEther("5"), ethers.utils.parseEther("5")],
      [30 * 24 * 60 * 60, 60 * 24 * 60 * 60],
      15 * 24 * 60 * 60
    );
    await projectFunding.approveProject(1);
    await projectFunding.connect(addr1).fundProject(1, { value: ethers.utils.parseEther("10") });
    await projectFunding.approveMilestone(1, 0);
    await projectFunding.withdrawFunds(1, 0);
    const milestone = await projectFunding.getMilestone(1, 0);
    expect(milestone[2]).to.equal(2); // 2 corresponds to MilestoneStatus.Completed
  });

  it("should cancel a project", async function () {
    await projectFunding.createProject(
      ethers.utils.parseEther("10"),
      [ethers.utils.parseEther("5"), ethers.utils.parseEther("5")],
      [30 * 24 * 60 * 60, 60 * 24 * 60 * 60],
      15 * 24 * 60 * 60
    );
    await projectFunding.approveProject(1);
    await projectFunding.connect(addr1).fundProject(1, { value: ethers.utils.parseEther("10") });
    await projectFunding.cancelProject(1);
    const project = await projectFunding.projects(1);
    expect(project.status).to.equal(4); // 4 corresponds to ProjectStatus.Cancelled
  });

  it("should refund contributors after timeout", async function () {
    await projectFunding.createProject(
      ethers.utils.parseEther("10"),
      [ethers.utils.parseEther("5"), ethers.utils.parseEther("5")],
      [30 * 24 * 60 * 60, 60 * 24 * 60 * 60],
      15 * 24 * 60 * 60
    );
    await projectFunding.approveProject(1);
    await projectFunding.connect(addr1).fundProject(1, { value: ethers.utils.parseEther("5") });
    
    // Fast forward time
    await ethers.provider.send("evm_increaseTime", [15 * 24 * 60 * 60 + 1]);
    await ethers.provider.send("evm_mine");

    await projectFunding.timeoutRefund(1);
    const project = await projectFunding.projects(1);
    expect(project.status).to.equal(4); // 4 corresponds to ProjectStatus.Cancelled
  });
});

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplierFinance {
    struct Project {
        address supplier;
        string description;
        uint fundingDeadline;
        uint fundingTarget;
        uint minimumContribution;
        uint amountRaised;
        bool fundingComplete;
    }

    uint public numProjects;
    mapping(uint => Project) public projects;
    mapping(uint => mapping(address => uint)) public contributions;

    event ProjectCreated(uint projectId, address supplier, uint targetAmount);
    event FundingReceived(uint projectId, address bank, uint amount, uint interestRate, uint repaymentPeriod);
    event ProjectFunded(uint projectId);

    // 创建项目
    function createProject(string memory _description, uint _fundingDeadline, uint _fundingTarget, uint _minimumContribution) public {
        projects[numProjects] = Project({
            supplier: msg.sender,
            description: _description,
            fundingDeadline: _fundingDeadline,
            fundingTarget: _fundingTarget,
            minimumContribution: _minimumContribution,
            amountRaised: 0,
            fundingComplete: false
        });
        emit ProjectCreated(numProjects, msg.sender, _fundingTarget);
        numProjects++;
    }

    // 银行投资项目
    function fundProject(uint _projectId, uint _amount, uint _interestRate, uint _repaymentPeriod) public payable {
        Project storage project = projects[_projectId];
        require(block.timestamp <= project.fundingDeadline, "Funding deadline has passed");
        require(msg.value >= project.minimumContribution && msg.value <= (project.fundingTarget - project.amountRaised), "Investment must be within the allowed range");
        require(msg.value == _amount, "Transaction value must match the funding amount");

        contributions[_projectId][msg.sender] += msg.value;
        project.amountRaised += msg.value;
        emit FundingReceived(_projectId, msg.sender, msg.value, _interestRate, _repaymentPeriod);

        if (project.amountRaised >= project.fundingTarget) {
            project.fundingComplete = true;
            emit ProjectFunded(_projectId);
        }
    }

    // 获取项目信息
    function getProject(uint _projectId) public view returns (Project memory) {
        return projects[_projectId];
    }
}

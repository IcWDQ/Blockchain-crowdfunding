// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProjectFunding {
    address public owner;
    uint256 public constant MILESTONE_TIMEOUT = 30 days;
    uint256 public constant FUNDING_TIMEOUT = 15 days;
     enum ProjectStatus { Pending, Active, Funded, Completed, Cancelled }
    enum MilestoneStatus { Pending, Approved, Completed }

   struct Milestone {
    uint256 goal;
    uint256 deadline;
    MilestoneStatus status;
}

struct Project {
    address payable creator;
    uint256 deadline;
    uint256 milestoneDeadline;
    uint256 fundingGoal;
    uint256 amountRaised;
    ProjectStatus status; 
    Milestone[] milestones; 
}

    mapping(uint256 => Project) public projects;
    uint256 public projectCount;

    event ProjectCreated(uint256 projectId, uint256 fundingGoal, uint256 deadline);
     event ProjectApproved(uint256 projectId);
     event ProjectFunded(uint256 projectId, uint256 amount);
    event MilestoneApproved(uint256 projectId);
    event ProjectCancelled(uint256 projectId);
    event FundsWithdrawn(uint256 projectId, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // 创建项目
  
    function createProject(uint256 _fundingGoal, uint256[] memory _milestoneGoals, uint256[] memory _milestoneDeadlines) external {
    require(_milestoneGoals.length == _milestoneDeadlines.length, "Mismatched milestones data");

    uint256 newProjectId = ++projectCount;
    Project storage project = projects[newProjectId];
    project.creator = payable(msg.sender);
    project.fundingGoal = _fundingGoal;
    project.status = ProjectStatus.Pending;  

    for (uint i = 0; i < _milestoneGoals.length; i++) {
        project.milestones.push(Milestone({
            goal: _milestoneGoals[i],
            deadline: block.timestamp + _milestoneDeadlines[i],
            status: MilestoneStatus.Pending
        }));
    }

    emit ProjectCreated(newProjectId, _fundingGoal, block.timestamp + FUNDING_TIMEOUT);
}

//授权项目
        function approveProject(uint256 _projectId) external onlyOwner {
        Project storage project = projects[_projectId];
        require(project.status == ProjectStatus.Pending, "Project is not in pending status");

        project.status = ProjectStatus.Active;
        emit ProjectApproved(_projectId);
    }

    
// 投资项目
function fundProject(uint256 _projectId) external payable {
    Project storage project = projects[_projectId];
    require(project.status == ProjectStatus.Active, "Project is not active");
    require(project.amountRaised < project.fundingGoal, "Funding goal reached");

    project.amountRaised += msg.value;
    emit ProjectFunded(_projectId, msg.value);

    if (project.amountRaised >= project.fundingGoal) {
        project.status = ProjectStatus.Funded;
    }
}


    // 管理员审批里程碑

function approveMilestone(uint256 _projectId) external onlyOwner {
    Project storage project = projects[_projectId];
    require(project.status == ProjectStatus.Funded, "Project funding not complete"); 
    require(block.timestamp <= project.milestoneDeadline, "Milestone deadline has passed");

    project.status = ProjectStatus.Completed; // 里程碑完成后更新项目状态为 Completed
    emit MilestoneApproved(_projectId);
}

    
 // 撤销项目
function cancelProject(uint256 _projectId) external onlyOwner {
    Project storage project = projects[_projectId];
    require(project.status == ProjectStatus.Active || project.status == ProjectStatus.Funded, "Project is not active or already cancelled");

    project.status = ProjectStatus.Cancelled;
    project.creator.transfer(project.amountRaised);
    emit ProjectCancelled(_projectId);
}


  
  // 发放资金
function withdrawFunds(uint256 _projectId) external onlyOwner {
    Project storage project = projects[_projectId];
    require(project.status == ProjectStatus.Funded, "Project funding not complete or project still active");

    project.creator.transfer(project.amountRaised);
    project.status = ProjectStatus.Completed; // 标记项目为完成状态
    emit FundsWithdrawn(_projectId, project.amountRaised);
}


  // 超时处理（退款）
function timeoutRefund(uint256 _projectId) external {
    Project storage project = projects[_projectId];
    require(block.timestamp > project.deadline || block.timestamp > project.milestoneDeadline, "Project or milestone deadline not yet passed");
    require(project.status == ProjectStatus.Active, "Project not active or already processed");

    project.status = ProjectStatus.Cancelled;
    payable(msg.sender).transfer(project.amountRaised);
}

}

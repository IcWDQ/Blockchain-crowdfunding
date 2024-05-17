// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InvestmentContract is ReentrancyGuard, Ownable {
    IERC20 public token;

    struct Investor {
        uint256 depositAmount;
        uint256 depositTime;
        uint256 totalProfit;
    }

    mapping(address => Investor) public investors;

    constructor(IERC20 _token) Ownable() {
        token = _token;
    }

    function setToken(IERC20 _newToken) external onlyOwner {
        token = _newToken;
    }

    function deposit(uint256 amount) external nonReentrant {
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        Investor storage investor = investors[msg.sender];
        investor.depositAmount += amount;
        investor.depositTime = block.timestamp;
    }

    function calculateProfit(address investorAddress) public view returns (uint256) {
        Investor storage investor = investors[investorAddress];
        if (investor.totalProfit >= investor.depositAmount * 10 / 100) {
            return investor.totalProfit;
        }

        uint256 timeElapsed = block.timestamp - investor.depositTime;
        uint256 daysElapsed = timeElapsed / 86400;
        uint256 potentialProfit = investor.depositAmount * daysElapsed / 100;

        uint256 maxProfit = investor.depositAmount * 10 / 100;
        if (potentialProfit + investor.totalProfit > maxProfit) {
            return maxProfit;
        } else {
            return potentialProfit + investor.totalProfit;
        }
    }
    function changeOwner(address newOwner) public onlyOwner {
        transferOwnership(newOwner);
    }

    function withdraw() external nonReentrant {
        Investor storage investor = investors[msg.sender];
        uint256 profit = calculateProfit(msg.sender);
        require(profit > 0 || investor.depositAmount > 0, "Nothing to withdraw");

        uint256 totalAmount = investor.depositAmount + profit;
        investor.depositAmount = 0;
        investor.totalProfit = profit;

        require(token.transfer(msg.sender, totalAmount), "Transfer failed");
    }

    function balanceOf(address investorAddress) external view returns (uint256) {
        return token.balanceOf(investorAddress);
    }
}
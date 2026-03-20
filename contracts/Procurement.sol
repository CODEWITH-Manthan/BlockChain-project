// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Procurement {
    struct Milestone {
        string description;
        uint amount;
        bool approved;
        bool paid;
    }

    address public authority;
    address public contractor;

    Milestone[] public milestones;

    constructor(address _contractor) payable {
        authority = msg.sender;
        contractor = _contractor;
    }

    function addMilestone(string memory _desc, uint _amount) public {
        require(msg.sender == authority, "Only authority can add milestones");
        milestones.push(Milestone(_desc, _amount, false, false));
    }

    function approveMilestone(uint index) public {
        require(msg.sender == authority, "Only authority can approve");
        require(index < milestones.length, "Invalid milestone index");
        milestones[index].approved = true;
    }

    function releasePayment(uint index) public {
        require(milestones[index].approved, "Milestone not approved");
        require(!milestones[index].paid, "Milestone already paid");
        require(address(this).balance >= milestones[index].amount, "Insufficient contract balance");

        payable(contractor).transfer(milestones[index].amount);
        milestones[index].paid = true;
    }

    // Allow contract to receive ETH
    receive() external payable {}
}

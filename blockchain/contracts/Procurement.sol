// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Procurement {
    struct Milestone {
        string description;
        uint256 amount;
        bool approved;
        bool paid;
        string invoiceHash;
    }

    address public authority;
    address public contractor;
    Milestone[] public milestones;

    event MilestoneAdded(uint256 index, string description, uint256 amount);
    event MilestoneApproved(uint256 index);
    event PaymentReleased(uint256 index, uint256 amount);
    event InvoiceAttached(uint256 index, string ipfsHash);

    constructor(address _contractor) payable {
        authority = msg.sender;
        contractor = _contractor;
    }

    modifier onlyAuthority() {
        require(msg.sender == authority, "Only authority");
        _;
    }

    function addMilestone(string memory _desc, uint256 _amount) public onlyAuthority {
        milestones.push(Milestone(_desc, _amount, false, false, ""));
        emit MilestoneAdded(milestones.length - 1, _desc, _amount);
    }

    function attachInvoice(uint256 index, string memory ipfsHash) public {
        require(index < milestones.length, "Invalid index");
        milestones[index].invoiceHash = ipfsHash;
        emit InvoiceAttached(index, ipfsHash);
    }

    function approveMilestone(uint256 index) public onlyAuthority {
        require(index < milestones.length, "Invalid index");
        require(!milestones[index].approved, "Already approved");
        milestones[index].approved = true;
        emit MilestoneApproved(index);
    }

    function releasePayment(uint256 index) public {
        require(index < milestones.length, "Invalid index");
        require(milestones[index].approved, "Not approved");
        require(!milestones[index].paid, "Already paid");
        require(address(this).balance >= milestones[index].amount, "Insufficient balance");

        payable(contractor).transfer(milestones[index].amount);
        milestones[index].paid = true;
        emit PaymentReleased(index, milestones[index].amount);
    }

    function getMilestonesCount() public view returns (uint256) {
        return milestones.length;
    }

    receive() external payable {}
}

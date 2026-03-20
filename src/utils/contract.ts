export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

// After compiling, you would usually import the generated JSON from artifacts
// For fallback or until compilation is done, we define a minimalist ABI here.
export const CONTRACT_ABI = [
  "function authority() view returns (address)",
  "function contractor() view returns (address)",
  "function milestones(uint256) view returns (string description, uint256 amount, bool approved, bool paid)",
  "function addMilestone(string memory _desc, uint256 _amount) public",
  "function approveMilestone(uint256 index) public",
  "function releasePayment(uint256 index) public"
];

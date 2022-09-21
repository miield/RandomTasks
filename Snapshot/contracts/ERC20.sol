// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OyinToken is ERC20Snapshot, Ownable {

    constructor() ERC20("OYIN TOKEN", "OYIN") {
        _mint(msg.sender, 100000000000000000000);
    }

    function snapshot() public onlyOwner returns (uint256){
        return _snapshot();
    }

    function checkSnapshot() public view returns (uint256) {
        return _getCurrentSnapshotId();
    }

}
// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OyinToken is ERC20Snapshot, Ownable {

    using Arrays for uint256[];
    using Counters for Counters.Counter;

    Counters.Counter private _currentSnapshotId;

    constructor() ERC20("OYIN TOKEN", "OYIN") {
        _mint(msg.sender, 100000);
    }

    function snapshot() external onlyOwner returns (uint256) {
        _currentSnapshotId.increment();
        uint256 currentId = _getCurrentSnapshotId();
        emit Snapshot(currentId);
        return currentId;
    }

}
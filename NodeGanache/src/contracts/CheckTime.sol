// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract CheckTime {
    uint gap = 60; // one minute
    uint creationTime;
    uint expirationTime;
    
    constructor() {
        creationTime = block.timestamp; // `now` is deprecated
        expirationTime = creationTime + gap;
    }
    
    function checkTime() public view returns(uint) {
        uint currentTime = block.timestamp; 
        require(currentTime < expirationTime, "Times Up");
        currentTime = block.timestamp;
        return currentTime;
    }
}
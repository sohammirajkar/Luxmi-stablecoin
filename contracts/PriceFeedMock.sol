// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract PriceFeedMock {
    int256 private price;

    constructor() {
        price = 1 * 10 ** 18;
    }

    function setPrice(int256 _price) public {
        price = _price;
    }

    function latestRoundData()
        public
        view
        returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
    {
        return (0, price, block.timestamp, block.timestamp, 0);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {IUniswapV2Pair} from "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import {IUniswapV2Router02} from "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract Luxmi {
    string public name = "Luxmi Stablecoin";
    string public symbol = "LXMI";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    address public owner;
    AggregatorV3Interface internal priceFeed;

    uint256 public targetPrice = 1 * 10 ** 18; // $1
    uint256 public kp = 1;
    uint256 public ki = 1;
    uint256 public kd = 1;
    uint256 public integral = 0;
    uint256 public previousError = 0;

    event Transfer(address indexed from, address indexed to, uint256 value);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this");
        _;
    }

    constructor(address _priceFeed) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    function mint(address _to, uint256 _amount) public onlyOwner {
        totalSupply += _amount;
        balanceOf[_to] += _amount;
        emit Transfer(address(0), _to, _amount);
    }

    function burn(address _from, uint256 _amount) public onlyOwner {
        require(balanceOf[_from] >= _amount, "Insufficient balance");
        totalSupply -= _amount;
        balanceOf[_from] -= _amount;
        emit Transfer(_from, address(0), _amount);
    }

    function getMarketPrice() public view returns (uint256) {
        (, int256 price,,,) = priceFeed.latestRoundData();
        return uint256(price);
    }

    function adjustSupply() public {
        uint256 currentPrice = getMarketPrice();
        uint256 error = targetPrice - currentPrice;
        integral += error;
        uint256 derivative = error - previousError;
        uint256 adjustment = kp * error + ki * integral + kd * derivative;
        previousError = error;

        if (adjustment > 0) {
            mint(address(this), adjustment);
        } else {
            burn(address(this), -adjustment);
        }
    }
}

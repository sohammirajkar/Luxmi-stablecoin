# Luxmi Stablecoin (WIP)

Luxmi is a floating stablecoin designed for payment transactions. It utilizes Dutch auctions to maintain stability, PID controllers to monitor and adjust supply, and integrates with stable swap protocols like Curve and Uniswap for liquidity and efficient trading.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [Dutch Auctions](#dutch-auctions)
- [PID Controllers](#pid-controllers)
- [Stable Swap Algorithms](#stable-swap-algorithms)
- [Smart Contracts](#smart-contracts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Work](#future-work)

## Introduction

Luxmi is a stablecoin designed to provide a reliable and stable means of payment. It achieves stability through a combination of Dutch auctions, PID controllers, and integration with stable swap protocols.

## Technologies Used

- Solidity
- Hardhat
- TypeScript
- Ethers.js
- Chainlink
- Uniswap
- Curve

## Features

- **Dutch Auctions**: Used for initial distribution and dynamic supply adjustments.
- **PID Controllers**: Monitor and adjust the supply of the stablecoin to maintain target price stability.
- **Stable Swap Algorithms**: Integration with Curve and Uniswap for liquidity and efficient trading.

## Setup and Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/sohammirajkar/Luxmi-stablecoin.git
   cd Luxmi-stablecoin
   ```

2. **Install Foundry**:
   Follow the instructions on the [Foundry GitHub page](https://github.com/gakonst/foundry) to install Foundry.

3. **Initialize the Project**:

   ```bash
   forge init
   ```

4. **Install Dependencies**:

   ```bash
   npm install
   ```

5. **Configure Hardhat**:
   Create and configure `hardhat.config.ts` for TypeScript support and network configuration.

## Project Structure

```
luxmi-stablecoin/
├── contracts/
│   ├── Luxmi.sol
│   ├── PriceFeedMock.sol
├── scripts/
│   ├── deploy.ts
├── test/
│   ├── luxmi.test.ts
├── hardhat.config.ts
├── package.json
├── README.md
|-- tsconfig.json
```

## Dutch Auctions

Dutch auctions start at a high price and decrease incrementally until a bid is made. They are used in Luxmi for:

- **Initial Distribution**: Ensuring fair price discovery and token distribution.
- **Dynamic Supply Adjustment**: Adjusting the supply based on market conditions, triggered by the PID controller.

### Example Smart Contract

```solidity
pragma solidity ^0.8.0;

contract DutchAuction {
    // Contract code
}
```

## PID Controllers

A PID controller (Proportional-Integral-Derivative) is a control loop mechanism that calculates an error value as the difference between a desired setpoint and a measured process variable. Luxmi uses PID controllers to:

- **Monitor Price**: Continuously monitor the market price of the stablecoin.
- **Adjust Supply**: Adjust the supply of the stablecoin to minimize deviations from the target price.

### Example PID Controller

```typescript
class PIDController {
    // Controller code
}
```

## Stable Swap Algorithms

Stable swap algorithms are used to provide liquidity and facilitate efficient trading with minimal slippage. Luxmi integrates with protocols like Curve and Uniswap to:

- **Provide Liquidity**: Allow users to add liquidity and trade stablecoins with low fees and slippage.
- **Efficient Trading**: Ensure efficient and stable trading environments for users.

### Example Integration with Uniswap

```solidity
contract Luxmi {
    // Integration code
}
```

## Smart Contracts

- **Luxmi.sol**: Main contract for the stablecoin, including minting, burning, and supply adjustment.
- **PriceFeedMock.sol**: Mock contract for testing price feed inputs.

## Testing

Luxmi uses Hardhat and TypeScript for testing. Tests are located in the `test` directory and cover various functionalities of the Luxmi contract.

### Running Tests

```bash
npx hardhat test
```

## Deployment

Deployment scripts are located in the `scripts` directory. Deploy contracts using Hardhat.

### Deployment Script

```typescript
import { ethers } from "hardhat";

async function main() {
    // Deployment code
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
```

## Future Work

- **Enhanced Security**: Conduct thorough security audits and implement additional security measures.
- **Additional Features**: Explore adding more features like multi-collateral support and governance mechanisms.
- **Community Engagement**: Build a community around Luxmi for feedback and continuous improvement.

## Conclusion

Luxmi combines Dutch auctions, PID controllers, and stable swap protocols to maintain stability and provide a reliable payment method. The integration of these mechanisms ensures that Luxmi remains a stable and efficient stablecoin.

---

By following this README, you should be able to understand the purpose and structure of Luxmi, set up the development environment, and start working on the project.

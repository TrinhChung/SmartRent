// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract SmartContract {

    struct Term {
        string name;
        string content;
    }

    struct ContractEntity {
        uint32 renterId;

        uint32 sellerId;

        uint32 rentCost;

        uint32 duration;

        uint256 timeStart;

        uint256 paymentDeadline;

        string payment_type;

        Term[] termArray;

        address renter;

        address seller;
    }

    mapping(uint256=>ContractEntity) contracts;
    ContractEntity[] contractArray;

    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function getProductById(uint256 _id) public view returns(ContractEntity memory) {
        require(contracts[_id].renterId != 0 && (msg.sender == contracts[_id].renter || msg.sender == contracts[_id].seller));

        return (contracts[_id]);
    }

    function getContractBySellerId() public view returns(ContractEntity[] memory) {
         ContractEntity[] memory resContracts;
         for (uint i = 1; i <= contractArray.length; i++) {
            if (contractArray[i].seller == msg.sender) {
                // resContracts.push(contractArray[i]);
            }
        }
    }
}
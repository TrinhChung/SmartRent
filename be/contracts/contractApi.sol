// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract SmartContract {
    struct Term {
        string name;
        string content;
    }

    struct ContractEntity {
        uint256 id;
        uint32 renterId;
        uint32 sellerId;
        uint32 rentCost;
        uint32 duration;
        uint32 timeStart;
        uint32 paymentDeadline;
        string payment_type;
        Term[] termArray;
        address renter;
        address seller;
    }

    mapping(uint256 => ContractEntity) contracts;
    ContractEntity[] contractArray;

    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function createSmartContract(
        uint256 _id,
        uint32 _renterId,
        uint32 _sellerId,
        uint32 _rentCost,
        uint32 _duration,
        uint32 _timeStart,
        uint32 _paymentDeadline,
        string memory _payment_type,
        Term[] memory _termArray,
        address _seller,
        address _renter
    ) public onlyOwner {
        ContractEntity memory smartContract = ContractEntity(
            _id,
            _renterId,
            _sellerId,
            _rentCost,
            _duration,
            _timeStart,
            _paymentDeadline,
            _payment_type,
            _termArray,
            _seller,
            _renter
        );

        contracts[_id] = smartContract;
        contractArray.push(smartContract);
    }

    function getSmartContractById(
        uint256 _id
    ) public view returns (ContractEntity memory) {
        require(
            contracts[_id].renterId != 0 &&
                (msg.sender == contracts[_id].renter ||
                    msg.sender == contracts[_id].seller)
        );

        return (contracts[_id]);
    }
}

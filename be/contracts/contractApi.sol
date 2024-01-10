// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract SmartContract {
    struct Term {
        string name;
        string content;
    }

    struct Person {
        address addressWallet;
        uint balance;
    }

    event log(string message, address _address);

    struct ContractEntity {
        uint256 id;
        address renter;
        address seller;
        uint rentCost;
        uint32 duration;
        uint32 timeStart;
        uint32 paymentDeadline;
        string payment_type;
        Term[] termArray;
    }

    mapping(uint256 => ContractEntity) contracts;

    mapping(address => Person) persons;

    address payable owner;

    uint public balance;

    constructor() {
        owner = payable(msg.sender);
    }

    fallback() external payable {
        emit log("Recieve fallback token", msg.sender);
        updatePerson(msg.sender, msg.value);
    }

    receive() external payable {
        emit log("Recieve receive token", msg.sender);
        updatePerson(msg.sender, msg.value);
    }

    function updatePerson(address sender, uint amount) private {
        if (persons[sender].addressWallet != address(0x0)) {
            persons[sender].balance += amount;
        } else {
            Person memory newPerson = Person(sender, amount);
            persons[sender] = newPerson;
        }
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function createSmartContract(
        uint256 _id,
        address _renterAddress,
        address _sellerAdsress,
        uint _rentCost,
        uint32 _duration,
        uint32 _timeStart,
        uint32 _paymentDeadline,
        string memory _payment_type,
        Term[] memory _termArray
    ) public onlyOwner {
        Person memory renter = persons[_renterAddress];
        Person memory seller = persons[_sellerAdsress];
        require(
            renter.balance > _rentCost && seller.balance > _rentCost,
            "Insufficient balance"
        );

        ContractEntity storage newSmartContract = contracts[_id];
        newSmartContract.id = _id;
        newSmartContract.renter = _renterAddress;
        newSmartContract.seller = _sellerAdsress;
        newSmartContract.rentCost = _rentCost;
        newSmartContract.duration = _duration;
        newSmartContract.timeStart = _timeStart;
        newSmartContract.paymentDeadline = _paymentDeadline;
        newSmartContract.payment_type = _payment_type;

        for (uint256 i = 0; i < _termArray.length; i++) {
            newSmartContract.termArray.push(_termArray[i]);
        }

        contracts[_id] = newSmartContract;
    }

    function getSmartContractById(
        uint256 _id
    ) public view returns (ContractEntity memory) {
        ContractEntity memory smartContract = contracts[_id];
        return smartContract;
    }

    //Thanh toan
    function transferETH(address payable _to, uint256 amount) external payable {
        _to.transfer(amount);
    }

    //
    function getMe() external view returns (address) {
        return msg.sender;
    }

    //
    function getAddressContract() external view returns (uint) {
        return address(this).balance;
    }

    function getContractBalance() external view returns (uint) {
        return address(this).balance;
    }
}

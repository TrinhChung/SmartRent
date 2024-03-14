// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SmartContract is ERC721URIStorage {

struct ContractEntity { 
        uint256 id;
        address payable renter;
        address payable seller;
        address reAddress;
        uint256 rentCost;
        uint256 duration;
        uint256 timeStart;
        uint256 paymentDeadline;
        string payment_type;
        string[] termArray;
    }

    mapping(uint256 => ContractEntity) contracts;

    mapping(address => uint256) positRenter;


    modifier onlyRenter(uint256 id) {
        require(msg.sender == contracts[id].renter, "Only renter can call this method");
        _;
    }

    modifier onlySeller(uint256 id) {
        require(msg.sender == contracts[id].seller, "Only seller can call this method");
        _;
    }

    modifier onlyOwner(uint256 id) {
        require(msg.sender == contracts[id].seller ||
         msg.sender == contracts[id].renter, "Only owner can call this method");
        _;
    }

    receive() external payable {}

    constructor() ERC721("Smart Contract", "SC") {}

    function mint(uint256 _newItemId,
        address _renterAddress,
        address _sellerAdsress,
        address  _reAddress,
        uint256 _rentCost,
        uint256 _duration,
        uint256 _timeStart,
        uint256 _paymentDeadline,
        string memory _payment_type,
        string memory uri,
        string[] memory _termArray) public returns (uint256) {

        uint256 newItemId = _newItemId;
        _mint(msg.sender , newItemId);
        _setTokenURI(newItemId, uri);

        ContractEntity storage newSmartContract = contracts[_newItemId];
        newSmartContract.id = newItemId;
        newSmartContract.renter = payable(_renterAddress);
        newSmartContract.seller = payable(_sellerAdsress);
        newSmartContract.reAddress = _reAddress;
        newSmartContract.rentCost = _rentCost;
        newSmartContract.duration = _duration;
        newSmartContract.timeStart = _timeStart;
        newSmartContract.paymentDeadline = _paymentDeadline;
        newSmartContract.payment_type = _payment_type;

        for (uint256 i = 0; i < _termArray.length; i++) {
            newSmartContract.termArray.push(_termArray[i]);
        }

        return newItemId;
    }

    function depositContract(uint256 id) public payable {
        require(msg.value >= contracts[id].rentCost, "Deposit not enough");
        positRenter[msg.sender] += msg.value;
    }

    function renewal(uint256 _time, uint256 id) public payable onlyRenter(id) {
        require(msg.value >= contracts[id].rentCost);
        contracts[id].duration += _time;
    }

    function getPositRenter(address _renter) public view returns (uint256) {
        return positRenter[_renter];
    }

    function getContract(uint256 id) public view returns (ContractEntity memory) {
        ContractEntity memory smartContract = contracts[id];
        return smartContract;
    }

    // get all balance when destroy contract
    function close(address _to, uint256 id) public onlyOwner(id) {
        payable(_to).transfer(address(this).balance);
    }
}

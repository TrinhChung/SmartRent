// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SmartContract is ERC721URIStorage {

    struct ContractEntity { 
        address payable renter;
        address payable seller;
        uint256 reId;
        uint256 rentCost;
        uint256 duration;
        uint256 timeStart;
        uint256 paymentDeadline;
        string payment_type;
        string[] termArray;
    }

    mapping(uint256 => ContractEntity) contracts;

    mapping(address => mapping (uint256 => uint256)) positRenter;
    mapping(address => uint256) balanceRenter;


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

    function mint(
        uint256 _newItemId
        ,address _renterAddress
        ,address _sellerAdsress
        ,uint256  _reId
        ,uint256 _rentCost
        ,uint256 _duration
        ,uint256 _timeStart
        ,uint256 _paymentDeadline
        ,string memory _payment_type
        ,string memory uri
        ,string[] memory _termArray
        ) public returns (uint256) {

        uint256 newItemId = _newItemId;
        _mint(address(this) , newItemId);
        _setTokenURI(newItemId, uri);

        ContractEntity storage newSmartContract = contracts[_newItemId];
        newSmartContract.renter = payable(_renterAddress);
        newSmartContract.seller = payable(_sellerAdsress);
        newSmartContract.reId = _reId;
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

    function depositContract(uint256 id) public payable onlyRenter(id) {
        if (positRenter[msg.sender][id] <= 0) {
          require(msg.value >= contracts[id].rentCost, "Deposit not enough");
          positRenter[msg.sender][id] += contracts[id].rentCost;
          balanceRenter[msg.sender] += (msg.value - contracts[id].rentCost);
          ERC721(address(this)).transferFrom(address(this), contracts[id].renter, id);
        } else {
            balanceRenter[msg.sender] += (msg.value);
        }
    }

    function renewal(uint256 _time, uint256 id) public payable onlyRenter(id) {
        require(msg.value >= contracts[id].rentCost);
        contracts[id].duration += _time;
    }

    function withdrawPositRenter(uint256 value) public {
        require(value <= balanceRenter[msg.sender], "Balance not enough");
        payable(msg.sender).transfer(value);
        balanceRenter[msg.sender] -= value;
    }

    function getBalanceRenterETH() public view returns (uint256) {
        return balanceRenter[msg.sender];
    }

    function getContract(uint256 id) public view returns (ContractEntity memory) {
        ContractEntity memory smartContract = contracts[id];
        return smartContract;
    }

    // get all balance when destroy contract
    function close(address _to) public {
        payable(_to).transfer(address(this).balance);
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SmartContract is ERC721 {
    struct Term {
      string name;
      string content;
    }

    uint256 id;
    address payable renter;
    address payable seller;
    address public reAddress;
    uint rentCost;
    uint256 duration;
    uint256 timeStart;
    uint32 paymentDeadline;
    uint payment_type;
    Term[] public termArray;

    mapping(address => uint256) positRenter;


    modifier onlyRenter() {
        require(msg.sender == renter, "Only renter can call this method");
        _;
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Only seller can call this method");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == seller || msg.sender == renter, "Only owner can call this method");
        _;
    }

    receive() external payable {}

    constructor(
        uint256 _id,
        address _renterAddress,
        address _sellerAdsress,
        address  _reAddress,
        uint _rentCost,
        uint256 _duration,
        uint256 _timeStart,
        uint32 _paymentDeadline,
        uint _payment_type,
        Term[] memory _termArray
    ) ERC721("SmartContract", "SC") {
        id = _id;
        renter = payable(_renterAddress);
        seller = payable(_sellerAdsress);
        rentCost = _rentCost;
        duration = _duration;
        reAddress = _reAddress;
        timeStart = _timeStart;
        paymentDeadline = _paymentDeadline;
        payment_type = _payment_type;

        for (uint256 i = 0; i < _termArray.length; i++) {
            termArray.push(_termArray[i]);
        }
    }

    function depositContract(address _renter) public payable {
        require(msg.value >= rentCost, "Deposit not enough");
        positRenter[_renter] += msg.value;
    }

    function renewal(uint256 _time) public payable onlyRenter() {
        require(msg.value >= rentCost);
        duration += _time;
    }

    function getPositRenter(address _renter) public view returns (uint256) {
        return positRenter[_renter];
    }

    // get all balance when destroy contract
    function close(address _to) public onlyOwner {
        payable(_to).transfer(address(this).balance);
    }
}

import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import { getReAddressService } from "../../../services/SC/index";
import { AuthContext } from "../../../providers/authProvider";
import { ethers } from "ethers";

const web3 = new Web3(window.web3.currentProvider);

const MintRealEstate = () => {
  const { reAbi } = useContext(AuthContext);
  const [reAddress, setReAddress] = useState("");

  const fetchReAddressService = async () => {
    try {
      const res = await getReAddressService();
      if (res.status === 200) {
        setReAddress(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReAddressService();
  }, []);

  const handleCreateRealEstateNft = async () => {
    try {
      if (reAbi && reAddress.length > 10) {
        const provider = new ethers.JsonRpcProvider(
          "https://data-seed-prebsc-1-s1.bnbchain.org:8545"
        );

        const reInstance = new ethers.Contract(reAddress, reAbi, provider);
        const totalSupply = await reInstance.tokenURI(0);
        console.log(totalSupply);
      } else {
        alert("Không tồn tại SC nft");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Row>
      <Col>Tạo NFT cho bất động sản</Col>
      <Col>
        <Button
          onClick={() => {
            handleCreateRealEstateNft();
          }}
        >
          Tạo NFT
        </Button>
      </Col>
    </Row>
  );
};

export default MintRealEstate;

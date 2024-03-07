import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Col, Row } from "antd";
import { getReAddressService } from "../../../services/SC/index";
import { AuthContext } from "../../../providers/authProvider";
import { ethers } from "ethers";

const MintRealEstate = ({ setLoading = () => {} }) => {
  const { reAbi, authUser, provider, signer } = useContext(AuthContext);
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

  const reInstance = useMemo(() => {
    if (signer) {
      return new ethers.Contract(reAddress, reAbi, signer);
    } else return null;
  }, [reAddress, reAbi, signer]);

  const handleCreateRealEstateNft = async () => {
    setLoading(true);
    try {
      if (reAbi && reInstance && reAddress.length > 10) {
        console.log(reInstance);
        const totalSupply = await reInstance.mint(window.location.href);
        console.log(totalSupply);
      } else {
        alert("Không tồn tại SC nft");
      }
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <Row gutter={[8, 8]}>
      <Col
        className="text_title"
        style={{
          fontSize: 16,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Tạo NFT cho bất động sản
      </Col>
      <Col>
        <Button
          style={{ minWidth: 150 }}
          className="button-border"
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

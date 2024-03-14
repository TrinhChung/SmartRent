import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Col, Row } from "antd";
import { getReAddressService } from "../../../services/SC/index";
import { AuthContext } from "../../../providers/authProvider";
import { SmartContractContext } from "../../../providers/scProvider";

const MintRealEstate = ({ setLoading = () => {} }) => {
  const { reInstance } = useContext(SmartContractContext);

  const handleCreateRealEstateNft = async () => {
    setLoading(true);
    try {
      if (reInstance) {
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

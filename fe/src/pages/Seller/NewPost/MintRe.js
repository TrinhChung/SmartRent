import React, { useContext } from "react";
import { Button, Col, Row } from "antd";
import { SmartContractContext } from "../../../providers/scProvider";
import { useParams } from "react-router-dom";

const MintRealEstate = ({ setLoading = () => {} }) => {
  const { id } = useParams();
  const { reInstance } = useContext(SmartContractContext);

  const handleCreateRealEstateNft = async () => {
    setLoading(true);
    try {
      if (reInstance) {
        const totalSupply = await reInstance.mint(id, window.location.href);
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

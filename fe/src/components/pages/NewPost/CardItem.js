import { Col, Image, Row } from "antd";
import React from "react";
import ImageBannerHome from "../../../public/images/home-banner.jpg";
import "./CardItem.scss";
import { useNavigate } from "react-router-dom";

const CardItem = ({ img = ImageBannerHome, name, url }) => {
  const navigate = useNavigate();

  return (
    <Row>
      <Col span={24}>
        <Row>
          <Image
            className="background-image"
            style={{
              height: "30vh",
              width: "100%",
              cursor: "pointer",
            }}
            src={img}
            onClick={() => {
              navigate(url);
            }}
            preview={false}
          />
        </Row>
        <Row style={{ paddingTop: 5 }}>{name}</Row>
      </Col>
    </Row>
  );
};

export default CardItem;

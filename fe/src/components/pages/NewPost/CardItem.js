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
          <div
            className="background-image"
            style={{
              backgroundImage: `url(
                ${img}
              )`,
              height: "30vh",
              width: "100%",
            }}
            onClick={() => {
              navigate(url);
            }}
          />
        </Row>
        <Row className="text_title" style={{ paddingTop: 5 }}>
          {name}
        </Row>
      </Col>
    </Row>
  );
};

export default CardItem;

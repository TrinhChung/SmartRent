import { Col, Image, Row } from "antd";
import React from "react";
import { ExportOutlined } from "@ant-design/icons";
import "./Page.scss";

const CardHouseHome = ({
  house = { name: "name", address: "address" },
  key = 1,
}) => {
  return (
    <Col className="card-house_home" key={key}>
      <Image
        className="image-card_house_home"
        preview={false}
        src={house?.image}
      />
      <Row className="house-info_card">
        <Col span={24}>
          <Row
            className="text_title text-shadow"
            style={{ fontSize: 26, color: "var(--color-text-light)" }}
          >
            {house?.name}
          </Row>
          <Row style={{ alignItems: "center" }}>
            <Col className="text-shadow" xs={24} xl={20}>
              {house?.address}
            </Col>
            <Col xs={24} xl={4}>
              <ExportOutlined style={{}} className="open-link-house" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default CardHouseHome;

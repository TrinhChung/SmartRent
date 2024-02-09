import { Col, Row } from "antd";
import React from "react";
import { ExportOutlined } from "@ant-design/icons";
import "./Page.scss";
import { useNavigate } from "react-router-dom";
import ImageCustom from "./ImageCustom";

const CardHouseHome = ({
  name = "name",
  address = "address",
  image = "",
  key = 1,
  url = "",
}) => {
  const navigate = useNavigate();
  return (
    <Col className="card-house_home" key={key}>
      <ImageCustom
        className="image-card_house_home"
        preview={false}
        src={process.env.REACT_APP_HOST_BE + "/" + image}
      />
      <Row className="house-info_card">
        <Col span={24}>
          <Row
            className="text_title text-shadow"
            style={{ fontSize: 26, color: "var(--color-text-light)" }}
          >
            {name}
          </Row>
          <Row style={{ alignItems: "center" }}>
            <Col className="text-shadow" xs={24} xl={20}>
              {address}
            </Col>
            <Col xs={24} xl={4}>
              <ExportOutlined
                onClick={() => {
                  navigate(url);
                }}
                className="open-link-house"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default CardHouseHome;

import { Col, Row } from "antd";
import React, { memo } from "react";
import { ExportOutlined } from "@ant-design/icons";
import "./Page.scss";
import { useNavigate } from "react-router-dom";
import ImageCustom from "./ImageCustom";
import moment from "moment";
import localization from "moment/locale/vi";

const CardHouseHome = ({
  name = "name",
  address = "address",
  cost = "0",
  acreage = 0,
  image = "",
  key = 1,
  url = "",
  date = new Date(),
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
            className="text_title text-shadow name_house"
            style={{ fontSize: 26, color: "var(--color-text-light)" }}
            onClick={() => {
              navigate(url);
            }}
          >
            <label style={{ cursor: "pointer" }}>{name}</label>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <Col className="text-shadow" xs={24} xl={24}>
              <label style={{ paddingRight: 8 }}>{address}</label>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col>
              <Row>
                <label>
                  Diện tích: {acreage} m<sup>2</sup>
                </label>
              </Row>
            </Col>
            <Col style={{ display: "flex", alignItems: "end" }}>
              <Row>
                <label>
                  Giá: {String(cost).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
                </label>
              </Row>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col>
              <Row>
                <label>Ngày đăng: {moment(date).fromNow()}</label>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default memo(CardHouseHome);

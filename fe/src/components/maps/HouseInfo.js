import React, { useState } from "react";
import { Col, Popover, Row } from "antd";
import { HomeFilled } from "@ant-design/icons";
import "./Map.scss";
import { useNavigate } from "react-router-dom";

const HouseInfo = ({ house, scaleIcon }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Col className="marker-house-custom">
      <Popover
        content={
          <Col>
            <Row
              onClick={() => {
                navigate(`/full-house-view/${house?.id}`);
              }}
              className="name-house"
            >
              {house?.name}
            </Row>
            <Row>
              Giá: {String(house?.cost).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              VNĐ
            </Row>
            <Row>
              Diện tích: {house?.acreage} m<sup>2</sup>
            </Row>
          </Col>
        }
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <HomeFilled
          style={{ fontSize: scaleIcon, color: "var(--color-text)" }}
        />
      </Popover>
    </Col>
  );
};

export default HouseInfo;

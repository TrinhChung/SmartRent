import React, { useState } from "react";
import { Col, Popover, Row } from "antd";
import { HomeTwoTone } from "@ant-design/icons";
import "./Map.scss";
import { useNavigate } from "react-router-dom";

const HouseInfo = ({ house, scaleIcon, getDirectionRoute = () => {} }) => {
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
            <Row
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                getDirectionRoute({
                  lat: Number(house?.Address?.lat),
                  lng: Number(house?.Address?.lng),
                });
                setOpen(false);
              }}
            >
              Xem quãng đường
            </Row>
          </Col>
        }
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <HomeTwoTone
          twoToneColor="#e74c3c"
          style={{
            fontSize: scaleIcon,
            position: "absolute",
            top: -Number(scaleIcon / 2),
            left: -Number(scaleIcon / 2),
          }}
        />
      </Popover>
    </Col>
  );
};

export default HouseInfo;

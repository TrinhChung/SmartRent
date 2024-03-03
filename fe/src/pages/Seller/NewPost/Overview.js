import React, { memo, useEffect } from "react";
import { Row, Col, Image, Divider, Avatar, Button } from "antd";
import Slider from "react-slick";
import "./FullHouseView.scss";
import moment from "moment";

const Overview = ({
  files = [],
  name,
  roomTotal,
  floorTotal,
  acreage,
  isPaymentCoin,
  address,
  cost = 0,
  isPet,
  autoPayment,
  owner = {},
}) => {
  const settings = {
    className: "center",
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    pauseHover: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Row className="overview">
      {files && files.length > 0 && (
        <Col span={12}>
          <Slider
            {...settings}
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              backgroundColor: "var(--color-smoke)",
            }}
          >
            {files.map((image, index) => {
              return (
                <Col span={24} key={index}>
                  <Row style={{ justifyContent: "center" }}>
                    <Image
                      src={process.env.REACT_APP_HOST_BE + "/" + image.url}
                      style={{ height: 400, width: "100%", maxWidth: "50vw" }}
                    />
                  </Row>
                </Col>
              );
            })}
          </Slider>
        </Col>
      )}
      <Col span={12} style={{ paddingLeft: 40 }}>
        <Row className="text_title">{name}</Row>
        <Row style={{ paddingTop: 4, paddingBottom: 12 }}>
          <Col>
            <Row
              style={{
                fontWeight: 400,
                color: "var(--color-bold)",
                fontSize: 16,
              }}
            >
              {address?.address}
            </Row>
          </Col>
        </Row>
        <Divider />
        <Row style={{ gap: 15 }} gutter={[12, 8]}>
          <Col className="info-item">
            <Row>Mức giá</Row>
            <label>
              {String(cost).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
            </label>
          </Col>
          {roomTotal >= 0 && (
            <Col className="info-item">
              <Row>Số phòng ngủ</Row>
              <label>{String(roomTotal)} Phòng</label>
            </Col>
          )}
          {floorTotal >= 0 && (
            <Col className="info-item">
              <Row>Số tầng</Row>
              <label>{String(floorTotal)} Tầng</label>
            </Col>
          )}
          {acreage && (
            <Col className="info-item">
              <Row>Diện tích sàn</Row>
              <label style={{ paddingLeft: 4 }}>
                {String(acreage)} (m<sup>2</sup>)
              </label>
            </Col>
          )}
        </Row>
        <Divider />
        {isPaymentCoin && (
          <Row style={{ paddingTop: 10, gap: 15 }}>
            <Col className="info-item">
              <Row>Phương thức thanh toán</Row>
              <label>Etherum</label>
            </Col>
            {autoPayment && (
              <Col className="info-item">
                <Row>Thanh toán tự động</Row>
                <label>Hàng tháng</label>
              </Col>
            )}
            <Col className="info-item">
              <Row>Cho phép nuôi động vật</Row>
              <label style={{ paddingLeft: 4 }}>{isPet ? "Có" : "Không"}</label>
            </Col>
          </Row>
        )}
        <Divider />
        <Row
          style={{
            fontSize: 18,
            color: "var(--gray)",
            fontWeight: 400,
            paddingBottom: 4,
            lineHeight: "20px",
            flex: "1 1 auto",
          }}
        >
          Chủ sở hữu
        </Row>
        <Row gutter={[8, 8]} style={{ justifyContent: "space-between" }}>
          <Col>
            <Row>
              <Col>
                <Avatar
                  style={{
                    backgroundColor: "#fde3cf",
                    color: "#f56a00",
                    cursor: "pointer",
                  }}
                  size={60}
                  src={
                    owner.File
                      ? process.env.REACT_APP_HOST_BE + "/" + owner.File?.url
                      : null
                  }
                >
                  {owner.File ? null : owner?.fullName}
                </Avatar>
              </Col>
              <Col style={{ paddingLeft: 10 }}>
                <Row
                  style={{
                    color: "var(--color-text)",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  {owner?.fullName}
                </Row>
                <Row style={{ color: "var(--gray)" }}>
                  Tham gia từ {moment(owner?.createdAt).fromNow()}
                </Row>
              </Col>
            </Row>
          </Col>

          <Col>
            <Row>
              <Button style={{ minWidth: 150 }}>Tạo hợp đồng</Button>
            </Row>
            <Row>
              <Button style={{ minWidth: 150 }}>Đàm phán</Button>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default memo(Overview);

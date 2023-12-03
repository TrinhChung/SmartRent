import React from "react";
import { Col, Row } from "antd";
import "./HomeLayout.scss";

const FooterComponent = () => {
  const box1 = {
    title: "Web Smart Rent",
    data: [
      "Điện thoại: 0812345678",
      "Email: contact@uetvnu.id.vn",
      "Địa chỉ: 144 Xuân Thủy, Cầu Giấy",
    ],
  };

  const box2 = {
    title: "Môn học",
    data: ["Tên: KLTN 5/2023"],
  };

  const box3 = {
    title: "Thành viên",
    data: ["Trịnh Văn Chung"],
  };

  const box4 = {
    title: "Mã nguồn ứng dụng",
    data: ["https://github.com/TrinhChung/SmartRent"],
  };

  const BoxContact = ({ title, data }) => {
    return (
      <Col>
        <Row className="title-box">{title}</Row>
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return <Row key={index}>{item}</Row>;
          })}
      </Col>
    );
  };
  return (
    <div className="footer">
      <Col>
        <Row className="top-box">
          <Col offset={2} span={5}>
            {BoxContact(box1)}
          </Col>
          <Col span={5}>{BoxContact(box2)}</Col>
          <Col span={5}>{BoxContact(box3)}</Col>
          <Col span={5}>{BoxContact(box4)}</Col>
        </Row>
        <Row
          style={{
            height: 30,
            backgroundColor: "#000000",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Copyright © 2023 SmartRent
        </Row>
      </Col>
    </div>
  );
};

export default FooterComponent;

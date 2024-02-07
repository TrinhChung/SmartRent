import React from "react";
import { Col, Row } from "antd";
import "./NewPost.scss";
import CardItem from "../../../components/pages/NewPost/CardItem";

const SelectTypePost = () => {
  return (
    <Col span={24} className="home-container new-post">
      <Row style={{ justifyContent: "center", gap: 20 }}>
        <Col span={11}>
          <CardItem name="Cho thuê nguyên căn" url={"/new-post/full-house"} />
        </Col>
        <Col span={11}>
          <CardItem name="Cho thuê đất" url={"/new-post/land"} />
        </Col>
        <Col span={11}>
          <CardItem name="Cho thuê theo tầng" url={"/new-post/floor"} />
        </Col>
        <Col span={11}>
          <CardItem name="Cho thuê phòng" url={"/new-post/room"} />
        </Col>
      </Row>
    </Col>
  );
};

export default SelectTypePost;

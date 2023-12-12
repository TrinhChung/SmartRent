import { Col, Row } from "antd";
import React from "react";
import CardHouseHome from "../../../components/pages/CardHouseHome";
import Slider from "react-slick";
import { settingSlider } from "../../../const";

const Suggest = ({ houses = [] }) => {
  return (
    <Col span={24}>
      <Row
        style={{ fontSize: 32, paddingBottom: 32, lineHeight: "40px" }}
        className="text_title"
      >
        Real Estate for your World
      </Row>
      <Col span={24}>
        <Slider {...settingSlider}>
          {houses.length > 0 &&
            houses.map((house, index) => {
              return <CardHouseHome house={{ ...house, id: index }} />;
            })}
        </Slider>
      </Col>
    </Col>
  );
};

export default Suggest;

import React from "react";
import { Col, Row, Image, Button } from "antd";
import "./HouseData.scss"

const HouseData = ({ house = { name: "name", address: "address" }}) => {
    return (
      <Col className="list-data-house_home">
      <Row className="data-house_home">
        {/* Col for Image */}
        <Col span={6}>
          <Image
            className="image-data_house_home"
            preview={false}
            src={house?.image}
          />
        </Col>
        {/* Col for House Information */}
        <Col span={14} >
          <Row className="text_title">
            {house?.name}
          </Row>
          <Row>
            <Col xs={24} xl={24}>
              <div className="text-shadow" >Status: {house?.status}</div>
              <div className="text-shadow" >Stage: {house?.stage}</div>
              <div className="text-shadow" >Cost :{house?.costPerMonth}</div>
              <div className="text-shadow" >Acreage: {house?.acreage}</div>
              <div className="text-shadow" >Parking Acreage: {house?.acreage}</div>
              <div className="text-shadow" >Address: {house?.address}</div>
            </Col>
          </Row>
        </Col>
        {/* Col for Buttons */}
        <Col span={4} className="button-column">
          <Button type="default" className="custom-button chat">
            Chat
          </Button>
          <Button type="default" className="custom-button watch-contract">
            Watch Contract
          </Button>
          <Button type="danger" className="custom-button cancel">
            Cancel
          </Button>
        </Col>
      </Row>
    </Col>
    );
}

export default HouseData;
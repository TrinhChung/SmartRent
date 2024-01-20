import React from "react";
import { Col, Row, Image, Button } from "antd";
import "./HouseData.scss"

const HouseData = ({ house = { name: "name", address: "address" }}) => {
    return (
      <Col className="data-house_home">
      <Row>
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
          <Row className="house-info_card">
            <Col span={2}></Col>
            <Col span={22}>
              <Row className="text_title text-shadow">
                {house?.name}
              </Row>
              <Row>
                <Col className="text-shadow" xs={24} xl={24}>
                  <div><strong>Status:</strong> {house?.status}</div>
                  <div><strong>Stage:</strong> {house?.stage}</div>
                  <div><strong>Cost Per Month:</strong> {house?.costPerMonth}</div>
                  <div><strong>Acreage:</strong> {house?.acreage}</div>
                  <div><strong>Address:</strong> {house?.address}</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        {/* Col for Buttons */}
        <Col span={4} className="button-column">
          <Button type="danger" className="custom-button cancel" onClick={() => console.log("Cancel clicked")}>
            Cancel
          </Button>
          <Button type="primary" className="custom-button watch-contract" onClick={() => console.log("Watch Contract clicked")}>
            Watch Contract
          </Button>
          <Button type="default" className="custom-button chat" onClick={() => console.log("Chat clicked")}>
            Chat
          </Button>
        </Col>
      </Row>
    </Col>
    );
}

export default HouseData;
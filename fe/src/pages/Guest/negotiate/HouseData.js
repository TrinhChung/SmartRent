import React from "react";
import { Col, Row, Image, Button } from "antd";
import ImageCustom from "../../../components/pages/ImageCustom";
import { useNavigate } from "react-router-dom";
import { statusRent } from "../../../const/index";
import "./HouseData.scss";

const HouseData = ({
  house = { name: "name", address: "address", realEstateFiles: [] },
}) => {
  const navigate = useNavigate();

  return (
    <Col className="list-data-house_home">
      <Row className="data-house_home">
        {/* Col for Image */}
        <Col
          span={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageCustom
            className="image-card_house_home"
            preview={false}
            src={
              house?.RealEstate?.realEstateFiles?.length > 0
                ? process.env.REACT_APP_HOST_BE +
                  "/" +
                  house?.RealEstate?.realEstateFiles[0]?.url
                : ""
            }
          />
        </Col>
        {/* Col for House Information */}
        <Col span={14}>
          <Row className="text_title">{house?.name}</Row>
          <Row>
            <Col xs={24} xl={24}>
              <div className="text-shadow">
                Trạng thái:{" "}
                <label
                  style={{
                    color: house?.status
                      ? statusRent[house?.status].color
                      : "black",
                  }}
                >
                  {house?.status
                    ? statusRent[house?.status].value
                    : "Không tồn tại"}
                </label>
              </div>
              <div className="text-shadow">Stage: {house?.stage}</div>
              <div className="text-shadow">
                Giá:
                {house?.RealEstate?.cost === 0
                  ? `${house?.RealEstate?.cost}`.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    ) + " VNĐ"
                  : "Thỏa thuận"}
              </div>
              <div className="text-shadow">Acreage: {house?.acreage}</div>
              <div className="text-shadow">
                Parking Acreage: {house?.acreage}
              </div>
              <div className="text-shadow">Address: {house?.address}</div>
            </Col>
          </Row>
        </Col>
        {/* Col for Buttons */}
        <Col span={4} className="button-column">
          <Button
            type="default"
            className="custom-button chat"
            onClick={() => {
              navigate(`/room-chat/${house?.RoomChat?.id}`);
            }}
          >
            Chat
          </Button>

          <Button type="default" className="custom-button watch-contract">
            Watch Contract
          </Button>
          {["1", , "2", "3"].includes(house?.status) && (
            <Button type="danger" className="custom-button cancel">
              Cancel
            </Button>
          )}
        </Col>
      </Row>
    </Col>
  );
};

export default HouseData;

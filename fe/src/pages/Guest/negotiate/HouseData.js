import React from "react";
import { Col, Row, Button, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { statusRent, maxCost } from "../../../const/index";
import "./HouseData.scss";
import {
  faLocationDot,
  faExpand,
  faDollarSign,
  faBed,
  faBathtub,
  faCouch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HouseData = ({
  house = { name: "Tên dự án", address: "Địa chỉ", realEstateFiles: [] },
}) => {
  const navigate = useNavigate();

  return (
    <Col span={12} className="bargain-container">
      <Row className="bargain_content" gutter={[16, 8]}>
        <Col span={8}>
          <Row
            className="image_re"
            style={{
              backgroundImage: `url(${
                house?.RealEstate?.realEstateFiles?.length > 0
                  ? process.env.REACT_APP_HOST_BE +
                    "/" +
                    house?.RealEstate?.realEstateFiles[0]?.url
                  : ""
              })`,
            }}
          ></Row>
        </Col>
        <Col span={16} className="info_bargain">
          <Row
            className="text_title"
            onClick={() => {
              navigate(`/full-house-view/${house?.RealEstate?.id}`);
            }}
          >
            {house?.RoomChat?.name.length > 80
              ? house?.RoomChat?.name.substring(0, 80) + "..."
              : house?.RoomChat?.name}
          </Row>
          <Row gutter={[8, 8]} style={{ paddingTop: 6 }}>
            <Col>
              <FontAwesomeIcon
                style={{ fontSize: 18, color: "red" }}
                icon={faLocationDot}
              />
            </Col>
            <Col className="text-shadow" style={{ fontStyle: "italic" }}>
              {house?.RealEstate?.Address?.address?.length > 50
                ? house?.RealEstate?.Address?.address.substring(0, 50) + "..."
                : house?.RealEstate?.Address?.address}
            </Col>
          </Row>
          <Row style={{ paddingTop: 6 }}>
            <Col xs={24} xl={24}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Row className="text-shadow">
                    <Badge
                      status="processing"
                      color={
                        house?.status
                          ? statusRent[house?.status].color
                          : "black"
                      }
                      text={<label className="text-shadow">Trạng thái:</label>}
                    />
                    <div style={{ paddingLeft: 8 }}>
                      {house?.status
                        ? statusRent[house?.status].value
                        : "Không tồn tại"}
                    </div>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row className="info-item text-shadow">
                    <Col>
                      <FontAwesomeIcon
                        style={{ color: "#fadb14" }}
                        icon={faDollarSign}
                      />
                    </Col>
                    <label>Giá:</label>
                    <div>
                      {house?.RealEstate?.cost !== maxCost
                        ? `${house?.RealEstate?.cost}`.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          ) + " VNĐ"
                        : "Thỏa thuận"}
                    </div>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row className="text-shadow info-item">
                    <FontAwesomeIcon icon={faBed} />
                    <label>Phòng ngủ: </label>
                    <div>{house?.RealEstate?.bedroomTotal} Phòng</div>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row className="text-shadow info-item">
                    <FontAwesomeIcon icon={faBathtub} />
                    <label>WC: </label>
                    <div>{house?.RealEstate?.toiletTotal} Phòng</div>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row className="text-shadow info-item">
                    <FontAwesomeIcon icon={faCouch} />
                    <label>Nội thất: </label>
                    <div>
                      {house?.RealEstate?.isInterior === true
                        ? "Đầy đủ"
                        : "Cơ bản"}
                    </div>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row className="text-shadow info-item">
                    <FontAwesomeIcon icon={faExpand} />
                    <label>Diện tích: </label>
                    <div>
                      {String(house?.RealEstate?.acreage).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                      (m2)
                    </div>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="button-group" gutter={[8, 8]}>
            <Col span={8}>
              <Button
                type="default"
                className="custom-button button-border chat"
                onClick={() => {
                  navigate(`/room-chat/${house?.RoomChat?.id}`);
                }}
              >
                Chat
              </Button>
            </Col>
            {["2", , "3", "4"].includes(house?.status) && (
              <Col span={8}>
                <Button
                  type="default"
                  className="custom-button button-border watch-contract"
                >
                  Xem hợp đồng
                </Button>
              </Col>
            )}
            {["1", "2", "3", "4"].includes(house?.status) && (
              <Col span={8}>
                <Button
                  type="danger"
                  className="custom-button button-border cancel"
                >
                  Hủy đàm phán
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default HouseData;

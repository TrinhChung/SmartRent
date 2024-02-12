import React, { memo } from "react";
import { Row, Col, Image } from "antd";
import Slider from "react-slick";
import {
  DollarOutlined,
  HomeOutlined,
  CompressOutlined,
  ProfileOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import MapCustom from "../../../components/maps/MapCustom";
import { useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import "./FullHouseView.scss";

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
}) => {
  const [position, setPosition] = useState(
    address && address?.location
      ? address.location
      : {
          lat: 21.0469701,
          lng: 105.8021347,
        }
  );

  const { isLoaded } = useJsApiLoader({
    mapIds: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries: ["drawing", "places"],
  });

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
    <Row>
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
      <Col span={12} style={{ paddingLeft: 20 }}>
        <Row className="text_title">{name}</Row>
        <Row style={{ gap: 15 }}>
          <Col>
            <DollarOutlined className="icon-real-estate" />
            <label style={{ paddingLeft: 4 }}>
              {String(cost).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
            </label>
          </Col>
          {roomTotal >= 0 && (
            <Col>
              <HomeOutlined className="icon-real-estate" />
              <label style={{ paddingLeft: 4 }}>
                {String(roomTotal)} Phòng
              </label>
            </Col>
          )}
          {floorTotal >= 0 && (
            <Col>
              <HomeOutlined className="icon-real-estate" />
              <label style={{ paddingLeft: 4 }}>
                {String(floorTotal)} Tầng
              </label>
            </Col>
          )}
          {acreage && (
            <Col>
              <CompressOutlined className="icon-real-estate" />
              <label style={{ paddingLeft: 4 }}>
                {String(acreage)} (m<sup>2</sup>)
              </label>
            </Col>
          )}
        </Row>
        {isPaymentCoin && (
          <Row style={{ paddingTop: 10, gap: 15 }}>
            <Col>
              <DollarOutlined className="icon-real-estate" />
              <label style={{ paddingLeft: 4 }}>
                Thanh toán bằng Etherum: <CheckOutlined />
              </label>
            </Col>
            {autoPayment && (
              <Col>
                <DollarOutlined className="icon-real-estate" />
                <label style={{ paddingLeft: 4 }}>
                  Tự động thanh toán: <CheckOutlined />
                </label>
              </Col>
            )}
          </Row>
        )}
        <Row style={{ paddingTop: 10, gap: 15 }}>
          <Col>
            <DollarOutlined className="icon-real-estate" />
            <label style={{ paddingLeft: 4 }}>
              Cho phép nuôi động vật:{" "}
              {isPet ? <CheckOutlined /> : <CloseOutlined />}
            </label>
          </Col>
        </Row>
        <Row style={{ paddingTop: 10 }}>
          <Col>
            <ProfileOutlined className="icon-real-estate" />
            <label style={{ paddingLeft: 4 }}>{address?.address}</label>
          </Col>
        </Row>
        <Row style={{ justifyContent: "end", paddingTop: 10 }}>
          {isLoaded && (
            <MapCustom
              position={position}
              setPosition={(position) => {
                setPosition(position);
              }}
              height="240px"
            />
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default memo(Overview);

import React, { useState } from "react";
import { Col, Image, Input, Row } from "antd";
import PlacesAutocomplete from "../../../components/maps/PlacesAutocomplete";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import ImageBannerHome from "../../../public/images/home-banner.jpg";
import "./Home.scss";

const Home = () => {
  const { isLoaded } = useJsApiLoader({
    id: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries: ["places"],
  });

  console.log(isLoaded);
  const [position, setPosition] = useState({
    lat: 21.0469701,
    lng: 105.8021347,
  });

  const containerStyle = {
    height: "50vh",
    width: "100%",
  };

  return (
    <Col span={24} className="home-container">
      <Row style={{ paddingTop: 103, paddingBottom: 62 }}>
        <Col xxl={8} xs={8}>
          <Row>
            <Col
              xxl={20}
              style={{ paddingBottom: 40 }}
              className="text_title text-banner-title"
            >
              A Premier Real Estate Professional
            </Col>
          </Row>
          <Row>
            <Col
              style={{ paddingBottom: 40 }}
              xxl={12}
              className="text-banner-description"
            >
              Own a premium townhouse that will generate you passive income up
              to 115-130% after development.
            </Col>
          </Row>
          <Row>
            <Col xxl={12}>
              <button className="button-view button-banner">
                See The House
              </button>
            </Col>
          </Row>
        </Col>
        <Col xxl={16} xs={16} style={{ height: 426 }}>
          <Image
            height={"100%"}
            width={"100%"}
            style={{ borderRadius: 32 }}
            preview={false}
            src={ImageBannerHome}
          />
        </Col>
      </Row>
      {isLoaded ? (
        <Col span={24} className="box-search box-border">
          <Row
            className="text_title"
            style={{
              justifyContent: "center",
              paddingBottom: 24,
              fontSize: 32,
            }}
          >
            let’s find a home that’s perfect for you
          </Row>
          <Row>
            <Col style={{ paddingLeft: 10, paddingRight: 10 }} xs={24} xxl={6}>
              <Row gutter={[4, 4]}>
                <Col xxl={12} xs={24}>
                  <Input placeholder="Giá phòng" />
                </Col>
                <Col xxl={12} xs={24}>
                  <Input placeholder="Loại" />
                </Col>
              </Row>
              <Row>
                <PlacesAutocomplete setPosition={setPosition} />
              </Row>
              <Row style={{ paddingTop: 8 }}>
                <Col xxl={12}>
                  <button
                    className="button-view"
                    style={{ height: 38, fontSize: 16 }}
                  >
                    Tìm kiếm ngay
                  </button>
                </Col>
              </Row>
            </Col>
            <Col xs={24} xxl={18}>
              <Row style={{ justifyContent: "end" }}>
                <GoogleMap
                  center={position}
                  mapContainerStyle={containerStyle}
                  zoom={15}
                >
                  {position && <MarkerF position={position} />}
                </GoogleMap>
              </Row>
            </Col>
          </Row>
        </Col>
      ) : (
        <Row>...Loading</Row>
      )}
    </Col>
  );
};

export default Home;

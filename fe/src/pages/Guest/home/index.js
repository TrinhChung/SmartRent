import React, { memo, useCallback, useEffect, useState } from "react";
import { Col, Image, Input, Row } from "antd";
import PlacesAutocomplete from "../../../components/maps/PlacesAutocomplete";
import ImageBannerHome from "../../../public/images/home-banner.jpg";
import "./Home.scss";
import Suggest from "./Suggest";
import MapCustom from "../../../components/maps/MapCustom";
import { useJsApiLoader } from "@react-google-maps/api";
import { getEstateByRecommendService } from "../../../services/RealEstate/index";

const Home = () => {
  const { isLoaded } = useJsApiLoader({
    mapIds: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries: ["drawing", "places"],
  });
  const [position, setPosition] = useState({
    lat: 21.0469701,
    lng: 105.8021347,
  });

  const [listSuggest, setListSuggest] = useState([]);

  const setPositionAction = useCallback((position) => {
    return setPosition(position);
  }, []);

  const fetchRealEstateRecommend = async () => {
    try {
      const res = await getEstateByRecommendService();
      if (res.status === 200) {
        setListSuggest(
          res.data.map((realEstate) => {
            return {
              name: realEstate.name,
              address: realEstate.Address.address,
              image: realEstate?.realEstateFiles[0]?.url,
              cost: realEstate?.cost,
              acreage: realEstate?.acreage,
              url: `/full-house-view/${realEstate.id}`,
              date: realEstate?.createdAt,
            };
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRealEstateRecommend();
  }, []);

  return (
    <Col span={24} className="home-container">
      <Row className="box-banner" style={{}}>
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
            let's find a home that's perfect for you
          </Row>
          <Row>
            <Col style={{ paddingLeft: 10, paddingRight: 10 }} xs={24} xl={6}>
              <Row gutter={[4, 4]}>
                <Col xxl={12} xs={24}>
                  <Input placeholder="Giá phòng" />
                </Col>
                <Col xxl={12} xs={24}>
                  <Input placeholder="Loại" />
                </Col>
              </Row>
              <Row>
                <PlacesAutocomplete setPosition={setPositionAction} />
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
            <Col xs={24} xl={18}>
              <Row style={{ justifyContent: "end" }}>
                <MapCustom position={position} setPosition={setPosition} />
              </Row>
            </Col>
          </Row>
        </Col>
      ) : (
        <Row>...Loading</Row>
      )}

      <Suggest houses={listSuggest} />
    </Col>
  );
};

export default memo(Home);

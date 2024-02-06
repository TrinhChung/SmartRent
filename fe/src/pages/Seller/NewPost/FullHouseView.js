import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRealEstateFullHouseService } from "../../../services/RealEstate";
import { Row, Col, Image, Button } from "antd";
import Slider from "react-slick";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useJsApiLoader } from "@react-google-maps/api";
import "./FullHouseView.scss";
import {
  DollarOutlined,
  HomeOutlined,
  CompressOutlined,
  ProfileOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import MapCustom from "../../../components/maps/MapCustom";

const FullHouseView = () => {
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    mapIds: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries: ["drawing", "places"],
  });

  const { id } = useParams();
  const [data, setData] = useState();
  const [position, setPosition] = useState({
    lat: 21.0469701,
    lng: 105.8021347,
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

  const fetchFullHouse = async (id) => {
    const res = await getRealEstateFullHouseService({ id: id });
    if (res.status === 200) {
      setData(res.data);
      if (res.data.Address) {
        console.log(res.data.Address);
        setPosition({
          lat: Number(res.data.Address.lat),
          lng: Number(res.data.Address.lng),
        });
      }
    }
  };

  useEffect(() => {
    fetchFullHouse(id);
  }, [id]);

  return (
    <Col span={24} className="home-container new-post full-house-view">
      {data?.realEstateFiles && (
        <Row>
          <Col span={12}>
            <Slider
              {...settings}
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                backgroundColor: "var(--color-smoke)",
              }}
            >
              {data.realEstateFiles.map((image, index) => {
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
          <Col span={12} style={{ paddingLeft: 20 }}>
            <Row className="text_title">{data?.name}</Row>
            <Row style={{ gap: 15 }}>
              <Col>
                <DollarOutlined className="icon-real-estate" />
                <label style={{ paddingLeft: 4 }}>
                  {String(data?.cost).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
                </label>
              </Col>
              <Col>
                <HomeOutlined className="icon-real-estate" />
                <label style={{ paddingLeft: 4 }}>
                  {String(data?.roomTotal)} Phòng
                </label>
              </Col>
              <Col>
                <HomeOutlined className="icon-real-estate" />
                <label style={{ paddingLeft: 4 }}>
                  {String(data?.roomTotal)} Tầng
                </label>
              </Col>
              <Col>
                <CompressOutlined className="icon-real-estate" />
                <label style={{ paddingLeft: 4 }}>
                  {String(data?.acreage)} (m<sup>2</sup>)
                </label>
              </Col>
            </Row>
            {data?.isPaymentCoin && (
              <Row style={{ paddingTop: 10, gap: 15 }}>
                <Col>
                  <DollarOutlined className="icon-real-estate" />
                  <label style={{ paddingLeft: 4 }}>
                    Thanh toán bằng Etherum: <CheckOutlined />
                  </label>
                </Col>
                {data?.autoPayment && (
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
                  {data?.isPet ? <CheckOutlined /> : <CloseOutlined />}
                </label>
              </Col>
            </Row>
            <Row style={{ paddingTop: 10 }}>
              <Col>
                <ProfileOutlined className="icon-real-estate" />
                <label style={{ paddingLeft: 4 }}>
                  {data?.Address.address}
                </label>
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
      )}
      {data?.descriptionMarkdown && (
        <>
          <Row
            style={{
              paddingTop: 20,
              fontWeight: "bold",
              color: "var(--color-text)",
              fontSize: 20,
            }}
          >
            Mô tả
          </Row>
          <Row>
            <MarkdownEditor.Markdown
              source={data?.descriptionMarkdown}
              style={{ width: "100%", backgroundColor: "transparent" }}
              height="200px"
            />
          </Row>
        </>
      )}
      <Row>
        <Col span={24}>
          <Row
            style={{
              paddingTop: 20,
              justifyContent: "space-between",
            }}
            className="box-title"
          >
            <Col>
              <label className="box-title">Tầng</label>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  navigate(`/new-post/new-floor?house=${id}`);
                }}
              >
                <PlusOutlined />
                <label>Thêm mới</label>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Row
            style={{
              paddingTop: 20,
            }}
            className="box-title"
          >
            <Col>
              <label className="box-title">Phòng</label>
            </Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default FullHouseView;

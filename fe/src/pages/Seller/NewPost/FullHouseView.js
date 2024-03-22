import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRealEstateFullHouseService } from "../../../services/RealEstate";
import { Row, Col, Divider, Spin } from "antd";
import MarkdownEditor from "@uiw/react-markdown-editor";
import "./FullHouseView.scss";
import Overview from "./Overview";
import { useJsApiLoader } from "@react-google-maps/api";
import MapCustom from "../../../components/maps/MapCustom";
import {
  DollarOutlined,
  HomeOutlined,
  CompressOutlined,
} from "@ant-design/icons";
import Suggest from "../../Guest/home/Suggest";
import { AuthContext } from "../../../providers/authProvider";

const FullHouseView = () => {
  const [libraries] = useState(["drawing", "places"]);
  const { listSuggest } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { isLoaded } = useJsApiLoader({
    mapIds: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries: libraries,
  });
  const [position, setPosition] = useState({
    lat: 21.0469701,
    lng: 105.8021347,
  });

  const { id } = useParams();
  const [data, setData] = useState();

  const fetchFullHouse = async (id) => {
    try {
      const res = await getRealEstateFullHouseService({ id: id });
      if (res.status === 200) {
        setData(res.data);
        if (
          res.data?.Address &&
          res.data?.Address?.lat &&
          res.data?.Address?.lng
        ) {
          setPosition({
            lat: Number(res.data?.Address?.lat),
            lng: Number(res.data?.Address?.lng),
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFullHouse(id);
  }, [id]);

  return (
    <Col span={24} className="home-container new-post full-house-view">
      <Spin spinning={loading} tip="Đang xử lý">
        <Overview
          files={data?.realEstateFiles}
          name={data?.name}
          cost={data?.cost}
          roomTotal={data?.bedroomTotal}
          floorTotal={data?.floorTotal}
          acreage={data?.acreage}
          isPaymentCoin={data?.isPaymentCoin}
          autoPayment={data?.autoPayment}
          isPet={data?.isPet}
          address={data?.Address}
          owner={data?.User}
          setLoading={setLoading}
        />
        <Row className="detail-info">
          <Col span={24}>
            <Divider />
            <Row className="text_title">Thông tin chi tiết</Row>
            <Row>
              <Col className="info-detail-house" span={12}>
                <Row style={{ paddingTop: 4, paddingBottom: 12 }}>
                  <Col>
                    <label
                      style={{
                        fontWeight: 400,
                        color: "var(--color-bold)",
                        fontSize: 16,
                      }}
                    >
                      Địa chỉ: {data?.Address?.address}
                    </label>
                  </Col>
                </Row>
                <Row gutter={[12, 24]} style={{ paddingRight: 12 }}>
                  <Col span={12} className="info-item-house">
                    <DollarOutlined className="icon-real-estate" />
                    <strong>Mức giá: </strong>
                    <label>
                      {String(data?.cost).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      VNĐ
                    </label>
                  </Col>
                  {data?.bedroomTotal >= 0 && (
                    <Col span={12} className="info-item-house">
                      <HomeOutlined className="icon-real-estate" />
                      <strong>Số phòng ngủ: </strong>
                      <label style={{ paddingLeft: 4 }}>
                        {String(data?.bedroomTotal)} Phòng
                      </label>
                    </Col>
                  )}
                  {data?.toiletTotal >= 0 && (
                    <Col span={12} className="info-item-house">
                      <HomeOutlined className="icon-real-estate" />
                      <strong>Số phòng vệ sinh: </strong>
                      <label style={{ paddingLeft: 4 }}>
                        {String(data?.toiletTotal)} Phòng
                      </label>
                    </Col>
                  )}
                  {data?.floorTotal >= 0 && (
                    <Col span={12} className="info-item-house">
                      <HomeOutlined className="icon-real-estate" />
                      <strong>Số tầng: </strong>
                      <label style={{ paddingLeft: 4 }}>
                        {String(data?.floorTotal)} Tầng
                      </label>
                    </Col>
                  )}
                  {data?.acreage && (
                    <Col span={12} className="info-item-house">
                      <CompressOutlined className="icon-real-estate" />
                      <strong>Diện tích: </strong>
                      <label style={{ paddingLeft: 4 }}>
                        {String(data?.acreage)} (m<sup>2</sup>)
                      </label>
                    </Col>
                  )}

                  <Col span={12} className="info-item-house">
                    <DollarOutlined className="icon-real-estate" />
                    <strong>Phương thức thanh toán: </strong>
                    <label style={{ paddingLeft: 4 }}>Etherum</label>
                  </Col>

                  <Col span={12} className="info-item-house">
                    <DollarOutlined className="icon-real-estate" />
                    <strong>Tự động thanh toán: </strong>
                    <label style={{ paddingLeft: 4 }}>
                      {data?.autoPayment && data?.autoPayment === true
                        ? "Hàng tháng"
                        : "Không"}
                    </label>
                  </Col>
                  <Col span={12} className="info-item-house">
                    <DollarOutlined className="icon-real-estate" />
                    <strong>Cho phép nuôi động vật: </strong>
                    <label style={{ paddingLeft: 4 }}>
                      {data?.isPet ? "Cho phép" : "Không cho phép"}
                    </label>
                  </Col>
                  {data?.facade >= 0 && (
                    <Col span={12} className="info-item-house">
                      <HomeOutlined className="icon-real-estate" />
                      <strong>Mặt tiền: </strong>
                      <label style={{ paddingLeft: 4 }}>
                        {String(data?.toiletTotal)} (m)
                      </label>
                    </Col>
                  )}
                  {data?.isInterior != null && (
                    <Col span={12} className="info-item-house">
                      <HomeOutlined className="icon-real-estate" />
                      <strong>Nội thất: </strong>
                      <label style={{ paddingLeft: 4 }}>
                        {data?.isInterior === true ? "Đầy đủ" : "Cơ bản"}
                      </label>
                    </Col>
                  )}
                  {data?.directionHouse != null && (
                    <Col span={12} className="info-item-house">
                      <HomeOutlined className="icon-real-estate" />
                      <strong>Hướng nhà: </strong>
                      <label style={{ paddingLeft: 4 }}>
                        {data?.directionHouse}
                      </label>
                    </Col>
                  )}
                </Row>
              </Col>
              <Col span={12}>
                <Row style={{ justifyContent: "end", paddingTop: 10 }}>
                  {isLoaded && (
                    <MapCustom
                      position={position}
                      setPosition={(position) => {
                        setPosition(position);
                      }}
                    />
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        {data?.description && (
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
                source={data?.description}
                style={{ width: "100%", backgroundColor: "transparent" }}
                height="200px"
              />
            </Row>
          </>
        )}
        <Row style={{ paddingBottom: 20 }}>
          <Col span={24}>
            <Row
              style={{
                padding: "20px 0",
                justifyContent: "space-between",
              }}
              className="box-title"
            >
              <Col>
                <label className="box-title">Gợi ý</label>
              </Col>
            </Row>
            <Suggest houses={listSuggest} />
          </Col>
        </Row>
      </Spin>
    </Col>
  );
};

export default FullHouseView;

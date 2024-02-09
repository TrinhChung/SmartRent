import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRealEstateFullHouseService } from "../../../services/RealEstate";
import { Row, Col, Button } from "antd";
import MarkdownEditor from "@uiw/react-markdown-editor";
import "./FullHouseView.scss";
import { PlusOutlined } from "@ant-design/icons";
import Overview from "./Overview";

import { AuthContext } from "../../../providers/authProvider";
import CardHouseHome from "../../../components/pages/CardHouseHome";

const FullHouseView = () => {
  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = useState();

  const fetchFullHouse = async (id) => {
    try {
      const res = await getRealEstateFullHouseService({ id: id });
      if (res.status === 200) {
        setData(res.data);
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
      <Overview
        files={data?.realEstateFiles}
        name={data?.name}
        cost={data?.cost}
        roomTotal={data?.roomTotal}
        floorTotal={data?.floorTotal}
        acreage={data?.acreage}
        isPaymentCoin={data?.isPaymentCoin}
        autoPayment={data?.autoPayment}
        isPet={data?.isPet}
        address={data?.Address}
      />
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
              paddingTop: 20,
              justifyContent: "space-between",
            }}
            className="box-title"
          >
            <Col>
              <label className="box-title">Tầng</label>
            </Col>
            {data?.userId === authUser?.id && (
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
            )}
          </Row>
          <Row style={{ gap: 8 }}>
            {data?.Floors &&
              data?.Floors.length > 0 &&
              data?.Floors.map((floor, index) => {
                return (
                  <CardHouseHome
                    name={floor.name}
                    url={`/floor-view/${floor?.id}`}
                    image={
                      floor?.Files.length > 0 ? floor?.Files[0]?.url : undefined
                    }
                    address={data?.Address?.address}
                  />
                );
              })}
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default FullHouseView;

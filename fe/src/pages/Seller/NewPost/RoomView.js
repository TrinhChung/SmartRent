import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoomByIdService } from "../../../services/RealEstate/index";
import { Col, Row } from "antd";
import Overview from "./Overview";
import MarkdownEditor from "@uiw/react-markdown-editor";

const RoomView = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();

  const fetchRoomById = async (id) => {
    try {
      const res = await getRoomByIdService({ id: id });
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoomById(id);
  }, [id]);

  return (
    <Col span={24} className="home-container new-post full-house-view">
      <Overview
        files={data?.Files}
        name={data?.name}
        cost={data?.RealEstate?.cost}
        acreage={data?.RealEstate?.acreage}
        isPaymentCoin={data?.Floor?.RealEstate?.isPaymentCoin}
        autoPayment={data?.Floor?.RealEstate?.autoPayment}
        isPet={data?.Floor?.RealEstate?.isPet}
        address={data?.Floor?.RealEstate?.Address}
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
    </Col>
  );
};

export default RoomView;

import { useState, useEffect } from "react";
import { Col, Row, Button } from "antd";
import Overview from "./Overview";
import { useParams, useNavigate } from "react-router-dom";
import { getFloorByIdService } from "../../../services/RealEstate/index";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { PlusOutlined } from "@ant-design/icons";
import CardItem from "../../../components/pages/NewPost/CardItem";

const FloorView = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();

  const fetchFloorById = async (id) => {
    try {
      const res = await getFloorByIdService({ id: id });
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFloorById(id);
  }, [id]);

  return (
    <Col span={24} className="home-container new-post full-house-view">
      <Overview
        files={data?.Files}
        name={data?.name}
        cost={data?.RealEstate?.cost}
        roomTotal={data?.roomTotal}
        acreage={data?.RealEstate?.acreage}
        isPaymentCoin={data?.RealEstate?.isPaymentCoin}
        autoPayment={data?.RealEstate?.autoPayment}
        isPet={data?.RealEstate?.isPet}
        address={data?.RealEstate?.Address}
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
              <label className="box-title">Phòng</label>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  navigate(`/new-post/new-room?floor=${id}`);
                }}
              >
                <PlusOutlined />
                <label>Thêm mới</label>
              </Button>
            </Col>
          </Row>
          <Row style={{ gap: 8 }}>
            {data?.Rooms &&
              data?.Rooms.length > 0 &&
              data?.Rooms.map((room, index) => {
                return (
                  <Col span={4} key={"room" + index}>
                    <CardItem
                      name={room?.name}
                      url={`/new-post/room-view/${room?.id}`}
                      img={
                        room?.Files.length > 0
                          ? process.env.REACT_APP_HOST_BE +
                            "/" +
                            room?.Files[0]?.url
                          : undefined
                      }
                    />
                  </Col>
                );
              })}
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default FloorView;

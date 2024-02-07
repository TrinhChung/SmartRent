import React, { useEffect, useState } from "react";
import { Col, Row, Layout, Button, Empty } from "antd";
import "./ListPost.scss";
import { useNavigate } from "react-router-dom";
import { getPostedByMeService } from "../../../services/RealEstate/index";
import CardItem from "../../../components/pages/NewPost/CardItem";
import CardHouseHome from "../../../components/pages/CardHouseHome";

const { Sider, Content } = Layout;
const ListPost = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchPostedByMe = async () => {
    const res = await getPostedByMeService();
    if (res.status === 200) {
      setData(res.data);
    }
  };

  useEffect(() => {
    fetchPostedByMe();
  }, []);

  return (
    <Layout className="list-post">
      <Sider className="search-container" width={360}>
        Search
      </Sider>
      <Content className="list-post-body">
        <Row
          style={{
            height: 50,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Col className="text_title">Danh sách bài đăng</Col>
          <Button
            onClick={() => {
              navigate("/new-post/full-house");
            }}
          >
            Tạo bài đăng
          </Button>
        </Row>
        <Row>
          <Col span={24}>
            <Row>
              {data && data?.length > 0 ? (
                data.map((post, key) => {
                  return (
                    <CardHouseHome
                      name={post?.name}
                      address={post?.Address?.address}
                      image={post?.realEstateFiles[0]}
                      url={`/full-house-view/${post?.id}`}
                    />
                  );
                })
              ) : (
                <Empty />
              )}
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ListPost;

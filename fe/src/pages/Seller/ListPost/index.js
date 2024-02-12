import React, { useEffect, useState } from "react";
import { Col, Row, Layout, Button, Empty, Radio, Form } from "antd";
import "./ListPost.scss";
import { useNavigate } from "react-router-dom";
import { getPostedByMeService } from "../../../services/RealEstate/index";
import CardHouseHome from "../../../components/pages/CardHouseHome";

const { Sider, Content } = Layout;
const ListPost = () => {
  const navigate = useNavigate();
  const [formSearch] = Form.useForm();
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
        <Row style={{ padding: "8px" }}>Sắp xếp theo:</Row>
        <Form labelCol={{ span: 6 }} labelAlign="left" form={formSearch}>
          <Form.Item name="time" label="Thời gian">
            <Radio.Group defaultValue="desc" buttonStyle="solid">
              <Radio value="desc">Mới nhất</Radio>
              <Radio value="asc">Cũ nhất</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="cost" label="Giá">
            <Radio.Group defaultValue="desc" buttonStyle="solid">
              <Radio value="desc">Giảm dần</Radio>
              <Radio value="asc">Tăng dần</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="acreage" label="Diện tích">
            <Radio.Group defaultValue="desc" buttonStyle="solid">
              <Radio value="desc">Giảm dần</Radio>
              <Radio value="asc">Tăng dần</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
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
            className="button-border"
            onClick={() => {
              navigate("/new-post/full-house");
            }}
          >
            Tạo bài đăng
          </Button>
        </Row>
        <Row>
          <Col span={24}>
            <Row gutter={[8, 8]}>
              {data && data?.length > 0 ? (
                data.map((post, key) => {
                  return (
                    <CardHouseHome
                      name={post?.name}
                      address={post?.Address?.address}
                      image={post?.realEstateFiles[0]?.url}
                      url={`/full-house-view/${post?.id}`}
                      cost={post?.cost}
                      acreage={post?.acreage}
                      date={post?.createdAt}
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

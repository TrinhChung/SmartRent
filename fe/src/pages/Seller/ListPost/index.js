import React, { useEffect, useState } from "react";
import { Col, Row, Layout, Button, Empty, Radio, Form, Pagination } from "antd";
import "./ListPost.scss";
import { useNavigate } from "react-router-dom";
import { getPostedByMeService } from "../../../services/RealEstate/index";
import CardHouseHome from "../../../components/pages/CardHouseHome";

const { Sider, Content, Footer } = Layout;
const ListPost = () => {
  const navigate = useNavigate();
  const [formSearch] = Form.useForm();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(50);

  const fetchPostedByMe = async () => {
    var query = `?page=${page}`;
    const fields = formSearch.getFieldsValue();
    for (var field in fields) {
      if (field && fields[field]) {
        query += `&${field}=${fields[field]}`;
      }
    }

    const res = await getPostedByMeService(query);
    if (res.status === 200) {
      setData(res.data.list);
      setTotalPage(res.data.total);
    }
  };

  useEffect(() => {
    fetchPostedByMe();
  }, [page]);

  return (
    <Layout className="list-post">
      <Sider className="search-container" width={390}>
        <Row style={{ padding: "8px" }}>Sắp xếp theo:</Row>
        <Form
          labelCol={{ span: 5 }}
          labelAlign="left"
          form={formSearch}
          initialValues={{ createdAt: "DESC", cost: "DESC", acreage: "DESC" }}
          onChange={() => {
            fetchPostedByMe();
          }}
        >
          <Form.Item name="createdAt" label="Thời gian">
            <Radio.Group buttonStyle="solid">
              <Radio value="">Không</Radio>
              <Radio value="DESC">Mới nhất</Radio>
              <Radio value="ASC">Cũ nhất</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="acreage" label="Diện tích">
            <Radio.Group buttonStyle="solid">
              <Radio value="">Không</Radio>
              <Radio value="DESC">Giảm dần</Radio>
              <Radio value="ASC">Tăng dần</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="cost" label="Giá">
            <Radio.Group buttonStyle="solid">
              <Radio value="DESC">Giảm dần</Radio>
              <Radio value="ASC">Tăng dần</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Sider>
      <Layout className="content-list-post">
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
                        key={key}
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
        <Footer>
          <Row style={{ paddingTop: 10, justifyContent: "center" }}>
            <Pagination
              current={page}
              onChange={(value) => {
                setPage(value);
              }}
              total={totalPage}
            />
          </Row>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ListPost;

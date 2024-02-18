import React from "react";
import {
  Col,
  Row,
  Layout,
  Form,
  Pagination,
  Empty,
  Switch,
  Button,
  InputNumber,
  Radio,
} from "antd";
import { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import MapCustom from "../../../components/maps/MapCustom";
import { searchRealEstateService } from "../../../services/RealEstate/index";
import CardHouseHome from "../../../components/pages/CardHouseHome";
import PlacesAutocomplete from "../../../components/maps/PlacesAutocomplete";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./Search.scss";

const { Sider, Content, Footer } = Layout;

const Search = () => {
  const { isLoaded } = useJsApiLoader({
    mapIds: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries: ["drawing", "places"],
  });
  const [form] = Form.useForm();
  const [formOrder] = Form.useForm();

  const [position, setPosition] = useState(
    form.getFieldValue("location")
      ? form.getFieldValue("location")
      : {
          lat: 21.0469701,
          lng: 105.8021347,
        }
  );

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(50);

  const fetchRealEstate = async () => {
    var data = {
      queries: form.getFieldsValue(),
      orders: formOrder.getFieldsValue(),
      page: page,
    };

    const res = await searchRealEstateService(data);
    if (res.status === 200) {
      setData(res.data.list);
      setTotalPage(res.data.total);
    }
  };

  useEffect(() => {
    fetchRealEstate();
  }, [page]);

  return (
    <Layout className="search-layout">
      <Sider className="search-container" width={"50%"}>
        {isLoaded && (
          <Form
            layout="vertical"
            form={form}
            initialValues={{
              location: {
                lat: 21.0469701,
                lng: 105.8021347,
              },
              isWhole: true,
              isAllowPet: true,
            }}
            id="order-form"
          >
            <Form.Item name="location" valuePropName="location">
              <MapCustom
                position={position}
                setPosition={(position) => {
                  setPosition(position);
                  form.setFieldValue("location", position);
                }}
              />
            </Form.Item>

            <Form.Item label="Địa chỉ" style={{ width: "100%" }}>
              <PlacesAutocomplete
                setPosition={(position) => {
                  setPosition(position);
                  form.setFieldsValue({ location: position });
                }}
                isShowDetail={false}
                setAddress={() => {}}
                addressInitial={form.getFieldValue("address")}
              />
            </Form.Item>
            <Form.Item>
              <Row style={{ gap: 24 }}>
                <Form.Item label="Giá(VNĐ)">
                  <Row style={{ gap: 8 }}>
                    <Form.Item name="cost-min">
                      <InputNumber
                        step={500000}
                        min={0}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        placeholder="Tối thiểu"
                        style={{ minWidth: 180 }}
                      />
                    </Form.Item>

                    <Form.Item name="cost-max">
                      <InputNumber
                        step={500000}
                        min={0}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        placeholder="Tối đa"
                        style={{ minWidth: 180 }}
                      />
                    </Form.Item>
                  </Row>
                </Form.Item>
                <Form.Item
                  label={
                    <div>
                      Diện tích(m<sup>2</sup>)
                    </div>
                  }
                >
                  <Row style={{ gap: 8 }}>
                    <Form.Item name="acreage-min">
                      <InputNumber
                        placeholder="Tối thiểu"
                        min={0}
                        style={{ minWidth: 180 }}
                      />
                    </Form.Item>

                    <Form.Item name="acreage-max">
                      <InputNumber
                        placeholder="Tối đa"
                        min={1}
                        style={{ minWidth: 180 }}
                      />
                    </Form.Item>
                  </Row>
                </Form.Item>
              </Row>
            </Form.Item>

            <Form.Item>
              <Row>
                <Col span={12}>
                  <Row gutter={[8, 8]}>
                    <Col>
                      <Row>
                        <Col style={{ paddingTop: 5 }}>
                          Cho phép nuôi động vật
                        </Col>
                        <Col style={{ paddingLeft: 8 }}>
                          <Form.Item name="isAllowPet">
                            <Switch
                              size="small"
                              checkedChildren={<CheckOutlined />}
                              unCheckedChildren={<CloseOutlined />}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Col style={{ paddingTop: 5 }}>Thuê nguyên căn</Col>
                        <Col style={{ paddingLeft: 8 }}>
                          <Form.Item name="isWhole">
                            <Switch
                              size="small"
                              checkedChildren={<CheckOutlined />}
                              unCheckedChildren={<CloseOutlined />}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        )}
        <Row>Sắp xếp theo:</Row>
        <Form
          labelCol={{ span: 3 }}
          labelAlign="left"
          form={formOrder}
          initialValues={{ createdAt: "DESC", cost: "DESC", acreage: "DESC" }}
          onChange={() => {
            fetchRealEstate();
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
        <Row>
          <Button
            onClick={() => {
              console.log(form.getFieldsValue());
              console.log(formOrder.getFieldsValue());
            }}
          >
            Tìm kiếm
          </Button>
        </Row>
      </Sider>
      <Layout className="result">
        <Content className="result-container">
          <Row>
            <Col span={24}>
              <Row
                style={{
                  textTransform: "uppercase",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "var(--color-text)",
                  padding: "16px 0",
                }}
              >
                Kết quả tìm kiếm
              </Row>
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

export default Search;

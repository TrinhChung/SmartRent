import React, { useState } from "react";
import { Col, Row, Input, Form, Image, Switch } from "antd";
import Upload from "../../../components/pages/Upload";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useJsApiLoader } from "@react-google-maps/api";
import MapCustom from "../../../components/maps/MapCustom";
import PlacesAutocomplete from "../../../components/maps/PlacesAutocomplete";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./NewPost.scss";

const NewPost = () => {
  const { isLoaded } = useJsApiLoader({
    mapIds: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries: ["drawing", "places"],
  });

  const [form] = Form.useForm();
  const [description, setDescription] = useState(false);
  const [listImg, setListImg] = useState([]);
  const [isPaymentCoin, setIsPaymentCoin] = useState(true);
  const [position, setPosition] = useState({
    lat: 21.0469701,
    lng: 105.8021347,
  });

  const onChangeTypPayment = (checked) => {
    setIsPaymentCoin(checked);
  };

  return (
    <Col span={24} className="home-container new-post">
      <Row className="text_title">Tạo bài đăng</Row>
      {isLoaded && (
        <Form
          layout="vertical"
          form={form}
          style={{
            width: "100%",
            paddingTop: 16,
          }}
        >
          <Row>
            <Form.Item style={{ width: "100%" }}>
              <Row style={{ width: "100%" }}>
                <Col
                  style={{ paddingLeft: 10, paddingRight: 10 }}
                  xs={24}
                  xl={6}
                >
                  <Row>
                    <Form.Item
                      label="Tên tòa nhà"
                      name="nameRealEstate"
                      style={{ width: "100%" }}
                    >
                      <Input placeholder="Tên tòa nhà" />
                    </Form.Item>
                  </Row>
                  <Row>
                    <Form.Item
                      label="Diện tích"
                      name="acreage"
                      style={{ width: "100%" }}
                    >
                      <Input placeholder="Diện tích sàn" />
                    </Form.Item>
                  </Row>
                  <Row>
                    <Form.Item
                      label="Giá thuê"
                      name="cost"
                      style={{ width: "100%" }}
                    >
                      <Input placeholder="Giá thuê theo tháng" />
                    </Form.Item>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Row>
                        <Col style={{ paddingTop: 5 }}>
                          Thanh toán bằng Etherum
                        </Col>
                        <Col style={{ paddingLeft: 8 }}>
                          <Form.Item name="isPaymentCoin">
                            <Switch
                              defaultChecked
                              size="small"
                              checkedChildren={<CheckOutlined />}
                              unCheckedChildren={<CloseOutlined />}
                              onChange={onChangeTypPayment}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      {isPaymentCoin && (
                        <Row>
                          <Col style={{ paddingTop: 5 }}>
                            Tự động thanh toán
                          </Col>
                          <Col style={{ paddingLeft: 8 }}>
                            <Form.Item name="autoPayment">
                              <Switch
                                defaultChecked
                                size="small"
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      )}
                      <Row>
                        <Col style={{ paddingTop: 5 }}>Thuê nguyên căn</Col>
                        <Col style={{ paddingLeft: 8 }}>
                          <Form.Item name="isWhole">
                            <Switch
                              defaultChecked
                              size="small"
                              checkedChildren={<CheckOutlined />}
                              unCheckedChildren={<CloseOutlined />}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col style={{ paddingTop: 5 }}>
                          Cho phép nuôi động vật
                        </Col>
                        <Col style={{ paddingLeft: 8 }}>
                          <Form.Item name="isAllowPet">
                            <Switch
                              defaultChecked
                              size="small"
                              checkedChildren={<CheckOutlined />}
                              unCheckedChildren={<CloseOutlined />}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Item
                      label="Địa chỉ"
                      name="address"
                      style={{ width: "100%" }}
                    >
                      <PlacesAutocomplete
                        setPosition={setPosition}
                        isShowDetail={false}
                      />
                    </Form.Item>
                  </Row>
                </Col>
                <Col xs={24} xl={18}>
                  <Row style={{ justifyContent: "end" }}>
                    <MapCustom position={position} setPosition={setPosition} />
                  </Row>
                </Col>
              </Row>
            </Form.Item>
          </Row>
          <Row></Row>
          <Row>
            <Form.Item
              label="Ảnh tòa nhà"
              name="imgRealEstate"
              style={{ width: "100%" }}
            >
              <Row style={{ width: "100%", gap: 8 }}>
                <Upload
                  idInput="upload-img-real-estate"
                  setFiles={setListImg}
                />
                {listImg.length > 0 &&
                  listImg.map((img) => {
                    return (
                      <Col>
                        <Image
                          src={img?.url}
                          style={{ height: 80, width: 80 }}
                        />
                      </Col>
                    );
                  })}
              </Row>
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Mô tả"
              name="description"
              style={{ width: "100%" }}
            >
              <MarkdownEditor
                value={description}
                onChange={(value) => {
                  setDescription(value);
                }}
                height="300px"
                enablePreview={true}
              />
            </Form.Item>
          </Row>
          <Row>Attributes</Row>
          <Row>Create Room</Row>
        </Form>
      )}
    </Col>
  );
};

export default NewPost;

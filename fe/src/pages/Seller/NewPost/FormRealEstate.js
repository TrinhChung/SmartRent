import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Input, Form, Image, Switch, InputNumber } from "antd";
import MapCustom from "../../../components/maps/MapCustom";
import PlacesAutocomplete from "../../../components/maps/PlacesAutocomplete";
import Upload from "../../../components/pages/Upload";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useJsApiLoader } from "@react-google-maps/api";
import "./NewPost.scss";

const FormRealEstate = ({ form, setFieldsValue = () => {} }) => {
  const { isLoaded } = useJsApiLoader({
    mapIds: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries: ["drawing", "places"],
  });
  const [description, setDescription] = useState(false);
  const [listImg, setListImg] = useState([]);
  const [isPaymentCoin, setIsPaymentCoin] = useState(true);
  const [position, setPosition] = useState(
    form.getFieldValue("location")
      ? form.getFieldValue("location")
      : {
          lat: 21.0469701,
          lng: 105.8021347,
        }
  );

  const handleUploadImg = useCallback(
    (listImgInput) => {
      setListImg(listImgInput);
      form.setFieldsValue({ imgRealEstate: listImgInput });
    },
    [form, setListImg, setFieldsValue]
  );

  useEffect(() => {
    const lstImg = form.getFieldValue("imgRealEstate");
    if (lstImg) {
      setListImg(lstImg);
    }
  }, []);

  const setAddress = useCallback(
    (name) => {
      form.setFieldsValue({ address: name });
    },
    [form, position]
  );

  const onChangeTypPayment = (checked) => {
    setIsPaymentCoin(checked);
  };

  return (
    <>
      {isLoaded && (
        <Form
          layout="vertical"
          form={form}
          style={{
            width: "100%",
            paddingTop: 16,
          }}
          initialValues={{
            isWhole: true,
            cost: 1000000,
            isPaymentCoin: true,
            autoPayment: true,
            isAllowPet: true,
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
                      name="name"
                      style={{ width: "100%" }}
                      rules={[
                        {
                          required: true,
                          message: "Tên tòa nhà không được trống",
                        },
                      ]}
                    >
                      <Input placeholder="Tên tòa nhà" />
                    </Form.Item>
                  </Row>
                  <Row>
                    <Form.Item
                      label={
                        <div>
                          Diện tích(m<sup>2</sup>)
                        </div>
                      }
                      name="acreage"
                      style={{ width: "100%" }}
                      rules={[
                        {
                          required: true,
                          message: "Diện tích không được trống",
                        },
                      ]}
                    >
                      <Input placeholder="Diện tích sàn" />
                    </Form.Item>
                  </Row>
                  <Row>
                    <Form.Item
                      label="Giá thuê(VNĐ)"
                      name="cost"
                      style={{ width: "100%" }}
                      rules={[
                        {
                          required: true,
                          message: "Giá thuê không được trống",
                        },
                      ]}
                    >
                      <InputNumber
                        step={500000}
                        min={0}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        placeholder="Giá thuê theo tháng"
                        style={{ width: "100%" }}
                      />
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
                            <Form.Item
                              name="autoPayment"
                              valuePropName="checked"
                            >
                              <Switch
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
                        setPosition={(position) => {
                          setPosition(position);
                          form.setFieldsValue({ location: position });
                        }}
                        isShowDetail={false}
                        setAddress={setAddress}
                        addressInitial={form.getFieldValue("address")}
                      />
                    </Form.Item>
                  </Row>
                </Col>
                <Col xs={24} xl={18}>
                  <Form.Item name="location">
                    <Row style={{ justifyContent: "end" }}>
                      <MapCustom
                        position={position}
                        setPosition={(position) => {
                          setPosition(position);
                          form.setFieldsValue({ position: position });
                        }}
                      />
                    </Row>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              name="imgRealEstate"
              style={{ width: "100%", display: "none" }}
            ></Form.Item>
            <Form.Item label="Ảnh tòa nhà" style={{ width: "100%" }}>
              <Row style={{ width: "100%", gap: 8 }}>
                <Upload
                  idInput="upload-img-real-estate"
                  setFiles={handleUploadImg}
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
        </Form>
      )}
    </>
  );
};

export default FormRealEstate;

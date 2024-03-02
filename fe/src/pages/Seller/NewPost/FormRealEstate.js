import React, { useCallback, useEffect, useState } from "react";
import {
  Col,
  Row,
  Input,
  Form,
  Image,
  Switch,
  InputNumber,
  Select,
} from "antd";
import MapCustom from "../../../components/maps/MapCustom";
import PlacesAutocomplete from "../../../components/maps/PlacesAutocomplete";
import Upload from "../../../components/pages/Upload";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useJsApiLoader } from "@react-google-maps/api";
import { typeRealEstate } from "../../../const/index";
import "./NewPost.scss";

const FormRealEstate = ({ form, setFieldsValue = () => {} }) => {
  const [libraries] = useState(["drawing", "places"]);
  const { isLoaded } = useJsApiLoader({
    mapIds: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries: libraries,
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
            cost: 1000000,
            isPaymentCoin: true,
            autoPayment: true,
            isAllowPet: true,
            isInterior: true,
            type: "1",
          }}
        >
          <Row>
            <Form.Item style={{ width: "100%" }}>
              <Row style={{ width: "100%" }}>
                <Col
                  style={{ paddingLeft: 10, paddingRight: 10 }}
                  xs={24}
                  xl={10}
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
                      <Input placeholder="Tên tòa nhà" allowClear />
                    </Form.Item>
                  </Row>
                  <Row gutter={[8, 0]}>
                    <Col xs={24} xxl={12}>
                      <Form.Item
                        label={<div>Loại bất động sản</div>}
                        name="type"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Loại bất động sản không được trống",
                          },
                        ]}
                      >
                        <Select options={typeRealEstate} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} xxl={12}>
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
                        <InputNumber
                          step={5}
                          min={0}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          placeholder="Diện tích sàn"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} xxl={12}>
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
                    </Col>
                    <Col xs={24} xxl={12}>
                      <Form.Item
                        label={<div>Số tầng</div>}
                        name="floorTotal"
                        style={{ width: "100%" }}
                      >
                        <InputNumber
                          step={1}
                          min={0}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          placeholder="Số tầng"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} xxl={12}>
                      <Form.Item
                        label="Số phòng ngủ"
                        name="bedroomTotal"
                        style={{ width: "100%" }}
                      >
                        <InputNumber
                          step={1}
                          min={0}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          placeholder="Số phòng ngủ"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} xxl={12}>
                      <Form.Item
                        label="Số phòng vệ sinh"
                        name="toiletTotal"
                        style={{ width: "100%" }}
                      >
                        <InputNumber
                          step={1}
                          min={0}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          placeholder="Số phòng vệ sinh"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} xxl={12}>
                      <Form.Item
                        label={<div>Mặt tiền (m)</div>}
                        name="facade"
                        style={{ width: "100%" }}
                      >
                        <InputNumber
                          step={5}
                          min={0}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          placeholder="Diện tích mặt tiền"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} xxl={12}>
                      <Form.Item
                        label="Hướng nhà"
                        name="directionHouse"
                        style={{ width: "100%" }}
                      >
                        <Input placeholder="Hướng nhà" allowClear />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
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
                    </Col>
                    <Col span={12}>
                      <Row>
                        <Col style={{ paddingTop: 5 }}>Nội thất</Col>
                        <Col style={{ paddingLeft: 8 }}>
                          <Form.Item name="isInterior" valuePropName="checked">
                            <Switch
                              size="small"
                              checkedChildren={<CheckOutlined />}
                              unCheckedChildren={<CloseOutlined />}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={12}>
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
                    </Col>
                    <Col span={12}>
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
                </Col>
                <Col xs={24} xl={14}>
                  <Row>
                    <Form.Item
                      label="Địa chỉ"
                      name="address"
                      style={{ width: "100%" }}
                      rules={[
                        {
                          required: true,
                          message: "Địa chỉ không được để trống",
                        },
                      ]}
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
                  <Form.Item name="location" valuePropName="location">
                    <Row style={{ justifyContent: "end" }}>
                      <MapCustom
                        position={position}
                        setPosition={(position) => {
                          setPosition(position);
                          form.setFieldsValue({ location: position });
                        }}
                        setAddress={setAddress}
                      />
                    </Row>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Upload"
              name="imgRealEstate"
              valuePropName="fileList"
              rules={[
                {
                  required: true,
                  message: "Ảnh không được để trống",
                },
              ]}
            >
              <Upload
                idInput={`upload-img-real-estate`}
                fileList={listImg}
                setFiles={handleUploadImg}
                isShowFile={true}
              />
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

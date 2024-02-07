import React, { useEffect } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  InputNumber,
  Switch,
  Input,
  Select,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MarkdownEditor from "@uiw/react-markdown-editor";
import Upload from "../../../components/pages/Upload";
import { createRoomsService } from "../../../services/RealEstate/index";
import {
  CloseOutlined,
  CheckOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { typeRooms } from "../../../const";

const FormRoom = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [formRoom] = Form.useForm();

  useEffect(() => {
    if (!searchParams.get("floor")) {
      navigate("/");
    }
  }, [searchParams]);

  const handleCreateFloorForHouse = async () => {
    try {
      const data = formRoom.getFieldsValue();
      await formRoom.validateFields();
      if (data.rooms.length === 0) {
        toast.error("Dữ liệu trống");
      } else {
        data.floorId = searchParams.get("floor");

        const res = await createRoomsService(data);
        if (res.status === 200) {
          toast.success("Create Room Success");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Col span={24} className="home-container new-post">
      <Form form={formRoom} style={{ paddingBottom: 10 }} layout="vertical">
        <Form.List
          name="rooms"
          initialValue={[{ id: 0, cost: 1000000, status: true, type: "1" }]}
        >
          {(fields, { add, remove }) => (
            <Col span={24}>
              {fields.map((field, index) => (
                <Row key={field.key}>
                  <Col span={24}>
                    <Row>
                      <Col span={6}>
                        <Row>
                          <Col span={24}>
                            <Form.Item
                              label={
                                <Row
                                  style={{
                                    width: "100%",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Col>Tên phòng</Col>
                                  <MinusCircleOutlined
                                    onClick={() => {
                                      remove(field.name);
                                    }}
                                    style={{
                                      paddingLeft: 20,
                                      color: "red",
                                      fontSize: 20,
                                    }}
                                  />
                                </Row>
                              }
                              name={[field.name, "name"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Tên phòng không được trống",
                                },
                              ]}
                            >
                              <Input placeholder="Tên phòng" />
                            </Form.Item>
                            <Form.Item
                              label={
                                <div>
                                  Diện tích(m<sup>2</sup>)
                                </div>
                              }
                              name={[field.name, "acreage"]}
                              style={{ width: "100%" }}
                              rules={[
                                {
                                  required: true,
                                  message: "Diện tích không được trống",
                                },
                              ]}
                            >
                              <Input placeholder="Diện tích phòng" />
                            </Form.Item>
                            <Row>
                              <Form.Item
                                label="Đang trống"
                                name={[field.name, "status"]}
                              >
                                <Switch
                                  size="small"
                                  checkedChildren={<CheckOutlined />}
                                  unCheckedChildren={<CloseOutlined />}
                                />
                              </Form.Item>
                              <Form.Item
                                label="Loại phòng"
                                name={[field.name, "type"]}
                                style={{ minWidth: 150 }}
                              >
                                <Select
                                  options={typeRooms}
                                  style={{ minWidth: 100 }}
                                />
                              </Form.Item>
                            </Row>

                            <Form.Item
                              label="Giá thuê (VNĐ)"
                              name={[field.name, "cost"]}
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
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                parser={(value) =>
                                  value.replace(/\$\s?|(,*)/g, "")
                                }
                                placeholder="Giá thuê theo tháng"
                                style={{ width: "100%" }}
                              />
                            </Form.Item>
                            <Form.Item
                              label="Upload"
                              name={[field.name, "files"]}
                              valuePropName="files"
                              rules={[
                                {
                                  required: true,
                                  message: "Ảnh không được trống",
                                },
                              ]}
                            >
                              <Upload
                                idInput={`upload-img-floor-${index}`}
                                files={field.files}
                                setFiles={(listFile) => {
                                  const { rooms } = formRoom.getFieldsValue();
                                  Object.assign(rooms[field.fieldKey], {
                                    files: listFile,
                                  });
                                  field.files = listFile;
                                  formRoom.setFieldsValue({ rooms: rooms });
                                }}
                                isShowFile={true}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={18} style={{ paddingLeft: 30 }}>
                        <Form.Item
                          label="Mô tả"
                          name={[field.name, "description"]}
                          style={{ width: "100%" }}
                        >
                          <MarkdownEditor height="300px" enablePreview={true} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))}

              <Row>
                <Button type="dashed" onClick={() => add()}>
                  + Add Item
                </Button>
              </Row>
            </Col>
          )}
        </Form.List>
      </Form>
      <Row>
        <Button type="primary" onClick={handleCreateFloorForHouse}>
          Create
        </Button>
      </Row>
    </Col>
  );
};

export default FormRoom;

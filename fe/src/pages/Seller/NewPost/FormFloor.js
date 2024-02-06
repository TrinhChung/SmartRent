import { Button, Col, Form, InputNumber, Row, Switch } from "antd";
import React from "react";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import MarkdownEditor from "@uiw/react-markdown-editor";
import Upload from "../../../components/pages/Upload";
const FormFloor = ({ form }) => {
  return (
    <Form form={form} style={{ paddingBottom: 10 }} layout="vertical">
      <Form.List
        name="floors"
        initialValue={[{ id: 0, cost: 1000000, status: true }]}
      >
        {(fields, { add, remove }) => (
          <Col span={24}>
            {fields.map((field, index) => (
              <Row key={field.key}>
                <Col span={24}>
                  <Row>
                    <Col className="text_title">Tầng {index + 1}</Col>
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Row>
                  <Row>
                    <Col span={6}>
                      <Row>
                        <Col span={24}>
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
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
                                const { floors } = form.getFieldsValue();
                                Object.assign(floors[field.fieldKey], {
                                  files: listFile,
                                });
                                field.files = listFile;
                                form.setFieldsValue({ floors: floors });
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
                        name="description"
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
  );
};

export default FormFloor;

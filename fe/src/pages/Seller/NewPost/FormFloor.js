import { Button, Col, Form, InputNumber, Row } from "antd";
import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
const FormFloor = ({ form }) => {
  return (
    <Form form={form} style={{ paddingBottom: 10 }} layout="vertical">
      <Form.List name="floors">
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
                    <Col span={10}>
                      <Form.Item label="Tên" name={[field.name, "name"]}>
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item
                        label="Giá thuê(VNĐ)"
                        name={[field.cost, "cost"]}
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
                  </Row>
                </Col>
              </Row>
            ))}

            <Row>
              <Button type="dashed" onClick={() => add()} block>
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

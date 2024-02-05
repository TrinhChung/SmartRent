import React, { useEffect, useState } from "react";
import { Col, Row, Form, Steps, Button } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import "./NewPost.scss";
import FormRealEstate from "./FormRealEstate";
import FormFloor from "./FormFloor";

const NewPost = () => {
  const [formRealEstate, formFloor, formRoom] = Form.useForm();

  const [statusPost, setStatusPost] = useState({ step: 0, status: "loading" });

  const items = [
    {
      title: <Row className="text_title">Thông tin tòa nhà</Row>,
      icon: <UserOutlined />,
    },
    {
      title: <Row className="text_title">Thông tin tầng</Row>,
      icon: <SolutionOutlined />,
    },
    {
      title: <Row className="text_title">Thông tin phòng</Row>,
      icon: <SolutionOutlined />,
    },
    {
      title: <Row className="text_title">Done</Row>,
      icon: <SmileOutlined />,
    },
  ];

  const handleNextStep = async () => {
    try {
      if (statusPost.step === 0) {
        await formRealEstate.validateFields();
        setStatusPost({ status: "process", step: statusPost.step + 1 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    formRealEstate.resetFields();
  }, []);

  const handleDoneStep = () => {};

  const handlePreStep = () => {
    setStatusPost({ status: "process", step: statusPost.step - 1 });
  };

  const getValueFormRealEstate = () => {
    console.log(formRealEstate.getFieldsValue());
  };

  return (
    <Col span={24} className="home-container new-post">
      <Row>
        <Steps
          current={statusPost.step}
          status={statusPost.status}
          items={items}
        />
      </Row>
      {statusPost.step === 0 && <FormRealEstate form={formRealEstate} />}
      {statusPost.step === 1 && <FormFloor form={formFloor} />}
      {statusPost.step === 2 && <FormFloor form={formRoom} />}
      <Row style={{ paddingBottom: 10 }}>
        {statusPost.step < items.length - 1 && (
          <Button type="primary" onClick={handleNextStep}>
            Next
          </Button>
        )}
        {statusPost.step === items.length - 1 && (
          <Button type="primary" onClick={handleDoneStep}>
            Done
          </Button>
        )}
        {statusPost.step > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={handlePreStep}
          >
            Previous
          </Button>
        )}
        <Button
          style={{
            margin: "0 8px",
          }}
          onClick={getValueFormRealEstate}
        >
          Get value form real estate
        </Button>
      </Row>
    </Col>
  );
};

export default NewPost;

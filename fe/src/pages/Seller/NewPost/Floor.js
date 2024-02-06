import React from "react";
import { Col, Form } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import FormFloor from "./FormFloor";

const Floor = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [formFloor] = Form.useForm();

  return (
    <Col span={24} className="home-container new-post">
      <FormFloor form={formFloor} />
    </Col>
  );
};

export default Floor;

import React, { useEffect } from "react";
import { Col, Row, Form, Button } from "antd";

import "./NewPost.scss";
import FormRealEstate from "./FormRealEstate";
import { createRealEstateService } from "../../../services/RealEstate/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FullHouse = () => {
  const navigate = useNavigate();
  const [formRealEstate] = Form.useForm();

  const handleNextStep = async () => {
    try {
      await formRealEstate.validateFields();
      const data = formRealEstate.getFieldsValue();
      const res = await createRealEstateService(data);
      if (res.status === 200) {
        formRealEstate.resetFields();
        navigate(`/full-house-view/${res.data.id}`);
        toast.success("Create Real Estate Success");
      }
    } catch (error) {
      toast.error("Create Real Estate Error");
      console.log(error);
    }
  };

  useEffect(() => {
    formRealEstate.resetFields();
  }, []);

  return (
    <Col span={24} className="home-container new-post">
      {<FormRealEstate form={formRealEstate} />}

      <Row style={{ paddingBottom: 10, gap: 10 }}>
        <Button type="primary" onClick={handleNextStep}>
          Create
        </Button>
        <Button
          type="primary"
          onClick={() => {
            formRealEstate.resetFields();
          }}
        >
          Clear
        </Button>
      </Row>
    </Col>
  );
};

export default FullHouse;

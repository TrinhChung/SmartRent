import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import FormFloor from "./FormFloor";
import { toast } from "react-toastify";
import { createFloorsService } from "../../../services/RealEstate";

const Floor = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [formFloor] = Form.useForm();

  useEffect(() => {
    if (!searchParams.get("house")) {
      navigate("/");
    }
  }, [searchParams]);

  const handleCreateFloorForHouse = async () => {
    try {
      const data = formFloor.getFieldsValue();
      await formFloor.validateFields();
      if (data.floors.length === 0) {
        toast.error("Dữ liệu trống");
      } else {
        data.realEstateId = searchParams.get("house");
        const res = await createFloorsService(data);
        if (res.status === 200) {
          toast.success("Create Floor Success");
          formFloor.resetFields();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Col span={24} className="home-container new-post">
      <FormFloor form={formFloor} />
      <Row>
        <Button type="primary" onClick={handleCreateFloorForHouse}>
          Create
        </Button>
      </Row>
    </Col>
  );
};

export default Floor;

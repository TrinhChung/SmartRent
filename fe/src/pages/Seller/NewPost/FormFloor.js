import { Form, Row } from "antd";
import React, { useState } from "react";

const FormFloor = ({ form }) => {
  const [numberFloor, setNumberFloor] = useState(5);
  return (
    <Row>
      <Form form={form}>
        {Array.from(Array(numberFloor).keys()).map((key) => {
          return <Row>Floor {key}</Row>;
        })}
      </Form>
    </Row>
  );
};

export default FormFloor;

import React, { useState } from "react";
import { Spin, Row, Image } from "antd";

const ImageCustom = ({ src = "", index = 0, className = "" }) => {
  const [status, setStatus] = useState(false);

  return (
    <>
      <Image
        key={"Image" + index}
        className={`${status ? "show" : "hide"} ${className}`}
        onLoad={() => {
          setStatus(true);
        }}
        src={src ? src : ""}
        loading="lazy"
      />
      {status === false && (
        <Row
          className={`${className}`}
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "30px 0px",
            height: 150,
            width: 300,
            borderRadius: 8,
            border: "1px solid var(--color-gray-job)",
          }}
        >
          <Spin size="large" />
        </Row>
      )}
    </>
  );
};

export default ImageCustom;

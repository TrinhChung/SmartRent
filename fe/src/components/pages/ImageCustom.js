import React, { useState } from "react";
import { Spin, Row, Image, Col } from "antd";

const ImageCustom = ({ src = "", index = 0, className = "" }) => {
  const [status, setStatus] = useState(false);

  return (
    <>
      <Image
        key={"Image" + index}
        className={`show-image ${className}`}
        onLoad={() => {
          setStatus(true);
        }}
        src={src ? src : ""}
        loading="lazy"
      ></Image>
      {status === false && (
        <Row className={`${className} loading-image`}>
          <Spin size="large" />
        </Row>
      )}
    </>
  );
};

export default ImageCustom;

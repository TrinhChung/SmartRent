import React, { useState } from 'react';
import { Image, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const ImageWithLoading = ({ image }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    // Handle image loading errors gracefully, e.g., display a placeholder image
    console.error('Image loading failed:', image.url);
    setIsLoading(false); // Allow component to render without the spinner
  };

  return (
    <div>
      {isLoading && 
      <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 24,
              }}
              spin
            />
          }
        />}
      <Image
        className="message-image"
        src={process.env.REACT_APP_HOST_BE + "/" + image.url}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};

export default ImageWithLoading;

import React, { useContext, useEffect, useState } from "react";
import { Col, Image, Input, Row } from "antd";
import PlacesAutocomplete from "../../../components/maps/PlacesAutocomplete";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import ImageBannerHome from "../../../public/images/home-banner.jpg";
import "./Home.scss";
import { MapContext } from "../../../providers/mapProvider";
import Suggest from "./Suggest";
import ImageHouse from "../../../public/images/house1.jpg";

const Home = () => {
  const { isLoaded } = useContext(MapContext);
  const [position, setPosition] = useState({
    lat: 21.0469701,
    lng: 105.8021347,
  });

  const [map, setMap] = React.useState(null);

  function addYourLocationButton(map, marker) {
    var controlDiv = document.createElement("div");

    var firstChild = document.createElement("button");
    firstChild.style.backgroundColor = "#fff";
    firstChild.style.border = "none";
    firstChild.style.outline = "none";
    firstChild.style.width = "28px";
    firstChild.style.height = "28px";
    firstChild.style.borderRadius = "2px";
    firstChild.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
    firstChild.style.cursor = "pointer";
    firstChild.style.marginRight = "10px";
    firstChild.style.padding = "0";
    firstChild.title = "Your Location";
    controlDiv.appendChild(firstChild);

    var secondChild = document.createElement("div");
    secondChild.style.margin = "5px";
    secondChild.style.width = "18px";
    secondChild.style.height = "18px";
    secondChild.style.backgroundImage =
      "url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)";
    secondChild.style.backgroundSize = "180px 18px";
    secondChild.style.backgroundPosition = "0 0";
    secondChild.style.backgroundRepeat = "no-repeat";
    firstChild.appendChild(secondChild);

    window.google.maps.event.addListener(map, "center_changed", function () {
      secondChild.style["background-position"] = "0 0";
    });

    firstChild.addEventListener("click", function () {
      var imgX = 0,
        animationInterval = setInterval(function () {
          imgX = -imgX - 18;
          secondChild.style["background-position"] = imgX + "px 0";
        }, 500);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var latlng = new window.google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          map.setCenter(latlng);
          setPosition(latlng);
          clearInterval(animationInterval);
          secondChild.style["background-position"] = "-144px 0";
        });
      } else {
        clearInterval(animationInterval);
        secondChild.style["background-position"] = "0 0";
      }
    });

    controlDiv.index = 1;
    map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(
      controlDiv
    );
  }

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(position);
    map.fitBounds(bounds);
    var myMarker = new window.google.maps.Marker({
      map: map,
      animation: window.google.maps.Animation.DROP,
      position: position,
    });
    addYourLocationButton(map, myMarker);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    navigator?.geolocation?.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const containerStyle = {
    height: "50vh",
    width: "100%",
  };

  const listSuggest = [
    {
      image: ImageHouse,
      name: "Sunny Village Berawa - Villa",
      address: "Complex modern villas in Texas",
    },
    {
      image: ImageHouse,
      name: "Sunny Village Berawa - Villa",
      address: "Complex modern villas in Texas",
    },
    {
      image: ImageHouse,
      name: "Sunny Village Berawa - Villa",
      address: "Complex modern villas in Texas",
    },
    {
      image: ImageHouse,
      name: "Sunny Village Berawa - Villa",
      address: "Complex modern villas in Texas",
    },
    {
      image: ImageHouse,
      name: "Sunny Village Berawa - Villa",
      address: "Complex modern villas in Texas",
    },
    {
      image: ImageHouse,
      name: "Sunny Village Berawa - Villa",
      address: "Complex modern villas in Texas",
    },
  ];

  return (
    <Col span={24} className="home-container">
      <Row className="box-banner" style={{}}>
        <Col xxl={8} xs={8}>
          <Row>
            <Col
              xxl={20}
              style={{ paddingBottom: 40 }}
              className="text_title text-banner-title"
            >
              A Premier Real Estate Professional
            </Col>
          </Row>
          <Row>
            <Col
              style={{ paddingBottom: 40 }}
              xxl={12}
              className="text-banner-description"
            >
              Own a premium townhouse that will generate you passive income up
              to 115-130% after development.
            </Col>
          </Row>
          <Row>
            <Col xxl={12}>
              <button className="button-view button-banner">
                See The House
              </button>
            </Col>
          </Row>
        </Col>
        <Col xxl={16} xs={16} style={{ height: 426 }}>
          <Image
            height={"100%"}
            width={"100%"}
            style={{ borderRadius: 32 }}
            preview={false}
            src={ImageBannerHome}
          />
        </Col>
      </Row>
      {isLoaded ? (
        <Col span={24} className="box-search box-border">
          <Row
            className="text_title"
            style={{
              justifyContent: "center",
              paddingBottom: 24,
              fontSize: 32,
            }}
          >
            let's find a home that's perfect for you
          </Row>
          <Row>
            <Col style={{ paddingLeft: 10, paddingRight: 10 }} xs={24} xl={6}>
              <Row gutter={[4, 4]}>
                <Col xxl={12} xs={24}>
                  <Input placeholder="Giá phòng" />
                </Col>
                <Col xxl={12} xs={24}>
                  <Input placeholder="Loại" />
                </Col>
              </Row>
              <Row>
                <PlacesAutocomplete setPosition={setPosition} />
              </Row>
              <Row style={{ paddingTop: 8 }}>
                <Col xxl={12}>
                  <button
                    className="button-view"
                    style={{ height: 38, fontSize: 16 }}
                  >
                    Tìm kiếm ngay
                  </button>
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={18}>
              <Row style={{ justifyContent: "end" }}>
                <GoogleMap
                  center={position}
                  mapContainerStyle={containerStyle}
                  zoom={15}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  <div>
                    <button>My Location</button>
                  </div>
                  {position && <MarkerF position={position} />}
                </GoogleMap>
              </Row>
            </Col>
          </Row>
        </Col>
      ) : (
        <Row>...Loading</Row>
      )}

      <Suggest houses={listSuggest} />
    </Col>
  );
};

export default Home;

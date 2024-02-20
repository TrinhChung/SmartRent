import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  GoogleMap,
  MarkerF,
  OverlayView,
  InfoWindowF,
} from "@react-google-maps/api";
import spriteLocation from "../../public/images/mylocation-sprite-2x.png";
import HouseInfo from "./HouseInfo";
import { Col, Row, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBicycle,
  faCar,
  faPersonWalking,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";

const MapCustom = ({
  position = {},
  setPosition = () => {},
  height = "50vh",
  houses = [],
  isModeTravel = false,
}) => {
  const [scaleIcon, setScaleIcon] = useState(26);
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [modeTravel, setModeTravel] = useState("DRIVING");
  const [currentDestination, setCurrentDestination] = useState(null);

  const directionsRenderer = useRef(
    new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
    })
  );

  const infoWindow = useRef(
    new window.google.maps.InfoWindow({
      content: "Your custom content goes here",
      position: position,
    })
  );
  const directionsService = new window.google.maps.DirectionsService();

  const dragMarker = useCallback(
    (marker) => {
      const lat = marker?.latLng?.lat();
      const lng = marker?.latLng?.lng();
      setPosition({ lat: lat, lng: lng });
    },
    [setPosition]
  );

  const containerStyle = {
    height: height,
    width: "100%",
  };

  const addYourLocationButton = (map) => {
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
    secondChild.style.backgroundImage = `url(${spriteLocation})`;
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
  };

  const onLoad = useCallback(
    function callback(map) {
      addYourLocationButton(map);
      setMap(map);
    },
    [addYourLocationButton]
  );

  useEffect(() => {
    if (position && currentDestination) {
      getDirectionRoute(currentDestination);
    }
  }, [position, modeTravel]);

  useEffect(() => {
    if (!directionsRenderer?.current?.setDirections) return;
    if (directions) {
      const view_path = directions.routes[0]?.overview_path;
      if (view_path.length > 0) {
        infoWindow.current.setPosition({
          lat: view_path[Math.round(view_path.length / 2)].lat(),
          lng: view_path[Math.round(view_path.length / 2)].lng(),
        });
        console.log(directions);
        let distance = undefined;
        let duration = undefined;
        if (directions?.routes[0].legs.length > 0) {
          distance = directions?.routes[0]?.legs[0]?.distance?.text;
          duration = directions?.routes[0]?.legs[0]?.duration?.text;
        }
        const contentDirection = `<div>
            <div>Khoảng cách: ${distance}</div>
            <div>Thời gian: ${duration}</div>
          </div>`;
        infoWindow.current.setContent(contentDirection);
        infoWindow.current.open(map);
      }
      directionsRenderer?.current?.setMap(map);
    } else {
      directionsRenderer?.current?.setMap(null);
    }
    directionsRenderer?.current?.setDirections(directions);
  }, [directions]);

  const getDirectionRoute = useCallback(
    (location) => {
      setCurrentDestination(location);
      directionsService.route(
        {
          origin: position,
          destination: location,
          travelMode: modeTravel,
        },
        async (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            alert(`Không tìm thấy tuyến đường phù hợp`);
            directionsRenderer.current.setMap(null);
          }
        }
      );
    },
    [position, modeTravel]
  );

  const listHouseIcon = useMemo(() => {
    if (houses?.length === 0 || (map && map?.zoom < 5)) return <></>;
    return houses.map((house, index) => {
      return (
        <OverlayView
          position={{
            lat: Number(house.Address?.lat),
            lng: Number(house.Address?.lng),
          }}
          key={"house" + index}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <HouseInfo
            scaleIcon={scaleIcon}
            house={house}
            origin={position}
            getDirectionRoute={getDirectionRoute}
          />
        </OverlayView>
      );
    });
  }, [houses, map?.zoom]);

  return (
    <GoogleMap
      center={position}
      mapContainerStyle={containerStyle}
      zoom={15}
      onLoad={onLoad}
      onRightClick={dragMarker}
      onZoomChanged={() => {
        if (!map?.zoom) {
          setScaleIcon(26);
        }
        setScaleIcon(Number(map?.zoom * 26) / 15);
      }}
      className="map-custom-container"
    >
      {position && (
        <MarkerF
          draggable={true}
          animation={window.google.maps.Animation.DROP}
          position={position}
          onDragEnd={dragMarker}
        />
      )}
      {listHouseIcon}
      {isModeTravel === true && (
        <Row id="floating-panel">
          <Col>
            <Select
              value={modeTravel}
              style={{
                paddingLeft: 5,
                width: 120,
                height: 40,
                borderRadius: "0!important",
              }}
              options={[
                {
                  label: (
                    <Row style={{ alignItems: "center", cursor: "pointer" }}>
                      <FontAwesomeIcon icon={faCar} />
                      <label style={{ paddingLeft: 4 }}>Car</label>
                    </Row>
                  ),
                  value: "DRIVING",
                },
                {
                  label: (
                    <Row style={{ alignItems: "center", cursor: "pointer" }}>
                      <FontAwesomeIcon icon={faPersonWalking} />
                      <label style={{ paddingLeft: 4 }}>Walking</label>
                    </Row>
                  ),
                  value: "WALKING",
                },
                {
                  label: (
                    <Row style={{ alignItems: "center", cursor: "pointer" }}>
                      <FontAwesomeIcon icon={faBicycle} />
                      <label style={{ paddingLeft: 4 }}>Bicycle</label>
                    </Row>
                  ),
                  value: "BICYCLING",
                },
                {
                  label: (
                    <Row style={{ alignItems: "center", cursor: "pointer" }}>
                      <FontAwesomeIcon icon={faPlane} />
                      <label style={{ paddingLeft: 4 }}>Transit</label>
                    </Row>
                  ),
                  value: "TRANSIT",
                },
              ]}
              onChange={(value) => {
                setModeTravel(value);
              }}
            />
          </Col>
        </Row>
      )}
    </GoogleMap>
  );
};

export default MapCustom;

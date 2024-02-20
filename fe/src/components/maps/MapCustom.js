import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  DirectionsRenderer,
  OverlayView,
} from "@react-google-maps/api";
import spriteLocation from "../../public/images/mylocation-sprite-2x.png";
import HouseInfo from "./HouseInfo";

const MapCustom = ({
  position = {},
  setPosition = () => {},
  height = "50vh",
  houses = [],
}) => {
  const [scaleIcon, setScaleIcon] = useState(26);
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);

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
            setDirection={setDirections}
          />
        </OverlayView>
      );
    });
  }, [houses, map?.zoom]);

  const directionDistance = useMemo(() => {
    if (!directions) return <></>;
    return (
      <DirectionsRenderer
        options={{ suppressMarkers: true }}
        directions={directions}
      ></DirectionsRenderer>
    );
  }, [directions, map?.zoom]);

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
      {directionDistance}
    </GoogleMap>
  );
};

export default MapCustom;

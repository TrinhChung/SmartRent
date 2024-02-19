import React, { memo, useCallback, useMemo, useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import spriteLocation from "../../public/images/mylocation-sprite-2x.png";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import IconMarker from "../../public/icon/house.png";

const MapCustom = ({
  position = {},
  setPosition = () => {},
  height = "50vh",
  houses = [],
}) => {
  const { AdvancedMarkerElement } = window.google.maps.importLibrary("maps");
  const [scaleIcon, setScaleIcon] = useState(0.05);
  const [map, setMap] = useState(null);
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
    if (map) {
      houses.map((house, index) => {
        new window.google.maps.marker.AdvancedMarkerElement({
          map: map,
          position: {
            lat: Number(house.Address.lat),
            lng: Number(house.Address.lng),
          },
          content: <div>House</div>,
        });
      });
    }
    return houses.map((house, index) => {
      return (
        <MarkerF
          key={"mapiCon" + index}
          draggable={false}
          position={{
            lat: Number(house.Address.lat),
            lng: Number(house.Address.lng),
          }}
          icon={{
            path: faHouse.icon[4],
            fillColor: "#3c3c3c",
            fillOpacity: 1,
            anchor: new window.google.maps.Point(
              faHouse.icon[0] / 2,
              faHouse.icon[1]
            ),
            strokeWeight: 1,
            strokeColor: "#3c3c3c",
            scale: 0.05,
          }}
        />
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
        setScaleIcon((map?.zoom * 0.05) / 15);
      }}
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
    </GoogleMap>
  );
};

export default memo(MapCustom);

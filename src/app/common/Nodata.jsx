import React from "react";
import { ReactComponent as NoData } from "../../images/no-data.svg";

const Nodata = () => {
  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: "100px",
      }}
    >
      <NoData />
    </div>
  );
};

export default Nodata;

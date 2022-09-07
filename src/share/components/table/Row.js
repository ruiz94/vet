import React from "react";

const Row = ({ data, widthCol }) => {
  const copyData = { ...data };
  delete copyData.id;
  copyData.actions = "";
  if (copyData.reason || copyData.description) {
    let text = copyData.reason ? copyData.reason : copyData.description;
    text = text.length > 30 ? text.slice(0, 25) + "..." : text;
    if (copyData.reason) {
      copyData.reason = text;
    } else {
      copyData.description = text;
    }
  }
  const dataRow = Object.values(copyData);

  return (
    <div className="row">
      {dataRow.map((value, index) => (
        <span key={index} style={widthCol}>
          {value}
        </span>
      ))}
    </div>
  );
};

export default Row;

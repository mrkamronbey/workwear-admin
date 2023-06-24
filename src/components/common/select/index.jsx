import React from "react";
import { Select } from "antd";
import "./styles.css";

const SelectCommon = ({ placeholder, options, onChange }) => {
  return (
    <>
      <div className="select_wrapp">
        <Select
          showSearch
          onChange={onChange}
          className="select"
          placeholder={placeholder}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={options}
        />
      </div>
    </>
  );
};

export default SelectCommon;

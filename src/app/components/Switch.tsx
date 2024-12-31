import React from "react";

export interface SwitchProps {
  readonly status: boolean;

  onChange: Function;
}

const Switch = ({ status, onChange }: SwitchProps) => {
  return (
    <div className="switch">
      <input
        type="checkbox"
        className="switch-input"
        checked={status}
        onChange={(event: any) => onChange(event.target.checked)}
      />
      <label
        className="switch-back"
        style={
          status ? { backgroundColor: "#ff6600" } : { backgroundColor: "#aaa" }
        }
      >
        <span
          className="switch-wheel"
          style={status ? { marginLeft: "16px" } : { marginLeft: "0px" }}
        />
      </label>
    </div>
  );
};

export default Switch;

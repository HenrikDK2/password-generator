import React from "react";
import { styled } from "../stiches";

const CustomCheckbox = styled("div", {
  marginTop: "1rem",
  cursor: "pointer",
});

const Label = styled("label", {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
});

const CheckboxIndicator = styled("span", {
  position: "relative",
  display: "block",
  width: "16px",
  height: "16px",
  marginRight: "1rem",
  border: "2px solid $white-1",
  "&::after": {
    content: "",
    position: "absolute",
    display: "block",
    opacity: 0,
    transform: "translate(-50%, -50%)",
    transition: ".2s opacity ease",
    left: "50%",
    top: "50%",
    width: "65%",
    height: "65%",
    backgroundColor: "$green-1",
  },
  "&[data-is-checked='true']::after": {
    opacity: 1,
  },
});

interface CheckboxProps {
  children?: React.ReactNode;
  required?: boolean;
  onClick: () => void;
  checked: boolean;
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, label, onClick, required }) => (
  <CustomCheckbox
    onKeyDown={(e) => {
      if (!required) {
        if (e.code === "Space" || e.code === "Enter") onClick();
      }
    }}
    aria-required={required}
    onClick={(e) => !required && onClick()}
    role="checkbox"
    aria-checked={checked}
    tabIndex={0}
  >
    <Label>
      <CheckboxIndicator data-is-checked={checked} />
      {label}
    </Label>
  </CustomCheckbox>
);

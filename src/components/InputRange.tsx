import React from "react";
import { styled } from "../stiches";

const thumb = {
  cursor: "grab",
  appearance: "none",
  border: "none",
  height: "16px",
  width: "16px",
  borderRadius: "50%",
  background: "$white-1",
  marginTop: "-4px",
  "&:active": {
    cursor: "grabbing",
  },
};

const track = {
  height: "6px",
  background: "$dark-1",
  cursor: "pointer",
};

const Input = styled("input", {
  width: "100%",
  background: "transparent",
  appearance: "none",

  "&::-moz-range-progress": {
    height: "6px",
    background: "$green-1",
    cursor: "pointer",
  },
  "&::-moz-range-track": track,
  "&::-moz-range-thumb": thumb,
  "&::-webkit-slider-runnable-track": track,
  "&::-webkit-slider-thumb": thumb,
});

interface InputRangeProps {
  children?: React.ReactNode;
  id?: string;
  min: number;
  max: number;
  value: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const InputRange: React.FC<InputRangeProps> = (props) => {
  const linearPercentage = ((+props.value - props.min) * 100) / (props.max - props.min);
  const background = `linear-gradient(to right, $green-1 0%, $green-1 ${linearPercentage}%, $dark-1 ${linearPercentage}%, $dark-1 100%)`;

  return (
    <Input
      type="range"
      {...props}
      css={{
        // Fix for chrome
        "&::-webkit-slider-runnable-track": {
          background,
        },
      }}
      onChange={(e) => props.onChange(e)}
    />
  );
};

/**
 *
 * Slider
 *
 */
import * as React from "react";
import Slider from "@material-ui/core/Slider";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core";
import { TotemsData } from "types/constants";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 50 + theme.spacing(1) * 2,
    },
    padding: {
      height: 0,
    },
  })
);

interface Props {
  totem: string;
  value: number;
  disabled?: boolean;
  onChangeValue: (number) => void;
}

const CustomizedSlider = ({
  totem,
  value,
  onChangeValue,
  disabled = false,
}: Props) => {
  const classes = useStyles();
  const PrettoSlider = withStyles({
    root: {
      color: TotemsData[totem].color,
      height: 12,
    },
    thumb: {
      height: 12,
      width: 12,
      backgroundColor: "#fff",
      marginTop: 0,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 1px)",
    },
    track: {
      height: 12,
      borderRadius: 6,
    },
    rail: {
      height: 12,
      borderRadius: 6,
    },
  })(Slider);
  const setNewValue = (e, newValue) => {
    onChangeValue(newValue);
  };
  return (
    <div className={classes.root}>
      <PrettoSlider
        onChange={setNewValue}
        valueLabelDisplay="auto"
        aria-label="slider"
        max={5}
        defaultValue={value}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomizedSlider;

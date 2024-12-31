/**
 *
 * Currency
 *
 */
import { BigNumberish } from "ethers";
import * as React from "react";
import "styles/scss/components.scss";

export enum CurrencyUnit {
  DOLLAR = "$",
  BITCOIN = "BTC",
  TOTEM = "TOTM",
  NO_SYMBOL = "",
  PLUS_MINUS = "&#177;",
  PERCENT = "&#37;",
}

interface Props {
  value: BigNumberish;
  unit: CurrencyUnit;
  size?: number;
  fixed?: number;
  localization?: boolean;
  parse?: boolean;
  postfixSymbol?: boolean;
}

export const Currency = (props: Props) => {
  const {
    value,
    parse = true,
    unit,
    size = 36,
    fixed = 2,
    postfixSymbol = false,
    localization = true,
  } = props;
  let currencySymbolPosition = "left";

  switch (unit) {
    case CurrencyUnit.BITCOIN:
      currencySymbolPosition = "bottom-right";
      break;
    case CurrencyUnit.TOTEM:
      currencySymbolPosition = "bottom-right";
      break;
    default:
      // $
      currencySymbolPosition = "left";
  }

  const currencySize = (target) => {
    const isCryptoUnit = [CurrencyUnit.BITCOIN, CurrencyUnit.TOTEM].includes(
      unit
    );

    if (target === "unit" && isCryptoUnit) {
      const ratio = 0.5;
      const unitFontSize =
        size * ratio > 12 ? 12 : size * ratio < 8 ? 8 : size * ratio;

      return {
        fontSize: `${unitFontSize}px`,
        lineHeight: `${unitFontSize}px`,
        right: `-${unitFontSize * 2.7 * (unit.length / 4)}px`,
        bottom: `-${unitFontSize * 0.7}px`,
      };
    }

    return { fontSize: `${size}px`, lineHeight: `${size}px` };
  };

  const normalizeValue = () => {
    const fixedValue =
      fixed === -1 ? Number(value) : Number(value).toFixed(fixed);
    const normalizedValue: string = localization
      ? Number(fixedValue).toLocaleString("en")
      : Number(fixedValue).toString();

    return isNaN(Number(fixedValue)) && parse === false
      ? value
      : normalizedValue;
  };

  const symbolGenerator = (position) => {
    if (postfixSymbol) {
      return position === "post" ? (
        <span
          className={`currency-symbol ${currencySymbolPosition}`}
          style={currencySize("unit")}
        >
          {new DOMParser().parseFromString(unit, "text/html").body.textContent}
        </span>
      ) : (
        <></>
      );
    }

    return position === "pre" ? (
      <span
        className={`currency-symbol ${currencySymbolPosition}`}
        style={currencySize("unit")}
      >
        {new DOMParser().parseFromString(unit, "text/html").body.textContent}
      </span>
    ) : (
      <></>
    );
  };

  return (
    <div
      className="currency-root"
      style={{ lineHeight: `${size}px`, fontSize: `${size}px` }}
    >
      {symbolGenerator("pre")}
      <span
        className="currency-value"
        style={currencySize("value")}
        data-exact-value={value}
      >
        {normalizeValue()}
      </span>
      {symbolGenerator("post")}
    </div>
  );
};

Currency.formatByComma = (value: number | string): string => {
  if (value < 1000) {
    return value.toString();
  }
  if (isNaN(Number(value))) {
    return "0";
  }
  const stringValue = value.toString();
  const reversedArray = stringValue
    .split("")
    .filter((ch) => ch !== ",")
    .reverse();
  const formattedArray = [];

  reversedArray.forEach((digit: string, index: number) => {
    if (index > 0 && index % 3 === 0) {
      formattedArray.push(",");
    }

    formattedArray.push(digit);
  });

  const formattedValue = formattedArray.reverse().join("");

  return formattedValue;
};

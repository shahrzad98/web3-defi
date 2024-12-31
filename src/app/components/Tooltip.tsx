/**
 *
 * Tooltip
 *
 */
import * as React from "react";
import "styles/scss/components.scss";
import { Icon } from "./Icon";

interface Props {
  icon?: string;
  position?: string;
  text: string;
  title?: string;
  onClick?(): void;
}

export const Tooltip = (props: Props) => {
  const {
    text,
    position = "right",
    title = "",
    icon = "question",
    onClick = () => {},
  } = props;
  return (
    <div
      className="tooltip"
      onClick={() => {
        return onClick();
      }}
    >
      {icon === "icon" ? (
        <Icon url="wolf-warning.svg" height={24} width={24} cursor="pointer" />
      ) : (
        <svg
          viewBox="0 0 22 22"
          height="22"
          width="22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgb(167, 164, 164)"
            d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm2-13c0 .28-.21.8-.42 1L10 9.58c-.57.58-1 1.6-1 2.42v1h2v-1c0-.29.21-.8.42-1L13 9.42c.57-.58 1-1.6 1-2.42a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0zm-3 8v2h2v-2H9z"
          />
        </svg>
      )}
      <span className={`tooltip-text tooltip-text-${position}`}>
        <b>{title}</b>
        {text}
      </span>
    </div>
  );
};

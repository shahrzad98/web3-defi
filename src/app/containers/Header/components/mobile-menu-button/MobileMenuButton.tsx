/**
 *
 * MenuButton
 *
 */
import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import { Icon } from "app/components/Icon";
import { TotemsData } from "types/constants";

import "styles/scss/components.scss";
import "./MobileMenuButton.scss";
export interface Props {
  name: string;
  path: string;
  isActive?: boolean;
  onPathChange?: (string) => void;
  isMobile?: boolean;
  img?: string;
}

export const MobileMenuButton = memo(
  ({ name, path, isActive, onPathChange, isMobile, img }: Props) => {
    const history = useHistory();
    const redirect = (path) => {
      onPathChange && onPathChange(name);
      history.push(`${path}`);
    };
    return (
      <div
        style={
          isActive
            ? { borderRight: "solid #FF6700 6px", backgroundColor: "#272e38" }
            : { borderRight: "solid transparent 6px" }
        }
        className="mobile-menu-button"
      >
        <a onClick={() => redirect(path)}>
          <Icon
            url={
              img
                ? img
                : TotemsData[name].iconMobile
                ? TotemsData[name].iconMobile
                : TotemsData[name].icon
            }
            width={isMobile ? 20 : 30}
            height={isMobile ? 20 : 30}
          />
          {TotemsData[name].name}
        </a>
      </div>
    );
  }
);
export default MobileMenuButton;

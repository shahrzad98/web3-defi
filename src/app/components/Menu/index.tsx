/**
 *
 * Menu
 *
 */
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "styles/scss/components.scss";
import { TotemsData } from "types/constants";
import { currentPath } from "utils/path";
import "./Menu.scss";
import { Icon } from "../Icon";
import { MenuButton } from "./MenuButton";
import useWindowSize from "../../hooks/useWindowSize";
import { filterLIstByKey } from "../../../utils/filter";

interface Props {
  isLogin?: boolean;
}

export const Menu = ({ isLogin }: Props) => {
  const allowShowDevMenus = () => {
    const allowShow =
      window.location.href.includes("localhost") ||
      window.location.href.includes("https://staging.totemfi.com/");
    return allowShow;
  };

  const hasTouch = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };

  const ref = useRef(null);
  const location = useLocation();
  const { isMobile, width } = useWindowSize();

  const [show, setShow] = useState(false);
  const [menuValues, setMenuValues] = useState(Object.entries(TotemsData));
  const [activePath, setActivePath] = useState<string>(
    currentPath(location.pathname)
  );

  useEffect(() => {
    isMobile && setMenuValues(filterLIstByKey(menuValues, "UNISWAP", 0));

    !allowShowDevMenus() &&
      setMenuValues(filterLIstByKey(menuValues, "USER", 0));
  }, [isMobile, allowShowDevMenus()]);

  return (
    <div className="comp-menu-main-div">
      <div className="comp-menu-button-container">
        <div
          onMouseLeave={() => setShow(false)}
          ref={ref}
          className="comp-menu-main-div-pools"
        >
          <div className="comp-menu-button-main-div">
            <Icon url={"totem.svg"} width={30} height={30} />
            <div
              className="comp-menu-main-div-pools-button"
              onClick={() => {
                setShow((prev) => !prev);
              }}
            >
              <div className="title">POOLS</div>
              <div
                className={
                  hasTouch() && show
                    ? "arrow-mobile-rotate"
                    : hasTouch()
                    ? "arrow-mobile"
                    : show
                    ? "arrow-rotate"
                    : "arrow"
                }
              >
                {/* <Icon
                  url="keyboard_arrow_down_white_24dp.svg"
                  width={30}
                  height={30}
                /> */}
              </div>
            </div>
          </div>
          <div
            className={
              hasTouch() && show
                ? "comp-menu-main-pools-items-mobile-show"
                : hasTouch()
                ? "comp-menu-main-pools-items-mobile"
                : show
                ? "comp-menu-main-pools-items-show"
                : "comp-menu-main-pools-items"
            }
          >
            {menuValues.map((menuItem, index) => {
              return (
                <div>
                  <MenuButton
                    key={menuValues[index][0]}
                    name={menuValues[index][0]}
                    path={menuValues[index][1]["path"]}
                    onPathChange={(pathName) => {
                      setActivePath(pathName);
                    }}
                    isActive={
                      activePath === menuValues[index][0] && width > 450
                    }
                    isMobile={isMobile}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

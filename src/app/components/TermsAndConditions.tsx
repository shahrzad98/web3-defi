/**
 *
 * Terms And Conditions
 *
 */
import { Checkbox, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { CookieHelper } from "services/cookie-helper";
import "styles/scss/components.scss";
import { DocLoader } from "./DocLoader";

interface Props {}

export const TermsAndConditions = (props: Props) => {
  const cookieHelper = new CookieHelper();
  const value = cookieHelper.read("accept-terms-and-condition");
  const [showDialog, setDialogStatus] = useState(value !== "true");
  const [showTerms, setTermsStatus] = useState(false);
  const [tcChecked, setTCCheckBox] = useState(false);
  const [privacyChecked, setPrivacyCheckBox] = useState(false);
  const [restrictedChecked, setRestrictedCheckBox] = useState(false);
  const [docName, setDocName] = useState("");
  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState(null);

  const handleTermBox = (name) => {
    if (docName === "") {
      setTermsStatus(true);
      setFetched(false);
      setDocName(name);
    } else if (name === docName) {
      setTermsStatus(!showTerms);
    } else {
      setTermsStatus(true);
      setFetched(false);
      setDocName(name);
    }
    // if
    // if (name === docName) {
    //   setTermsStatus(!showTerms);
    // } else {
    //   setFetched(false);
    //   setDocName(name);
    // }
  };

  return (
    <section
      className="terms-and-conditions"
      style={{ display: showDialog ? "block" : "none" }}
    >
      <div className="tac-backdrop"></div>
      <dialog className="tac-dialog" open={showDialog}>
        <div>
          <Checkbox
            checked={tcChecked}
            onClick={() => {
              setTCCheckBox(!tcChecked);
            }}
          />{" "}
          <p
            style={{
              display: "inline-block",
              width: "92%",
              verticalAlign: "text-top",
              color: "white",
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            I accept the{" "}
            <a
              onClick={() => {
                handleTermBox("terms");
              }}
            >
              Terms & Conditions
            </a>
          </p>
        </div>

        <div>
          <Checkbox
            checked={privacyChecked}
            onClick={() => {
              setPrivacyCheckBox(!privacyChecked);
            }}
          />{" "}
          <p
            style={{
              display: "inline-block",
              width: "92%",
              verticalAlign: "text-top",
              color: "white",
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            I accept the{" "}
            <a
              onClick={() => {
                handleTermBox("privacy");
              }}
            >
              Privacy Policy
            </a>
          </p>
        </div>

        <div>
          <Checkbox
            checked={restrictedChecked}
            onClick={() => {
              setRestrictedCheckBox(!restrictedChecked);
            }}
          />{" "}
          <p
            style={{
              display: "inline-block",
              width: "92%",
              verticalAlign: "text-top",
              color: "white",
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            I am not a citizen or resident of a restricted country. I have read
            and understand the{" "}
            <a
              onClick={() => {
                handleTermBox("restricted");
              }}
            >
              TotemFi restricted persons policy
            </a>
          </p>
        </div>
        <p>
          Please note that once registered, you are not be able to change your
          wallet address
        </p>
        <div
          className="tac-items"
          style={{ display: showTerms ? "block" : "none" }}
        >
          <React.Suspense
            fallback={
              <div className="tac-items-loader">
                <CircularProgress size={60} />
              </div>
            }
          >
            <DocLoader
              fetched={fetched}
              name={docName}
              onLoaded={(data) => {
                setFetched(true);
                setData(data);
              }}
            >
              <div className="tac-items-content">{ReactHtmlParser(data)}</div>
            </DocLoader>
          </React.Suspense>
        </div>
        <div className="tac-actions">
          <button
            disabled={!(tcChecked && privacyChecked && restrictedChecked)}
            onClick={() => {
              cookieHelper.insert("accept-terms-and-condition", "true");
              setDialogStatus(false);
            }}
          >
            OK
          </button>
        </div>
      </dialog>
    </section>
  );
};

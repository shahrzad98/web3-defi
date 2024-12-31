import * as React from "react";
import { Helmet } from "react-helmet-async";
import "styles/scss/components.scss";

export const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <div className="comp-not-found-page-wrapper">
        <div className="comp-not-found-page-title">
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </div>
        <p className="comp-not-found-page-para">Page not found.</p>
      </div>
    </>
  );
};

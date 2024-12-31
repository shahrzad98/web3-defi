import ReactGA from "react-ga";
// import TagManager from 'react-gtm-module'
export function ReactGAM() {
  const GoogleAnalyticsMeasurementCode = process.env.REACT_APP_GA_ID; // equivalence to Tracking ID

  const init = () => {
    // const tagManagerArgs = {
    //   gtmId: GoogleAnalyticsMeasurementCode
    // }
    // TagManager.initialize(tagManagerArgs)
    ReactGA.initialize(GoogleAnalyticsMeasurementCode, {
      debug: process.env.NODE_ENV == "development" ? true : false,
      titleCase: false,
    });
  };

  const trackPageView = (path) => {
    ReactGA.pageview(path);
  };

  const trackModalView = (modal) => {
    ReactGA.modalview(modal);
  };

  const trackEvent = (
    category,
    action,
    actionLabel = "none",
    describerValue: number = 0,
    nonInteraction = false
  ) => {
    ReactGA.event({
      category,
      action,
      label: actionLabel,
      value: describerValue,
      nonInteraction,
    });
  };

  // for dev purpose and load/performance measures
  const trackTiming = (categoryName, variableName, valueNum) => {
    ReactGA.timing({
      category: categoryName,
      variable: variableName,
      value: valueNum,
    });
  };

  return {
    init,
    trackPageView,
    trackModalView,
    trackEvent,
    trackTiming,
  };
}

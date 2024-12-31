const getHotJarInfo = () => {
  if (!window) {
    return [null, null];
  }
  const href = window?.location?.href;
  const isOnDev =
    href.includes("staging.totemfi") || href.includes("localhost")
      ? true
      : false;
  const [hjid, hjsv] = isOnDev ? [2622231, 6] : [2621821, 6];

  return [hjid, hjsv];
};
export default getHotJarInfo;

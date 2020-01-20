const getUrlHostname = (url: string) =>
  new URL(url).hostname.replace("www.", "");

export default getUrlHostname;

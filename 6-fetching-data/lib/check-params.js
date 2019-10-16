import parse from 'url-parse';


const getParsedObjByUrl = ({
  query,
  forParamsOnly = null, // Optional (Array)
}) => {
  if (!query) return null;

  const result = {};
  let normalizedQuery = query;

  if (query[0] === '?') {
    normalizedQuery = query.substr(1);
  }

  const paramsFromQuery = normalizedQuery.split('&');

  for (let i = 0; i < paramsFromQuery.length; i++) {
    if (paramsFromQuery[i].includes('=')) {
      const keyValue = paramsFromQuery[i].split('=');

      if (keyValue.length === 2) {
        if (forParamsOnly && Array.isArray(forParamsOnly)) {
          if (forParamsOnly.includes(keyValue[0])) {
            result[keyValue[0]] = decodeURIComponent(keyValue[1]);
          }
        } else {
          result[keyValue[0]] = decodeURIComponent(keyValue[1]);
        }
      }
    }
  }

  return Object.keys(result).length ? result : null;
};


export const checkRequiredParams = ({
  requiredParams = null,
  url
}) => {
  if (!requiredParams || !url) {
    return false;
  }

  const parsedURL = parse(url);

  /* FOR EXAMPLE:
  console.log(parsedURL);

  {
    slashes: false,
    protocol: '',
    hash: '',
    query: '?sw_lat=55.632047273941765&sw_long=37.58110263154549&ne_lat=55.7981745658307&ne_long=38.04424502656502',
    pathname: '/',
    auth: '',
    host: '',
    port: '',
    hostname: '',
    password: '',
    username: '',
    origin: 'null',
    href: '/?sw_lat=55.632047273941765&sw_long=37.58110263154549&ne_lat=55.7981745658307&ne_long=38.04424502656502'
  }
  */

  const parsedParams = getParsedObjByUrl({
    query: parsedURL.query,
    forParamsOnly: requiredParams,
  });

  if (!parsedParams) return false;

  if (Object.keys(parsedParams).length === requiredParams.length) return true;

  return false;
};

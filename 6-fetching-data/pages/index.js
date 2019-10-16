import Layout from '../components/MyLayout.js';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import FormData from 'form-data';
import { checkRequiredParams } from '../lib/check-params';

const Index = ({ data }) => (
  <Layout>
    <h1>Uremont geo-search</h1>
    {
      data
      ? (
        <ul>
          {Object.keys(data).map((k, i) => (
            <li key={i}>
              <strong>{k}</strong> <span>{JSON.stringify(data[k])}</span>
            </li>
          ))}
        </ul>
      ) : 'Not received yet...'
    }
  </Layout>
);

Index.getInitialProps = async function(context) {
  if ((!context || !context.req) && !context.asPath) {
    return {};
  }

  // /?sw_lat=55.632047273941765&sw_long=37.58110263154549&ne_lat=55.7981745658307&ne_long=38.04424502656502
  const requiredParams = ['sw_lat', 'sw_long', 'ne_lat', 'ne_long'];

  if (
    !Object.keys(context.query).length
    || !(() => {
      // v1
      // const results = requiredParams.map(f => {
      //   return Object.keys(context.query).includes(f);
      // });

      // return !results.includes(false);

      // v2
      // console.log(context.req.url);
      return checkRequiredParams({
        requiredParams,
        url: context && context.req ? context.req.url : context.asPath,
      });
    })()
  ) {
    return {};
  }
  const { sw_lat, sw_long, ne_lat, ne_long } = context.query;
  const body = new FormData();

  for (let i = 0; i < requiredParams.length; i++) {
    body.append(requiredParams[i], context.query[requiredParams[i]]);
  }

  const res = await fetch(
    'https://api-frontend.uservice.io/map/default/geo-search/',
    {
      method: 'POST',
      body,
    }
  );
  const data = await res.json();

  return { data };
};

export default Index;

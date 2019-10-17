export default async function loadDb() {
  const firebase = await import('firebase/app');
  await import('firebase/database');
  // Firebase will be loaded from static/chunks/[rand-str].js once.
  /*
    As you have witnessed, it only loads when you navigate a page for the first
    time. Here is what is actually happening.

    At the first time, the getInitialProps in the page pages/p/[id].js imports
    the firebase/app and firebase/database modules (via lib/load-db.js). So,
    the app loads the bundle.

    The second time, the page pages/index.js imports the firebase/app and
    firebase/database modules. But at that time, they are already loaded and
    there is no reason to load them again.
  */

  try {
    firebase.initializeApp({
      databaseURL: 'https://hacker-news.firebaseio.com'
    });
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }

  return firebase.database().ref('v0');
}

import { getGlobalData } from '../api/globalData';
import { getLayoutData } from '../api/layoutData';
import { defaultLang } from '../modules/_helpers';

export default async function getPageDataMiddleware({ route, redirect, store, isClient }) {
  if (isClient) return;

  const { params: { lang } } = route;
  const incorrectLang = lang && lang.length > 2;

  // the language in route is wrong, instant redirect
  if (incorrectLang) return redirect('/error');

  try {
    // get page and layout data
    const [globalData, { layoutData }] = await Promise.all([
      getGlobalData({ route, webp: store.getters.webpIsSupported }),
      getLayoutData(lang)
    ]);

    // update global store data
    store.dispatch('updateGlobalData', { ...globalData, layoutData });

    // set default language
    store.dispatch('setDefaultLanguage', layoutData.defaultLanguage);

    // set current language
    store.dispatch('setLanguage', lang || defaultLang);
  } catch (e) {
    // set default language (fallback)
    store.dispatch('setDefaultLanguage', defaultLang);

    // log error
    console.log(`${e.message}. Redirecting...`);

    // redirect to 404 page
    redirect('/error');
  }
}

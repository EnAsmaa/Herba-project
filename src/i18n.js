import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enHome from "./locales/en/home-translation.json";
import enHerbs from "./locales/en/herbs-translation.json";
import enShop from "./locales/en/shop-translation.json";

import arHome from "./locales/ar/home-translation.json";
import arHerbs from "./locales/ar/home-translation.json";
import arShop from "./locales/ar/shop-translation.json";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            home: enHome,
            herbss: enHerbs,
            shop: enShop,
        },
        ar: {
            home: arHome,
            herbs: arHerbs,
            shop: arShop,
        },
    },

    lng: "en",
    fallbackLng: "en",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
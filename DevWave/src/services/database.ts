import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { TRENDING_ARTICLE } from '../schemas/articles';
import { getDatabase, set, ref, get } from 'firebase/database';

const serviceAccount = require('../../dev-wave-faa5889a5532.json');

const app = initializeApp({
    // credential: cert(serviceAccount),
    // databaseURL: process.env.FIREBASE_DATABASE_URL
    // credential: applicationDefault()
    apiKey: "AIzaSyB5WDK5hl8kLJJYQsPfifyO-R-Jr60MVNc",
    authDomain: "dev-wave.firebaseapp.com",
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: "dev-wave",
    storageBucket: "dev-wave.appspot.com",
    messagingSenderId: "595249149796",
    appId: "1:595249149796:web:dc801a7fdadb8309ca6c71",
    measurementId: "G-890NC9HTZ1"
});

const db = getDatabase(app);
// if (process.env.NODE_ENV !== 'production') {
    // connectDatabaseEmulator(db, 'localhost', 9000);
// }

const storeTrendingArticle = async (data: TRENDING_ARTICLE) => {
    const _result = await set(
        ref(
            db, 
            `trending_articles/${data.id}`
        ), 
        data
    );

    return _result;
}

const getTrendingArticles = async () => {
    const _result = await get(
        ref(
            db, 
            `trending_articles`
        )
    ).then((snapshot) => {
        let value = snapshot.val();
        let titles = [];
        for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                const article: TRENDING_ARTICLE = value[key];
                titles.push(article.title);
            }
        }

        // console.log("titles: ", Array.from( new Set(titles)));
        return Array.from( new Set(titles));
    })

    return _result;
}

export const DATABASE = {
    storeTrendingArticle,
    getTrendingArticles
}

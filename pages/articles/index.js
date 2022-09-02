import Layout from '../../components/layout';
import { getArticles } from '../../models/article.js';
import Link from "next/link";
import moment from "moment";

export default function Article({articles, date}) {
    return <Layout pageTitle='Articles'>
        <p>This page was generated on: {date}</p>
        <h1>Articles</h1>
        {articles.map(({id, title}) => {
            const href= '/articles/' + id;
            return <li key={id}>
                <Link href={href}>
                    <a href={href}>
                        {title}
                    </a>
                </Link>
            </li>
            }
        )}
    </Layout>;
}

export async function getStaticProps() {
    const date = moment().format("YYYY-MM-DD - HH:mm:ss");
    const articles = await getArticles(0, 5);
    return {
        props: {
            articles,
            date
        }
    };
}

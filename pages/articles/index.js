import Layout from '../../components/layout';
import { getArticles, getSingleArticle } from '../../models/article.js';
import Link from "next/link";

export default function Article({articles}) {
    return <Layout pageTitle='Articles'>
        {articles.map(({id, title}) => {
            const href= 'articles/' + id;
            return <li key={id}>
                <Link href={href}>{title}</Link>
            </li>
            }

        )}
    </Layout>;
}

export async function getStaticProps() {
    const articles = await getArticles(0, 5);
    return {
        props: {
            articles
        }
    };
}

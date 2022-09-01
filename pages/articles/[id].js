import {getArticles, getSingleArticle} from '../../models/article.js';
import Layout from "../../components/Layout";
import Image from "next/image";
import moment from "moment";
import {useRouter} from "next/router";

export default function ArticleDetails({postData, date}) {
    const router = useRouter();
    return (
        <Layout pageTitle={router.isFallback ? 'loading..' : postData.title }>
            <h1>{postData.title}</h1>
            <p>This page was last updated on {date}</p>
            <Image
                src={postData.pictureUrl}
                height={400}
                width={600}
            />
            <p>{postData.body}</p>
        </Layout>
    )
}

export async function getStaticProps({params}) {
    const date = moment().format("YYYY-MM-DD at HH:mm:ss")
    const postData = await getSingleArticle(params.id);
    return {
        props: {
            postData,
            date
        },
    };
}

export async function getStaticPaths() {
    const articles = await getArticles(0, 3)
    const paths = articles.map((article) => ({params: {id: article.id.toString()}}));
    return {
        paths,
        fallback: true,
    };
}
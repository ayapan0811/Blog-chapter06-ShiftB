import { useParams } from "react-router-dom";
import {posts} from "../../data/posts";
import { Link } from "react-router-dom";


function Page (){
    const {id} = useParams();
    const post = posts.find(
      (item) => item.id === Number(id)
    );
    return(
      <div>
        <img src={post.thumbnailUrl} alt={post.title} width="500"/>
        <div className='flex gap-5 pb-2'>
          <p>
            {new Date(post.createdAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric"
            })}
          </p>
          <p>{post.categories.join(" / ")}</p>
        </div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <Link to="/"className="inline-block bg-black text-white px-4 py-2">
          記事一覧に戻る
        </Link>
      </div>
    )
}

export default Page
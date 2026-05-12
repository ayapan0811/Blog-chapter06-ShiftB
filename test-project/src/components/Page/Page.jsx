import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Page (){
  const {id} = useParams();
  const [post, setPost] = useState(null);
    //post = null（空っぽ） 最初はデータがまだ来てないから
    //「後でデータ入れるよ」という宣言

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
      const data = await res.json();
      setPost(data.post);
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>記事が見つかりません</p>;
  }

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
        <Link to="/" className="inline-block bg-black text-white px-4 py-2">
          記事一覧に戻る
        </Link>
      </div>
    )
}

export default Page
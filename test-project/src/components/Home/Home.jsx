import React from "react";
import { posts } from "../../data/posts";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      <main className="bg-white text-black max-w-4xl mx-auto">
        <h2 className="text-2xl">記事一覧</h2>
          {posts.map((post)=>(
            <Link key={post.id} to={`/posts/${post.id}`} className='flex gap-4 border-b py-5'>
              <img
                src={post.thumbnailUrl}
                alt={post.title}
                width="300"
                />
              <div className='pb-2'>
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
              <h3 className="font-medium">{post.title}</h3>
              <p>{post.content}</p>
              </div>
           </Link>
          ))}
      </main>

    </div>
)}

export default Home

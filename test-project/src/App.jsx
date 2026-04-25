import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { posts } from './data/posts'
import Header from './components/Header'

function App() {
  return (
    <div>
      <Header />

      <main className="bg-white text-black max-w-4xl mx-auto">
    <h2>記事一覧</h2>
    {posts.map((post)=>(
      <div key={post.id} className='flex gap-4 border-b py-5'>
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
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>

      </div>
    ))}
  </main>

    </div>

)}

export default App

'use client';

import { User } from "@prisma/client";
import { useSession, getSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function ClientPage() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);  


  useEffect(() => {  
    async function fetchPosts() {  
      const response = await fetch(`/api/user/${session?.user?.id || 0}`,{ headers: {'Content-Type':'application/json','authorization':session?.user?.accessToken||''}});  
      const data = await response.json();  
      setPosts(data);  
    } 
    if(session) 
    fetchPosts();  
  }, [session, posts]);  
  if (status === "loading") {
    return <section><p>Loading...</p></section>
  }

  if (status === "unauthenticated") {
    return <section><p>Access Denied</p></section>
  }
  return (
    <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <p>This is a secured page</p>
        </div>
        <ul>  
        {session? ( posts && posts.map(post => (  
          <li key={post.id}>{post.title}|{post.content}|({post.authorId})</li>  
        ))) : <li></li>}  
      </ul>  
    </section>
  )
}

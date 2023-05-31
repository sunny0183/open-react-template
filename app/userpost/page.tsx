'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";


  
  export default async function upserpostpage() {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

    //let posts =[];
    if(session?.user){
      const res = await fetch(`/api/user/${session.user.id}`,{
        headers: {
          "Authorization": session.user.accessToken,
          "Content-Type": "application/json",
        }
      });
      const resData = await res.json();
      setPosts(resData);
    }
    console.log(posts);
    return (
        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
            <p>This is a secured page</p>
          </div>
        </section>
    )
  }
  
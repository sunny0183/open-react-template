import Link from "next/link";
import Image from "next/image";

interface BlogPost {  
  userId: number;
  id:number;
  title: string;  
  body: string;
  img:string;
} 


async function getData(): Promise<BlogPost[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

const blog = async () => {
  const data = await getData();
  return (
    <div className=''>
      {data.map((item) => (
        
        <Link href={`/blog/${item.id}`} className='' key={item.id}>
          <div className=''>
            <Image
              src="https://via.placeholder.com/600/b0f7cc"
              alt=""
              width={400}
              height={250}
              className=''
            />
          </div>
          <div className=''>
            <h1 className=''>{item.title}</h1>
            <p className=''>{item.body}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
export default blog;
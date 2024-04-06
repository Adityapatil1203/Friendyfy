import React, { useEffect, useState } from 'react'
import classes from './posts.module.css'
import { useSelector } from 'react-redux'
import Post from '../post/Post'

const Posts = () => {
  const [posts,setPosts] = useState([])
  const {token} = useSelector((state)=>state.auth)

  useEffect(() => {
   const fetchPosts = async ()=>{
    try {
       const res = await fetch('https://friendyfy.onrender.com/post/timeline/posts',{
        headers:{
          'Authorization':`${token}`
        }
       })

      if (!res.ok) {
        throw new Error('Failed to fetch timeline posts');
    }
      
       const data = await res.json()
       console.log("mi data ahe ",data)
      setPosts(data)

    } catch (error) {
      console.error(error)
    }
   }

   fetchPosts()
  }, [])
  
  return (
    <div className={classes.container}>
      {console.log("mi post ahe ",posts)
      }
      {
        console.log(typeof posts)
      }
    {Array.isArray(posts) && posts && posts?.map((post) => (
      <Post key={post._id} post={post} />
    ))}
  </div>
  )
}

export default Posts

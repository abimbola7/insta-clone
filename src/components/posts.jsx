import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import Post from "./post";



// const posts = [
//   {
//     id :123,
//     username : "abimbola",
//     user_img : "https://links.papareact.com/3ke",
//     img : "https://links.papareact.com/3ke",
//     caption : "this isn't dope",

//   },
//   {
//     id :123,
//     username : "abimbola",
//     user_img : "https://links.papareact.com/3ke",
//     img : "https://links.papareact.com/3ke",
//     caption : "this isn't dope lorem ipsum blah blah, i hate this world fuck everyone"

//   },
// ]

const Posts = () => {
  const [ posts, setPosts ] = React.useState([])
  React.useEffect(
    ()=>
    onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
      setPosts(snapshot.docs)
    })
    , [db])

    console.log(posts);
  return (
    <div>
      {
        posts.map(post=>(
          <Post 
          key={post.id} 
          id={post.id} 
          username={post.data().username} 
          userImg={post.data().profileImg} 
          img={post.data().image} 
          caption={post.data().caption} />
        ))
      }
    </div>
  )
}

export default Posts
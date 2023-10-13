import React from 'react'
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { PiPaperPlane } from "react-icons/pi";
import { BsBookmark, BsChatDots } from "react-icons/bs";
import { GoSmiley } from "react-icons/go"
import { useSession } from 'next-auth/react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Moment from 'react-moment';

export default function Post({ id, username, userImg, img, caption }) {
  const { data } = useSession();
  const [ comments, setComments ] = React.useState([]);
  const [ comment, setComment ] = React.useState('');
  const [ likes, setLikes ] = React.useState([]);
  const [ hasLiked, setHasLiked ] = React.useState(false);

  React.useEffect(
    ()=> onSnapshot(
          query(
            collection(db, 'posts', id, 'comments'), 
            orderBy('timestamp', 'desc')), 
            snapshot => setComments(snapshot.docs))
    , [db, id])

  React.useEffect(
    ()=> onSnapshot(
            collection(db, 'posts', id, 'likes'), 
            snapshot => setLikes(snapshot.docs))
    , [db,id])


  React.useEffect(()=>
    setHasLiked(likes.findIndex(like => like.id === data?.user?.uid) !== -1
    ), [ likes ])

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', data.user.uid))
    } else{
      await setDoc(doc(db, 'posts', id, 'likes', data.user.uid), {
        username : data.user.username
      })
    }
  }
  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'posts', id, 'comments'),{
      comment : commentToSend,
      username : data.user.username,
      userImage : data.user.image,
      timestamp : serverTimestamp()
    })

  }
  return (
    <div className="my-5 bg-white border rounded-sm">
      <div
      className='flex items-center p-5'
      >
        <img src={userImg} alt="user" className="w-12 h-12 object-contain p-1 border rounded-full flex-shrink-0"/>
        <p className='flex-1 ml-3'>{username}</p>
        <BiDotsHorizontalRounded  className='text-2xl cursor-pointer'/>
      </div>
      {/* image */}
      <img className='object-cover w-full' src={img} alt="img"/>

      {
        data &&
        <div className="flex justify-between items-center px-4 pt-4">
          <div className="flex space-x-4">
            {
              hasLiked ? 
              <AiFillHeart onClick={likePost} className="text-red-500 icons"/> : 
              <AiOutlineHeart onClick={likePost} className='icons' />
            }
            <BsChatDots className="icons"/>
            <PiPaperPlane className="icons" />
          </div>
          <BsBookmark className="icons"/>
        </div>
      }

      {/* caption */}
      <p className='p-5 truncate'>
          {
            likes.length > 0 && (
              <p className="font-bold mb-1">{likes.length} likes</p>
            )
          }
          <span className='mr-1 font-bold'>{username}</span>
          { caption }
      </p>

      {/* comments */}
      {
        comments.length > 0 && (
          <div
          className='ml-10 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-black'
          >
            {
              comments.map(comment => (
                <div
                key={comment.id}
                className="flex items-center space-x-2 mb-3"
                >
                  <img 
                  className="h-7 rounded-full flex-shrink-0"
                  src={comment.data().userImage} 
                  alt="user"
                  />
                  <p className='text-sm flex-1 '>
                    <span className='font-bold'>{ comment.data().username }</span>{' '}
                    {comment.data().comment}
                  </p>
                  <Moment
                  fromNow
                  className='pr-5 text-xs'
                  >
                    { 
                      comment.data().timestamp?.toDate().getTime()
                     }
                  </Moment>
                </div>
              ))
            }
          </div>
        )
      }

      {/* inputbox */}
      {
        data &&
        <form
        onSubmit={sendComment}
        className='flex items-center pt-4 px-4'
        >
          <GoSmiley className="text-3xl flex-shrink-0"/>
          <input 
          value={comment}
          type="text" 
          onChange={(e)=>setComment(e.target.value)}
          placeholder='Add a comment...'
          className='flex-1 focus:outline-none border-none focus:ring-0'
          />
          <button
          type='submit'
          disabled={!comment.trim()}
           className='text-blue-400 font-semibold'>Post</button>
        </form>
      }
    </div>
  )
}

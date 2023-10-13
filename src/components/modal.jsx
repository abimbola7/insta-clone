"use client"
import React, { Fragment } from 'react'
import { modalAtom } from '@/atoms/modal-atom';
import { useRecoilState } from 'recoil';
import { Dialog, Transition } from "@headlessui/react"
import { AiOutlineCamera } from 'react-icons/ai';
import { db, storage } from '../../firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';


export default function Modal() {
  const { data } = useSession()
  console.log(data?.user)
  const filePickerRef = React.useRef(null);
  const captionRef = React.useRef(null);
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ open, setOpen ] = useRecoilState(modalAtom)
  const [ loading, setLoading ] = React.useState(false);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  };

  const uploadToFirebase = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), { 
      username: data.user.username,
      caption : captionRef.current.value,
      profileImg : data.user.image,
      timestamp : serverTimestamp()
     })

     console.log("New doc added with id: ", docRef);

     const imageRef = ref(storage, `posts/${docRef.id}/image`);
     
     await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, 'posts', docRef.id), {
        image : downloadURL
      })
     })

     setOpen(false);
     setLoading(false);
     setSelectedFile(null);
  }
  return (
    <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div>
                    {
                      selectedFile ? (
                        <img 
                        onClick={()=>setSelectedFile(null)}
                        src={selectedFile} 
                        alt="" 
                        className='w-full object-contain cursor-pointetr' />
                      ) : (
                          <div
                          onClick={()=>filePickerRef.current.click()}
                          className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-200 cursor-pointer "
                          >
                            <AiOutlineCamera className="text-2xl" />
                          </div>
                      )
                    }
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Upload a Picture
                    </Dialog.Title>
                    <div className="mt-2">
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <div className="mt-2">
                      <input 
                      ref={captionRef}
                      type="text"
                      className="border-none w-full focus:ring-2 text-center"
                      placeholder="Please enter a caption"
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        disabled={!selectedFile}
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:disabled:bg-gray-300"
                        onClick={uploadToFirebase}
                      >
                        {loading ? 'Uploading...' : 'Upload Post'}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
  )
}

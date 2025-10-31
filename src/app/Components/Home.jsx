'use client'
import React, { useRef, useState } from 'react'

export default function Home() {

  const [selectedFile, setSelectedFile] = useState('');
  const fileInputRef = useRef();

  function handleFileChange(e) {
    console.log('Inside fileChange');
    console.log("Uploaded File", e.target.files[0]);
    setSelectedFile(e.target.files[0]);

  }

  async function handleOnSubmit(e) {
    // console.log("Inside submit button handler");
    e.preventDefault();

    const formData = new FormData();
    // console.log("Initial Form Data Object=", formData);
    formData.append("Username", "Rohit");
    formData.append('file', selectedFile);

    // formData.forEach((value, key) => {
    //   console.log(key, "=", value);
    // });
    fileInputRef.current.value = null;
    setSelectedFile(null);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    console.log('Data sent',response);
    




  }




  return (
    <>
      <div className='container mx-auto h-100 mt-20 border-2'>
        <form action="" className='flex justify-center items-center gap-2 border-2'>
          <input
            type="file"
            ref={fileInputRef}
            accept=".png, .jpeg, .pdf, .txt"
            onChange={handleFileChange}
            className='border  p-4 cursor-pointer'
          />
          <button
            type="submit"
            onClick={handleOnSubmit}
            className='p-2 rounded-sm bg-emerald-700 text-white cursor-pointer'
          >
            Upload file
          </button>
        </form>
      </div>
    </>
  )
}

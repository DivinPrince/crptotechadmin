'use client'
import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import ImageUpload from './ImageUpload'
import Upload from './Upload'

export default function ProductForm() {
  const [file, setFile] = useState('')


  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)
      const res = await axios.post('/product/upload', data)

    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
  }
console.log(file);

  return <>
      <form onSubmit={onsubmit}>
        <Upload onChange={(url) => { setFile(url)}} onRemove={()=>{setFile('')}} value={file}/>
        <textarea name="description" cols={50} rows={5}></textarea>
        <select name="related" id="">
            <option value="books">Books</option>
            <option value="books">Books</option>
            <option value="books">Books</option>
            <option value="books">Books</option>
            <option value="books">Books</option>
            <option value="books">Books</option>
            <option value="books">Books</option>
        </select>
        
        <input type="text" className='name' placeholder='Name' />
        <div className='price-div'>
            <input type="number" className='price' placeholder='Price' />
            <span>Rwf</span>
        </div>
        <input type="number" className='stoke' placeholder='stoke' />
        <input type="submit" value="Upload" />
      </form>
  </>
}
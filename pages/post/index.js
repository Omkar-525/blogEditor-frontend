import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'isomorphic-dompurify';
import Nav from '@/components/nav';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Post = () =>{
    const [content, setContent] = useState('');
    const [displayedContent, setDisplayedContent] = useState('');
    const quillRef = useRef(null);
    const clean = DOMPurify.sanitize(displayedContent);

    useEffect(() => {
      const savedContent = localStorage.getItem('markdownContent');
      if (savedContent) {
          setContent(savedContent);
      }
  }, []);
  
    const handleImageUpload = async (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        const imgTag = `<img src="${dataUrl}" alt="${file.name}" />`;
        insertImage(imgTag);
      };
      reader.readAsDataURL(file);
    };
  
    const insertImage = (imgTag) => {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      quill.clipboard.dangerouslyPasteHTML(range.index, imgTag);
    };

    const handleShowData = () => {
      const savedContent = localStorage.getItem('markdownContent');
      setDisplayedContent(savedContent);
  };
  
    const modules = {
      toolbar: {
        container: [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ 'size': [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean']
        ]
      }
    };
  
    const saveContentToLocalStorage = () => {
      localStorage.setItem('markdownContent', content);
    };
    
    const handleSave = () => {
        // Save Markdown content to localStorage
        localStorage.setItem('markdownContent', content);
        // Trigger page refresh
        window.location.reload();
      };


    return(
        <div>
        <Nav />
        {typeof window !== 'undefined' && (
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              onBlur={saveContentToLocalStorage}
              ref={quillRef} // Assign ref to the Quill component
            />
          )}
          <button onClick={handleSave}>Save</button>
          <button onClick={handleShowData}>Show Data</button>
          {displayedContent && (
              <div>
                  <h2>Displayed Content:</h2>
                  <pre><div dangerouslySetInnerHTML={{__html: content}} /></pre>
              </div>
          )}
        </div>
    )

}

export default Post;

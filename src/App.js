// import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './Components/ImageGallery/ImageGallery';

export default function App() {
  return (
    <div>
      <ToastContainer autoClose={3000} />
      <ImageGallery />
    </div>
  );
}

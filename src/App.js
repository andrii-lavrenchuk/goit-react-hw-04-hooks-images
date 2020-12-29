import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './Components/ImageGallery/ImageGallery';

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer autoClose={3000} />
        <ImageGallery />
      </div>
    );
  }
}

export default App;

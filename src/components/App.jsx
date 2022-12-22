// import React, { Component } from 'react';
import {useState, useEffect} from 'react';
import { fetchImages } from './api/api';
import  Searchbar from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';


export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [per_page, setPer_page] = useState(12)
  const [isLoading, setIsLoading] = useState(false)
  const [loadMore, setLoadMore] = useState(false)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [largeImageURL, setLargeImageURL] = useState('largeImageURL')
  const [id, setId] = useState(null)

  useEffect(() => {
    getImages(searchQuery, page);
  }, [searchQuery, page])

const getImages = async (query, page) => {
    setIsLoading({ isLoading: true });
    if (!query) {
      return;
    }
    try {
      const { hits, totalHits} = await fetchImages(query, page);
      this.setState(prevState => ({
        images: [...hits, ...prevState.images ],
        loadMore: this.state.page< Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  const formSubmit = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      loadMore: false,
    });
  };

  const onloadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };


  const openModal = largeImageURL => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };

 const closeModal = () => {
    this.setState({
      showModal: false,
    });
  };


  return (
      <>
        <Searchbar onSubmit={this.formSubmit} />
        
        {isLoading ? (<Loader />) : (<ImageGallery images={images} openModal={this.openModal} />)}

        {loadMore && <Button onloadMore={this.onloadMore} />}

        {showModal && (<Modal largeImageURL={largeImageURL} onClose={this.closeModal} />)}
      </>
    );
}




// class App extends Component {
//   state = {
//     searchQuery: '',
//     images: [],
//     page: 1,
//     per_page: 12,
//     isLoading: false,
//     loadMore: false,
//     error: null,
//     showModal: false,
//     largeImageURL: 'largeImageURL',
//     id: null,
//   };

//   componentDidUpdate(_, prevState) {
//     const { searchQuery, page } = this.state;
//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       this.getImages(searchQuery, page);
//     }
//   }

//   getImages = async (query, page) => {
//     this.setState({ isLoading: true });
//     if (!query) {
//       return;
//     }
//     try {
//       const { hits, totalHits} = await fetchImages(query, page);
//       this.setState(prevState => ({
//         images: [...hits, ...prevState.images ],
//         loadMore: this.state.page< Math.ceil(totalHits / this.state.per_page),
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   formSubmit = searchQuery => {
//     this.setState({
//       searchQuery,
//       images: [],
//       page: 1,
//       loadMore: false,
//     });
//   };

//   onloadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };


//   openModal = largeImageURL => {
//     this.setState({
//       showModal: true,
//       largeImageURL: largeImageURL,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       showModal: false,
//     });
//   };

//   render() {
//     const { images, isLoading, loadMore, showModal, largeImageURL} = this.state;

//     return (
//       <>
//         <Searchbar onSubmit={this.formSubmit} />
        
//         {isLoading ? (<Loader />) : (<ImageGallery images={images} openModal={this.openModal} />)}

//         {loadMore && <Button onloadMore={this.onloadMore} />}

//         {showModal && (<Modal largeImageURL={largeImageURL} onClose={this.closeModal} />)}
//       </>
//     );
//   }
// }

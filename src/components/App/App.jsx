import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getImagesAPI } from 'services/api';
import { normalizeHits } from 'utils/normalizeHits';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Searchbar } from 'components/Searchbar';
import { Loader } from 'components/Loader';
import { AppWrapper, Error } from './App.styled';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  abortCtrl;

  state = {
    images: [],
    query: '',
    currentPage: 1,
    error: null,
    isLoading: false,
    isLastPage: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { query, currentPage } = this.state;

    if (this.abortCtrl) {
      this.abortCtrl.abort();
    }

    this.abortCtrl = new AbortController();

    try {
      this.setState({ isLoading: true });

      const data = await getImagesAPI(
        query,
        currentPage,
        this.abortCtrl.signal
      );

      if (data.hits.length === 0) {
        return toast.info('Sorry, no images for your query...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (currentPage === 1) {
        toast.success('Wow! We found some images for you!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.success('Wow! We found some more images for you!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      const normalizedHits = normalizeHits(data.hits);

      this.setState(prevState => ({
        images: [...prevState.images, ...normalizedHits],
        isLastPage:
          prevState.images.length + normalizedHits.length >= data.totalHits,
        error: null,
      }));
    } catch (error) {
      if (error.code !== 'ERR_CANCELED') {
        this.setState({ error: error.message });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = query => {
    if (this.state.query === query) {
      return;
    }

    this.setState({
      query,
      currentPage: 1,
      images: [],
      error: null,
      isLastPage: false,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { images, isLoading, error, isLastPage } = this.state;

    return (
      <AppWrapper>
        <ToastContainer autoClose={2500} />
        <Searchbar onSubmit={this.handleSearchSubmit} />

        {error && <Error>Error: {error}</Error>}

        <ImageGallery images={images} />

        {isLoading && <Loader />}

        {!isLoading && images.length > 0 && !isLastPage && (
          <Button onClick={this.loadMore} />
        )}
      </AppWrapper>
    );
  }
}

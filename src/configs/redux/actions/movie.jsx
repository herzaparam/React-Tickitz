import Axios from 'axios';

const loadingMovie = () => {
  return { type: 'LOADING_MOVIE' };
};

export const getMovie = () => {
  return (dispatch) => {
    dispatch(loadingMovie());
    Axios.get(`${process.env.REACT_APP_API_TICKITZ}movies/all-movies`)
      .then((res) => {
        const dataMovie = res.data.data;
        dispatch({ type: 'GET_ALL_MOVIE', payload: dataMovie });
      })
      .catch((err) => {
        console.log(err.response);
      });
    Axios.get(
      `${process.env.REACT_APP_GET_MOVIE_FREE_API}/now_playing?api_key=${process.env.REACT_APP_API_KEY}&region=ID`
    )
      .then((res) => {
        const dataMovie = res.data.results;
        dispatch({ type: 'GET_NOW_MOVIE', payload: dataMovie });
      })
      .catch((err) => {
        console.log(err.response);
      });
    Axios.get(
      `${process.env.REACT_APP_GET_MOVIE_FREE_API}/upcoming?api_key=${process.env.REACT_APP_API_KEY}&region=ID`
    )
      .then((res) => {
        const dataMovie = res.data.results;
        dispatch({ type: 'GET_UP_MOVIE', payload: dataMovie });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

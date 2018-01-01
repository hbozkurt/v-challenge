import axios from 'axios';

function getSearchFn() {
  const apiBaseUrl = 'http://localhost:3000';
  let source = null;

  return function search(keyword) {
    if (source) {
      source.cancel();
    }

    const url = `${apiBaseUrl}/search/quick?keyword=${keyword}`;
    source = axios.CancelToken.source();

    return axios.get(url, { cancelToken: source.token })
      .then((resp) => {
        source = null;
        return resp.data;
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          throw err;
        }
      });
  };
}

const Api = { search: getSearchFn() };

export default Api;

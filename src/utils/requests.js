const fetchAsync = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(new Error(e.message));
    console.log('Something went wrong!');
  }
};

const wrapFetchAsync = (url, func) => {
  fetchAsync(url).then(data => {
    func(data);
  });
};

export default wrapFetchAsync;

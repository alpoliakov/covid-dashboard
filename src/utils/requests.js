// import axios from 'axios';

const fetchAsync = async url => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: [
        ['Content-Type', 'application/json'],
        ['Content-Type', 'text/plain'],
      ],
      credentials: 'include',
      // body: json().parse,
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(`Failed to fetch countries: ${e.message}`, e);
  }
};

const wrapFetchAsync = (url, func) => {
  fetchAsync(url).then(data => {
    func(data);
  });
};

export default wrapFetchAsync;

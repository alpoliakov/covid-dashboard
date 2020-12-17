const fetchAsync = async url => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      redirect: 'follow',
      cache: 'default',
      referrerPolicy: 'no-referrer',
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(`Failed to fetch countries: ${e.message}`, e);
  }
};

const wrapFetchAsync = (url, func, key) => {
  fetchAsync(url).then(data => {
    func(data, key);
  });
};

export default wrapFetchAsync;

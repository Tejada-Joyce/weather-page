import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [weather, setWeather] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // useEffect is used to run function after every render
  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the weather for that resource");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWeather(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });
    return () => abortCont.abort();
  }, [url]);

  return { weather, isPending, error };
};

export default useFetch;

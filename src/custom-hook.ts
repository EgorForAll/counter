import { useState, useEffect, useRef } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://zont-online.ru/api/";
const URL = "/button_count";
const HEADERS = {
  headers: {
    "X-ZONT-Client": "eia.web.ss@gmail.com",
    "Content-Type": "application/json",
  },
};

const useAxios = (
  isClicked: boolean,
  setClicked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [response, setResponse] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [clicks, setClicks] = useState<number>(0);
  let timer: any = useRef();

  const fetchData = () => {
    setLoading(true);
    const body = JSON.stringify({
      count: clicks,
    });

    axios
      .post(URL, body, HEADERS)
      .then((res) => {
        setResponse(res.data.count);
      })
      .catch((err) => {
        setError(err.response.data.error_ui);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isClicked) {
      timer.current = window.setTimeout(() => {
        fetchData();
        setClicked(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timer.current);
      setError("");
      setResponse(0);
    };
  }, [clicks, isClicked]);

  return { response, error, isLoading, setLoading, clicks, setClicks };
};

export default useAxios;

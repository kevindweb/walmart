import * as React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function ApiCall(url: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then(({ data }:any) => {
        setData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, []);

  return [isLoading, data, error];
}
import { useState, useEffect } from "react";

export function useFetch() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiToken = import.meta.env.VITE_API_TOKEN;

  const [certificationData, setCertificationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(apiUrl, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCertificationData(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [apiKey, apiToken, apiUrl]);

  const uniquePlatforms = [
    ...new Set(
      certificationData.map((certification) => certification.platform)
    ),
  ];

  return { certificationData, isLoading, error, uniquePlatforms };
}

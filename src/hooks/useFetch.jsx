import { useState, useEffect } from "react";

export function useFetch(URL_API) {
  const [certificationData, setCertificationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(URL_API, {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhtbm9waHpxaXRlZnl0dGJpbnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg2MzU1MTEsImV4cCI6MjAwNDIxMTUxMX0.VYj3fLNQA8W1zUamS6PpUvLkkf84VD--Uq1Rjfnn40o",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhtbm9waHpxaXRlZnl0dGJpbnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg2MzU1MTEsImV4cCI6MjAwNDIxMTUxMX0.VYj3fLNQA8W1zUamS6PpUvLkkf84VD--Uq1Rjfnn40o",
      },
    })
      .then((response) => response.json())
      .then((data) => setCertificationData(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [URL_API]);

  const uniquePlatforms = [
    ...new Set(
      certificationData.map((certification) => certification.platform)
    ),
  ];

  return { certificationData, isLoading, error, uniquePlatforms };
}

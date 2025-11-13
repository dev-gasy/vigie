import { useState, useEffect } from "react";
import { queryClient, type Issue } from "./query-client";

export function useIssues() {
  const [data, setData] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchIssues = async () => {
      try {
        setLoading(true);
        setError(null);
        const issues = await queryClient.getAllIssues();
        
        if (isMounted) {
          setData(issues);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load issues");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchIssues();

    return () => {
      isMounted = false;
    };
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const issues = await queryClient.getAllIssues();
      setData(issues);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load issues");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
}
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { UseFetchOptions, UseFetchReturn } from "@/lib/types";

export function useApi<T = unknown>(
  url: string | null,
  params?: Record<string, string | number>,
  options: UseFetchOptions = {},
): UseFetchReturn<T> {
  const { immediate = true, retryCount = 0, retryDelay = 1000 } = options;

  // Memoize params, This fixed issues with infinite rerendering
  const memoizedParams = useMemo(() => {
    if (!params) return null;
    return JSON.stringify(params);
  }, [params]);

  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    if (!url) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    let attempts = 0;
    const maxAttempts = retryCount + 1;

    while (attempts < maxAttempts) {
      try {
        const searchParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            searchParams.append(key, String(value));
          });
        }

        const fullUrl = searchParams.toString()
          ? `${url}?${searchParams.toString()}`
          : url;

        const response = await fetch(fullUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${url}`);
        }

        const result = await response.json();
        setState({
          data: result,
          loading: false,
          error: null,
        });
        return;
      } catch (error) {
        attempts++;
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";

        if (attempts >= maxAttempts) {
          setState({
            data: null,
            loading: false,
            error: errorMessage,
          });
        } else {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    }
  }, [url, memoizedParams, retryCount, retryDelay]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  const setData = useCallback((data: T | null) => {
    setState((prev) => ({ ...prev, data }));
  }, []);

  useEffect(() => {
    if (immediate && url) {
      execute();
    }
  }, [immediate, url, memoizedParams, retryCount, retryDelay]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    execute,
    reset,
    setData,
  };
}

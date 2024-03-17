import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface QueryParamsObject {
  [key: string]: string | string[];
}

export function useOnClickOutside(ref: React.RefObject<HTMLDivElement>, handler: (e?: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export const useQueryString = (): [string, (params: QueryParamsObject) => void] => {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState<string>("");

  const updateQueryString = (newParams: QueryParamsObject) => {
    const searchParams = new URLSearchParams(queryParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item));
      } else {
        searchParams.set(key, value);
      }
    });
    const newQueryString = searchParams.toString();
    setQueryParams(newQueryString);
    // FIXME: queryParams state is not updated
    console.log("hook:" + queryParams);

    const url = new URL(window.location.toString());
    url.search = searchParams.toString();
    router.replace(url.toString());
  };

  // FIXME: use effect runs twice at the start
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialObject: QueryParamsObject = {};
    urlParams.forEach((value, key) => {
      if (initialObject[key] && !Array.isArray(initialObject[key])) {
        initialObject[key] = [initialObject[key] as string, value];
      } else if (initialObject[key]) {
        initialObject[key] = [...(initialObject[key] as string[]), value];
      } else {
        initialObject[key] = value;
      }
    });
    updateQueryString(initialObject);
  }, []);

  return [queryParams, updateQueryString];
};

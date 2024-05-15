"use strict";

import { useEffect, useRef, useState } from "react";

const options = {
   rootMargin: "5px",
   threshold: 0.5,
};

interface IData {
   body: string;
   id: number;
   userId: number;
   title: string;
}
function useDetectFirstRender() {
   const [firstRender, setFirstRender] = useState(true);

   useEffect(() => {
      setFirstRender(false);
   }, []);

   return firstRender;
}

export const useInfiniteScroll = (fetchFunction: any) => {
   const observerTarget = useRef(null);
   const firstRender = useDetectFirstRender();

   const [data, setData] = useState<IData[]>([]);
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(Infinity);
   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);
   const [isInitialLoading, setIsInitialLoading] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         if (firstRender) {
            setIsInitialLoading(true);
         } else {
            setIsLoading(true);
         }

         try {
            const response = await fetchFunction(page);

            if (!response.data) {
               throw new Error("Ошибка при получении данных");
            }
            console.log("succes after if");

            setPage((prevPage) => prevPage + 1);
            setData((prevData) => [...prevData, ...response.data]);
            setTotalPages(Math.ceil(response.headers["x-total-count"] / 12));
            setIsError(false);
         } catch (error) {
            console.error("Ошибка при получении данных:", error);
            setIsError(true);
         } finally {
            if (firstRender) {
               setIsInitialLoading(false);
            } else {
               setIsLoading(false);
            }
         }
      };

      const observer = new IntersectionObserver((entries) => {
         if (entries[0].isIntersecting && page < totalPages && !isLoading && !isError) {
            fetchData();
         }
      }, options);

      const observeTarget = observerTarget.current;

      if (observeTarget) {
         observer.observe(observeTarget);
      }

      return () => {
         if (observeTarget) {
            observer.unobserve(observeTarget);
         }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [fetchFunction, isError, isLoading, page, totalPages]);

   return { observerTarget, data, isLoading, isError, isInitialLoading };
};

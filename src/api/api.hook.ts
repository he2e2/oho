import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, type RefObject } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { getSearchKeywordData } from './api';
import type { KeywordItem } from './api.dto';
import { areaMap, typeMap } from '@/utils';

export const useSearchData = (
  pathname: string,
  keyword: string,
  area: string,
  type: string,
  page: number,
  sigungu?: string,
  enabled: boolean = false,
) =>
  useQuery({
    queryKey: [
      '/oho/searchKeyword1',
      page,
      keyword,
      type,
      area,
      sigungu,
      pathname,
    ],
    queryFn: () => getSearchKeywordData(page, keyword, type, area, sigungu),
    enabled,
  });

export const useSearchParamsState = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [keyword, setKeyword] = useState('');
  const [area, setArea] = useState('');

  useEffect(() => {
    const newKeyword = searchParams.get('keyword') ?? '';
    const newAreaCode = searchParams.get('areaCode') ?? '1';
    const newCard = searchParams.get('sigunguCode');

    setKeyword(newCard != null ? newCard : newKeyword);
    setArea(areaMap.find((a) => a.code === newAreaCode)?.name ?? '서울');
  }, [location.pathname, searchParams]);

  useEffect(() => {
    if (area === '') return;
    if (keyword === '') setKeyword('서울');
  }, [area, keyword]);

  return { keyword, setKeyword, area, setArea };
};

export const useInfiniteScroll = (
  ref: RefObject<Element>,
  onIntersect: () => void,
  hasMore: boolean,
) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore) {
        onIntersect();
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasMore, onIntersect, ref]);
};

export const useFetchItem = (
  pathname: string,
  keyword: string,
  area: string,
  type: string,
  sigungu?: string,
) => {
  const [items, setItems] = useState<KeywordItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const { data, refetch } = useSearchData(
    pathname,
    keyword,
    area,
    type,
    page,
    sigungu,
  );

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [keyword, area]);

  useEffect(() => {
    if (data?.item.length === 0) {
      setHasMore(false);
    } else {
      setItems((prev) => [...prev, ...(data?.item ?? [])]);
      if (data?.item !== undefined) {
        setPage((prevPage) => prevPage + 1);
        if (data.item.length < 4) setHasMore(false);
      }
    }
  }, [data]);

  const fetchItems = () => {
    if (area === '' || keyword === '') return;
    if (hasMore) refetch();
  };

  return { items, fetchItems, hasMore, page };
};

export const useListSectionData = (ref: RefObject<Element>) => {
  const { keyword, setKeyword, area, setArea } = useSearchParamsState();

  const { items, fetchItems, hasMore, page } = useFetchItem(
    window.location.pathname.replace(/\//g, ''),
    keyword,
    areaMap.find((a) => a.name === area)?.code ?? '1',
    typeMap.find((t) => t.page === window.location.pathname.replace(/\//g, ''))
      ?.id ?? '15',
  );

  useInfiniteScroll(ref, fetchItems, hasMore);

  return { items, keyword, setKeyword, area, setArea, hasMore, page };
};

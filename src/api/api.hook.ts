import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, type RefObject } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getCommonData, getDetailData, getSearchKeywordData } from './api';
import type { KeywordItem } from './api.dto';
import { areaMap, typeMap } from '@/utils';

const DEFAULT_AREA_CODE = '1';
const DEFAULT_TYPE_ID = '15';
const ITEM_LOAD_THRESHOLD = 4;

const getPathnameKey = (pathname: string) => pathname.replace(/\//g, '');

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

export const useCommonData = (contentId: string) =>
  useQuery({
    queryKey: ['/oho/detailCommon1', contentId],
    queryFn: () => getCommonData(contentId),
  });

export const useDetailData = (
  contentId: string,
  contentTypeId: string,
  enabled: boolean = false,
) =>
  useQuery({
    queryKey: ['/oho/detailIntro1', contentId, contentTypeId],
    queryFn: () => getDetailData(contentId, contentTypeId),
    enabled,
  });

export const useSearchParamsState = () => {
  const path = getPathnameKey(window.location.pathname);
  const type = typeMap.find((t) => t.page === path)?.id;
  const [searchParams] = useSearchParams();

  const [keyword, setKeyword] = useState('');
  const [area, setArea] = useState('');

  useEffect(() => {
    const newKeyword = searchParams.get('keyword') ?? '';
    const newAreaCode = searchParams.get('areaCode') ?? DEFAULT_AREA_CODE;
    const newCard = searchParams.get('sigunguCode');

    setKeyword(newCard != null ? newCard : newKeyword);
    setArea(areaMap.find((a) => a.code === newAreaCode)?.name ?? '서울');
  }, [window.location.pathname, searchParams]);

  useEffect(() => {
    if (area === '') return;
    if (keyword === '') setKeyword(area);
  }, [area, keyword]);

  return { keyword, setKeyword, area, setArea, type };
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

  const { data, refetch, status } = useSearchData(
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
    if (typeof data === 'string') {
      if (items.length !== 0) setHasMore(false);
      return;
    }
    setItems((prev) => [...prev, ...(data?.item ?? [])]);
    setPage((prevPage) => prevPage + 1);
    if (data !== undefined && data.item.length < ITEM_LOAD_THRESHOLD)
      setHasMore(false);
  }, [data]);

  const fetchItems = () => {
    if (area === '' || keyword === '') return;
    if (hasMore) refetch();
  };

  return { items, fetchItems, hasMore, page, status };
};

export const useListSectionData = (ref: RefObject<Element>) => {
  const { keyword, setKeyword, area, setArea, type } = useSearchParamsState();

  const { items, fetchItems, hasMore, page, status } = useFetchItem(
    getPathnameKey(window.location.pathname),
    keyword,
    areaMap.find((a) => a.name === area)?.code ?? DEFAULT_AREA_CODE,
    typeMap.find((t) => t.page === getPathnameKey(window.location.pathname))
      ?.id ?? DEFAULT_TYPE_ID,
  );

  useInfiniteScroll(ref, fetchItems, hasMore);

  return {
    items,
    type,
    keyword,
    setKeyword,
    area,
    setArea,
    hasMore,
    page,
    status,
  };
};

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { getSearchKeywordData } from './api';
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

export const useListSectionData = () => {
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

  const { data: searchKeywordData, refetch: search } = useSearchData(
    location.pathname.replace(/\//g, ''),
    keyword,
    areaMap.find((a) => a.name === area)?.code ?? '1',
    typeMap.find((t) => t.page === location.pathname.replace(/\//g, ''))?.id ??
      '15',
    1,
  );

  useEffect(() => {
    if (area === '') return;
    if (keyword !== '') search();
    else setKeyword('서울');
  }, [area, keyword, search]);

  return { searchKeywordData, keyword, setKeyword, area, setArea };
};

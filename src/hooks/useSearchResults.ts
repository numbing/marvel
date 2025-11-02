import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearResults, preloadIssues, searchIssues } from '../store/slices/searchSlice';
import { STATUS_IDLE, STATUS_LOADING } from '../constants/statusConstants';

const useSearchResults = () => {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.search);

  useEffect(() => {
    if (searchState.preloadStatus === STATUS_IDLE) {
      dispatch(preloadIssues());
    }
  }, [dispatch, searchState.preloadStatus]);

  const handleSearch = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) {
        dispatch(clearResults());
        return;
      }
      dispatch(searchIssues(trimmed));
    },
    [dispatch]
  );

  const derived = useMemo(() => {
    const hasQuery = searchState.query.trim().length > 0;
    const isSearchLoading = searchState.status === STATUS_LOADING;
    const isPreloadLoading = searchState.preloadStatus === STATUS_LOADING;
    const showSkeletons = (hasQuery && isSearchLoading) || (!hasQuery && isPreloadLoading);
    const issuesToDisplay = hasQuery ? searchState.results : searchState.preload;
    const sectionTitle = hasQuery ? 'Search results' : 'Featured issues';

    return {
      query: searchState.query,
      hasQuery,
      showSkeletons,
      issuesToDisplay,
      sectionTitle,
      isSearchLoading,
      isPreloadLoading,
    };
  }, [searchState]);

  return {
    ...derived,
    status: searchState.status,
    error: searchState.error,
    preloadStatus: searchState.preloadStatus,
    preloadError: searchState.preloadError,
    handleSearch,
  };
};

export default useSearchResults;

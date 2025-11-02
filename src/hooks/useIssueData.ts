import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchIssueById, resetIssue } from '../store/slices/issueSlice';
import { fetchCharacters, resetCharacters } from '../store/slices/characterSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { STATUS_SUCCEEDED } from '../constants/statusConstants';

const useIssueData = (issueId?: string) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const issueState = useAppSelector((state) => state.issue);
  const characterState = useAppSelector((state) => state.characters);

  useEffect(() => {
    if (!issueId) {
      navigate('/', { replace: true });
      return;
    }

    dispatch(fetchIssueById(issueId));
    dispatch(resetCharacters());

    return () => {
      dispatch(resetIssue());
      dispatch(resetCharacters());
    };
  }, [dispatch, issueId, navigate]);

  useEffect(() => {
    if (issueState.status !== STATUS_SUCCEEDED || !issueState.data) {
      return;
    }

    const characterUrls = issueState.data.characterCredits
      .map((character) => character.api_detail_url)
      .filter(Boolean);

    if (characterUrls.length > 0) {
      dispatch(fetchCharacters(characterUrls));
    } else {
      dispatch(resetCharacters());
    }
  }, [dispatch, issueState.status, issueState.data]);

  return { issueState, characterState };
};

export default useIssueData;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchIssues as searchIssuesApi, searchDefaultIssues } from '../../api/comicVineApi';
import { ComicVineIssueSummary } from '../../api/types';
import { STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, STATUS_FAILED } from '../../constants/statusConstants';
import { IssueSummary, SearchState } from './types';
import { getImageUrl } from '../../utils/imageUtils';
import { buildIssueTitle } from '../../utils/formatters';

const extractResourceId = (apiDetailUrl?: string | null) => {
  if (!apiDetailUrl) {
    return null;
  }

  try {
    const parsed = new URL(apiDetailUrl);
    const segments = parsed.pathname.split('/').filter(Boolean);
    const issueIndex = segments.findIndex((segment) => segment === 'issue');
    if (issueIndex >= 0 && segments[issueIndex + 1]) {
      return segments[issueIndex + 1];
    }
  } catch {
    // fall back to regex matching below
  }

  const match = apiDetailUrl.match(/issue\/([^/]+)\//i);
  return match ? match[1] : null;
};

const initialState: SearchState = {
  query: '',
  results: [],
  status: STATUS_IDLE,
  error: null,
  preload: [],
  preloadStatus: STATUS_IDLE,
  preloadError: null,
};

const toIssueSummary = (issue: ComicVineIssueSummary): IssueSummary => {
  const { title, issueNumber, fullTitle } = buildIssueTitle(issue.name, issue.issue_number);
  const thumbnailUrl = getImageUrl(issue.image, 'thumbnail');
  const apiDetailUrl = issue.api_detail_url ?? null;
  const resourceId = extractResourceId(apiDetailUrl);

  return {
    id: issue.id,
    title,
    issueNumber,
    fullTitle,
    volumeName: issue.volume?.name ?? null,
    thumbnailUrl,
    apiDetailUrl,
    resourceId,
  };
};

export const searchIssues = createAsyncThunk<
  IssueSummary[],
  string,
  { rejectValue: string }
>('search/searchIssues', async (query, { rejectWithValue }) => {
  try {
    const issues = await searchIssuesApi(query);
    return issues
      .map(toIssueSummary)
      .filter((issueSummary): issueSummary is IssueSummary => Boolean(issueSummary.resourceId));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to search issues on Comic Vine.';
    return rejectWithValue(message);
  }
});

export const preloadIssues = createAsyncThunk<
  IssueSummary[],
  void,
  { rejectValue: string }
>('search/preloadIssues', async (_, { rejectWithValue }) => {
  try {
    const issues = await searchDefaultIssues();
    return issues
      .map(toIssueSummary)
      .filter((issueSummary): issueSummary is IssueSummary => Boolean(issueSummary.resourceId));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to preload issues from Comic Vine.';
    return rejectWithValue(message);
  }
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearResults(state) {
      state.results = [];
      state.status = STATUS_IDLE;
      state.error = null;
      state.query = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(preloadIssues.pending, (state) => {
        state.preloadStatus = STATUS_LOADING;
        state.preloadError = null;
      })
      .addCase(preloadIssues.fulfilled, (state, action) => {
        state.preloadStatus = STATUS_SUCCEEDED;
        state.preload = action.payload;
      })
      .addCase(preloadIssues.rejected, (state, action) => {
        state.preloadStatus = STATUS_FAILED;
        state.preloadError = action.payload ?? action.error.message ?? 'Unknown error';
        state.preload = [];
      })
      .addCase(searchIssues.pending, (state, action) => {
        state.status = STATUS_LOADING;
        state.error = null;
        state.query = action.meta.arg;
        state.results = [];
      })
      .addCase(searchIssues.fulfilled, (state, action) => {
        state.status = STATUS_SUCCEEDED;
        state.results = action.payload;
      })
      .addCase(searchIssues.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload ?? action.error.message ?? 'Unknown error';
      });
  },
});

export const { clearResults } = searchSlice.actions;

export default searchSlice.reducer;

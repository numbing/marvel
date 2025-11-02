import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIssueById } from '../../api/comicVineApi';
import { ComicVineIssueDetail } from '../../api/types';
import { IssueDetail, IssueState } from './types';
import { STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, STATUS_FAILED } from '../../constants/statusConstants';
import { getImageUrl } from '../../utils/imageUtils';
import { buildIssueTitle } from '../../utils/formatters';

const initialState: IssueState = {
  data: null,
  status: STATUS_IDLE,
  error: null,
};

const toIssueDetail = (issue: ComicVineIssueDetail): IssueDetail => {
  const { title, issueNumber, fullTitle } = buildIssueTitle(issue.name, issue.issue_number);
  const coverImageUrl = getImageUrl(issue.image, 'cover');

  return {
    id: issue.id,
    title,
    issueNumber,
    fullTitle,
    description: issue.description ?? null,
    coverImageUrl,
    volumeName: issue.volume?.name ?? null,
    characterCredits: issue.character_credits ?? [],
  };
};

export const fetchIssueById = createAsyncThunk<
  IssueDetail,
  string,
  { rejectValue: string }
>('issue/fetchIssueById', async (issueId, { rejectWithValue }) => {
  try {
    const issue = await getIssueById(issueId);
    return toIssueDetail(issue);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to load issue from Comic Vine.';
    return rejectWithValue(message);
  }
});

const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    resetIssue(state) {
      state.data = null;
      state.status = STATUS_IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssueById.pending, (state) => {
        state.status = STATUS_LOADING;
        state.error = null;
        state.data = null;
      })
      .addCase(fetchIssueById.fulfilled, (state, action) => {
        state.status = STATUS_SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchIssueById.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload ?? action.error.message ?? 'Unknown error';
        state.data = null;
      });
  },
});

export const { resetIssue } = issueSlice.actions;

export default issueSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCharacterByUrl } from '../../api/comicVineApi';
import { ComicVineCharacter } from '../../api/types';
import { CharacterItem, CharacterState } from './types';
import { STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, STATUS_FAILED } from '../../constants/statusConstants';
import { getImageUrl } from '../../utils/imageUtils';

const initialState: CharacterState = {
  items: [],
  status: STATUS_IDLE,
  error: null,
};

const toCharacterItem = (character: ComicVineCharacter): CharacterItem => {
  const imageUrl = getImageUrl(character.image, 'avatar');

  return {
    id: character.id,
    name: character.name || 'Unknown Character',
    imageUrl,
    apiDetailUrl: character.api_detail_url,
    resourceId: null,
    label: null,
    summary: null,
  };
};

export const fetchCharacters = createAsyncThunk<
  CharacterItem[],
  string[],
  { rejectValue: string }
>('characters/fetchCharacters', async (characterUrls, { rejectWithValue }) => {
  try {
    const uniqueUrls = Array.from(
      new Set(characterUrls.filter((url) => typeof url === 'string' && url.length > 0))
    );

    if (uniqueUrls.length === 0) {
      return [];
    }

    const responses = await Promise.all(
      uniqueUrls.map(async (url) => {
        try {
          const character = await getCharacterByUrl(url);
          return toCharacterItem(character);
        } catch (error) {
          console.warn('Failed to load character from Comic Vine', url, error);
          return null;
        }
      })
    );

    const characters = responses.filter(
      (item): item is CharacterItem => Boolean(item)
    );

    if (characters.length === 0) {
      throw new Error('Unable to load character details from Comic Vine.');
    }

    return characters;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to load characters from Comic Vine.';
    return rejectWithValue(message);
  }
});

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    resetCharacters(state) {
      state.items = [];
      state.status = STATUS_IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = STATUS_LOADING;
        state.error = null;
        state.items = [];
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = STATUS_SUCCEEDED;
        state.items = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload ?? action.error.message ?? 'Unknown error';
      });
  },
});

export const { resetCharacters } = characterSlice.actions;

export default characterSlice.reducer;

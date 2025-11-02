import axios from 'axios';
import {
  ComicVineCharacter,
  ComicVineIssueDetail,
  ComicVineIssueSummary,
  ComicVineItemResponse,
  ComicVineListResponse,
} from './types';

const API_KEY = process.env.REACT_APP_COMICVINE_API_KEY ?? '';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? '/comicvine'
    : 'https://comicvine.gamespot.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

const withAuthParams = (params?: Record<string, string>) => {
  if (!API_KEY) {
    throw new Error(
      'Missing Comic Vine API key. Please set REACT_APP_COMICVINE_API_KEY in your environment.'
    );
  }

  return {
    api_key: API_KEY,
    format: 'json',
    ...params,
  };
};

const ensureApiPath = (resourceUrl: string) => {
  try {
    const parsed = new URL(resourceUrl);
    return parsed.pathname;
  } catch {
    return resourceUrl.startsWith('/api/')
      ? resourceUrl
      : resourceUrl.startsWith('/api')
      ? `/${resourceUrl.replace(/^\/*/, '')}`
      : `/api/${resourceUrl.replace(/^\/*/, '')}`;
  }
};

export const searchIssues = async (query: string) => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return [];
  }

  const response = await apiClient.get<ComicVineListResponse<ComicVineIssueSummary>>(
    '/api/issues/',
    {
      params: withAuthParams({
        filter: `name:${trimmedQuery}`,
        field_list: 'id,name,issue_number,volume,image,api_detail_url',
        sort: 'cover_date:desc',
        limit: '20',
      }),
    }
  );

  if (response.data.status_code !== 1) {
    throw new Error(response.data.error || 'Comic Vine search failed.');
  }

  return response.data.results;
};

export const searchDefaultIssues = async () => {
  return searchIssues('Hulk');
};

export const getIssueById = async (issueId: string) => {
  const response = await apiClient.get<ComicVineItemResponse<ComicVineIssueDetail>>(
    `/api/issue/${issueId}/`,
    {
      params: withAuthParams({
        field_list:
          'id,name,issue_number,description,volume,image,character_credits,api_detail_url',
      }),
    }
  );

  if (response.data.status_code !== 1) {
    throw new Error(response.data.error || 'Comic Vine issue lookup failed.');
  }

  return response.data.results;
};

export const getCharacterByUrl = async (resourceUrl: string) => {
  const apiPath = ensureApiPath(resourceUrl);

  const response = await apiClient.get<ComicVineItemResponse<ComicVineCharacter>>(apiPath, {
    params: withAuthParams({
      field_list: 'id,name,image,api_detail_url',
    }),
  });

  if (response.data.status_code !== 1) {
    throw new Error(response.data.error || 'Comic Vine character lookup failed.');
  }

  return response.data.results;
};

export const getCharacterById = async (resourceId: string) => {
  const response = await apiClient.get<ComicVineItemResponse<ComicVineCharacter>>(
    `/api/character/${resourceId}/`,
    {
      params: withAuthParams({
        field_list:
          'id,name,real_name,deck,description,image,api_detail_url,first_appeared_in_issue,issue_credits',
      }),
    }
  );

  if (response.data.status_code !== 1) {
    throw new Error(response.data.error || 'Comic Vine character lookup failed.');
  }

  return response.data.results;
};

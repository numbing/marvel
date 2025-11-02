export interface ComicVineImage {
  icon_url?: string;
  screen_large_url?: string;
  medium_url?: string;
  small_url?: string;
  thumb_url?: string;
  tiny_url?: string;
  original_url?: string;
}

export interface ComicVineVolumeReference {
  id: number;
  name: string;
}

export interface ComicVineCharacterReference {
  id: number;
  name: string;
  api_detail_url: string;
}

export interface ComicVineIssueSummary {
  id: number;
  name: string;
  issue_number: string;
  api_detail_url: string;
  volume?: ComicVineVolumeReference;
  image?: ComicVineImage;
}

export interface ComicVineIssueDetail extends ComicVineIssueSummary {
  description: string | null;
  character_credits?: ComicVineCharacterReference[];
}

export interface ComicVineCharacter {
  id: number;
  name: string;
  api_detail_url: string;
  deck?: string | null;
  description?: string | null;
  real_name?: string | null;
  first_appeared_in_issue?: ComicVineIssueSummary | null;
  issue_credits?: ComicVineIssueSummary[];
  image?: ComicVineImage;
}

export interface ComicVineListResponse<T> {
  status_code: number;
  error: string;
  results: T[];
}

export interface ComicVineItemResponse<T> {
  status_code: number;
  error: string;
  results: T;
}

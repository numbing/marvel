import { ComicVineCharacterReference } from '../../api/types';
import { AsyncStatus } from '../../constants/statusConstants';

// Issue types
export interface IssueDetail {
  id: number;
  title: string;
  issueNumber: string;
  fullTitle: string;
  description: string | null;
  coverImageUrl: string | null;
  volumeName: string | null;
  characterCredits: ComicVineCharacterReference[];
}

export interface IssueState {
  data: IssueDetail | null;
  status: AsyncStatus;
  error: string | null;
}

// Character types
export interface CharacterItem {
  id: number;
  name: string;
  imageUrl: string | null;
  apiDetailUrl: string;
  resourceId: string | null;
  label?: string | null;
  summary?: string | null;
}

export interface CharacterState {
  items: CharacterItem[];
  status: AsyncStatus;
  error: string | null;
}

// Search types
export interface IssueSummary {
  id: number;
  title: string;
  issueNumber: string;
  fullTitle: string;
  volumeName: string | null;
  thumbnailUrl: string | null;
  apiDetailUrl: string | null;
  resourceId: string | null;
}

export interface SearchState {
  query: string;
  results: IssueSummary[];
  status: AsyncStatus;
  error: string | null;
  preload: IssueSummary[];
  preloadStatus: AsyncStatus;
  preloadError: string | null;
}

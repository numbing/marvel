# Avidity

A modern comic book explorer built with React and Redux Toolkit. Search the Comic Vine API for comic issues, browse detailed issue information, and explore character galleries.

## Tech Stack

- **React 19** with TypeScript
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Reactstrap** and **Bootstrap 5** for UI components
- **Axios** for API requests
- **Comic Vine API** for comic book data

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Key

Create a `.env.local` file in the project root:

```
REACT_APP_COMICVINE_API_KEY=your_api_key_here
```

To get your free API key:
1. Visit [https://comicvine.gamespot.com/api/](https://comicvine.gamespot.com/api/)
2. Register for an account
3. Your API key will be generated and available in your profile

### 3. Run Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Features

### Search & Browse
- Search comic issues by title, character, or series
- Preloaded featured issues on the home page
- Responsive card-based layout with hover effects
- Skeleton loaders for smooth loading states

### Issue Details
- Full issue information including cover art, synopsis, and volume details
- Character gallery with lazy-loaded portraits
- Sanitized HTML rendering for issue descriptions
- Mobile-responsive layout

### Modern UX
- React Router navigation with 404 handling
- Redux Toolkit for efficient state management
- Custom hooks for data fetching and state access
- Responsive navbar that collapses on mobile

## State Management

The app uses Redux Toolkit with a centralized store structure located in `src/store/`:

- **`store/index.ts`** - Redux store configuration
- **`store/hooks.ts`** - Typed Redux hooks (`useAppDispatch`, `useAppSelector`)
- **`store/slices/`** - All Redux slices and types
  - **`searchSlice.ts`** - Search query, results, and preloaded featured issues
  - **`issueSlice.ts`** - Selected issue details and metadata
  - **`characterSlice.ts`** - Character data for issue galleries
  - **`types.ts`** - Consolidated TypeScript types for all slices

All slices use `createAsyncThunk` for async operations and follow a consistent pattern with status constants (`STATUS_IDLE`, `STATUS_LOADING`, `STATUS_SUCCEEDED`, `STATUS_FAILED`) defined in `src/constants/statusConstants.ts`.

## Routes

- **`/`** - Home page with search and featured issues
- **`/issue/:id`** - Issue detail page with character gallery
- **`*`** - 404 Not Found page

## Data Attribution

All comic book data is provided by [Comic Vine](https://comicvine.gamespot.com/). The required attribution appears in the app footer.


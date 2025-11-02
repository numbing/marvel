import { Alert, Col, Container, Row } from 'reactstrap';
import SearchBar from '../../components/SearchBar';
import IssueCard from '../../components/IssueCard';
import SkeletonCard from '../../components/skeleton/SkeletonCard';
import PageContainer from '../../components/PageContainer';
import './SearchPage.css';
import useSearchResults from '../../hooks/useSearchResults';
import { STATUS_LOADING, STATUS_FAILED, STATUS_SUCCEEDED } from '../../constants/statusConstants';

const SearchPage = () => {
  const {
    status,
    error,
    preloadStatus,
    preloadError,
    issuesToDisplay,
    sectionTitle,
    showSkeletons,
    hasQuery,
    handleSearch,
    query,
  } = useSearchResults();

  return (
    <PageContainer>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs="12" lg="8">
            <div className="intro-card">
              <h1>Discover Your Next Comic Issue</h1>
              <p>
                Search the Comic Vine database for iconic issues and dive into rich character
                histories. Start typing a title to explore the multiverse.
              </p>
              <SearchBar
                initialQuery={query}
                onSearch={handleSearch}
                isLoading={status === STATUS_LOADING}
              />
            </div>
          </Col>
        </Row>

        <div className="search-results mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">{sectionTitle}</h2>
          </div>

          {hasQuery && status === STATUS_FAILED && (
            <Alert color="danger">
              Failed to load search results. Please try again.
              {error && <div className="small mt-2">{error}</div>}
            </Alert>
          )}

          {!hasQuery && preloadStatus === STATUS_FAILED && (
            <Alert color="warning">
              We couldn't load featured issues right now.
              {preloadError && <div className="small mt-2">{preloadError}</div>}
            </Alert>
          )}

          {showSkeletons && (
            <Row className="g-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <Col key={index} xs="12" sm="6" md="4" lg="3">
                  <SkeletonCard />
                </Col>
              ))}
            </Row>
          )}

          {!showSkeletons && issuesToDisplay.length > 0 && (
            <Row className="g-4">
              {issuesToDisplay.map((issue) => (
                <Col key={issue.id} xs="12" sm="6" md="4" lg="3">
                  <IssueCard issue={issue} />
                </Col>
              ))}
            </Row>
          )}

          {hasQuery && status === STATUS_SUCCEEDED && issuesToDisplay.length === 0 && (
            <p className="text-center text-muted">
              No matching issues found for "{query}". Try another title or character.
            </p>
          )}

          {!hasQuery && preloadStatus === STATUS_SUCCEEDED && issuesToDisplay.length === 0 && (
            <p className="text-center text-muted">
              No featured issues available right now. Try searching for a specific title.
            </p>
          )}
        </div>
      </Container>
    </PageContainer>
  );
};

export default SearchPage;

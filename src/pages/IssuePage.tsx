import { useParams } from 'react-router-dom';
import { Alert, Col, Container, Row } from 'reactstrap';
import SpotlightCard from '../components/SpotlightCard';
import CharacterGrid from '../components/CharacterGrid';
import SkeletonAvatarCard from '../components/skeleton/SkeletonAvatarCard';
import IssueSkeleton from '../components/skeleton/IssueSkeleton';
import PageContainer from '../components/PageContainer';
import useIssueData from '../hooks/useIssueData';
import { STATUS_LOADING, STATUS_FAILED, STATUS_SUCCEEDED } from '../constants/statusConstants';

const IssuePage = () => {
  const { id } = useParams<{ id: string }>();
  const { issueState, characterState } = useIssueData(id);

  return (
    <PageContainer>
      <Container className="py-5">
        {issueState.status === STATUS_LOADING && <IssueSkeleton />}

        {issueState.status === STATUS_FAILED && (
          <Alert color="danger" className="mt-4">
            Failed to load comic data. Please try again.
            {issueState.error && <div className="small mt-2">{issueState.error}</div>}
          </Alert>
        )}

        {issueState.status === STATUS_SUCCEEDED && issueState.data && (
          <>
            <SpotlightCard issue={issueState.data} />

            <Row className="mt-5 justify-content-center">
              <Col xs="12" lg="10">
                <div className="text-center mb-4">
                  <h3 className="mb-1">Character Gallery</h3>
                  <p className="text-muted mb-0">
                    Meet the heroes and villains that make this issue unforgettable.
                  </p>
                </div>

                {characterState.status === STATUS_LOADING && (
                  <Row className="g-3 justify-content-center">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <Col key={index} xs="6" sm="4" md="3" lg="2">
                        <SkeletonAvatarCard />
                      </Col>
                    ))}
                  </Row>
                )}

                {characterState.status === STATUS_FAILED && (
                  <Alert color="warning">
                    Unable to load character details.
                    {characterState.error && (
                      <div className="small mt-2">{characterState.error}</div>
                    )}
                  </Alert>
                )}

                {characterState.status !== STATUS_LOADING && characterState.status !== STATUS_FAILED && (
                  <CharacterGrid
                    characters={characterState.items}
                    status={characterState.status}
                    error={characterState.error}
                  />
                )}
              </Col>
            </Row>
          </>
        )}
      </Container>
    </PageContainer>
  );
};

export default IssuePage;

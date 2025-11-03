import { Link } from 'react-router-dom';
import { Alert, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import { CharacterItem } from '../store/slices/types';
import { AsyncStatus, STATUS_FAILED } from '../constants/statusConstants';
import './CharacterGrid.css';

interface CharacterGridProps {
  characters: CharacterItem[];
  status: AsyncStatus;
  error: string | null;
}

const CharacterGrid = ({ characters, status, error }: CharacterGridProps) => {
  if (status === STATUS_FAILED) {
    return (
      <Alert color="warning">
        Unable to load character details.
        {error && <div className="small mt-2">{error}</div>}
      </Alert>
    );
  }

  if (!characters.length) {
    return <p className="text-muted">No character information available for this issue.</p>;
  }

  return (
    <Row className="g-3 g-lg-4 justify-content-center character-grid">
      {characters.map((character) => {
        const cardClass = `character-card card-hover text-center p-4 h-100${
          character.resourceId ? ' clickable' : ''
        }`;
        const linkProps = character.resourceId
          ? { tag: Link, to: `/character/${character.resourceId}` }
          : {};

        return (
          <Col key={character.id} xs="6" sm="4" md="3" lg="2" className="d-flex">
            <Card className={cardClass} {...linkProps}>
              {character.label && <span className="character-label">{character.label}</span>}
              <div className="character-avatar mb-3">
                {character.imageUrl ? (
                  <img src={character.imageUrl} alt={`${character.name} portrait`} />
                ) : (
                  <span>{character.name}</span>
                )}
              </div>
              <CardBody className="p-0">
                <CardTitle tag="h6" className="character-name mb-0">
                  {character.name}
                </CardTitle>
                {character.summary && (
                  <CardText className="character-summary mt-2 mb-0">
                    {character.summary}
                  </CardText>
                )}
              </CardBody>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default CharacterGrid;

import { Link } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import { IssueSummary } from '../store/slices/types';
import './IssueCard.css';

interface IssueCardProps {
  issue: IssueSummary;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  const resourceId = issue.resourceId ?? undefined;

  if (!resourceId) {
    return (
      <Card className="issue-card card-hover h-100 d-flex flex-column" style={{ pointerEvents: 'none' }}>
        <div className="issue-card-image">
          {issue.thumbnailUrl && <img src={issue.thumbnailUrl} alt={`${issue.fullTitle} cover`} />}
        </div>
        <CardBody className="d-flex flex-column">
          <CardTitle tag="h5" className="mb-2">
            {issue.fullTitle}
          </CardTitle>
          {issue.volumeName && (
            <CardSubtitle className="text-muted mb-3" tag="h6">
              Volume: {issue.volumeName}
            </CardSubtitle>
          )}
        </CardBody>
      </Card>
    );
  }

  return (
    <Card
      tag={Link}
      to={`/issue/${resourceId}`}
      className="issue-card card-hover h-100 d-flex flex-column clickable-card"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="issue-card-image">
        {issue.thumbnailUrl && <img src={issue.thumbnailUrl} alt={`${issue.fullTitle} cover`} />}
      </div>
      <CardBody className="d-flex flex-column">
        <CardTitle tag="h5" className="mb-2">
          {issue.fullTitle}
        </CardTitle>
        {issue.volumeName && (
          <CardSubtitle className="text-muted mb-3" tag="h6">
            Volume: {issue.volumeName}
          </CardSubtitle>
        )}
        <div className="issue-card-cta mt-auto">View details →</div>
      </CardBody>
    </Card>
  );
};

export default IssueCard;

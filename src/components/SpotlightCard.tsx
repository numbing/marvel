import { Card, CardText, CardTitle } from 'reactstrap';
import { IssueDetail } from '../store/slices/types';
import { sanitizeHtml } from '../utils/sanitizeHtml';
import './SpotlightCard.css';

interface SpotlightCardProps {
  issue: IssueDetail;
  label?: string;
}

const SpotlightCard = ({ issue, label = 'Comic Issue' }: SpotlightCardProps) => {
  return (
    <Card className="issue-header-card card-hover">
      <div className="issue-header-layout">
        <div className="issue-header-visual">
          <div className="issue-header-cover">
            {issue.coverImageUrl ? (
              <img src={issue.coverImageUrl} alt={`${issue.fullTitle} cover`} />
            ) : (
              <div className="issue-cover-placeholder">
                <span>{issue.title.slice(0, 2).toUpperCase()}</span>
              </div>
            )}
          </div>
        </div>
        <div className="issue-header-content">
          <span className="issue-label">{label}</span>
          <CardTitle tag="h2" className="issue-title">
            {issue.fullTitle}
          </CardTitle>
          <div className="issue-meta">
            {issue.volumeName && <span className="issue-chip">{issue.volumeName}</span>}
            {issue.issueNumber && issue.issueNumber.trim().length > 0 && (
              <span className="issue-chip">#{issue.issueNumber}</span>
            )}
          </div>
          {issue.description && (
            <CardText className="mt-3">
              <div
                className="issue-description"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(issue.description) }}
              />
            </CardText>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SpotlightCard;

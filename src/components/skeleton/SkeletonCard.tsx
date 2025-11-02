import { Card, CardBody } from 'reactstrap';
import './SkeletonStyles.css';

interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard = ({ className = '' }: SkeletonCardProps) => {
  return (
    <Card className={`issue-card skeleton-card ${className}`.trim()}>
      <div className="skeleton skeleton-image" />
      <CardBody>
        <div className="skeleton skeleton-line w-75 mb-2" />
        <div className="skeleton skeleton-line w-50 mb-3" />
        <div className="skeleton skeleton-line w-25" />
      </CardBody>
    </Card>
  );
};

export default SkeletonCard;

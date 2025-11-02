import { Card, CardBody } from 'reactstrap';
import './SkeletonStyles.css';

interface SkeletonAvatarCardProps {
  className?: string;
}

const SkeletonAvatarCard = ({ className = '' }: SkeletonAvatarCardProps) => {
  return (
    <Card className={`character-card skeleton-avatar-card ${className}`.trim()}>
      <CardBody className="d-flex flex-column align-items-center justify-content-center">
        <div className="skeleton skeleton-avatar mb-3" />
        <div className="skeleton skeleton-line w-75" />
      </CardBody>
    </Card>
  );
};

export default SkeletonAvatarCard;

import '../SpotlightCard.css';
import './SkeletonStyles.css';

const IssueSkeleton = () => {
  return (
    <div className="issue-header-card skeleton-card mb-5">
      <div className="issue-header-layout">
        <div className="issue-header-visual">
          <div className="issue-header-cover skeleton" />
        </div>
        <div className="issue-header-content">
          <div className="skeleton skeleton-line w-25 mb-3" />
          <div className="skeleton skeleton-line w-75 mb-3" />
          <div className="skeleton skeleton-line w-50 mb-4" />
          <div className="skeleton skeleton-line w-100 mb-2" />
          <div className="skeleton skeleton-line w-100 mb-2" />
          <div className="skeleton skeleton-line w-75" />
        </div>
      </div>
    </div>
  );
};

export default IssueSkeleton;

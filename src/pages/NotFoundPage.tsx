import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import PageContainer from '../components/PageContainer';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <PageContainer>
      <Container className="not-found-container">
        <div className="not-found-graphic" aria-hidden="true">
          <span className="not-found-icon">💥</span>
          <span className="not-found-code">404</span>
          <span className="not-found-icon">💥</span>
        </div>
        <h1 className="not-found-title">Issue Not Found</h1>
        <p className="not-found-subtitle">
          Looks like this panel is missing. Let&apos;s flip back to the homepage and keep exploring the
          multiverse.
        </p>
        <Link to="/" className="not-found-link">
          Return Home →
        </Link>
      </Container>
    </PageContainer>
  );
};

export default NotFoundPage;

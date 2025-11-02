import { ReactNode, useEffect, useState } from 'react';
import './PageContainer.css';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer = ({ children, className = '' }: PageContainerProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => setIsActive(true));
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className={`page-enter ${isActive ? 'page-enter-active' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
};

export default PageContainer;

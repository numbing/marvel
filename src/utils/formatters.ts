export const buildIssueTitle = (
  name: string | undefined,
  issueNumber: string | undefined
): { title: string; issueNumber: string; fullTitle: string } => {
  const title = name || 'Untitled Issue';
  const number = issueNumber || '';
  const fullTitle = number ? `${title} #${number}` : title;

  return {
    title,
    issueNumber: number,
    fullTitle,
  };
};

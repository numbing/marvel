const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

export const sanitizeHtml = (html: string | null | undefined): string => {
  if (!html) {
    return '';
  }

  if (!isBrowser) {
    return html;
  }

  const template = document.createElement('template');
  template.innerHTML = html;

  template.content.querySelectorAll('script, style').forEach((element) => {
    element.remove();
  });

  template.content.querySelectorAll('*').forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      if (attribute.name.startsWith('on')) {
        element.removeAttribute(attribute.name);
      }
    });

    if (element.tagName.toLowerCase() === 'a') {
      element.setAttribute('target', '_blank');
      element.setAttribute('rel', 'noopener noreferrer');
    }
  });

  return template.innerHTML;
};

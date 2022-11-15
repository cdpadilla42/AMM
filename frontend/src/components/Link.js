import React from 'react';

const AnchorLink = ({ href, newWindow, children }) => {
  const rel = newWindow ? 'noopener' : '';
  const target = newWindow ? '_blank' : '';

  return (
    <a href={href} rel={rel} target={target}>
      {children}
    </a>
  );
};

export default AnchorLink;

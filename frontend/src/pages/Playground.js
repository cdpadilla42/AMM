import React from 'react';
import ImageLoader from '../components/ImageLoader';

const Playground = () => {
  const createMarkup = () => {
    return {
      __html: `<p className="text_box__text" >Hello!</p>`,
    };
  };

  // TODO Parse html with a third party library https://github.com/wrakky/react-html-parser/tree/master/src/utils

  const renderChildren = () => {
    return (
      <>
        <img
          src="https://cdn.sanity.io/images/qvonp967/production/dfcee2a3ccb2ab1950e74721443c920cb3099d07-360x450.png"
          alt=""
          style={{ height: '15px', width: '15px' }}
        />
        <span
          style={{ color: 'blue' }}
          dangerouslySetInnerHTML={{
            __html: '<p className="text_box__text" >Hello!</p>',
          }}
        ></span>
      </>
    );
  };
  return (
    <div>
      <ImageLoader>Hello!</ImageLoader>
    </div>
  );
};

export default Playground;

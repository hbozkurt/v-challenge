import React, { Fragment } from 'react';
import SearchBox from './SearchBox';
import { Resize, Carousel, Header, ErrorBoundary } from './components';
import { isMobileViewEnabled } from './utils';

const App = () => (
  <Resize>
    {width => (
      <Fragment>
        <Header isMobile={isMobileViewEnabled(width)} />
        <ErrorBoundary>
          <SearchBox disabled={isMobileViewEnabled(width)} />
        </ErrorBoundary>
        <Carousel />
      </Fragment>
      )
    }
  </Resize>
);

export default App;

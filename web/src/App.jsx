import React, { Fragment } from 'react';
import SearchBox from './SearchBox';
import { Resize, Carousel, Header } from './components';
import { isMobileViewEnabled } from './utils';

const App = () => (
  <Resize>
    {width => (
      <Fragment>
        <Header isMobile={isMobileViewEnabled(width)} />
        <SearchBox disabled={isMobileViewEnabled(width)} />
        <Carousel />
      </Fragment>
      )
    }
  </Resize>
);

export default App;

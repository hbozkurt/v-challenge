import React, { Fragment } from 'react';
import SearchBox from './SearchBox';
import Carousel from './Carousel';
import { Resize } from './components';
import { isMobileViewEnabled } from './utils';

const App = () => (
  <Resize>
    {width => (
      <Fragment>
        <SearchBox disabled={isMobileViewEnabled(width)} />
        <Carousel />
      </Fragment>
      )
    }
  </Resize>
);

export default App;

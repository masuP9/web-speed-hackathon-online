import './foundation/polyfills';

import { render } from './foundation/render';
import { setupMockAPIData } from './foundation/gateway';

if (process.env.USE_MOCK_DATA === 'true') {
  setupMockAPIData();
}

render();

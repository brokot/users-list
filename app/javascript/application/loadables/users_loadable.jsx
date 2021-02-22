import Loadable from 'react-loadable';
import React from 'react';
import Skeleton from '../components/common/skeletons/index_skeleton.js.jsx';

export default Loadable({
  loader: () => import('../containers/users'),
  loading: () => <Skeleton />,
});

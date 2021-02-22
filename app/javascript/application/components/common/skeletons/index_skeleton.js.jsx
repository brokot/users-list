import React from 'react';
import PolarisWrapper from '../polaris_wrapper.js.jsx';
import {
  Card,
  SkeletonBodyText,
  SkeletonPage,
} from '@shopify/polaris';

export default (props) => {
  return(
    <PolarisWrapper>
      <div id="index-container">
        <SkeletonPage
          fullWidth
          {...props}
        >
          <Card sectioned>
            <SkeletonBodyText/>
          </Card>
        </SkeletonPage>
      </div>
    </PolarisWrapper>
  )
}

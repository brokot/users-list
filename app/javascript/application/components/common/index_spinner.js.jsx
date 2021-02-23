import React from 'react';
import {
  Spinner,
  Stack,
} from '@shopify/polaris';

export default () => {
  return(
    <div className='spinner-block'>
      <Stack>
        <Spinner accessibilityLabel="Spinner example" size="small"/>
        <div>Loading...</div>
      </Stack>
    </div>
  )
}

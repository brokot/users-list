import React, { Component } from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';

import {
  AppProvider,
} from '@shopify/polaris';

const PolarisWrapper = (props) => {
  return (
    <AppProvider i18n={enTranslations}>
      {props.children}
    </AppProvider>
  )
}

export default PolarisWrapper;

import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import { View } from 'react-native'
import Loader from './Loader'

const style = {
  flex: 1,
  justifyContent: 'left',
  alignItems: 'left',
  backgroundColor: '#F5FCFF',
  paddingTop: 50
};

const CenteredView = ({ children }) => <View style={style}>{children}</View>;

export default storiesOf('Loader', module)
  .add('default view', () => (
    <CenteredView>
      <Loader />
    </CenteredView>
  ))

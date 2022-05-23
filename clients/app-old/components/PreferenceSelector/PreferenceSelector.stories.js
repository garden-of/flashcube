import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import { View } from 'react-native'
import PreferenceSelector from './PreferenceSelector'

const style = {
  flex: 1,
  justifyContent: 'left',
  alignItems: 'left',
  backgroundColor: '#F5FCFF',
  paddingTop: 50
};

const CenteredView = ({ children }) => <View style={style}>{children}</View>;

export default storiesOf('PreferenceSelector', module)
  .add('default view', () => (
    <CenteredView>
      <PreferenceSelector 
        title='What do you want to learn?'
        subtitle='These will be the languages we include in your curriculum.'
        options={[
          {label: 'English', value: 'en', selected: 2},
          {label: 'Spanish', value: 'sp', selected: 0},
          {label: 'French', value: 'fr', selected: 0},
          {label: 'Italian', value: 'it', selected: 0 }
        ]}
        onChange={() => action('changed')}
      />
    </CenteredView>
  ))

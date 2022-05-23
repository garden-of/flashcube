import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import { View } from 'react-native'
import LanguagePicker from './LanguagePicker'

const style = {
  flex: 1,
  justifyContent: 'left',
  alignItems: 'left',
  backgroundColor: '#F5FCFF',
  paddingTop: 50
};

const CenteredView = ({ children }) => <View style={style}>{children}</View>;

export default storiesOf('LanguagePicker', module)
  .add('default view', () => (
    <CenteredView>
      <LanguagePicker 
        title='What language do you know best?'
        subtitle='This will be your base language.'
        options={[
          {category: 'English', id: 'en'},
          {category: 'Spanish', id: 'sp'},
          {category: 'French', id: 'fr'},
          {category: 'Italian', id: 'it'}
        ]}
      />
    </CenteredView>
  ))

import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { View } from 'react-native'
import ListItem from './ListItem'

const style = {
  flex: 1,
  justifyContent: 'left',
  alignItems: 'left',
  backgroundColor: '#F5FCFF',
  paddingTop: 50
};

const CenteredView = ({ children }) => <View style={style}>{children}</View>;

export default storiesOf('ListItem', module)
  .addDecorator(withKnobs)
  .add('default view', () => (
    <CenteredView>
      <ListItem
        languages={['EN', 'FR', 'SP']}
        title='Food & Beverage'
        subtitle='36 Cubes | Intermediate'
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbvvShjYo5DV4qqHbWT3p6q6VKwCT1rKslST3gRlELTyAWkLOa'
        onTap={action('tapped')}
        rightItem={{
          type: 'chevron'
        }}
      />
    </CenteredView>
  ))
  .add('with chip', () => (
    <CenteredView>
      <ListItem
        languages={['EN', 'FR', 'SP']}
        title='Food & Beverage'
        subtitle='36 Cubes | Intermediate'
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbvvShjYo5DV4qqHbWT3p6q6VKwCT1rKslST3gRlELTyAWkLOa'
        onTap={action('tapped')}
        rightItem={{
          type: 'chip',
          text: 'free',
          onPress: action('tapped')
        }}
      />
    </CenteredView>
  ))
  .add('with progress', () => (
    <CenteredView>
      <ListItem
        languages={['EN', 'FR', 'SP']}
        title='Food & Beverage'
        subtitle='36 Cubes | Intermediate'
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbvvShjYo5DV4qqHbWT3p6q6VKwCT1rKslST3gRlELTyAWkLOa'
        onTap={action('tapped')}
        rightItem={{
          type: 'progress',
          progress: 30
        }}
      />
    </CenteredView>
  ))
  .add('with icon (unchecked)', () => (
    <CenteredView>
      <ListItem
        languages={['EN', 'FR', 'SP']}
        title='Food & Beverage'
        subtitle='36 Cubes | Intermediate'
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbvvShjYo5DV4qqHbWT3p6q6VKwCT1rKslST3gRlELTyAWkLOa'
        onTap={action('tapped')}
        rightItem={{
          type: 'icon',
          onPress: action('tapped')
        }}
      />
    </CenteredView>
  ))
  .add('with icon (checked)', () => (
    <CenteredView>
      <ListItem
        languages={['EN', 'FR', 'SP']}
        title='Food & Beverage'
        subtitle='36 Cubes | Intermediate'
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbvvShjYo5DV4qqHbWT3p6q6VKwCT1rKslST3gRlELTyAWkLOa'
        onTap={action('tapped')}
        rightItem={{
          type: 'icon',
          checked: true,
          onTap: action('tapped')
        }}
      />
    </CenteredView>
  ))

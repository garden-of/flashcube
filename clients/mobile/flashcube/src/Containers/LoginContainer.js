import React, { useState, useEffect } from 'react'
import {
  View
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'

const LoginContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const [userId, setUserId] = useState('9')
  const [
    fetchOne,
    { data, isSuccess, isLoading, isFetching, error },
  ] = useLazyFetchOneQuery()

  useEffect(() => {
    fetchOne(userId)
  }, [fetchOne, userId])

  return (
    <View
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
      ]}
    >
    
    </View>
  )
}

export default LoginContainer

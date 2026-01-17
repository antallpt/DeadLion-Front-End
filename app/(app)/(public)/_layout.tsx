import { Colors } from '@/constants/theme'
import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false, contentStyle: { backgroundColor: Colors.white } }} />
        </Stack>
    )
}

export default Layout
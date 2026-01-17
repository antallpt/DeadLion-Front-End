import { Colors } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const AppleAuthButton = () => {
    return (
        <TouchableOpacity style={styles.appleButton}>
            <Ionicons name='logo-apple' size={18} color={Colors.white} />
            <Text style={styles.appleButtonText}> Sign in with Apple</Text>
        </TouchableOpacity >

    )
}

const styles = StyleSheet.create({
    appleButton: {
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        borderRadius: 12,
        borderCurve: 'continuous',
        gap: 5,
    },
    appleButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600'
    }
})

export default AppleAuthButton
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const GoogleAuthButton = () => {
    return (
        <TouchableOpacity style={styles.googleButton}>
            <Ionicons name='logo-google' size={18} color={Colors.white} />
            <Text style={styles.googleButtonText}> Continue with Google</Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    googleButton: {
        backgroundColor: Colors.google,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        borderRadius: 12,
        borderCurve: 'continuous',
        gap: 5,
    },
    googleButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600'
    }
})

export default GoogleAuthButton
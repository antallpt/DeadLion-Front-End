import { Colors } from '@/constants/theme';
import { SymbolView } from "expo-symbols";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface EmailAuthButtonProps {
    onPress?: () => void;
}

const EmailAuthButton = ({ onPress }: EmailAuthButtonProps) => {
    return (
        <TouchableOpacity style={styles.emailButton} onPress={onPress}>
            <SymbolView
                name='envelope'
                tintColor={Colors.black}
                size={22}
                weight='semibold'
            />
            <Text style={styles.emailButtonText}> Continue with Email</Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    emailButton: {
        backgroundColor: Colors.lightGray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        borderRadius: 12,
        borderCurve: 'continuous',
        gap: 5,
    },
    emailButtonText: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: '600'
    }
})

export default EmailAuthButton
import { Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
    text: string;
}

const BigButton = ({ text }: ButtonProps) => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.black,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        borderRadius: 12,
        borderCurve: 'continuous',
        gap: 5,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600'
    }
})

export default BigButton
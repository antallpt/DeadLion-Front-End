import { Colors } from '@/constants/theme';
import { SymbolView, type SFSymbol, type SymbolWeight } from 'expo-symbols';
import React, { useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

interface InputProps {
    placeholder?: string;
    icon?: SFSymbol;
    iconSize?: number;
    iconWeight?: SymbolWeight;
    secure?: boolean;
    value: string;
    onChangeText: (text: string) => void;
}

const InputField = ({
    placeholder,
    icon,
    secure = false,
    iconSize = 20,
    iconWeight = 'bold',
    value,
    onChangeText
}: InputProps) => {
    const inputRef = useRef<TextInput>(null)

    const handlePress = () => {
        inputRef.current?.focus()
    }

    return (
        <Pressable style={styles.container} onPress={handlePress}>
            {icon && (
                <View style={styles.iconContainer}>
                    <SymbolView
                        name={icon}
                        tintColor={Colors.black}
                        size={iconSize}
                        weight={iconWeight}
                    />
                </View>
            )}
            <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={Colors.black25}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secure}
            />
        </Pressable>


    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 52,
        width: '100%',
        backgroundColor: Colors.lightGray,
        borderRadius: 12,
        borderCurve: 'continuous',
        alignItems: 'center',
        paddingLeft: 15,
        gap: 15
    },
    iconContainer: {
        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600'
    }
})

export default InputField


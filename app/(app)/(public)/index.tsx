import AppleAuthButton from "@/components/auth/AppleAuthButton";
import EmailAuthButton from "@/components/auth/EmailAuthButton";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import BigButton from "@/components/BigButton";
import InputField from "@/components/InputField";
import SmoothInfiniteScroll from "@/components/SmoothInfiniteScroll";
import { Colors, Fonts } from "@/constants/theme";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from "react";
import { Dimensions, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Animated, { FadeInDown, runOnJS, useAnimatedReaction, useDerivedValue, useSharedValue } from 'react-native-reanimated';


const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SHEET_HEIGHT1 = (SCREEN_HEIGHT * 0.6) - 24;
const SHEET_HEIGHT2 = (SCREEN_HEIGHT * 0.72) - 24;

type SheetView = 'auth-options' | 'email-auth' | 'sign-up';

export default function Index() {
  const sheet = useRef<TrueSheet>(null)
  const currentViewShared = useSharedValue<SheetView>('auth-options')
  const [currentView, setCurrentView] = useState<SheetView>('auth-options')
  const [detents, setDetents] = useState<number[]>([0.6])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  // Derive detents from shared value
  const detentsShared = useDerivedValue(() => {
    return currentViewShared.value === 'email-auth' || currentViewShared.value === 'sign-up' ? 0.72 : 0.6
  })

  // Sync shared value with state for rendering
  useAnimatedReaction(
    () => currentViewShared.value,
    (value) => {
      runOnJS(setCurrentView)(value)
    }
  )

  // Sync detents with state
  useAnimatedReaction(
    () => detentsShared.value,
    (value) => {
      runOnJS(setDetents)([value])
    }
  )

  const present = async () => {
    currentViewShared.value = 'auth-options'
    setCurrentView('auth-options')
    setDetents([0.6])
    await sheet.current?.present()
  }

  // Dismiss the sheet ✅
  const dismiss = async () => {
    await sheet.current?.dismiss()
  }

  const handleEmailPress = () => {
    currentViewShared.value = 'email-auth'
    setCurrentView('email-auth')
    setDetents([0.72])
  }

  const handleBackPress = () => {
    currentViewShared.value = 'auth-options'
    setCurrentView('auth-options')
    setDetents([0.6])
  }

  const handleSignUp = () => {
    currentViewShared.value = 'sign-up'
    setCurrentView('sign-up')
    setDetents([0.72])
  }

  const handleSignIn = () => {
    currentViewShared.value = 'email-auth'
    setCurrentView('sign-up')
    setDetents([0.72])
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* Infinite Scroll View */}
      <View
        style={styles.container}>
        <View style={styles.infiniteScrollContainer}>
          <View>
            <SmoothInfiniteScroll scrollDirection="down" iconSet="set1" startOffset={0} />
          </View>
          <View>
            <SmoothInfiniteScroll scrollDirection="up" iconSet="set2" />
          </View>
          <View>
            <SmoothInfiniteScroll scrollDirection="down" iconSet="set3" startOffset={60} />
          </View>
          <LinearGradient
            colors={['transparent', Colors.white]}
            style={{
              position: 'absolute',
              height: 300,
              left: 0,
              bottom: 0,
              right: 0
            }}
          />
        </View>

        {/* Sheet View */}

        <TrueSheet
          ref={sheet}
          detents={detents}
          grabber
          grabberOptions={{
            topMargin: 10,
            color: Colors.lightGray
          }}
          insetAdjustment="never"
          backgroundColor={Colors.white}
          onDidDismiss={handleBackPress}
        >
          {currentView === 'auth-options' && (
            <View style={styles.sheetContainer1}>
              <Animated.View entering={FadeInDown.delay(150)}>
                <Text style={styles.sheetTitle}>Log in or create a DeadLion{"\n"}account</Text>
              </Animated.View>
              <View style={styles.sheetButtonContainer}>
                <Animated.View entering={FadeInDown.delay(200)}>
                  <AppleAuthButton />
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(250)}>
                  <GoogleAuthButton />
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(300)}>
                  <EmailAuthButton onPress={handleEmailPress} />
                </Animated.View>
              </View>
            </View>
          )}

          {currentView === 'email-auth' && (
            <View style={styles.sheetContainer2}>
              <View>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                  <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <Animated.View entering={FadeInDown.delay(150)}>

                  <Text style={styles.sheetTitle}>Continue with Email</Text>
                </Animated.View>
                <View style={{ marginTop: 41, gap: 16 }}>
                  <Animated.View entering={FadeInDown.delay(200)} >
                    <InputField icon="envelope" placeholder="Email" value={email} onChangeText={setEmail} />
                  </Animated.View>
                  <Animated.View entering={FadeInDown.delay(250)} >
                    <InputField icon="lock" placeholder="Password" value={password} secure={true} onChangeText={setPassword} />
                  </Animated.View>
                </View>
              </View>
              <View>
                <Animated.View entering={FadeInDown.delay(300)}>
                  <BigButton text="Log In" />
                </Animated.View>

                <TouchableOpacity style={styles.footerContainer} onPress={handleSignUp}>
                  <Text style={styles.footerText1}>Don't have an account? </Text>
                  <Text style={styles.footerText2}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {currentView === 'sign-up' && (
            <View style={styles.sheetContainer2}>
              <View>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                  <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <Animated.View entering={FadeInDown.delay(150)}>

                  <Text style={styles.sheetTitle}>Create an account</Text>
                </Animated.View>
                <View style={{ marginTop: 41, gap: 16 }}>
                  <Animated.View entering={FadeInDown.delay(200)} >
                    <InputField icon="envelope" placeholder="Email" value={email} onChangeText={setEmail} />
                  </Animated.View>
                  <Animated.View entering={FadeInDown.delay(250)} >
                    <InputField icon="lock" placeholder="Password" value={password} secure={true} onChangeText={setPassword} />
                  </Animated.View>
                  <Animated.View entering={FadeInDown.delay(300)} >
                    <InputField icon="lock" placeholder="Repeat Password" value={password2} secure={true} onChangeText={setPassword2} />
                  </Animated.View>
                </View>
              </View>
              <View>
                <Animated.View entering={FadeInDown.delay(350)}>
                  <BigButton text="Sign Up" />
                </Animated.View>

                <TouchableOpacity style={styles.footerContainer} onPress={handleSignIn}>
                  <Text style={styles.footerText1}>Already have an account? </Text>
                  <Text style={styles.footerText2}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </TrueSheet>

        {/* Bottom View */}

        <View style={styles.contentContainer}>
          <Text style={styles.headline}>DeadLion</Text>
          <Animated.Text entering={FadeInDown} style={styles.tagline}>No more deadly{"\n"}deadlines</Animated.Text>

          {/* Login Buttons */}
          <View style={styles.buttonContainer}>
            <Animated.View entering={FadeInDown.delay(100)}>
              {/* Apple Auth Button */}
              <AppleAuthButton />
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(200)}>
              {/* Google Auth Button */}
              <GoogleAuthButton />
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(300)}>
              {/* Apple Auth Button */}
              <TouchableOpacity style={styles.otherButton} onPress={present}>
                <Text style={styles.otherButtonText}>Other options</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20
  },
  headline: {
    fontFamily: Fonts.brand,
    fontSize: 55,
    transform: [{ rotate: '-4.67deg' }],
    marginVertical: 15
  },
  infiniteScrollContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    position: 'relative',
    overflow: 'hidden'
  },
  tagline: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 36
  },
  buttonContainer: {
    gap: 12,
    width: '100%'
  },
  otherButton: {
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 12,
    borderCurve: 'continuous',
  },
  otherButtonText: {
    fontSize: 16,
    fontWeight: '600'
  },
  sheetContainer1: {
    flex: 1,
    flexDirection: 'column',
    height: SHEET_HEIGHT1,
    padding: 24,
    marginTop: 24,
    justifyContent: 'space-between',
  },
  sheetContainer2: {
    flex: 1,
    flexDirection: 'column',
    height: SHEET_HEIGHT2,
    padding: 24,
    marginTop: 24,
    justifyContent: 'space-between',
  },
  sheetTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  sheetButtonContainer: {
    gap: 12,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.lightGray,
    textAlign: 'center',
    marginTop: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,
    marginBottom: 11
  },
  footerText1: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  footerText2: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.blue,
  }
})
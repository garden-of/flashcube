import * as Speech from 'expo-speech'

export function speak(text, language='en') {
    Speech.speak(text, { language })
}
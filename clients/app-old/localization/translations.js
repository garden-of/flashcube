import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

i18n.translations = {
    en: {
        nav: {
            home: 'Home',
            towers: 'Towers',
            profile: 'Profile'
        },
        profile: {
            fluent_in: 'fluent in',
            learning: 'learning',
            sets: 'sets',
            words_mastered: 'words mastered'
        },
        home: {

            select_languages: 'Select Languages to Learn',
            select_sets: 'Select Sets to Get Started',

            your_towers: 'Your Towers',
        },
        tower: {
            your_towers: 'Your Towers',
            find_new_towers: 'Find New Towers'
        }
    },
    es: {
        nav: {
            home: 'Inicio',
            towers: 'Torres',
            profile: 'Retrato'
        },
        profile: {
            fluent_in: 'fluido en',
            learning: 'aprendizaje',
            sets: 'conjuntos',
            words_mastered: 'palabras dominadas'
        },
        home: {

            select_languages: 'Seleccionar Idiomas Para Aprender',
            select_sets: 'Seleccione Conjuntos Para Comenzar',

            your_towers: 'Sus Torres',
        },
        tower: {
            your_towers: 'Sus Torres',
            find_new_towers: 'Encuentra Nuevas Torres'
        }
    }
}

i18n.locale = Localization.locale
i18n.defaultLocale = 'en_ES'
i18n.fallbacks = true

export const cleanLocale = i18n.locale.toString().toLowerCase().replace('_', '-')

export default i18n
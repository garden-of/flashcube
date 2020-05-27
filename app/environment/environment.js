import Constants from 'expo-constants'
import { Platform } from 'react-native'

const localhost = Platform.OS === 'ios' ? 'http://localhost:8000' : 'http://10.0.2.2:8000'

const ENV = {
    local: {
        apiUrl: localhost,
                
        internalClientId: 'Qw0hi6p6osnNqxAyE5w91TjjN6Y7bXDsIu3c1jQu',
        internalClientSecret: 'ZBuIFOAfme85rTBjtWbVkHtU1c7WrDJPhwT6bYzuy4aIGCDJnex0RWfl4V2oarG5vDoltSNYWaTHMEMb2NXGP4vCmyxpgRdc06Y2QKEczDSMdEWeOxeb6z1rm10c5rHS',
        
        fbAppId: '468157980709865',
        internalFacebookClientId: 'xY3XF1gjEsNXLtz63MDtljNB2sXASqFl1tVI8D2s',
        internalFacebookClientSecret: 'qBgnejmCZbHrX7pOfhFbkubuBzNpzmv0Bpjfnv34tb3Z6ZX3e9CQmC7lDcOqQtnE1I3JipCkm2zdTbr972V3SQrmt2PTBgqwSmYxXqRyOJDhEqH8uu1zlQPPcbujEdZs',

        googleClientId: '498982492232-reae9rludoenv1497jcc757lm44hdspq.apps.googleusercontent.com',
        internalGoogleClientId: 'ZV8cUWDl2kXSuuKLXgERFTgumJTJRHZkFA1rceYQ',
        internalGoogleClientSecret: 'sZA1wqz5E8eWWgpTNTb1G8uK6ymQuV1HqTaZCAvVb0umlLbOOpx0Uz9t2Yu5tfrbN0D9BZ4BMKC3i1ECHbuzV1peL0ran6nLP05YNJUpfkHZEpnmBCasdEguqVSC06Ih'
    },
    /*local: {
        apiUrl: 'http://stage.flashcube.co/',
        fbAppId: '693470401458341',
        internalClientId: 'M1ZhmlzIU0kbBYANvjENR4Y9xzUaj21e9o2spqeu',
        internalClientSecret: 'wthwp6PqHFRjvY2b8iD7zTD6CaCxEasNehUVR0OpzUrevs8vXTxgT0RUZpVWu3JFBxGfqzzPlgqBO4ixI8J65THECDg1exKRg8iV9ahGenUC1C3DRP3idVfCr2TVXqjR',
        googleClientId: '498982492232-reae9rludoenv1497jcc757lm44hdspq.apps.googleusercontent.com'
    },*/
    dev: {
        apiUrl: 'http://dev.flashcube.co/',
        fbAppId: '468157980709865',
        internalClientId: 'Qw0hi6p6osnNqxAyE5w91TjjN6Y7bXDsIu3c1jQu',
        internalClientSecret: 'ZBuIFOAfme85rTBjtWbVkHtU1c7WrDJPhwT6bYzuy4aIGCDJnex0RWfl4V2oarG5vDoltSNYWaTHMEMb2NXGP4vCmyxpgRdc06Y2QKEczDSMdEWeOxeb6z1rm10c5rHS',
        googleClientId: '498982492232-reae9rludoenv1497jcc757lm44hdspq.apps.googleusercontent.com'
    },
    stage: {
        apiUrl: 'http://stage.flashcube.co/',
        
        internalClientId: 'M1ZhmlzIU0kbBYANvjENR4Y9xzUaj21e9o2spqeu',
        internalClientSecret: 'wthwp6PqHFRjvY2b8iD7zTD6CaCxEasNehUVR0OpzUrevs8vXTxgT0RUZpVWu3JFBxGfqzzPlgqBO4ixI8J65THECDg1exKRg8iV9ahGenUC1C3DRP3idVfCr2TVXqjR',
        
        fbAppId: '693470401458341',
        internalFacebookClientId: 'grETPT2wJ75TgtBQyhMHYLOhyQro2l0PKyKErvau',
        internalFacebookClientSecret: 'aapIbC2NhshnnFCxIfCQAyBIk72o7wkWwql8NTzE7QwAzKShmgtdmfmfYoijVmub64vABa01zv8EvFQ12uC1eDgUgR4GAg63Hs41oGPUcQ1BhZSmemho0eH4jULnwGKi',

        googleClientId: '498982492232-5jrvq4681ecfdch007c54nohfrd76vmp.apps.googleusercontent.com',
        internalGoogleClientId: '76BkZ0ERE0j05auTh9B6q2HdaMVlDZFU9notpnyy',
        internalGoogleClientSecret: '61Gs3hXBScLRhfTBql6b8jcd7zO4hHi4AmtzoQVdUAR5v3e97vwhlJyN7oCOcASaLAVhnYW5Xcy4HsIURmbJuTIA5CHOpoF9xzPckB7IosgZNJ6SdCBlebsNJD26vkRw'
    },
    prod: {
        
    }
}

const getEnvVars = (env = Constants.manifest.releaseChannel) => {

    if(__DEV__) {
        return ENV.local
    } else if (env === 'dev') {
        return ENV.dev
    } else if (env === 'stage') {
        return ENV.stage
    } else if (env === 'prod') {
        return ENV.prod
    }
}

export default getEnvVars
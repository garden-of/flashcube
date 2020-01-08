import Constants from 'expo-constants'
import { Platform } from 'react-native'

const localhost = Platform.OS === 'ios' ? 'http://localhost:8000' : 'http://10.0.2.2:8000'

const ENV = {
    local: {
        apiUrl: localhost,
        fbAppId: '468157980709865',
        internalClientId: 'xY3XF1gjEsNXLtz63MDtljNB2sXASqFl1tVI8D2s',
        internalClientSecret: 'qBgnejmCZbHrX7pOfhFbkubuBzNpzmv0Bpjfnv34tb3Z6ZX3e9CQmC7lDcOqQtnE1I3JipCkm2zdTbr972V3SQrmt2PTBgqwSmYxXqRyOJDhEqH8uu1zlQPPcbujEdZs'
    },
    dev: {
        apiUrl: 'http://dev.flashcube.co/',
        fbAppId: '468157980709865',
        internalClientId: 'Qw0hi6p6osnNqxAyE5w91TjjN6Y7bXDsIu3c1jQu',
        internalClientSecret: 'ZBuIFOAfme85rTBjtWbVkHtU1c7WrDJPhwT6bYzuy4aIGCDJnex0RWfl4V2oarG5vDoltSNYWaTHMEMb2NXGP4vCmyxpgRdc06Y2QKEczDSMdEWeOxeb6z1rm10c5rHS'
    }
}

const getEnvVars = (env = Constants.manifest.releaseChannel) => {

    if(__DEV__) {
        return ENV.dev
    } else if (env === 'dev') {
        return ENV.dev
    }
}

export default getEnvVars
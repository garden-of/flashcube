import { connect } from 'react-redux'
import TowerList from '../components/TowerList'

import { listTowers } from '../reducers.js'

const mapStateToProps = state => {
    if (typeof state.towers == 'undefined') {
        return {
            towers: []
        }
    }
    let storedTowers = state.towers.map(tower => ({ key: String(tower.id), ...tower}))
    return {
        towers: storedTowers
    }
}

const mapDispatchToProps = {
    listTowers
}

const TowerListContainer = connect(mapStateToProps, mapDispatchToProps)(TowerList)

export default TowerListContainer
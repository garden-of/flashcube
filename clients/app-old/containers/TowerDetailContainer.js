import { connect } from 'react-redux'
import TowerDetail from '../components/TowerDetail.js'

import { getTower, getCategories } from '../reducers.js'

const mapStateToProps = state => {
    return {
        tower: state.currentTower,
        categories: state.categories ? state.categories : [],
        loading: state.currentTower ? false : true
    }
}

const mapDispatchToProps = {
    getTower,
    getCategories
}

const TowerDetailContainer = connect(mapStateToProps, mapDispatchToProps)(TowerDetail)

export default TowerDetailContainer
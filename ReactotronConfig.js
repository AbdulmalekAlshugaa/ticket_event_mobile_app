import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

Reactotron.configure({name: 'events-app'})
.useReactNative()
.use(reactotronRedux())
.connect()
.createEnhancer()
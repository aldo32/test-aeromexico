//Libraries
import { configureStore } from '@reduxjs/toolkit'

//Components
import characterReducer from './characterSlice'

export default configureStore({
  reducer: {
    character: characterReducer,
  }
})
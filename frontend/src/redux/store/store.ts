import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/UserSlice';
// Import other reducers as needed

const store = configureStore({
    reducer: {
        user: userReducer,
        // Add other reducers here
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


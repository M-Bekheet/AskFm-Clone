import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import { userReducer } from './slices/user';

const storage = createWebStorage('local');

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
});

export { rootPersistConfig, rootReducer };

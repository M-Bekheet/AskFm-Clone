import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import { userReducer } from './slices/user';

const isClient = typeof window !== 'undefined';

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

// avoiding localStorage setup for Next.js server
const storage = isClient ? createWebStorage('local') : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  keyPrefix: 'redux-',
  storage,
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

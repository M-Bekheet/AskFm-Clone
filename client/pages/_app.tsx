import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { AuthGuard } from '../components/Auth/Guards';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </Provider>
  );
}

export default MyApp;

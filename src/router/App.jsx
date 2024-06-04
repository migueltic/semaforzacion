import Home from '../pages/Home';
import { AppProvider } from '../utils/Context';

export default function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}
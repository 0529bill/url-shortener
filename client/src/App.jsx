import { ContextApiProvider } from '@/contextProvider';
import Dashboard from './components/dashboard';

function App() {
  return (
    <ContextApiProvider>
      <div className='App'>
        <Dashboard />
      </div>
    </ContextApiProvider>
  );
}

export default App;

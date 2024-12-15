import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './layout';
import { TransactionProvider } from './context/TransactionContext';

function App() {
  return (
    <TransactionProvider>
      <Layout/>
    </TransactionProvider>
  )
}

export default App

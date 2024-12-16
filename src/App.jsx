import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './layout';
import { TransactionProvider } from './context/TransactionContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <TransactionProvider>
      <ToastContainer position='top-center'/>
      <Layout/>
    </TransactionProvider>
  )
}

export default App

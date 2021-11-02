import './App.less'
import 'antd/dist/antd.less';
import AllRoutes from './routes'
import { HeadProvider } from 'react-head';

function App () {
  return <HeadProvider>
    <AllRoutes />
  </HeadProvider>
}

export default App

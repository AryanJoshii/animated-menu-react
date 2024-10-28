import { createRoot } from 'react-dom/client';
import App from './App';
import '../public/assets/css/styles.css'

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

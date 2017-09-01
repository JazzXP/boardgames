import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import * as styles from './styles/global.scss';

ReactDOM.render(<App className={styles.App} />, document.getElementById('root'));
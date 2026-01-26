import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { App } from './presentation/App';
import './presentation/styles.css';

/**
 * @ssot この関数はSSOT参照のみでUI初期化を行います。
 * @accuracy 精度要件は±0.3mmに基づき、描画はSSOT値をそのまま使用します。
 * @algorithm Reactのルートを生成し、PWAのService Workerを登録します。
 */
const bootstrap = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    return;
  }
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  /**
   * @ssot Service Worker登録はSSOT参照に影響しません。
   * @accuracy SSOTの数値精度を変更しない補助処理です。
   * @algorithm PWAの自動更新登録を行います。
   */
  const registerServiceWorker = () => {
    registerSW({ immediate: true });
  };

  registerServiceWorker();
};

bootstrap();

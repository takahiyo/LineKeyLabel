import { useEffect } from 'react';
import { uiConfig } from '../../config/uiConfig';

const toKebabCase = (value: string) =>
  value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * @ssot uiConfigの値をCSS変数としてドキュメントルートに注入します。
 * @accuracy JS側の定義を正とし、CSS側はvar(--name)で参照のみを行います。
 * @algorithm Object.entriesで走査し、--color-key の形式でsetPropertyします。
 */
export const useThemeSync = () => {
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(uiConfig.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${toKebabCase(key)}`, value);
    });
  }, []);
};

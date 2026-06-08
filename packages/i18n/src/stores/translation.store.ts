import { derived } from 'svelte/store';

import { lang } from './lang.store';

export const t = derived(lang, ($lang) => {
  return (key: string) => {};
});

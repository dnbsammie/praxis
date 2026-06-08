import { writable } from 'svelte/store';

import type { Lang } from '../types/lang.types';

export const DEFAULT_LANG: Lang = 'en';

export const lang = writable<Lang>(DEFAULT_LANG);

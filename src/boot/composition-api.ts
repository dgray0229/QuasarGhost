import { createApp } from 'vue';
import createCompositionApi from '@vue/composition-api';

const app = createApp({});
app.use(createCompositionApi);

export default app;

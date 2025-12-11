import { test } from '@playwright/test';
import { StandardShoppingFlow } from './standardShoppingFlow';

test('Shopping flow using abstract class and concrete implementation', async ({ page }) => {
  const flow = new StandardShoppingFlow(page);

  await flow.runFlow();
});

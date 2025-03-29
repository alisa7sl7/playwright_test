import { test, expect, Page, Locator } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator
  name: string
  text?: string
  attribute?: {
    type: string
    value: string
  }
}

const lightMode = ['light', 'dark']

const elements: Elements[] = [
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo link',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/'
    }
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs',
    attribute: {
      type: 'href',
      value: '/docs/intro'
    }
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'API link',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright'
    }
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js button',
    text: 'Node.js'
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
    name: 'Community link',
    text: 'Community'
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub icon',
    attribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright'
    }
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord icon',
    attribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord'
    }
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Lightmode icon'
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
    name: 'Search input'
  },
  {
    locator: (page: Page): Locator => page.getByRole('heading', { name: 'Playwright enables reliable' }),
    name: 'title', 
    text: 'Playwright enables reliable end-to-end testing for modern web apps.'
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
    name: 'Get started button',
    text: 'Get started',
    attribute: {
      type: 'href',
      value: '/docs/intro'
    }
  }
]

const URL = 'https://playwright.dev/'

test.describe('Тесты главной страницы', ()=> {
    test.beforeEach(async ({page})=> {
    await page.goto(URL);
  })

test('Проверка отображения элементов навигации (header)', async ({ page }) => {
  elements.forEach(({locator, name})=> {
  test.step(`Проверка отображения ${name}`, async()=> {
    await expect
    .soft(locator(page))
    .toBeVisible()
    }) 
  })
});

test('Проверка названий элементов навигации (header)', async ({ page }) => {
  elements.forEach(({locator, name, text})=> {
    if (text){
      test.step(`Проверка названия элемента ${name}`, async()=> {
        await expect
        .soft(locator(page))
        .toContainText(text);
    })
    } 
  })
});

test('Проверка аттрибутов href элементов навигации (header) ', async ({ page }) => {

    elements.forEach(({locator, name, attribute})=> {
    if (attribute){
      test.step(`Проверка аттрибутов href элемента ${name}`, async()=> {
        await expect
        .soft(locator(page))
        .toHaveAttribute(attribute.type, attribute.value);
    })
    } 
  })
});

test('Проверка переключения лайт мода', async ({ page }) => {

  await page.getByRole('button', { name: 'Switch between dark and light' }).click()
  await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark')
});

lightMode.forEach((value)=> {
  test(`Проверка стилей активного ${value} мода `, async ({page})=> {
    await page.evaluate((value)=> {
      document.querySelector('html')?.setAttribute('data-theme',value)
    }, value)
    await expect(page).toHaveScreenshot(`pageWith${value}Mode.png`);
})
})

})






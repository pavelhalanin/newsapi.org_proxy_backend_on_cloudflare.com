## Какую проблему решает этот код

У нас есть API новостей, но там в HTTP GET параметре передаются API ключ.

Если бы будем на своем front end использовать запрос, то в режиме разработчика любой человек может увидеть этот API ключ.

Данный код будет выполнять запросы на своем backend.

Категории новостей:
- Было: `https://newsapi.org/v2/sources?apiKey=МойApiКлюч`
- Стало: `https://МойПодДоменНаCloudFlare.workers.dev/v2/sources`

Новости:
- Было: `https://newsapi.org/v2/everything?apiKey=МойApiКлюч&sources=abc-news-au`
- Стало: `https://МойПодДоменНаCloudFlare.workers.dev/v2/everything?sources=abc-news-au`

То есть теперь мы пользуемся другой ссылкой, где не видно, что мы передаем GET параметр apiKey.

## Как создать

1. Открываю https://dash.cloudflare.com/
2. Жму `Compute`
3. Жму `Workers & Pages`
4. Жму `Create application`
5. Жму `Start with Hello World!`
6. Жму `Deploy`
7. Жму `Edit code`
8. Пишу код: [worker.js](./worker.js)
9. Жму `Deploy`
10. Из поля `Preview` беру ссылку `https://МойПодДоменНаCloudFlare.workers.dev/` и подставляю туда свои GET параметры без API ключа:
- `https://МойПодДоменНаCloudFlare.workers.dev/v2/sources` - категории новостей
- `https://МойПодДоменНаCloudFlare.workers.dev/v2/everything?sources=abc-news-au` - новости

# Frontend-приложение международной конференции

Некоторая компания Альт готовится к проведению международной конференции, которая предоставит платформу для обмена знаниями и опытом среди специалистов, а самой компании возможность нанять высококвалифицированных разработчиков. Успех мероприятия во многом зависит от первого впечатления, которое произведет внешний вид нашего сайта конференции. К этому событию у нас уже есть готовый проект, но он не предназначался для международной аудитории.

Вам предстоит подготовить этот проект для отображения на следующих языках: русский (ru), английский (en), арабский (ar). Далее эти языки будут считаться поддерживаемыми в данном проекте.

### Что должно получиться:

1. При указании в URL-пути поддерживаемого языка и открытии любой страницы приложения (например, http://localhost:3000/en/program), интерфейс должен отображаться на соответствующем языке

2. Интерфейс приложения должен отображаться с учетом направления потока текста, характерного для текущего языка (слева-направо или справа-налево)

3. Если в URL-пути отсутствует или указан неподдерживаемый язык, то нужно показать интерфейс на языке пользователя в соответствии со следующими правилами:

    - использовать язык из куки `i18n-l10n-conf-lang`
    - если кука отсутствует, использовать язык из HTTP-заголовка `Accept-Language` и установить в куки пользователю этот язык
    - если получить поддерживаемый язык из куки и заголовка не получилось, показывать интерфейс на английском языке (например, http://localhost:3000/en)

4. В собранной для продакшена версии приложения не должно быть исходных текстов на русском языке (например, при открытии страницы приложения на английском языке в загружаемых данных должны отсутствовать исходные тексты на русском)

5. Для каждой страницы приложения должны загружаться только необходимые для данной страницы переводы (а не все сразу для всех страниц)

6. Нужно доработать компонент выбора языка `lang-select`, чтобы при выборе языка открывалась страница на выбранном языке

### Условия:

-   используйте в проекте Code First подход к переводам
-   переводы нужно брать из файла `translations.json` в корне проекта, никакие другие переводы использовать не нужно (а также разбивать текст переводов у ключей на отдельные части)
-   название бренда для текущего языка нужно брать из файла [`src/shared/brand-names.ts`](./src/shared/brand-names.ts)
-   список ключей переводов, используемых на каждой странице, находится в файле [`src/page-translation-keys.ts`](./src/page-translation-keys.ts)
-   все числовые значения (дата, время и т.д.) должны отображаться с использованием привычных для нас обычных арабских цифр для всех языков (например, 2024, а не индо-арабские ٢٠٢٤)
-   должны проходить линтеры по команде `npm run lint`
-   приложение должно собираться и работать по командам `npm run build` и `npm run start`

### Ограничения:

-   версия Node.js - 20.14.0
-   можно использовать только пакеты, указанные в `package.json`
-   не удаляйте `data-testid` атрибуты и не меняйте текущую структуру html-элементов приложения
-   текущий язык отображения интерфейса **всегда** должен присутствовать в URL-пути (например, http://localhost:3000/en/program или http://localhost:3000/ru)
-   тесты будут запускаться в браузере Desktop Chrome версии 125

### Что нужно сделать:

1.  Для настройки роутинга с поддерживающими языками используйте [встроенное в Next.js решение][Routing: Internationalization | Next.js]

2.  Для интернационализации проекта используйте библиотеку `react-intl` от [Format.JS]. Не используйте самописные решения или различные самописные обертки над `react-intl`

3.  Для парсинга языков из заголовка `Accept-Language` используйте пакет `accept-language-parser`

4.  Для удаления исходных текстов на русском языке используйте babel плагин [babel-plugin-formatjs][babel-plugin-formatjs | Format.JS]

5.  Для загрузки только необходимых переводов для страницы можно использовать [getInitialProps](https://nextjs.org/docs/pages/api-reference/functions/get-initial-props)

6.  На арабском языке приложение должно отображаться с направлением потока текста справа-налево (rtl), а на русском и английском языках - слева-направо (ltr)

7.  Использовать [компиляцию переводов][Advanced Usage | Format.JS] для уменьшения размера бандла приложения [опционально]

### Как сдавать:

Загрузите архив с решением в формате `.zip`. В корне этого архива сразу должны находится файлы приложения (то есть располагаться `package.json`) без вложенной поддиректории. Также из отправляемого архива необходимо удалить папку `node_modules`. При проверке вашего решения для запуска приложения будут использоваться команды `npm run build` и `npm run start`, перед отправкой убедитесь, что они работают

Скачать исходный проект можно по [ссылке](https://disk.yandex.ru/d/uQXmmLjrM_cRyg)

### Полезные ссылки:

[Routing: Internationalization | Next.js]

[Format.JS]

[babel-plugin-formatjs | Format.JS]

[Advanced Usage | Format.JS]

[Routing: Internationalization | Next.js]: https://nextjs.org/docs/pages/building-your-application/routing/internationalization
[Format.JS]: https://formatjs.io/
[babel-plugin-formatjs | Format.JS]: https://formatjs.io/docs/tooling/babel-plugin
[Advanced Usage | Format.JS]: https://formatjs.io/docs/guides/advanced-usage
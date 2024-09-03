# Добро пожаловать на страницу мессенджера!

Данный мессенджер разработан в учебных целях на основе дизайна:
[Figma](https://www.figma.com/design/LMfW2rHipH0EK1Fm3nzvXD/%D0%9C%D0%B5%D1%81%D1%81%D0%B5%D0%BD%D0%B4%D0%B6%D0%B5%D1%80?node-id=0-1&t=lDsg7NtHj7kdZTyz-1)

---

## Демо-версия

Данный проект находится в стадии разработки, поэтому вы можете просматривать текующий интерфейс по ссылке:

- [Авторизация](https://anillenmessenger.netlify.app)
- [Регистрация](https://anillenmessenger.netlify.app/sign-up)
- [Чаты](https://anillenmessenger.netlify.app/messenger)
- [Профиль](https://anillenmessenger.netlify.app/settings)

### Страницы ошибок:

- [404](https://anillenmessenger.netlify.app/error/404)
- [5\*\*](https://anillenmessenger.netlify.app/error/500)

---

## В чем польза проекта?

Проект позволяет понять основы построения веб приложения с помощью шаблонизатора Handlebars, с использованием сборщика Vite и препроцессора Sass.

Данное веб-приложение является SPA. В основе лежит компонент Block, который имеет свой жизненный цикл на основе технологии EventBus, что позволяет не обновлять страницу при изменении страниц и данных.

Разработан собственный роутер, который в зависимости от адресной строки определяет какую страницу необходимо отрисовать.

Приложение подклчючено к серверу api и может выполнять базовые функции, такие как регистрация пользователя, авторизация, смена данных пользователя, создание чатов, добавление пользователей в чаты и удаление пользователей из чата.

Реализованы автотесты для проверки основных компонентов системы с помощью Mocha, Chai, Sinon, а также Husky для pre-commit хука.
---

## Используемые технологии

![Static Badge](https://img.shields.io/badge/typescript-blue)
![Static Badge](https://img.shields.io/badge/handlebars-orange)
![Static Badge](https://img.shields.io/badge/vite-purple)
![Static Badge](https://img.shields.io/badge/eslint-blue)
![Static Badge](https://img.shields.io/badge/git-black)

---

## Как установить и запустить проект?

Чтобы установить проект - необходимо:

1. `git clone [ссылка на репозиторий]` - клонировать репозиторий к себе на локальный компьютер.
2. `npm run dev` - запустить проект в режиме разработки
3. `npm run build` - собрать проект
4. `npm run checkTypes` - запустить проверку типов
5. `npm run test` - запустить автотесты
6. `npm start` - запустить публичную версию проекта со всеми тестами

# GoogleMapMessages

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0-rc.1.

  <p>Это - тестовое задание компании "Матрешка", в котором необходимо отобразить набор данных в виде сообщений в чате на карте. Для этого необходимо было реализовать графический интерфейс фильтрации сообщений в разрезе элемента аналитики - календарная дата. Группировка сообщений выполнена по разрезу аналитики (свойства элемента сообщения) - центр-перефирия и геоточка(широта/долгота). Данные динамические, т.е. когда на сервер приходит сообщение чата, оно сразу распространяется всем подключенным клиентам и отображается и в фильтре, и на карте.<br>
  Это приложение написано на "Angular 5", с использованием angular-CLI 1.6 с настройками сервисного рабочего, компановщиком Webpack.<br>
  Сервер приложения - Host Firebase, с использованием базы данных Firebase database, с настроенной Cloud functions для загрузки первоначальных данных через библиотеку FireAdmin. На сервере настроена аутентификация (несколько типов) при старте приложения. В Git репозиторий заглянуть можно <a target="_blank" href="https://github.com/mechtool/google-map-messages.git">тут</a>, в нем лежит сырая версия приложения (до компиляции компановщиком и без файла конфигурации firebase), а сайт <a target="_blank" href="https://gis-message-bdccb.firebaseapp.com/">тут</a></p>


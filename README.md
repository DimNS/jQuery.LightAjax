# jQuery.LightAjax
Фасад для ajax-методов get и post, со встроенным прелоадером

## Требования
1. jQuery v3+

## Установка
```bash
npm i jquery-lightajax
```

## Подключение
```html
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<link rel="stylesheet" href="dist/jquery.lightajax.min.css">
<script type="text/javascript" src="dist/jquery.lightajax.min.js"></script>
```

## Параметры, установленные по умолчанию
```
{
    settings: {
        classColor   : '',
        callbackAlert: function (title, message) {
            alert(message);
        }
    },
    ajax    : {
        crossDomain: true,
        timeout    : 20000,
        dataType   : 'json',
        cache      : false
    }
}
```
\* По умолчанию цвет прелоадера белый `#ffffff`, указав свой класс вы можете переопределить цвет прелоадера

## Инициализация
```javascript
// Создание объекта с настройками по умолчанию
var lightajax = new LightAjax();

// Дополнительные настройки или переопределение настроек по умолчанию
var lightajax = new LightAjax({
    settings: {
        classColor   : 'text-white',
        callbackAlert: function (title, message) {
            swal(title, message, 'error');
        }
    },
    ajax    : {
        beforeSend: function (xhr, settings) {
            if (!/^(HEAD|OPTIONS|TRACE)$/i.test(settings.type)) {
                xhr.setRequestHeader("X-SESSION-ID", $('meta[name="_session"]').attr('content'));
            }
        }
    }
});
```

## Использование
```javascript
// Программное отображение и скрытие прелоадера
// Отображением можно управлять передавая первый параметр в методы ниже)
lightajax.preloader('show');
lightajax.preloader('hide');

// GET-запрос
lightajax.get(true, '/path/to/server', {
    'param1': 'value1',
    'param2': 'value2'
}, function(result) {
    // success code
    lightajax.preloader('hide');
    console.log(result);
});

// POST-запрос
lightajax.post(true, '/path/to/server', {
    'param1': 'value1',
    'param2': 'value2'
}, function(result) {
    // success code
    lightajax.preloader('hide');
    console.log(result);
});
```

## Особенности
Управлять отключением прелоадера в success-функции необходимо самостоятельно. Т.к. вам может понадобиться совершить цепочки вызовов и тогда вы захотите отключить прелоадер только в самом конце.

В случае ошибки при совершении запроса прелоадер выключится автоматически.

## Скрытные запросы
Для совершения "тихих"-запросов без прелоадера, просто укажите первый параметр `false` и тогда нет необходимости вызывать скрытие прелоадера внутри success-функции.
```javascript
lightajax.get(false, '/path/to/server', {
    'param1': 'value1',
    'param2': 'value2'
}, function(result) {
    // success code
    console.log(result);
});
```

## Переопределение настроек для одного запроса
Если понадобилось выполнить запрос с параметрами отличными от дефолтных можно передать новые параметры в запрос:
```javascript
lightajax.post(true, '/path/to/server', {
    'param1': 'value1',
    'param2': 'value2'
}, function(result) {
    // success code
    lightajax.preloader('hide');
    console.log(result);
}, {
    contentType: 'multipart/form-data; charset=utf-8; boundary="boundary"'
});
```
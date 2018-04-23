# jQuery.LightAjax

Фасад для ajax-методов get и post, со встроенным прелоадером

## Требования
1. jQuery v2+

## Установка
```bash
bower install --save jquery-lightajax
```

## Подключение
```html
<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>

<link rel="stylesheet" href="dist/jquery.lightajax.min.css">
<script type="text/javascript" src="dist/jquery.lightajax.min.js"></script>
```

## Инициализация
```javascript
// Параметры, установленные по умолчанию
var settingsDefault = {
    callbackAlert: function (title, message) {
        alert(message);
    },
    settings     : {
        color: '#fff'
    },
    ajax         : {
        crossDomain: true,
        timeout    : 20000,
        dataType   : 'json',
        cache      : false
    }
};

// Создание объекта с настройками по умолчанию
var lightajax = new LightAjax();

// Дополнительные настройки или переопределение настроек по умолчанию
var lightajax = new LightAjax({
    callbackAlert: function (title, message) {
        swal(title, message, 'error');
    },
    settings     : {
        color: 'red'
    },
    ajax         : {
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
(function () {
    if (!window.hasOwnProperty('LightAjax')) window.LightAjax = LightAjax;

    // db      d888888b  d888b  db   db d888888b  .d8b.     d88b  .d8b.  db    db
    // 88        `88'   88' Y8b 88   88 `~~88~~' d8' `8b    `8P' d8' `8b `8b  d8'
    // 88         88    88      88ooo88    88    88ooo88     88  88ooo88  `8bd8'
    // 88         88    88  ooo 88~~~88    88    88~~~88     88  88~~~88  .dPYb.
    // 88booo.   .88.   88. ~8~ 88   88    88    88   88 db. 88  88   88 .8P  Y8.
    // Y88888P Y888888P  Y888P  YP   YP    YP    YP   YP Y8888P  YP   YP YP    YP
    //
    //

    /**
     * Фасад для ajax-методов get и post, со встроенным прелоадером
     *
     * @param {object} options Параметры
     *
     * @version 21.04.2020
     * @author  DimNS <atomcms@ya.ru>
     */
    function LightAjax(options) {
        if (typeof options === 'object' && options !== null) {
            if (!options.hasOwnProperty('ajax')) {
                options.ajax = {};
            }

            if (!options.hasOwnProperty('settings')) {
                options.settings = {};
            }
        } else {
            options = {
                ajax    : {},
                settings: {}
            };
        }

        // Настройки по-умолчанию, расширяя их с помощью параметров, которые были переданы
        LightAjax.prototype._optionsDefault = Object.assign({
            crossDomain: true,
            timeout    : 20000,
            dataType   : 'json',
            cache      : false
        }, options.ajax);

        var settings = Object.assign({
            classColor   : '',
            callbackAlert: function (title, message) {
                alert(message, title);
            }
        }, options.settings);

        LightAjax.prototype._callbackAlert = settings.callbackAlert;

        // Создаем html-код
        if (jQuery('#js-lightajax-preloader').length === 0) {
            jQuery('body').append(
                '<div id="js-lightajax-overlay" class="lightajax__overlay"></div>' +
                '<div id="js-lightajax-preloader" class="lightajax__preloader">' +
                '<div class="lightajax__loader ' + settings.classColor + '"></div>' +
                '</div>'
            );
        }
    }

    // d8888b. d8888b. d88888b db       .d88b.   .d8b.  d8888b. d88888b d8888b.
    // 88  `8D 88  `8D 88'     88      .8P  Y8. d8' `8b 88  `8D 88'     88  `8D
    // 88oodD' 88oobY' 88ooooo 88      88    88 88ooo88 88   88 88ooooo 88oobY'
    // 88~~~   88`8b   88~~~~~ 88      88    88 88~~~88 88   88 88~~~~~ 88`8b
    // 88      88 `88. 88.     88booo. `8b  d8' 88   88 88  .8D 88.     88 `88.
    // 88      88   YD Y88888P Y88888P  `Y88P'  YP   YP Y8888D' Y88888P 88   YD
    //
    //

    /**
     * Показать \ Скрыть окно ожидания ответа AJAX
     *
     * @param {string} action Действие (show|hide)
     *
     * @version 29.05.2019
     * @author  Дмитрий Щербаков <atomcms@ya.ru>
     */
    LightAjax.prototype.preloader = function (action) {
        if (action === 'show') {
            jQuery('#js-lightajax-overlay, #js-lightajax-preloader').show();
        } else if (action === 'hide') {
            jQuery('#js-lightajax-overlay, #js-lightajax-preloader').hide();
        }
    };

    //  d888b  d88888b d888888b
    // 88' Y8b 88'     `~~88~~'
    // 88      88ooooo    88
    // 88  ooo 88~~~~~    88
    // 88. ~8~ 88.        88
    //  Y888P  Y88888P    YP
    //
    //

    /**
     * Выполнить запрос get
     *
     * @param {boolean}  preloader Показывать прелоадер ожидания
     * @param {string}   url       Адрес запроса
     * @param {object}   data      Объект параметров для запроса
     * @param {function} success   Действие при успешном завершении
     * @param {object}   options   Переопределение настроек по умолчанию
     *
     * @version 10.10.2019
     * @author  Дмитрий Щербаков <atomcms@ya.ru>
     */
    LightAjax.prototype.get = function (preloader, url, data, success, options) {
        LightAjax.prototype._query('GET', preloader, url, data, success, options);
    };

    // d8888b.  .d88b.  .d8888. d888888b
    // 88  `8D .8P  Y8. 88'  YP `~~88~~'
    // 88oodD' 88    88 `8bo.      88
    // 88~~~   88    88   `Y8b.    88
    // 88      `8b  d8' db   8D    88
    // 88       `Y88P'  `8888Y'    YP
    //
    //

    /**
     * Выполнить запрос post
     *
     * @param {boolean}  preloader Показывать прелоадер ожидания
     * @param {string}   url       Адрес запроса
     * @param {object}   data      Объект параметров для запроса
     * @param {function} success   Действие при успешном завершении
     * @param {object}   options   Переопределение настроек по умолчанию
     *
     * @version 10.10.2019
     * @author  Дмитрий Щербаков <atomcms@ya.ru>
     */
    LightAjax.prototype.post = function (preloader, url, data, success, options) {
        LightAjax.prototype._query('POST', preloader, url, data, success, options);
    };

    //          .d88b.  db    db d88888b d8888b. db    db
    //         .8P  Y8. 88    88 88'     88  `8D `8b  d8'
    //         88    88 88    88 88ooooo 88oobY'  `8bd8'
    //         88    88 88    88 88~~~~~ 88`8b      88
    //         `8P  d8' 88b  d88 88.     88 `88.    88
    // C88888D  `Y88'Y8 ~Y8888P' Y88888P 88   YD    YP
    //
    //

    /**
     * Выполнить запрос
     *
     * @param {string}   type      Тип запроса (GET|POST)
     * @param {boolean}  preloader Показывать прелоадер ожидания
     * @param {string}   url       Адрес запроса
     * @param {object}   data      Объект параметров для запроса
     * @param {function} success   Действие при успешном завершении
     * @param {object}   options   Переопределение настроек по умолчанию
     *
     * @version 21.04.2020
     * @author  Дмитрий Щербаков <atomcms@ya.ru>
     */
    LightAjax.prototype._query = function (type, preloader, url, data, success, options) {
        if (preloader) {
            LightAjax.prototype.preloader('show');
        }

        if (typeof options !== 'object') {
            options = {};
        }

        var settings = Object.assign({}, LightAjax.prototype._optionsDefault, {
            method : type,
            data   : data,
            success: success,
            error  : function (xhr, status) {
                if (preloader) {
                    LightAjax.prototype.preloader('hide');
                }

                LightAjax.prototype._error(status);
            }
        }, options);

        jQuery.ajax(url, settings);
    };

    //         d88888b d8888b. d8888b.  .d88b.  d8888b.
    //         88'     88  `8D 88  `8D .8P  Y8. 88  `8D
    //         88ooooo 88oobY' 88oobY' 88    88 88oobY'
    //         88~~~~~ 88`8b   88`8b   88    88 88`8b
    //         88.     88 `88. 88 `88. `8b  d8' 88 `88.
    // C88888D Y88888P 88   YD 88   YD  `Y88P'  88   YD
    //
    //

    /**
     * Показать ошибку выполнения AJAX
     *
     * @param {string} status Код ошибки
     *
     * @version 20.03.2018
     * @author  Дмитрий Щербаков <atomcms@ya.ru>
     */
    LightAjax.prototype._error = function (status) {
        var message = 'Неизвестная ошибка (' + status + ')';

        switch (status) {
            case 'timeout'    :
                message = 'Время ожидания истекло';
                break;

            case 'parsererror':
                message = 'Ошибка парсера';
                break;

            case 'abort'      :
                message = 'Запрос был отменён';
                break;

            case 'error'      :
                message = 'Произошла ошибка сервера';
                break;
        }

        LightAjax.prototype._callbackAlert('Произошла ошибка', message);
    };
})();
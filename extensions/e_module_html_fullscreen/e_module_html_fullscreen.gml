
#define html_fullscreen_extension_init
{
    if (!html_fullscreen_extension_available()) {
        return;
    }

    var _canvasContainerSelector = ".gm4html5_div_class";

    e_gms_module_html_fullscreen_set_overflow_hidden({
        applyToBody: 1,
        applyToCanvas: 1,
        applyToContainerCanvas: _canvasContainerSelector
    });

    e_gms_module_html_fullscreen_set_fullscreen_canvas({
        fullscreenCanvas: 1,
    });

    e_gms_module_html_fullscreen_set_prevent_default_mobile_touch({
        selectorContainerCanvas: _canvasContainerSelector,
        preventDefaultMobileTouch: 1,
    });

    e_gms_module_html_fullscreen_set_active_touches({
        setActiveTouches: 1,
    });
}

#define html_fullscreen_extension_available
{
    if (os_browser == browser_not_a_browser) {
        return false;
    }

    return true;
}

#define html_fullscreen
{
    return html_fullscreen_custom(browser_width, browser_height);
}

#define html_fullscreen_by_width
{
    var _width = argument0;
    var _height = browser_height / browser_width * _width;

    return html_fullscreen_custom(_width, _height);
}

#define html_fullscreen_by_height
{
    var _height = argument0;
    var _width = browser_width / browser_height * _height;

    return html_fullscreen_custom(_width, _height);
}

#define html_fullscreen_custom
{
    if (os_browser == browser_not_a_browser) {
        return;
    }

    var _width = argument0;
    var _height = argument1;

    window_set_size(
        _width,
        _height,
    );

    return {
        width: _width,
        height: _height,
    }
}

#define html_fullscreen_touches_raw
{
    var _memory = (function() {
        static _memory = {
            now: -1,
            touches: [],
        };
        return _memory;
    })();

    if (!html_fullscreen_extension_available()) {
        return _memory;
    }

    var _now = e_gms_module_html_fullscreen_get_touches_now();
    if (_now == _memory.now) {
        return _memory;
    }

    var _json_string =
        e_gms_module_html_fullscreen_get_touches();
    
    var _json = json_parse(_json_string);
    
    _memory.now = _now;
    _memory.touches = _json.touches;

    var _win_w = window_get_width();
    var _win_h = window_get_height();
    var _gui_w = display_get_gui_width();
    var _gui_h = display_get_gui_height();

    var _length = array_length(_memory.touches);
    var _touch;
    for (var i = 0; i < _length; ++i) {
        _touch = _memory.touches[i];

        _touch.win_x = _touch.xcf * _win_w;
        _touch.win_y = _touch.ycf * _win_h;
        _touch.gui_x = _touch.xcf * _gui_w;
        _touch.gui_y = _touch.ycf * _gui_h;
    }

    return _memory;
}

#define html_fullscreen_touches
{
    if (!html_fullscreen_extension_available()) {
        return [];
    }

    var _memory = html_fullscreen_touches_raw();
    var _length = array_length(_memory.touches);

    var _touches = [];
    var _touch;
    var _touch_clone;
    for (var i = 0; i < _length; ++i) {
        _touch = _memory.touches[i];
        _touch_clone = {
            id: _touch.id,
            xcf: _touch.xcf,
            ycf: _touch.ycf,
            xradius: _touch.xradius,
            yradius: _touch.yradius,
            angle: _touch.angle,
            force: _touch.force,
            win_x: _touch.win_x,
            win_y: _touch.win_y,
            gui_x: _touch.gui_x,
            gui_y: _touch.gui_y,
        }

        array_push(_touches, _touch_clone);
    }

    return _touches;
}

#define html_fullscreen_touches_count
{
    var _memory = html_fullscreen_touches_raw();
    return array_length(_memory.touches);
}

#define html_fullscreen_mouse_xcf
{
    if (os_browser == browser_not_a_browser) {
        return window_mouse_get_x() / window_get_width();
    }

    return window_mouse_get_x() / browser_width;
}

#define html_fullscreen_mouse_ycf
{
    if (os_browser == browser_not_a_browser) {
        return window_mouse_get_y() / window_get_height();
    }

    return window_mouse_get_y() / browser_height;
}

#define html_fullscreen_mouse_win_x
{
    return html_fullscreen_mouse_xcf() * window_get_width();
}

#define html_fullscreen_mouse_win_y
{
    return html_fullscreen_mouse_ycf() * window_get_height();
}

#define html_fullscreen_mouse_gui_x
{
    return html_fullscreen_mouse_xcf() * display_get_gui_width();
}

#define html_fullscreen_mouse_gui_y
{
    return html_fullscreen_mouse_ycf() * display_get_gui_height();
}

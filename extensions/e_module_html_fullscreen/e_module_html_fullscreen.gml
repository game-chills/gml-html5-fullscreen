
#define html_fullscreen_init
{
    if (os_browser == browser_not_a_browser) {
        return;
    }

    var _canvasContainerSelector = ".gm4html5_div_class";

    e_gms_module_html_fullscreen_set_overflow_hidden({
        applyToBody: 1,
        applyToCanvas: 1,
        applyToContainerCanvas: _canvasContainerSelector
    });

    e_gms_module_html_fullscreen_set_prevent_default_mobile_touch({
        selectorContainerCanvas: _canvasContainerSelector,
        preventDefaultMobileTouch: 1,
    });

    e_gms_module_html_fullscreen_set_fullscreen_canvas({
        fullscreenCanvas: 1,
    });

    e_gms_module_html_fullscreen_set_active_mouse_position({
        setActiveMousePosition: 1,
    });
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

#define html_fullscreen_mouse_pos_raw
{
    var _memory = (function() {
        static _memory = {
            now: 0,
            xcf: 0, 
            ycf: 0,
            win_x: 0,
            win_y: 0,
            gui_x: 0,
            gui_y: 0,
        };
        return _memory;
    })()

    if (os_browser == browser_not_a_browser) {
        return _memory;
    }

    var _now = e_gms_module_html_fullscreen_get_mouse_position_now();
    if (_now == _memory.now) {
        return _memory;
    }

    var _json_string =
        e_gms_module_html_fullscreen_get_mouse_position();
    
    var _json = json_parse(_json_string);
    
    _memory.now = _now;

    _memory.xcf = _json.xcf;
    _memory.ycf = _json.ycf;

    _memory.win_x = window_get_width() * _json.xcf;
    _memory.win_y = window_get_width() * _json.ycf;

    _memory.gui_x = display_get_gui_width() * _json.xcf;
    _memory.gui_y = display_get_gui_height() * _json.ycf;

    return _memory;
}

#define html_fullscreen_mouse_pos
{
    var _memory = html_fullscreen_mouse_pos_raw();
    return {
        xcf: _memory.xcf, 
        ycf: _memory.ycf,
        win_x: _memory.win_x,
        win_y: _memory.win_y,
        gui_x: _memory.gui_x,
        gui_y: _memory.gui_y,
    }
}

#define html_fullscreen_mouse_pos_xcf
{
    return html_fullscreen_mouse_pos_raw().xcf;
}

#define html_fullscreen_mouse_pos_ycf
{
    return html_fullscreen_mouse_pos_raw().ycf;
}

#define html_fullscreen_mouse_pos_win_x
{
    return html_fullscreen_mouse_pos_raw().win_x;
}

#define html_fullscreen_mouse_pos_win_y
{
    return html_fullscreen_mouse_pos_raw().win_y;
}

#define html_fullscreen_mouse_pos_gui_x
{
    return html_fullscreen_mouse_pos_raw().gui_x;
}

#define html_fullscreen_mouse_pos_gui_y
{
    return html_fullscreen_mouse_pos_raw().gui_y;
}

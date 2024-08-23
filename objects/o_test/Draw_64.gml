draw_circle(
	html_fullscreen_mouse_gui_x(),
	html_fullscreen_mouse_gui_y(),
	32,
	false,
);

var _touches_count = html_fullscreen_touches_count();

draw_text(0, 0, _touches_count);

draw_set_color(c_black)
draw_circle(
	camera_get_view_x(view_camera[0]) + html_fullscreen_mouse_win_x(),
	html_fullscreen_mouse_win_y(),
	64,
	false,
);
draw_set_color(c_white)
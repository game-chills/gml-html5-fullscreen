# Extension for Game Maker Studio 2 HTML5

1. Correct work fullscreen mode for html
2. Mobile touches in browser (relative canvas)
3. Mouse in browser (relative canvas)

# Docs

`html_fullscreen_extension_init()` - init extension  
_it is auto call_

`html_fullscreen_extension_available()` - check extension available for current platform 

`html_fullscreen()` - resize canvas to `browser_width`, `browser_height`  
_usually it's already like that_

`html_fullscreen_by_width(width)` - additional method, adapts the canvas so that the specified width is equal to the specified one, and the height is adaptive  
`html_fullscreen_by_height(height)` - analog for height  
`html_fullscreen_custom(width, height)` - resize canvas  

`html_fullscreen_touches_raw()` - receives touches from the browser  
_this method can return the same object_

`html_fullscreen_touches()` - analog html_fullscreen_touches_raw, return copy object 
_use this_  
-Touch Object:
```js
{
  // from js
  "id",
  "xcf", // value from 0 to 1 (x_touch / canvas_width)
  "ycf", // ..
  "xradius",
  "yradius",
  "angle",
  "force",
  //
  "win_x", // xcf * window_get_width(), it's most likely always useless, just use - camera_x + camera_w * xcf
  "win_y", // ..
  "gui_x", // xcf * display_get_gui_width()
  "gui_y", // ..
}
```

`html_fullscreen_touches_count()` - count touches  

`html_fullscreen_mouse_xcf()` - value from 0 to 1 (x_mouse / canvas_width, actually it's not quite like that)   
`html_fullscreen_mouse_ycf()` - ..   
`html_fullscreen_mouse_win_x()` - ..   
`html_fullscreen_mouse_win_y()` - ..   
`html_fullscreen_mouse_gui_x()` - ..   
`html_fullscreen_mouse_gui_y()` - ..   


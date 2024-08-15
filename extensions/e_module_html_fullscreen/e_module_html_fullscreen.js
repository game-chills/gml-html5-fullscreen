const GMS_CONTAINER_CANVAS_CLASS_BY_DEFAULT = ".gm4html5_div_class";
const IS_PRINT_DEBUG = false;

function gmlStructToJson(gmlStruct) {
  if (!gmlStruct) {
    return null;
  }

  if (!gmlStruct.__yyIsGMLObject) {
    return null;
  }

  const json = {};
  for (const [key, value] of Object.entries(gmlStruct)) {
    if (!key.startsWith("gml")) {
      continue;
    }

    const jsonKey = key.substring("gml".length);
    if (typeof value === "string" || typeof value === "number") {
      json[jsonKey] = value;
    } else if (value) {
      json[jsonKey] = gmlStructToJson(value);
    }
  }

  return json;
}

/**
 * @param { object } [props]
 * @param { boolean } [props.applyToBody]
 * @param { boolean } [props.applyToCanvas]
 * @param { boolean | string } [props.applyToContainerCanvas]
 */
function gmsModuleHtmlFullscreen_setOverflowHidden(props) {
  props = gmlStructToJson(props) ?? {};

  if (IS_PRINT_DEBUG) {
    console.debug({
      gmsModuleHtmlFullscreen_setOverflowHidden: props,
    });
  }

  if (props.applyToBody) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  if (props.applyToCanvas) {
    document.querySelector("#canvas").style.overflow = "hidden";
  } else {
    document.querySelector("#canvas").style.overflow = "";
  }

  if (props.applyToContainerCanvas !== undefined) {
    const selector =
      typeof props.applyToContainerCanvas === "boolean"
        ? GMS_CONTAINER_CANVAS_CLASS_BY_DEFAULT
        : props.applyToContainerCanvas;

    if (props.applyToContainerCanvas) {
      document.querySelector(selector).style.overflow = "hidden";
    } else {
      document.querySelector(selector).style.overflow = "";
    }
  }
}

const preventDefaultMobileTouchHandler = (e) => {
  e.preventDefault();
};

/**
 * @param { object } [props]
 * @param { string } [props.selectorContainerCanvas]
 * @param { boolean } [props.preventDefaultMobileTouch]
 */
function gmsModuleHtmlFullscreen_setPreventDefaultMobileTouch(props) {
  props = gmlStructToJson(props) ?? {};

  if (IS_PRINT_DEBUG) {
    console.debug({
      gmsModuleHtmlFullscreen_setPreventDefaultMobileTouch: props,
    });
  }

  const selectorContainerCanvas =
    props.selectorContainerCanvas ?? GMS_CONTAINER_CANVAS_CLASS_BY_DEFAULT;

  const element = document.querySelector(selectorContainerCanvas);

  element.removeEventListener("touchstart", preventDefaultMobileTouchHandler);

  const isNeedToPreventDefault = props.preventDefaultMobileTouch ?? true;
  if (!isNeedToPreventDefault) {
    return;
  }

  element.addEventListener("touchstart", preventDefaultMobileTouchHandler, {
    passive: false,
  });
}

/**
 * @param { object } [props]
 * @param { boolean } [props.fullscreenCanvas]
 */
function gmsModuleHtmlFullscreen_setFullscreenCanvas(props) {
  props = gmlStructToJson(props);

  if (IS_PRINT_DEBUG) {
    console.debug({
      gmsModuleHtmlFullscreen_setFullscreenCanvas: props,
    });
  }

  const element = document.querySelector("#canvas");

  const isFullscreen = props.fullscreenCanvas ?? true;

  if (isFullscreen) {
    element.style.width = "100%";
    element.style.height = "100%";
  } else {
    element.style.width = "";
    element.style.height = "";
  }
}

/* Get mouse position */

const lastMousePosition = { now: 0, xcf: 0, ycf: 0 };

const getMousePositionHandler_mousemove = (e) => {
  const element = document.querySelector("#canvas");
  const rect = element.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const xcf = x / rect.width;
  const ycf = y / rect.height;

  lastMousePosition.now = Date.now();
  lastMousePosition.xcf = xcf;
  lastMousePosition.ycf = ycf;
};

const getMousePositionHandler_touch = (e) => {
  const element = document.querySelector("#canvas");
  const rect = element.getBoundingClientRect();

  if (e.touches.length !== 1) {
    return;
  }

  const x = e.touches[0].clientX - rect.left;
  const y = e.touches[0].clientY - rect.top;

  const xcf = x / rect.width;
  const ycf = y / rect.height;

  lastMousePosition.now = Date.now();
  lastMousePosition.xcf = xcf;
  lastMousePosition.ycf = ycf;
};

/**
 * @param { object } [props]
 * @param { boolean } [props.setActiveMousePosition]
 */
function gmsModuleHtmlFullscreen_setActiveMousePosition(props) {
  props = gmlStructToJson(props) ?? {};

  if (IS_PRINT_DEBUG) {
    console.debug({
      gmsModuleHtmlFullscreen_setActiveMousePosition: props,
    });
  }

  const element = document.querySelector("#canvas");

  element.removeEventListener("mousemove", getMousePositionHandler_mousemove);
  element.removeEventListener("touchstart", getMousePositionHandler_touch);
  element.removeEventListener("touchmove", getMousePositionHandler_touch);

  const isActiveMousePosition = props?.setActiveMousePosition ?? true;
  if (!isActiveMousePosition) {
    return;
  }

  element.addEventListener("mousemove", getMousePositionHandler_mousemove);
  element.addEventListener("touchstart", getMousePositionHandler_touch);
  element.addEventListener("touchmove", getMousePositionHandler_touch);
}

function gmsModuleHtmlFullscreen_getMousePositionNow() {
  return lastMousePosition.now;
}

function gmsModuleHtmlFullscreen_getMousePosition() {
  return JSON.stringify(lastMousePosition);
}

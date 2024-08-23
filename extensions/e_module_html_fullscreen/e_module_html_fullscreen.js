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

/** Fullscreen */

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

/* Get touches */

const lastTouches = {
  now: 0,
  touches: [],
};

const getTouchesHandler_touch = (e) => {
  const element = document.querySelector("#canvas");
  const rect = element.getBoundingClientRect();

  const eventTouches = e.touches;
  const touches = [];

  for (let i = 0; i < eventTouches.length; i++) {
    const touch = eventTouches[i];

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const id = touch.identifier;
    const xcf = x / rect.width;
    const ycf = y / rect.height;
    const xradius = touch.radiusX;
    const yradius = touch.radiusY;
    const angle = touch.rotationAngle;
    const force = touch.force;

    touches.push({
      id,
      xcf,
      ycf,
      xradius,
      yradius,
      angle,
      force,
    });
  }

  lastTouches.now = Date.now();
  lastTouches.touches = touches;
};

/**
 * @param { object } [props]
 * @param { boolean } [props.setActiveTouches]
 */
function gmsModuleHtmlFullscreen_setActiveTouches(props) {
  props = gmlStructToJson(props) ?? {};

  if (IS_PRINT_DEBUG) {
    console.debug({
      gmsModuleHtmlFullscreen_setActiveTouches: props,
    });
  }

  const element = document.querySelector("#canvas");

  element.removeEventListener("touchstart", getTouchesHandler_touch);
  element.removeEventListener("touchmove", getTouchesHandler_touch);
  element.removeEventListener("touchend", getTouchesHandler_touch);

  const isActiveTouches = props?.setActiveTouches ?? true;
  if (!isActiveTouches) {
    return;
  }

  element.addEventListener("touchstart", getTouchesHandler_touch);
  element.addEventListener("touchmove", getTouchesHandler_touch);
  element.addEventListener("touchend", getTouchesHandler_touch);
}

function gmsModuleHtmlFullscreen_getTouchesNow() {
  return lastTouches.now;
}

function gmsModuleHtmlFullscreen_getTouches() {
  return JSON.stringify(lastTouches);
}

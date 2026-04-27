import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useRef, useEffect } from "react";
import { snapdom } from "@zumer/snapdom";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "Aperture Logo Generator"
  }, {
    name: "description",
    content: "Generate the Aperture Laboratories logo with custom text."
  }];
}
const home = UNSAFE_withComponentProps(function LogoGenerator() {
  const version = "0.1.0";
  const subtitleLineHeight = 30;
  const [logoTitleText, setLogoTitleText] = useState("Aperture");
  const [logoSubtitleText, setLogoSubtitleText] = useState(["Laboratories"]);
  const [leftGap, setLeftGap] = useState(0);
  const [viewBoxWidth, setViewBoxWidth] = useState(625);
  const [viewBoxHeight, setViewBoxHeight] = useState(221);
  const viewArea = useRef(null);
  const logoWhiteBg = useRef(null);
  useEffect(() => {
    if (viewArea.current) {
      const BBox = viewArea.current.getBBox();
      setViewBoxWidth(Math.max(BBox.width + BBox.x, 150));
      setViewBoxHeight(Math.max(BBox.height + BBox.y, 154));
    }
  }, [logoTitleText, logoSubtitleText]);
  async function saveSvg() {
    const props = {
      format: "svg",
      filename: "logo.svg",
      embedFonts: true
    };
    await snapdom.download(document.querySelector("#svgLogo"), props);
  }
  async function savePng(whiteBg) {
    const props = {
      format: "png",
      filename: "logo.png",
      embedFonts: true
    };
    if (whiteBg && logoWhiteBg.current) {
      logoWhiteBg.current.setAttribute("fill-opacity", "1");
      await snapdom.download(document.querySelector("#svgLogo"), props);
      logoWhiteBg.current.setAttribute("fill-opacity", "0");
    } else {
      await snapdom.download(document.querySelector("#svgLogo"), props);
    }
  }
  function updateLogoTitleText(text) {
    setLogoTitleText(text);
    const paddingGroup0 = ["A", "J", "+", ".", "<", "^", "~", "¢", "«", "À", "Á", "Â", "Ã", "Ä", "Å", "Æ"];
    const paddingGroup12 = ["C", "G", "O", "Q", "S", "1", "2", "3", "4", "6", "8", "9", "0", "#", "*", "-", "/", "=", ">", "´", "»", "Ò", "Ó", "Ô", "Õ", "Ö", "Ø", "“", "”", "†", "‡", "•", "‹", "›", "∙"];
    const paddingGroup30 = ["(", "\\", "`", "{", "¡", "¶"];
    const paddingGroup40 = [")", ";", "[", "]", "_", "}", "¿", "ƒ"];
    const paddingGroupNeg10 = [",", "¸", "„", "…"];
    if (paddingGroup12.includes(text.charAt(0).toUpperCase())) {
      setLeftGap(12);
    } else if (paddingGroup0.includes(text.charAt(0).toUpperCase())) {
      setLeftGap(0);
    } else if (paddingGroup40.includes(text.charAt(0).toUpperCase())) {
      setLeftGap(40);
    } else if (paddingGroup30.includes(text.charAt(0).toUpperCase())) {
      setLeftGap(30);
    } else if (paddingGroupNeg10.includes(text.charAt(0).toUpperCase())) {
      setLeftGap(-10);
    } else {
      setLeftGap(18);
    }
  }
  function updateLogoSubtitleText(text) {
    setLogoSubtitleText(text.split("\n"));
  }
  function svgLogo() {
    return /* @__PURE__ */ jsxs("svg", {
      viewBox: "0 0 " + viewBoxWidth + " " + viewBoxHeight,
      id: "svgLogo",
      children: [/* @__PURE__ */ jsxs("defs", {
        children: [/* @__PURE__ */ jsx("clipPath", {
          id: "clipCircle",
          children: /* @__PURE__ */ jsx("circle", {
            r: "125.5"
          })
        }), /* @__PURE__ */ jsx("clipPath", {
          id: "clipCircleInner",
          children: /* @__PURE__ */ jsx("path", {
            d: "m-187.233-69 101.117-101.116L15-69-86.116 32.116z"
          })
        })]
      }), /* @__PURE__ */ jsx("rect", {
        ref: logoWhiteBg,
        width: "100%",
        height: "100%",
        x: "0",
        y: "0",
        fill: "#ffffff",
        fillOpacity: "0"
      }), /* @__PURE__ */ jsxs("g", {
        clipPath: "url(#clipCircle)",
        transform: "matrix(.574 -.114 .114 .574 77 76)",
        children: [/* @__PURE__ */ jsxs("g", {
          id: "shutterComponent",
          children: [/* @__PURE__ */ jsx("path", {
            id: "shutterSubComponent",
            d: "M-128-212H15v143h-143z",
            clipPath: "url(#clipCircleInner)"
          }), /* @__PURE__ */ jsx("use", {
            href: "#shutterSubComponent",
            transform: "scale(-1)"
          })]
        }), /* @__PURE__ */ jsx("use", {
          href: "#shutterComponent",
          transform: "rotate(45)"
        }), /* @__PURE__ */ jsx("use", {
          href: "#shutterSubComponent",
          transform: "rotate(-45)"
        }), /* @__PURE__ */ jsx("use", {
          href: "#shutterComponent",
          transform: "rotate(90)"
        })]
      }), /* @__PURE__ */ jsxs("g", {
        ref: viewArea,
        children: [/* @__PURE__ */ jsx("text", {
          className: "logoTitle",
          x: 120 + leftGap,
          y: "99.2",
          children: logoTitleText.toUpperCase()
        }, "titleText"), logoSubtitleText.map((val, num) => /* @__PURE__ */ jsx("text", {
          className: "logoSubtitle",
          x: "158",
          y: 130.5 + num * subtitleLineHeight,
          children: val.toUpperCase()
        }, "subtitleText" + num))]
      })]
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "parentElement",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "fields",
      children: [/* @__PURE__ */ jsxs("label", {
        children: ["Title text", /* @__PURE__ */ jsx("input", {
          name: "titleInput",
          defaultValue: logoTitleText,
          autoComplete: "off",
          onChange: (e) => updateLogoTitleText(e.target.value)
        })]
      }), /* @__PURE__ */ jsxs("label", {
        children: ["Subtitle text ", /* @__PURE__ */ jsx("small", {
          children: "(Line breaks allowed)"
        }), /* @__PURE__ */ jsx("textarea", {
          name: "subtitleInput",
          defaultValue: logoSubtitleText,
          autoComplete: "off",
          onChange: (e) => updateLogoSubtitleText(e.target.value)
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "verticalButtons",
        children: [/* @__PURE__ */ jsx("span", {
          className: "material-symbols-outlined downloadIcon",
          children: "download"
        }), /* @__PURE__ */ jsx("button", {
          onClick: (e) => saveSvg(),
          children: "svg"
        }), /* @__PURE__ */ jsx("button", {
          onClick: (e) => savePng(false),
          children: "png"
        }), /* @__PURE__ */ jsx("button", {
          onClick: (e) => savePng(true),
          children: "png, white bg"
        })]
      })]
    }), svgLogo(), /* @__PURE__ */ jsxs("div", {
      className: "footer",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "footerSubdiv",
        children: ["Made by Courtesy", /* @__PURE__ */ jsx(Link, {
          to: "https://courtesycalling.com",
          className: "material-symbols-outlined",
          children: "home"
        }), /* @__PURE__ */ jsx("span", {
          className: "material-symbols-outlined footerTooltip",
          title: "Original svg file: Valve, Inc, Public domain, via Wikimedia Commons\r\nNote: the header font is slightly incorrect. Although I saw somebody identify it as Univers Black Oblique, there are discrepancies. I made some manual corrections, but they aren't perfect. Please contact me if you know what the issue is!",
          children: "info"
        })]
      }), /* @__PURE__ */ jsxs(Link, {
        to: "https://github.com/courtesyy/aperture-logo-generator",
        children: ["v", version]
      })]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DSbOaAbg.js", "imports": ["/assets/chunk-EPOLDU6W-Cbkwubdd.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BKaoZ7Ii.js", "imports": ["/assets/chunk-EPOLDU6W-Cbkwubdd.js"], "css": ["/assets/app-3aJM7quW.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-D8m48Tm5.js", "imports": ["/assets/chunk-EPOLDU6W-Cbkwubdd.js"], "css": ["/assets/app-3aJM7quW.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-bf3833e6.js", "version": "bf3833e6", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = ["/"];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};

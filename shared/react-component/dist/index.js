import * as d from "react";
import xe, { useLayoutEffect as ao, useState as co, forwardRef as lo, createElement as on } from "react";
import * as mt from "react-dom";
import uo from "react-dom";
var _t = { exports: {} }, Ue = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sn;
function fo() {
  if (sn) return Ue;
  sn = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function n(r, o, s) {
    var a = null;
    if (s !== void 0 && (a = "" + s), o.key !== void 0 && (a = "" + o.key), "key" in o) {
      s = {};
      for (var i in o)
        i !== "key" && (s[i] = o[i]);
    } else s = o;
    return o = s.ref, {
      $$typeof: e,
      type: r,
      key: a,
      ref: o !== void 0 ? o : null,
      props: s
    };
  }
  return Ue.Fragment = t, Ue.jsx = n, Ue.jsxs = n, Ue;
}
var Ye = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var an;
function po() {
  return an || (an = 1, process.env.NODE_ENV !== "production" && function() {
    function e(x) {
      if (x == null) return null;
      if (typeof x == "function")
        return x.$$typeof === j ? null : x.displayName || x.name || null;
      if (typeof x == "string") return x;
      switch (x) {
        case u:
          return "Fragment";
        case b:
          return "Profiler";
        case m:
          return "StrictMode";
        case E:
          return "Suspense";
        case A:
          return "SuspenseList";
        case F:
          return "Activity";
      }
      if (typeof x == "object")
        switch (typeof x.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), x.$$typeof) {
          case y:
            return "Portal";
          case w:
            return (x.displayName || "Context") + ".Provider";
          case v:
            return (x._context.displayName || "Context") + ".Consumer";
          case C:
            var P = x.render;
            return x = x.displayName, x || (x = P.displayName || P.name || "", x = x !== "" ? "ForwardRef(" + x + ")" : "ForwardRef"), x;
          case R:
            return P = x.displayName || null, P !== null ? P : e(x.type) || "Memo";
          case k:
            P = x._payload, x = x._init;
            try {
              return e(x(P));
            } catch {
            }
        }
      return null;
    }
    function t(x) {
      return "" + x;
    }
    function n(x) {
      try {
        t(x);
        var P = !1;
      } catch {
        P = !0;
      }
      if (P) {
        P = console;
        var U = P.error, X = typeof Symbol == "function" && Symbol.toStringTag && x[Symbol.toStringTag] || x.constructor.name || "Object";
        return U.call(
          P,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          X
        ), t(x);
      }
    }
    function r(x) {
      if (x === u) return "<>";
      if (typeof x == "object" && x !== null && x.$$typeof === k)
        return "<...>";
      try {
        var P = e(x);
        return P ? "<" + P + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function o() {
      var x = B.A;
      return x === null ? null : x.getOwner();
    }
    function s() {
      return Error("react-stack-top-frame");
    }
    function a(x) {
      if (T.call(x, "key")) {
        var P = Object.getOwnPropertyDescriptor(x, "key").get;
        if (P && P.isReactWarning) return !1;
      }
      return x.key !== void 0;
    }
    function i(x, P) {
      function U() {
        H || (H = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          P
        ));
      }
      U.isReactWarning = !0, Object.defineProperty(x, "key", {
        get: U,
        configurable: !0
      });
    }
    function c() {
      var x = e(this.type);
      return _[x] || (_[x] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), x = this.props.ref, x !== void 0 ? x : null;
    }
    function l(x, P, U, X, J, Q, se, N) {
      return U = Q.ref, x = {
        $$typeof: g,
        type: x,
        key: P,
        props: Q,
        _owner: J
      }, (U !== void 0 ? U : null) !== null ? Object.defineProperty(x, "ref", {
        enumerable: !1,
        get: c
      }) : Object.defineProperty(x, "ref", { enumerable: !1, value: null }), x._store = {}, Object.defineProperty(x._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(x, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(x, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: se
      }), Object.defineProperty(x, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: N
      }), Object.freeze && (Object.freeze(x.props), Object.freeze(x)), x;
    }
    function f(x, P, U, X, J, Q, se, N) {
      var I = P.children;
      if (I !== void 0)
        if (X)
          if (z(I)) {
            for (X = 0; X < I.length; X++)
              p(I[X]);
            Object.freeze && Object.freeze(I);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else p(I);
      if (T.call(P, "key")) {
        I = e(x);
        var K = Object.keys(P).filter(function($) {
          return $ !== "key";
        });
        X = 0 < K.length ? "{key: someKey, " + K.join(": ..., ") + ": ...}" : "{key: someKey}", W[I + X] || (K = 0 < K.length ? "{" + K.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          X,
          I,
          K,
          I
        ), W[I + X] = !0);
      }
      if (I = null, U !== void 0 && (n(U), I = "" + U), a(P) && (n(P.key), I = "" + P.key), "key" in P) {
        U = {};
        for (var V in P)
          V !== "key" && (U[V] = P[V]);
      } else U = P;
      return I && i(
        U,
        typeof x == "function" ? x.displayName || x.name || "Unknown" : x
      ), l(
        x,
        I,
        Q,
        J,
        o(),
        U,
        se,
        N
      );
    }
    function p(x) {
      typeof x == "object" && x !== null && x.$$typeof === g && x._store && (x._store.validated = 1);
    }
    var h = xe, g = Symbol.for("react.transitional.element"), y = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), v = Symbol.for("react.consumer"), w = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), A = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), F = Symbol.for("react.activity"), j = Symbol.for("react.client.reference"), B = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, T = Object.prototype.hasOwnProperty, z = Array.isArray, L = console.createTask ? console.createTask : function() {
      return null;
    };
    h = {
      react_stack_bottom_frame: function(x) {
        return x();
      }
    };
    var H, _ = {}, D = h.react_stack_bottom_frame.bind(
      h,
      s
    )(), O = L(r(s)), W = {};
    Ye.Fragment = u, Ye.jsx = function(x, P, U, X, J) {
      var Q = 1e4 > B.recentlyCreatedOwnerStacks++;
      return f(
        x,
        P,
        U,
        !1,
        X,
        J,
        Q ? Error("react-stack-top-frame") : D,
        Q ? L(r(x)) : O
      );
    }, Ye.jsxs = function(x, P, U, X, J) {
      var Q = 1e4 > B.recentlyCreatedOwnerStacks++;
      return f(
        x,
        P,
        U,
        !0,
        X,
        J,
        Q ? Error("react-stack-top-frame") : D,
        Q ? L(r(x)) : O
      );
    };
  }()), Ye;
}
process.env.NODE_ENV === "production" ? _t.exports = fo() : _t.exports = po();
var S = _t.exports;
function cn(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Dn(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = cn(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : cn(e[o], null);
        }
      };
  };
}
function ee(...e) {
  return d.useCallback(Dn(...e), e);
}
// @__NO_SIDE_EFFECTS__
function qe(e) {
  const t = /* @__PURE__ */ ho(e), n = d.forwardRef((r, o) => {
    const { children: s, ...a } = r, i = d.Children.toArray(s), c = i.find(vo);
    if (c) {
      const l = c.props.children, f = i.map((p) => p === c ? d.Children.count(l) > 1 ? d.Children.only(null) : d.isValidElement(l) ? l.props.children : null : p);
      return /* @__PURE__ */ S.jsx(t, { ...a, ref: o, children: d.isValidElement(l) ? d.cloneElement(l, void 0, f) : null });
    }
    return /* @__PURE__ */ S.jsx(t, { ...a, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var mo = /* @__PURE__ */ qe("Slot");
// @__NO_SIDE_EFFECTS__
function ho(e) {
  const t = d.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (d.isValidElement(o)) {
      const a = yo(o), i = bo(s, o.props);
      return o.type !== d.Fragment && (i.ref = r ? Dn(r, a) : a), d.cloneElement(o, i);
    }
    return d.Children.count(o) > 1 ? d.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var go = Symbol("radix.slottable");
function vo(e) {
  return d.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === go;
}
function bo(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...i) => {
      const c = s(...i);
      return o(...i), c;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function yo(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Fn(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Fn(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Wn() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Fn(e)) && (r && (r += " "), r += t);
  return r;
}
const ln = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, un = Wn, wo = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return un(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: s } = t, a = Object.keys(o).map((l) => {
    const f = n == null ? void 0 : n[l], p = s == null ? void 0 : s[l];
    if (f === null) return null;
    const h = ln(f) || ln(p);
    return o[l][h];
  }), i = n && Object.entries(n).reduce((l, f) => {
    let [p, h] = f;
    return h === void 0 || (l[p] = h), l;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((l, f) => {
    let { class: p, className: h, ...g } = f;
    return Object.entries(g).every((y) => {
      let [u, m] = y;
      return Array.isArray(m) ? m.includes({
        ...s,
        ...i
      }[u]) : {
        ...s,
        ...i
      }[u] === m;
    }) ? [
      ...l,
      p,
      h
    ] : l;
  }, []);
  return un(e, a, c, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Ht = "-", xo = (e) => {
  const t = Co(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(Ht);
      return i[0] === "" && i.length !== 1 && i.shift(), Bn(i, t) || So(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const c = n[a] || [];
      return i && r[a] ? [...c, ...r[a]] : c;
    }
  };
}, Bn = (e, t) => {
  var a;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Bn(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(Ht);
  return (a = t.validators.find(({
    validator: i
  }) => i(s))) == null ? void 0 : a.classGroupId;
}, dn = /^\[(.+)\]$/, So = (e) => {
  if (dn.test(e)) {
    const t = dn.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Co = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Ro(Object.entries(e.classGroups), n).forEach(([s, a]) => {
    It(a, r, s, t);
  }), r;
}, It = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : fn(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Eo(o)) {
        It(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, a]) => {
      It(a, fn(t, s), n, r);
    });
  });
}, fn = (e, t) => {
  let n = e;
  return t.split(Ht).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Eo = (e) => e.isThemeGetter, Ro = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((s) => typeof s == "string" ? t + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([a, i]) => [t + a, i])) : s);
  return [n, o];
}) : e, Po = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (s, a) => {
    n.set(s, a), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let a = n.get(s);
      if (a !== void 0)
        return a;
      if ((a = r.get(s)) !== void 0)
        return o(s, a), a;
    },
    set(s, a) {
      n.has(s) ? n.set(s, a) : o(s, a);
    }
  };
}, zn = "!", Ao = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], s = t.length, a = (i) => {
    const c = [];
    let l = 0, f = 0, p;
    for (let m = 0; m < i.length; m++) {
      let b = i[m];
      if (l === 0) {
        if (b === o && (r || i.slice(m, m + s) === t)) {
          c.push(i.slice(f, m)), f = m + s;
          continue;
        }
        if (b === "/") {
          p = m;
          continue;
        }
      }
      b === "[" ? l++ : b === "]" && l--;
    }
    const h = c.length === 0 ? i : i.substring(f), g = h.startsWith(zn), y = g ? h.substring(1) : h, u = p && p > f ? p - f : void 0;
    return {
      modifiers: c,
      hasImportantModifier: g,
      baseClassName: y,
      maybePostfixModifierPosition: u
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: a
  }) : a;
}, To = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, Oo = (e) => ({
  cache: Po(e.cacheSize),
  parseClassName: Ao(e),
  ...xo(e)
}), No = /\s+/, ko = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, s = [], a = e.trim().split(No);
  let i = "";
  for (let c = a.length - 1; c >= 0; c -= 1) {
    const l = a[c], {
      modifiers: f,
      hasImportantModifier: p,
      baseClassName: h,
      maybePostfixModifierPosition: g
    } = n(l);
    let y = !!g, u = r(y ? h.substring(0, g) : h);
    if (!u) {
      if (!y) {
        i = l + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (u = r(h), !u) {
        i = l + (i.length > 0 ? " " + i : i);
        continue;
      }
      y = !1;
    }
    const m = To(f).join(":"), b = p ? m + zn : m, v = b + u;
    if (s.includes(v))
      continue;
    s.push(v);
    const w = o(u, y);
    for (let C = 0; C < w.length; ++C) {
      const E = w[C];
      s.push(b + E);
    }
    i = l + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function _o() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Vn(t)) && (r && (r += " "), r += n);
  return r;
}
const Vn = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Vn(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Io(e, ...t) {
  let n, r, o, s = a;
  function a(c) {
    const l = t.reduce((f, p) => p(f), e());
    return n = Oo(l), r = n.cache.get, o = n.cache.set, s = i, i(c);
  }
  function i(c) {
    const l = r(c);
    if (l)
      return l;
    const f = ko(c, n);
    return o(c, f), f;
  }
  return function() {
    return s(_o.apply(null, arguments));
  };
}
const G = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, $n = /^\[(?:([a-z-]+):)?(.+)\]$/i, Mo = /^\d+\/\d+$/, Lo = /* @__PURE__ */ new Set(["px", "full", "screen"]), jo = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Do = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Fo = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Wo = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Bo = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ge = (e) => Me(e) || Lo.has(e) || Mo.test(e), ye = (e) => Fe(e, "length", Ko), Me = (e) => !!e && !Number.isNaN(Number(e)), St = (e) => Fe(e, "number", Me), Ge = (e) => !!e && Number.isInteger(Number(e)), zo = (e) => e.endsWith("%") && Me(e.slice(0, -1)), M = (e) => $n.test(e), we = (e) => jo.test(e), Vo = /* @__PURE__ */ new Set(["length", "size", "percentage"]), $o = (e) => Fe(e, Vo, Hn), Ho = (e) => Fe(e, "position", Hn), Uo = /* @__PURE__ */ new Set(["image", "url"]), Yo = (e) => Fe(e, Uo, qo), Go = (e) => Fe(e, "", Xo), Ke = () => !0, Fe = (e, t, n) => {
  const r = $n.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, Ko = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Do.test(e) && !Fo.test(e)
), Hn = () => !1, Xo = (e) => Wo.test(e), qo = (e) => Bo.test(e), Zo = () => {
  const e = G("colors"), t = G("spacing"), n = G("blur"), r = G("brightness"), o = G("borderColor"), s = G("borderRadius"), a = G("borderSpacing"), i = G("borderWidth"), c = G("contrast"), l = G("grayscale"), f = G("hueRotate"), p = G("invert"), h = G("gap"), g = G("gradientColorStops"), y = G("gradientColorStopPositions"), u = G("inset"), m = G("margin"), b = G("opacity"), v = G("padding"), w = G("saturate"), C = G("scale"), E = G("sepia"), A = G("skew"), R = G("space"), k = G("translate"), F = () => ["auto", "contain", "none"], j = () => ["auto", "hidden", "clip", "visible", "scroll"], B = () => ["auto", M, t], T = () => [M, t], z = () => ["", ge, ye], L = () => ["auto", Me, M], H = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], _ = () => ["solid", "dashed", "dotted", "double", "none"], D = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], W = () => ["", "0", M], x = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], P = () => [Me, M];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Ke],
      spacing: [ge, ye],
      blur: ["none", "", we, M],
      brightness: P(),
      borderColor: [e],
      borderRadius: ["none", "", "full", we, M],
      borderSpacing: T(),
      borderWidth: z(),
      contrast: P(),
      grayscale: W(),
      hueRotate: P(),
      invert: W(),
      gap: T(),
      gradientColorStops: [e],
      gradientColorStopPositions: [zo, ye],
      inset: B(),
      margin: B(),
      opacity: P(),
      padding: T(),
      saturate: P(),
      scale: P(),
      sepia: W(),
      skew: P(),
      space: T(),
      translate: T()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", M]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [we]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": x()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": x()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...H(), M]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: j()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": j()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": j()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: F()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": F()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": F()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [u]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [u]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [u]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [u]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [u]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [u]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [u]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [u]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [u]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", Ge, M]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: B()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", M]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: W()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: W()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Ge, M]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Ke]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Ge, M]
        }, M]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": L()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": L()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Ke]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Ge, M]
        }, M]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": L()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": L()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", M]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", M]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [h]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [h]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [h]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...O()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...O(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...O(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [v]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [v]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [v]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [v]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [v]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [v]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [v]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [v]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [v]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [m]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [m]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [m]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [m]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [m]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [m]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [m]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [m]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [m]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [R]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [R]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", M, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [M, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [M, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [we]
        }, we]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [M, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [M, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [M, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [M, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", we, ye]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", St]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Ke]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", M]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Me, St]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ge, M]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", M]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", M]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [b]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [b]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [..._(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", ge, ye]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", ge, M]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: T()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", M]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", M]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [b]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...H(), Ho]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", $o]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Yo]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [y]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [y]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [y]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [g]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [g]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [g]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [s]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [s]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [s]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [s]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [s]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [s]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [s]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [s]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [s]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [s]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [s]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [s]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [s]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [s]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [s]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [i]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [i]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [i]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [i]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [i]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [i]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [i]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [i]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [i]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [b]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [..._(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [i]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [i]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [b]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: _()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [o]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [o]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [o]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [o]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [o]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [o]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [o]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [o]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [o]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [o]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ..._()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ge, M]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [ge, ye]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: z()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [b]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [ge, ye]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", we, Go]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Ke]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [b]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...D(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": D()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [n]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [c]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", we, M]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [l]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [f]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [p]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [w]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [E]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [c]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [l]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [f]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [p]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [b]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [w]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [E]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [a]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [a]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [a]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", M]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: P()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", M]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: P()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", M]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [C]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [C]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [C]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Ge, M]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [k]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [k]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [A]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [A]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", M]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", M]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": T()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": T()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": T()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": T()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": T()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": T()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": T()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": T()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": T()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": T()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": T()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": T()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": T()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": T()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": T()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": T()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": T()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": T()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", M]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ge, ye, St]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, Jo = /* @__PURE__ */ Io(Zo);
function ae(...e) {
  return Jo(Wn(e));
}
const Qo = wo(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        link: "text-blue-600 underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), es = d.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, s) => {
    const a = r ? mo : "button";
    return /* @__PURE__ */ S.jsx(
      a,
      {
        className: ae(Qo({ variant: t, size: n, className: e })),
        ref: s,
        ...o
      }
    );
  }
);
es.displayName = "Button";
function Ic({ className: e, type: t, ...n }) {
  return /* @__PURE__ */ S.jsx(
    "input",
    {
      type: t,
      "data-slot": "input",
      className: ae(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        e
      ),
      ...n
    }
  );
}
var ts = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], q = ts.reduce((e, t) => {
  const n = /* @__PURE__ */ qe(`Primitive.${t}`), r = d.forwardRef((o, s) => {
    const { asChild: a, ...i } = o, c = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ S.jsx(c, { ...i, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function ns(e, t) {
  e && mt.flushSync(() => e.dispatchEvent(t));
}
var rs = "Label", Un = d.forwardRef((e, t) => /* @__PURE__ */ S.jsx(
  q.label,
  {
    ...e,
    ref: t,
    onMouseDown: (n) => {
      var o;
      n.target.closest("button, input, select, textarea") || ((o = e.onMouseDown) == null || o.call(e, n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
    }
  }
));
Un.displayName = rs;
var os = Un;
function Mc({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ S.jsx(
    os,
    {
      "data-slot": "label",
      className: ae(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
function pn(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function Z(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function Ut(e, t = []) {
  let n = [];
  function r(s, a) {
    const i = d.createContext(a), c = n.length;
    n = [...n, a];
    const l = (p) => {
      var b;
      const { scope: h, children: g, ...y } = p, u = ((b = h == null ? void 0 : h[e]) == null ? void 0 : b[c]) || i, m = d.useMemo(() => y, Object.values(y));
      return /* @__PURE__ */ S.jsx(u.Provider, { value: m, children: g });
    };
    l.displayName = s + "Provider";
    function f(p, h) {
      var u;
      const g = ((u = h == null ? void 0 : h[e]) == null ? void 0 : u[c]) || i, y = d.useContext(g);
      if (y) return y;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return [l, f];
  }
  const o = () => {
    const s = n.map((a) => d.createContext(a));
    return function(i) {
      const c = (i == null ? void 0 : i[e]) || s;
      return d.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: c } }),
        [i, c]
      );
    };
  };
  return o.scopeName = e, [r, ss(o, ...t)];
}
function ss(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const a = r.reduce((i, { useScope: c, scopeName: l }) => {
        const p = c(s)[`__scope${l}`];
        return { ...i, ...p };
      }, {});
      return d.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function is(e) {
  const t = e + "CollectionProvider", [n, r] = Ut(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (u) => {
    const { scope: m, children: b } = u, v = xe.useRef(null), w = xe.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ S.jsx(o, { scope: m, itemMap: w, collectionRef: v, children: b });
  };
  a.displayName = t;
  const i = e + "CollectionSlot", c = /* @__PURE__ */ qe(i), l = xe.forwardRef(
    (u, m) => {
      const { scope: b, children: v } = u, w = s(i, b), C = ee(m, w.collectionRef);
      return /* @__PURE__ */ S.jsx(c, { ref: C, children: v });
    }
  );
  l.displayName = i;
  const f = e + "CollectionItemSlot", p = "data-radix-collection-item", h = /* @__PURE__ */ qe(f), g = xe.forwardRef(
    (u, m) => {
      const { scope: b, children: v, ...w } = u, C = xe.useRef(null), E = ee(m, C), A = s(f, b);
      return xe.useEffect(() => (A.itemMap.set(C, { ref: C, ...w }), () => void A.itemMap.delete(C))), /* @__PURE__ */ S.jsx(h, { [p]: "", ref: E, children: v });
    }
  );
  g.displayName = f;
  function y(u) {
    const m = s(e + "CollectionConsumer", u);
    return xe.useCallback(() => {
      const v = m.collectionRef.current;
      if (!v) return [];
      const w = Array.from(v.querySelectorAll(`[${p}]`));
      return Array.from(m.itemMap.values()).sort(
        (A, R) => w.indexOf(A.ref.current) - w.indexOf(R.ref.current)
      );
    }, [m.collectionRef, m.itemMap]);
  }
  return [
    { Provider: a, Slot: l, ItemSlot: g },
    y,
    r
  ];
}
var as = d.createContext(void 0);
function cs(e) {
  const t = d.useContext(as);
  return e || t || "ltr";
}
function Ae(e) {
  const t = d.useRef(e);
  return d.useEffect(() => {
    t.current = e;
  }), d.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function ls(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ae(e);
  d.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var us = "DismissableLayer", Mt = "dismissableLayer.update", ds = "dismissableLayer.pointerDownOutside", fs = "dismissableLayer.focusOutside", mn, Yn = d.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Gn = d.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: i,
      ...c
    } = e, l = d.useContext(Yn), [f, p] = d.useState(null), h = (f == null ? void 0 : f.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, g] = d.useState({}), y = ee(t, (R) => p(R)), u = Array.from(l.layers), [m] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), b = u.indexOf(m), v = f ? u.indexOf(f) : -1, w = l.layersWithOutsidePointerEventsDisabled.size > 0, C = v >= b, E = hs((R) => {
      const k = R.target, F = [...l.branches].some((j) => j.contains(k));
      !C || F || (o == null || o(R), a == null || a(R), R.defaultPrevented || i == null || i());
    }, h), A = gs((R) => {
      const k = R.target;
      [...l.branches].some((j) => j.contains(k)) || (s == null || s(R), a == null || a(R), R.defaultPrevented || i == null || i());
    }, h);
    return ls((R) => {
      v === l.layers.size - 1 && (r == null || r(R), !R.defaultPrevented && i && (R.preventDefault(), i()));
    }, h), d.useEffect(() => {
      if (f)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (mn = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(f)), l.layers.add(f), hn(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = mn);
        };
    }, [f, h, n, l]), d.useEffect(() => () => {
      f && (l.layers.delete(f), l.layersWithOutsidePointerEventsDisabled.delete(f), hn());
    }, [f, l]), d.useEffect(() => {
      const R = () => g({});
      return document.addEventListener(Mt, R), () => document.removeEventListener(Mt, R);
    }, []), /* @__PURE__ */ S.jsx(
      q.div,
      {
        ...c,
        ref: y,
        style: {
          pointerEvents: w ? C ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: Z(e.onFocusCapture, A.onFocusCapture),
        onBlurCapture: Z(e.onBlurCapture, A.onBlurCapture),
        onPointerDownCapture: Z(
          e.onPointerDownCapture,
          E.onPointerDownCapture
        )
      }
    );
  }
);
Gn.displayName = us;
var ps = "DismissableLayerBranch", ms = d.forwardRef((e, t) => {
  const n = d.useContext(Yn), r = d.useRef(null), o = ee(t, r);
  return d.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ S.jsx(q.div, { ...e, ref: o });
});
ms.displayName = ps;
function hs(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ae(e), r = d.useRef(!1), o = d.useRef(() => {
  });
  return d.useEffect(() => {
    const s = (i) => {
      if (i.target && !r.current) {
        let c = function() {
          Kn(
            ds,
            n,
            l,
            { discrete: !0 }
          );
        };
        const l = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = c, t.addEventListener("click", o.current, { once: !0 })) : c();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, a = window.setTimeout(() => {
      t.addEventListener("pointerdown", s);
    }, 0);
    return () => {
      window.clearTimeout(a), t.removeEventListener("pointerdown", s), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function gs(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ae(e), r = d.useRef(!1);
  return d.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Kn(fs, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function hn() {
  const e = new CustomEvent(Mt);
  document.dispatchEvent(e);
}
function Kn(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? ns(o, s) : o.dispatchEvent(s);
}
var Ct = 0;
function vs() {
  d.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? gn()), document.body.insertAdjacentElement("beforeend", e[1] ?? gn()), Ct++, () => {
      Ct === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Ct--;
    };
  }, []);
}
function gn() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Et = "focusScope.autoFocusOnMount", Rt = "focusScope.autoFocusOnUnmount", vn = { bubbles: !1, cancelable: !0 }, bs = "FocusScope", Xn = d.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...a
  } = e, [i, c] = d.useState(null), l = Ae(o), f = Ae(s), p = d.useRef(null), h = ee(t, (u) => c(u)), g = d.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  d.useEffect(() => {
    if (r) {
      let u = function(w) {
        if (g.paused || !i) return;
        const C = w.target;
        i.contains(C) ? p.current = C : Se(p.current, { select: !0 });
      }, m = function(w) {
        if (g.paused || !i) return;
        const C = w.relatedTarget;
        C !== null && (i.contains(C) || Se(p.current, { select: !0 }));
      }, b = function(w) {
        if (document.activeElement === document.body)
          for (const E of w)
            E.removedNodes.length > 0 && Se(i);
      };
      document.addEventListener("focusin", u), document.addEventListener("focusout", m);
      const v = new MutationObserver(b);
      return i && v.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", u), document.removeEventListener("focusout", m), v.disconnect();
      };
    }
  }, [r, i, g.paused]), d.useEffect(() => {
    if (i) {
      yn.add(g);
      const u = document.activeElement;
      if (!i.contains(u)) {
        const b = new CustomEvent(Et, vn);
        i.addEventListener(Et, l), i.dispatchEvent(b), b.defaultPrevented || (ys(Es(qn(i)), { select: !0 }), document.activeElement === u && Se(i));
      }
      return () => {
        i.removeEventListener(Et, l), setTimeout(() => {
          const b = new CustomEvent(Rt, vn);
          i.addEventListener(Rt, f), i.dispatchEvent(b), b.defaultPrevented || Se(u ?? document.body, { select: !0 }), i.removeEventListener(Rt, f), yn.remove(g);
        }, 0);
      };
    }
  }, [i, l, f, g]);
  const y = d.useCallback(
    (u) => {
      if (!n && !r || g.paused) return;
      const m = u.key === "Tab" && !u.altKey && !u.ctrlKey && !u.metaKey, b = document.activeElement;
      if (m && b) {
        const v = u.currentTarget, [w, C] = ws(v);
        w && C ? !u.shiftKey && b === C ? (u.preventDefault(), n && Se(w, { select: !0 })) : u.shiftKey && b === w && (u.preventDefault(), n && Se(C, { select: !0 })) : b === v && u.preventDefault();
      }
    },
    [n, r, g.paused]
  );
  return /* @__PURE__ */ S.jsx(q.div, { tabIndex: -1, ...a, ref: h, onKeyDown: y });
});
Xn.displayName = bs;
function ys(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Se(r, { select: t }), document.activeElement !== n) return;
}
function ws(e) {
  const t = qn(e), n = bn(t, e), r = bn(t.reverse(), e);
  return [n, r];
}
function qn(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function bn(e, t) {
  for (const n of e)
    if (!xs(n, { upTo: t })) return n;
}
function xs(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Ss(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Se(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Ss(e) && t && e.select();
  }
}
var yn = Cs();
function Cs() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = wn(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = wn(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function wn(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Es(e) {
  return e.filter((t) => t.tagName !== "A");
}
var te = globalThis != null && globalThis.document ? d.useLayoutEffect : () => {
}, Rs = d[" useId ".trim().toString()] || (() => {
}), Ps = 0;
function Yt(e) {
  const [t, n] = d.useState(Rs());
  return te(() => {
    n((r) => r ?? String(Ps++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const As = ["top", "right", "bottom", "left"], Ce = Math.min, re = Math.max, lt = Math.round, tt = Math.floor, pe = (e) => ({
  x: e,
  y: e
}), Ts = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Os = {
  start: "end",
  end: "start"
};
function Lt(e, t, n) {
  return re(e, Ce(t, n));
}
function ve(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function be(e) {
  return e.split("-")[0];
}
function We(e) {
  return e.split("-")[1];
}
function Gt(e) {
  return e === "x" ? "y" : "x";
}
function Kt(e) {
  return e === "y" ? "height" : "width";
}
const Ns = /* @__PURE__ */ new Set(["top", "bottom"]);
function fe(e) {
  return Ns.has(be(e)) ? "y" : "x";
}
function Xt(e) {
  return Gt(fe(e));
}
function ks(e, t, n) {
  n === void 0 && (n = !1);
  const r = We(e), o = Xt(e), s = Kt(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = ut(a)), [a, ut(a)];
}
function _s(e) {
  const t = ut(e);
  return [jt(e), t, jt(t)];
}
function jt(e) {
  return e.replace(/start|end/g, (t) => Os[t]);
}
const xn = ["left", "right"], Sn = ["right", "left"], Is = ["top", "bottom"], Ms = ["bottom", "top"];
function Ls(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Sn : xn : t ? xn : Sn;
    case "left":
    case "right":
      return t ? Is : Ms;
    default:
      return [];
  }
}
function js(e, t, n, r) {
  const o = We(e);
  let s = Ls(be(e), n === "start", r);
  return o && (s = s.map((a) => a + "-" + o), t && (s = s.concat(s.map(jt)))), s;
}
function ut(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Ts[t]);
}
function Ds(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Zn(e) {
  return typeof e != "number" ? Ds(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function dt(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: o
  } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n
  };
}
function Cn(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = fe(t), a = Xt(t), i = Kt(a), c = be(t), l = s === "y", f = r.x + r.width / 2 - o.width / 2, p = r.y + r.height / 2 - o.height / 2, h = r[i] / 2 - o[i] / 2;
  let g;
  switch (c) {
    case "top":
      g = {
        x: f,
        y: r.y - o.height
      };
      break;
    case "bottom":
      g = {
        x: f,
        y: r.y + r.height
      };
      break;
    case "right":
      g = {
        x: r.x + r.width,
        y: p
      };
      break;
    case "left":
      g = {
        x: r.x - o.width,
        y: p
      };
      break;
    default:
      g = {
        x: r.x,
        y: r.y
      };
  }
  switch (We(t)) {
    case "start":
      g[a] -= h * (n && l ? -1 : 1);
      break;
    case "end":
      g[a] += h * (n && l ? -1 : 1);
      break;
  }
  return g;
}
const Fs = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: a
  } = n, i = s.filter(Boolean), c = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let l = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: f,
    y: p
  } = Cn(l, r, c), h = r, g = {}, y = 0;
  for (let u = 0; u < i.length; u++) {
    const {
      name: m,
      fn: b
    } = i[u], {
      x: v,
      y: w,
      data: C,
      reset: E
    } = await b({
      x: f,
      y: p,
      initialPlacement: r,
      placement: h,
      strategy: o,
      middlewareData: g,
      rects: l,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    f = v ?? f, p = w ?? p, g = {
      ...g,
      [m]: {
        ...g[m],
        ...C
      }
    }, E && y <= 50 && (y++, typeof E == "object" && (E.placement && (h = E.placement), E.rects && (l = E.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : E.rects), {
      x: f,
      y: p
    } = Cn(l, h, c)), u = -1);
  }
  return {
    x: f,
    y: p,
    placement: h,
    strategy: o,
    middlewareData: g
  };
};
async function Ze(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: s,
    rects: a,
    elements: i,
    strategy: c
  } = e, {
    boundary: l = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: p = "floating",
    altBoundary: h = !1,
    padding: g = 0
  } = ve(t, e), y = Zn(g), m = i[h ? p === "floating" ? "reference" : "floating" : p], b = dt(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(m))) == null || n ? m : m.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: l,
    rootBoundary: f,
    strategy: c
  })), v = p === "floating" ? {
    x: r,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, w = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(i.floating)), C = await (s.isElement == null ? void 0 : s.isElement(w)) ? await (s.getScale == null ? void 0 : s.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = dt(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: v,
    offsetParent: w,
    strategy: c
  }) : v);
  return {
    top: (b.top - E.top + y.top) / C.y,
    bottom: (E.bottom - b.bottom + y.bottom) / C.y,
    left: (b.left - E.left + y.left) / C.x,
    right: (E.right - b.right + y.right) / C.x
  };
}
const Ws = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: s,
      platform: a,
      elements: i,
      middlewareData: c
    } = t, {
      element: l,
      padding: f = 0
    } = ve(e, t) || {};
    if (l == null)
      return {};
    const p = Zn(f), h = {
      x: n,
      y: r
    }, g = Xt(o), y = Kt(g), u = await a.getDimensions(l), m = g === "y", b = m ? "top" : "left", v = m ? "bottom" : "right", w = m ? "clientHeight" : "clientWidth", C = s.reference[y] + s.reference[g] - h[g] - s.floating[y], E = h[g] - s.reference[g], A = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(l));
    let R = A ? A[w] : 0;
    (!R || !await (a.isElement == null ? void 0 : a.isElement(A))) && (R = i.floating[w] || s.floating[y]);
    const k = C / 2 - E / 2, F = R / 2 - u[y] / 2 - 1, j = Ce(p[b], F), B = Ce(p[v], F), T = j, z = R - u[y] - B, L = R / 2 - u[y] / 2 + k, H = Lt(T, L, z), _ = !c.arrow && We(o) != null && L !== H && s.reference[y] / 2 - (L < T ? j : B) - u[y] / 2 < 0, D = _ ? L < T ? L - T : L - z : 0;
    return {
      [g]: h[g] + D,
      data: {
        [g]: H,
        centerOffset: L - H - D,
        ..._ && {
          alignmentOffset: D
        }
      },
      reset: _
    };
  }
}), Bs = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: s,
        rects: a,
        initialPlacement: i,
        platform: c,
        elements: l
      } = t, {
        mainAxis: f = !0,
        crossAxis: p = !0,
        fallbackPlacements: h,
        fallbackStrategy: g = "bestFit",
        fallbackAxisSideDirection: y = "none",
        flipAlignment: u = !0,
        ...m
      } = ve(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const b = be(o), v = fe(i), w = be(i) === i, C = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), E = h || (w || !u ? [ut(i)] : _s(i)), A = y !== "none";
      !h && A && E.push(...js(i, u, y, C));
      const R = [i, ...E], k = await Ze(t, m), F = [];
      let j = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (f && F.push(k[b]), p) {
        const L = ks(o, a, C);
        F.push(k[L[0]], k[L[1]]);
      }
      if (j = [...j, {
        placement: o,
        overflows: F
      }], !F.every((L) => L <= 0)) {
        var B, T;
        const L = (((B = s.flip) == null ? void 0 : B.index) || 0) + 1, H = R[L];
        if (H && (!(p === "alignment" ? v !== fe(H) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        j.every((O) => fe(O.placement) === v ? O.overflows[0] > 0 : !0)))
          return {
            data: {
              index: L,
              overflows: j
            },
            reset: {
              placement: H
            }
          };
        let _ = (T = j.filter((D) => D.overflows[0] <= 0).sort((D, O) => D.overflows[1] - O.overflows[1])[0]) == null ? void 0 : T.placement;
        if (!_)
          switch (g) {
            case "bestFit": {
              var z;
              const D = (z = j.filter((O) => {
                if (A) {
                  const W = fe(O.placement);
                  return W === v || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  W === "y";
                }
                return !0;
              }).map((O) => [O.placement, O.overflows.filter((W) => W > 0).reduce((W, x) => W + x, 0)]).sort((O, W) => O[1] - W[1])[0]) == null ? void 0 : z[0];
              D && (_ = D);
              break;
            }
            case "initialPlacement":
              _ = i;
              break;
          }
        if (o !== _)
          return {
            reset: {
              placement: _
            }
          };
      }
      return {};
    }
  };
};
function En(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Rn(e) {
  return As.some((t) => e[t] >= 0);
}
const zs = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = ve(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await Ze(t, {
            ...o,
            elementContext: "reference"
          }), a = En(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: Rn(a)
            }
          };
        }
        case "escaped": {
          const s = await Ze(t, {
            ...o,
            altBoundary: !0
          }), a = En(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: Rn(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Jn = /* @__PURE__ */ new Set(["left", "top"]);
async function Vs(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = be(n), i = We(n), c = fe(n) === "y", l = Jn.has(a) ? -1 : 1, f = s && c ? -1 : 1, p = ve(t, e);
  let {
    mainAxis: h,
    crossAxis: g,
    alignmentAxis: y
  } = typeof p == "number" ? {
    mainAxis: p,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: p.mainAxis || 0,
    crossAxis: p.crossAxis || 0,
    alignmentAxis: p.alignmentAxis
  };
  return i && typeof y == "number" && (g = i === "end" ? y * -1 : y), c ? {
    x: g * f,
    y: h * l
  } : {
    x: h * l,
    y: g * f
  };
}
const $s = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: s,
        placement: a,
        middlewareData: i
      } = t, c = await Vs(t, e);
      return a === ((n = i.offset) == null ? void 0 : n.placement) && (r = i.arrow) != null && r.alignmentOffset ? {} : {
        x: o + c.x,
        y: s + c.y,
        data: {
          ...c,
          placement: a
        }
      };
    }
  };
}, Hs = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: s = !0,
        crossAxis: a = !1,
        limiter: i = {
          fn: (m) => {
            let {
              x: b,
              y: v
            } = m;
            return {
              x: b,
              y: v
            };
          }
        },
        ...c
      } = ve(e, t), l = {
        x: n,
        y: r
      }, f = await Ze(t, c), p = fe(be(o)), h = Gt(p);
      let g = l[h], y = l[p];
      if (s) {
        const m = h === "y" ? "top" : "left", b = h === "y" ? "bottom" : "right", v = g + f[m], w = g - f[b];
        g = Lt(v, g, w);
      }
      if (a) {
        const m = p === "y" ? "top" : "left", b = p === "y" ? "bottom" : "right", v = y + f[m], w = y - f[b];
        y = Lt(v, y, w);
      }
      const u = i.fn({
        ...t,
        [h]: g,
        [p]: y
      });
      return {
        ...u,
        data: {
          x: u.x - n,
          y: u.y - r,
          enabled: {
            [h]: s,
            [p]: a
          }
        }
      };
    }
  };
}, Us = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: s,
        middlewareData: a
      } = t, {
        offset: i = 0,
        mainAxis: c = !0,
        crossAxis: l = !0
      } = ve(e, t), f = {
        x: n,
        y: r
      }, p = fe(o), h = Gt(p);
      let g = f[h], y = f[p];
      const u = ve(i, t), m = typeof u == "number" ? {
        mainAxis: u,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...u
      };
      if (c) {
        const w = h === "y" ? "height" : "width", C = s.reference[h] - s.floating[w] + m.mainAxis, E = s.reference[h] + s.reference[w] - m.mainAxis;
        g < C ? g = C : g > E && (g = E);
      }
      if (l) {
        var b, v;
        const w = h === "y" ? "width" : "height", C = Jn.has(be(o)), E = s.reference[p] - s.floating[w] + (C && ((b = a.offset) == null ? void 0 : b[p]) || 0) + (C ? 0 : m.crossAxis), A = s.reference[p] + s.reference[w] + (C ? 0 : ((v = a.offset) == null ? void 0 : v[p]) || 0) - (C ? m.crossAxis : 0);
        y < E ? y = E : y > A && (y = A);
      }
      return {
        [h]: g,
        [p]: y
      };
    }
  };
}, Ys = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: s,
        platform: a,
        elements: i
      } = t, {
        apply: c = () => {
        },
        ...l
      } = ve(e, t), f = await Ze(t, l), p = be(o), h = We(o), g = fe(o) === "y", {
        width: y,
        height: u
      } = s.floating;
      let m, b;
      p === "top" || p === "bottom" ? (m = p, b = h === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (b = p, m = h === "end" ? "top" : "bottom");
      const v = u - f.top - f.bottom, w = y - f.left - f.right, C = Ce(u - f[m], v), E = Ce(y - f[b], w), A = !t.middlewareData.shift;
      let R = C, k = E;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (k = w), (r = t.middlewareData.shift) != null && r.enabled.y && (R = v), A && !h) {
        const j = re(f.left, 0), B = re(f.right, 0), T = re(f.top, 0), z = re(f.bottom, 0);
        g ? k = y - 2 * (j !== 0 || B !== 0 ? j + B : re(f.left, f.right)) : R = u - 2 * (T !== 0 || z !== 0 ? T + z : re(f.top, f.bottom));
      }
      await c({
        ...t,
        availableWidth: k,
        availableHeight: R
      });
      const F = await a.getDimensions(i.floating);
      return y !== F.width || u !== F.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function ht() {
  return typeof window < "u";
}
function Be(e) {
  return Qn(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function oe(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function he(e) {
  var t;
  return (t = (Qn(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Qn(e) {
  return ht() ? e instanceof Node || e instanceof oe(e).Node : !1;
}
function ce(e) {
  return ht() ? e instanceof Element || e instanceof oe(e).Element : !1;
}
function me(e) {
  return ht() ? e instanceof HTMLElement || e instanceof oe(e).HTMLElement : !1;
}
function Pn(e) {
  return !ht() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof oe(e).ShadowRoot;
}
const Gs = /* @__PURE__ */ new Set(["inline", "contents"]);
function Qe(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = le(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Gs.has(o);
}
const Ks = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Xs(e) {
  return Ks.has(Be(e));
}
const qs = [":popover-open", ":modal"];
function gt(e) {
  return qs.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Zs = ["transform", "translate", "scale", "rotate", "perspective"], Js = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Qs = ["paint", "layout", "strict", "content"];
function qt(e) {
  const t = Zt(), n = ce(e) ? le(e) : e;
  return Zs.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Js.some((r) => (n.willChange || "").includes(r)) || Qs.some((r) => (n.contain || "").includes(r));
}
function ei(e) {
  let t = Ee(e);
  for (; me(t) && !De(t); ) {
    if (qt(t))
      return t;
    if (gt(t))
      return null;
    t = Ee(t);
  }
  return null;
}
function Zt() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const ti = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function De(e) {
  return ti.has(Be(e));
}
function le(e) {
  return oe(e).getComputedStyle(e);
}
function vt(e) {
  return ce(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Ee(e) {
  if (Be(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Pn(e) && e.host || // Fallback.
    he(e)
  );
  return Pn(t) ? t.host : t;
}
function er(e) {
  const t = Ee(e);
  return De(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : me(t) && Qe(t) ? t : er(t);
}
function Je(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = er(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = oe(o);
  if (s) {
    const i = Dt(a);
    return t.concat(a, a.visualViewport || [], Qe(o) ? o : [], i && n ? Je(i) : []);
  }
  return t.concat(o, Je(o, [], n));
}
function Dt(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function tr(e) {
  const t = le(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = me(e), s = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, i = lt(n) !== s || lt(r) !== a;
  return i && (n = s, r = a), {
    width: n,
    height: r,
    $: i
  };
}
function Jt(e) {
  return ce(e) ? e : e.contextElement;
}
function Le(e) {
  const t = Jt(e);
  if (!me(t))
    return pe(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = tr(t);
  let a = (s ? lt(n.width) : n.width) / r, i = (s ? lt(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const ni = /* @__PURE__ */ pe(0);
function nr(e) {
  const t = oe(e);
  return !Zt() || !t.visualViewport ? ni : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function ri(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== oe(e) ? !1 : t;
}
function Te(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = Jt(e);
  let a = pe(1);
  t && (r ? ce(r) && (a = Le(r)) : a = Le(e));
  const i = ri(s, n, r) ? nr(s) : pe(0);
  let c = (o.left + i.x) / a.x, l = (o.top + i.y) / a.y, f = o.width / a.x, p = o.height / a.y;
  if (s) {
    const h = oe(s), g = r && ce(r) ? oe(r) : r;
    let y = h, u = Dt(y);
    for (; u && r && g !== y; ) {
      const m = Le(u), b = u.getBoundingClientRect(), v = le(u), w = b.left + (u.clientLeft + parseFloat(v.paddingLeft)) * m.x, C = b.top + (u.clientTop + parseFloat(v.paddingTop)) * m.y;
      c *= m.x, l *= m.y, f *= m.x, p *= m.y, c += w, l += C, y = oe(u), u = Dt(y);
    }
  }
  return dt({
    width: f,
    height: p,
    x: c,
    y: l
  });
}
function Qt(e, t) {
  const n = vt(e).scrollLeft;
  return t ? t.left + n : Te(he(e)).left + n;
}
function rr(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), o = r.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    Qt(e, r)
  )), s = r.top + t.scrollTop;
  return {
    x: o,
    y: s
  };
}
function oi(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", a = he(r), i = t ? gt(t.floating) : !1;
  if (r === a || i && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = pe(1);
  const f = pe(0), p = me(r);
  if ((p || !p && !s) && ((Be(r) !== "body" || Qe(a)) && (c = vt(r)), me(r))) {
    const g = Te(r);
    l = Le(r), f.x = g.x + r.clientLeft, f.y = g.y + r.clientTop;
  }
  const h = a && !p && !s ? rr(a, c, !0) : pe(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + f.x + h.x,
    y: n.y * l.y - c.scrollTop * l.y + f.y + h.y
  };
}
function si(e) {
  return Array.from(e.getClientRects());
}
function ii(e) {
  const t = he(e), n = vt(e), r = e.ownerDocument.body, o = re(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = re(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + Qt(e);
  const i = -n.scrollTop;
  return le(r).direction === "rtl" && (a += re(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: a,
    y: i
  };
}
function ai(e, t) {
  const n = oe(e), r = he(e), o = n.visualViewport;
  let s = r.clientWidth, a = r.clientHeight, i = 0, c = 0;
  if (o) {
    s = o.width, a = o.height;
    const l = Zt();
    (!l || l && t === "fixed") && (i = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: s,
    height: a,
    x: i,
    y: c
  };
}
const ci = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function li(e, t) {
  const n = Te(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = me(e) ? Le(e) : pe(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, c = o * s.x, l = r * s.y;
  return {
    width: a,
    height: i,
    x: c,
    y: l
  };
}
function An(e, t, n) {
  let r;
  if (t === "viewport")
    r = ai(e, n);
  else if (t === "document")
    r = ii(he(e));
  else if (ce(t))
    r = li(t, n);
  else {
    const o = nr(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return dt(r);
}
function or(e, t) {
  const n = Ee(e);
  return n === t || !ce(n) || De(n) ? !1 : le(n).position === "fixed" || or(n, t);
}
function ui(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Je(e, [], !1).filter((i) => ce(i) && Be(i) !== "body"), o = null;
  const s = le(e).position === "fixed";
  let a = s ? Ee(e) : e;
  for (; ce(a) && !De(a); ) {
    const i = le(a), c = qt(a);
    !c && i.position === "fixed" && (o = null), (s ? !c && !o : !c && i.position === "static" && !!o && ci.has(o.position) || Qe(a) && !c && or(e, a)) ? r = r.filter((f) => f !== a) : o = i, a = Ee(a);
  }
  return t.set(e, r), r;
}
function di(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? gt(t) ? [] : ui(t, this._c) : [].concat(n), r], i = a[0], c = a.reduce((l, f) => {
    const p = An(t, f, o);
    return l.top = re(p.top, l.top), l.right = Ce(p.right, l.right), l.bottom = Ce(p.bottom, l.bottom), l.left = re(p.left, l.left), l;
  }, An(t, i, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function fi(e) {
  const {
    width: t,
    height: n
  } = tr(e);
  return {
    width: t,
    height: n
  };
}
function pi(e, t, n) {
  const r = me(t), o = he(t), s = n === "fixed", a = Te(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = pe(0);
  function l() {
    c.x = Qt(o);
  }
  if (r || !r && !s)
    if ((Be(t) !== "body" || Qe(o)) && (i = vt(t)), r) {
      const g = Te(t, !0, s, t);
      c.x = g.x + t.clientLeft, c.y = g.y + t.clientTop;
    } else o && l();
  s && !r && o && l();
  const f = o && !r && !s ? rr(o, i) : pe(0), p = a.left + i.scrollLeft - c.x - f.x, h = a.top + i.scrollTop - c.y - f.y;
  return {
    x: p,
    y: h,
    width: a.width,
    height: a.height
  };
}
function Pt(e) {
  return le(e).position === "static";
}
function Tn(e, t) {
  if (!me(e) || le(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return he(e) === n && (n = n.ownerDocument.body), n;
}
function sr(e, t) {
  const n = oe(e);
  if (gt(e))
    return n;
  if (!me(e)) {
    let o = Ee(e);
    for (; o && !De(o); ) {
      if (ce(o) && !Pt(o))
        return o;
      o = Ee(o);
    }
    return n;
  }
  let r = Tn(e, t);
  for (; r && Xs(r) && Pt(r); )
    r = Tn(r, t);
  return r && De(r) && Pt(r) && !qt(r) ? n : r || ei(e) || n;
}
const mi = async function(e) {
  const t = this.getOffsetParent || sr, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: pi(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function hi(e) {
  return le(e).direction === "rtl";
}
const gi = {
  convertOffsetParentRelativeRectToViewportRelativeRect: oi,
  getDocumentElement: he,
  getClippingRect: di,
  getOffsetParent: sr,
  getElementRects: mi,
  getClientRects: si,
  getDimensions: fi,
  getScale: Le,
  isElement: ce,
  isRTL: hi
};
function ir(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function vi(e, t) {
  let n = null, r;
  const o = he(e);
  function s() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function a(i, c) {
    i === void 0 && (i = !1), c === void 0 && (c = 1), s();
    const l = e.getBoundingClientRect(), {
      left: f,
      top: p,
      width: h,
      height: g
    } = l;
    if (i || t(), !h || !g)
      return;
    const y = tt(p), u = tt(o.clientWidth - (f + h)), m = tt(o.clientHeight - (p + g)), b = tt(f), w = {
      rootMargin: -y + "px " + -u + "px " + -m + "px " + -b + "px",
      threshold: re(0, Ce(1, c)) || 1
    };
    let C = !0;
    function E(A) {
      const R = A[0].intersectionRatio;
      if (R !== c) {
        if (!C)
          return a();
        R ? a(!1, R) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      R === 1 && !ir(l, e.getBoundingClientRect()) && a(), C = !1;
    }
    try {
      n = new IntersectionObserver(E, {
        ...w,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(E, w);
    }
    n.observe(e);
  }
  return a(!0), s;
}
function bi(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = Jt(e), f = o || s ? [...l ? Je(l) : [], ...Je(t)] : [];
  f.forEach((b) => {
    o && b.addEventListener("scroll", n, {
      passive: !0
    }), s && b.addEventListener("resize", n);
  });
  const p = l && i ? vi(l, n) : null;
  let h = -1, g = null;
  a && (g = new ResizeObserver((b) => {
    let [v] = b;
    v && v.target === l && g && (g.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var w;
      (w = g) == null || w.observe(t);
    })), n();
  }), l && !c && g.observe(l), g.observe(t));
  let y, u = c ? Te(e) : null;
  c && m();
  function m() {
    const b = Te(e);
    u && !ir(u, b) && n(), u = b, y = requestAnimationFrame(m);
  }
  return n(), () => {
    var b;
    f.forEach((v) => {
      o && v.removeEventListener("scroll", n), s && v.removeEventListener("resize", n);
    }), p == null || p(), (b = g) == null || b.disconnect(), g = null, c && cancelAnimationFrame(y);
  };
}
const yi = $s, wi = Hs, xi = Bs, Si = Ys, Ci = zs, On = Ws, Ei = Us, Ri = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: gi,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return Fs(e, t, {
    ...o,
    platform: s
  });
};
var Pi = typeof document < "u", Ai = function() {
}, it = Pi ? ao : Ai;
function ft(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (r = n; r-- !== 0; )
        if (!ft(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const s = o[r];
      if (!(s === "_owner" && e.$$typeof) && !ft(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function ar(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Nn(e, t) {
  const n = ar(e);
  return Math.round(t * n) / n;
}
function At(e) {
  const t = d.useRef(e);
  return it(() => {
    t.current = e;
  }), t;
}
function Ti(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: s,
      floating: a
    } = {},
    transform: i = !0,
    whileElementsMounted: c,
    open: l
  } = e, [f, p] = d.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [h, g] = d.useState(r);
  ft(h, r) || g(r);
  const [y, u] = d.useState(null), [m, b] = d.useState(null), v = d.useCallback((O) => {
    O !== A.current && (A.current = O, u(O));
  }, []), w = d.useCallback((O) => {
    O !== R.current && (R.current = O, b(O));
  }, []), C = s || y, E = a || m, A = d.useRef(null), R = d.useRef(null), k = d.useRef(f), F = c != null, j = At(c), B = At(o), T = At(l), z = d.useCallback(() => {
    if (!A.current || !R.current)
      return;
    const O = {
      placement: t,
      strategy: n,
      middleware: h
    };
    B.current && (O.platform = B.current), Ri(A.current, R.current, O).then((W) => {
      const x = {
        ...W,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: T.current !== !1
      };
      L.current && !ft(k.current, x) && (k.current = x, mt.flushSync(() => {
        p(x);
      }));
    });
  }, [h, t, n, B, T]);
  it(() => {
    l === !1 && k.current.isPositioned && (k.current.isPositioned = !1, p((O) => ({
      ...O,
      isPositioned: !1
    })));
  }, [l]);
  const L = d.useRef(!1);
  it(() => (L.current = !0, () => {
    L.current = !1;
  }), []), it(() => {
    if (C && (A.current = C), E && (R.current = E), C && E) {
      if (j.current)
        return j.current(C, E, z);
      z();
    }
  }, [C, E, z, j, F]);
  const H = d.useMemo(() => ({
    reference: A,
    floating: R,
    setReference: v,
    setFloating: w
  }), [v, w]), _ = d.useMemo(() => ({
    reference: C,
    floating: E
  }), [C, E]), D = d.useMemo(() => {
    const O = {
      position: n,
      left: 0,
      top: 0
    };
    if (!_.floating)
      return O;
    const W = Nn(_.floating, f.x), x = Nn(_.floating, f.y);
    return i ? {
      ...O,
      transform: "translate(" + W + "px, " + x + "px)",
      ...ar(_.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: W,
      top: x
    };
  }, [n, i, _.floating, f.x, f.y]);
  return d.useMemo(() => ({
    ...f,
    update: z,
    refs: H,
    elements: _,
    floatingStyles: D
  }), [f, z, H, _, D]);
}
const Oi = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: r,
        padding: o
      } = typeof e == "function" ? e(n) : e;
      return r && t(r) ? r.current != null ? On({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? On({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Ni = (e, t) => ({
  ...yi(e),
  options: [e, t]
}), ki = (e, t) => ({
  ...wi(e),
  options: [e, t]
}), _i = (e, t) => ({
  ...Ei(e),
  options: [e, t]
}), Ii = (e, t) => ({
  ...xi(e),
  options: [e, t]
}), Mi = (e, t) => ({
  ...Si(e),
  options: [e, t]
}), Li = (e, t) => ({
  ...Ci(e),
  options: [e, t]
}), ji = (e, t) => ({
  ...Oi(e),
  options: [e, t]
});
var Di = "Arrow", cr = d.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ S.jsx(
    q.svg,
    {
      ...s,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ S.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
cr.displayName = Di;
var Fi = cr;
function Wi(e) {
  const [t, n] = d.useState(void 0);
  return te(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const s = o[0];
        let a, i;
        if ("borderBoxSize" in s) {
          const c = s.borderBoxSize, l = Array.isArray(c) ? c[0] : c;
          a = l.inlineSize, i = l.blockSize;
        } else
          a = e.offsetWidth, i = e.offsetHeight;
        n({ width: a, height: i });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var en = "Popper", [lr, ur] = Ut(en), [Bi, dr] = lr(en), fr = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = d.useState(null);
  return /* @__PURE__ */ S.jsx(Bi, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
fr.displayName = en;
var pr = "PopperAnchor", mr = d.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = dr(pr, n), a = d.useRef(null), i = ee(t, a);
    return d.useEffect(() => {
      s.onAnchorChange((r == null ? void 0 : r.current) || a.current);
    }), r ? null : /* @__PURE__ */ S.jsx(q.div, { ...o, ref: i });
  }
);
mr.displayName = pr;
var tn = "PopperContent", [zi, Vi] = lr(tn), hr = d.forwardRef(
  (e, t) => {
    var N, I, K, V, $, Y;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: s = "center",
      alignOffset: a = 0,
      arrowPadding: i = 0,
      avoidCollisions: c = !0,
      collisionBoundary: l = [],
      collisionPadding: f = 0,
      sticky: p = "partial",
      hideWhenDetached: h = !1,
      updatePositionStrategy: g = "optimized",
      onPlaced: y,
      ...u
    } = e, m = dr(tn, n), [b, v] = d.useState(null), w = ee(t, (ne) => v(ne)), [C, E] = d.useState(null), A = Wi(C), R = (A == null ? void 0 : A.width) ?? 0, k = (A == null ? void 0 : A.height) ?? 0, F = r + (s !== "center" ? "-" + s : ""), j = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f }, B = Array.isArray(l) ? l : [l], T = B.length > 0, z = {
      padding: j,
      boundary: B.filter(Hi),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: T
    }, { refs: L, floatingStyles: H, placement: _, isPositioned: D, middlewareData: O } = Ti({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: F,
      whileElementsMounted: (...ne) => bi(...ne, {
        animationFrame: g === "always"
      }),
      elements: {
        reference: m.anchor
      },
      middleware: [
        Ni({ mainAxis: o + k, alignmentAxis: a }),
        c && ki({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? _i() : void 0,
          ...z
        }),
        c && Ii({ ...z }),
        Mi({
          ...z,
          apply: ({ elements: ne, rects: ue, availableWidth: Ve, availableHeight: $e }) => {
            const { width: He, height: io } = ue.reference, et = ne.floating.style;
            et.setProperty("--radix-popper-available-width", `${Ve}px`), et.setProperty("--radix-popper-available-height", `${$e}px`), et.setProperty("--radix-popper-anchor-width", `${He}px`), et.setProperty("--radix-popper-anchor-height", `${io}px`);
          }
        }),
        C && ji({ element: C, padding: i }),
        Ui({ arrowWidth: R, arrowHeight: k }),
        h && Li({ strategy: "referenceHidden", ...z })
      ]
    }), [W, x] = br(_), P = Ae(y);
    te(() => {
      D && (P == null || P());
    }, [D, P]);
    const U = (N = O.arrow) == null ? void 0 : N.x, X = (I = O.arrow) == null ? void 0 : I.y, J = ((K = O.arrow) == null ? void 0 : K.centerOffset) !== 0, [Q, se] = d.useState();
    return te(() => {
      b && se(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ S.jsx(
      "div",
      {
        ref: L.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...H,
          transform: D ? H.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: Q,
          "--radix-popper-transform-origin": [
            (V = O.transformOrigin) == null ? void 0 : V.x,
            ($ = O.transformOrigin) == null ? void 0 : $.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((Y = O.hide) == null ? void 0 : Y.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ S.jsx(
          zi,
          {
            scope: n,
            placedSide: W,
            onArrowChange: E,
            arrowX: U,
            arrowY: X,
            shouldHideArrow: J,
            children: /* @__PURE__ */ S.jsx(
              q.div,
              {
                "data-side": W,
                "data-align": x,
                ...u,
                ref: w,
                style: {
                  ...u.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: D ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
hr.displayName = tn;
var gr = "PopperArrow", $i = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, vr = d.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = Vi(gr, r), a = $i[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ S.jsx(
      "span",
      {
        ref: s.onArrowChange,
        style: {
          position: "absolute",
          left: s.arrowX,
          top: s.arrowY,
          [a]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[s.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[s.placedSide],
          visibility: s.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ S.jsx(
          Fi,
          {
            ...o,
            ref: n,
            style: {
              ...o.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
vr.displayName = gr;
function Hi(e) {
  return e !== null;
}
var Ui = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var m, b, v;
    const { placement: n, rects: r, middlewareData: o } = t, a = ((m = o.arrow) == null ? void 0 : m.centerOffset) !== 0, i = a ? 0 : e.arrowWidth, c = a ? 0 : e.arrowHeight, [l, f] = br(n), p = { start: "0%", center: "50%", end: "100%" }[f], h = (((b = o.arrow) == null ? void 0 : b.x) ?? 0) + i / 2, g = (((v = o.arrow) == null ? void 0 : v.y) ?? 0) + c / 2;
    let y = "", u = "";
    return l === "bottom" ? (y = a ? p : `${h}px`, u = `${-c}px`) : l === "top" ? (y = a ? p : `${h}px`, u = `${r.floating.height + c}px`) : l === "right" ? (y = `${-c}px`, u = a ? p : `${g}px`) : l === "left" && (y = `${r.floating.width + c}px`, u = a ? p : `${g}px`), { data: { x: y, y: u } };
  }
});
function br(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Yi = fr, Gi = mr, Ki = hr, Xi = vr, qi = "Portal", yr = d.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, s] = d.useState(!1);
  te(() => s(!0), []);
  const a = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return a ? uo.createPortal(/* @__PURE__ */ S.jsx(q.div, { ...r, ref: t }), a) : null;
});
yr.displayName = qi;
var Zi = d[" useInsertionEffect ".trim().toString()] || te;
function kn({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, a] = Ji({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, c = i ? e : o;
  {
    const f = d.useRef(e !== void 0);
    d.useEffect(() => {
      const p = f.current;
      p !== i && console.warn(
        `${r} is changing from ${p ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = i;
    }, [i, r]);
  }
  const l = d.useCallback(
    (f) => {
      var p;
      if (i) {
        const h = Qi(f) ? f(e) : f;
        h !== e && ((p = a.current) == null || p.call(a, h));
      } else
        s(f);
    },
    [i, e, s, a]
  );
  return [c, l];
}
function Ji({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = d.useState(e), o = d.useRef(n), s = d.useRef(t);
  return Zi(() => {
    s.current = t;
  }, [t]), d.useEffect(() => {
    var a;
    o.current !== n && ((a = s.current) == null || a.call(s, n), o.current = n);
  }, [n, o]), [n, r, s];
}
function Qi(e) {
  return typeof e == "function";
}
function ea(e) {
  const t = d.useRef({ value: e, previous: e });
  return d.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var wr = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), ta = "VisuallyHidden", na = d.forwardRef(
  (e, t) => /* @__PURE__ */ S.jsx(
    q.span,
    {
      ...e,
      ref: t,
      style: { ...wr, ...e.style }
    }
  )
);
na.displayName = ta;
var ra = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, ke = /* @__PURE__ */ new WeakMap(), nt = /* @__PURE__ */ new WeakMap(), rt = {}, Tt = 0, xr = function(e) {
  return e && (e.host || xr(e.parentNode));
}, oa = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = xr(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, sa = function(e, t, n, r) {
  var o = oa(t, Array.isArray(e) ? e : [e]);
  rt[n] || (rt[n] = /* @__PURE__ */ new WeakMap());
  var s = rt[n], a = [], i = /* @__PURE__ */ new Set(), c = new Set(o), l = function(p) {
    !p || i.has(p) || (i.add(p), l(p.parentNode));
  };
  o.forEach(l);
  var f = function(p) {
    !p || c.has(p) || Array.prototype.forEach.call(p.children, function(h) {
      if (i.has(h))
        f(h);
      else
        try {
          var g = h.getAttribute(r), y = g !== null && g !== "false", u = (ke.get(h) || 0) + 1, m = (s.get(h) || 0) + 1;
          ke.set(h, u), s.set(h, m), a.push(h), u === 1 && y && nt.set(h, !0), m === 1 && h.setAttribute(n, "true"), y || h.setAttribute(r, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", h, b);
        }
    });
  };
  return f(t), i.clear(), Tt++, function() {
    a.forEach(function(p) {
      var h = ke.get(p) - 1, g = s.get(p) - 1;
      ke.set(p, h), s.set(p, g), h || (nt.has(p) || p.removeAttribute(r), nt.delete(p)), g || p.removeAttribute(n);
    }), Tt--, Tt || (ke = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new WeakMap(), nt = /* @__PURE__ */ new WeakMap(), rt = {});
  };
}, ia = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = ra(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), sa(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, de = function() {
  return de = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, de.apply(this, arguments);
};
function Sr(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function aa(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var at = "right-scroll-bar-position", ct = "width-before-scroll-bar", ca = "with-scroll-bars-hidden", la = "--removed-body-scroll-bar-size";
function Ot(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function ua(e, t) {
  var n = co(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && (n.value = r, n.callback(r, o));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var da = typeof window < "u" ? d.useLayoutEffect : d.useEffect, _n = /* @__PURE__ */ new WeakMap();
function fa(e, t) {
  var n = ua(null, function(r) {
    return e.forEach(function(o) {
      return Ot(o, r);
    });
  });
  return da(function() {
    var r = _n.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), a = n.current;
      o.forEach(function(i) {
        s.has(i) || Ot(i, null);
      }), s.forEach(function(i) {
        o.has(i) || Ot(i, a);
      });
    }
    _n.set(n, e);
  }, [e]), n;
}
function pa(e) {
  return e;
}
function ma(e, t) {
  t === void 0 && (t = pa);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(s) {
      var a = t(s, r);
      return n.push(a), function() {
        n = n.filter(function(i) {
          return i !== a;
        });
      };
    },
    assignSyncMedium: function(s) {
      for (r = !0; n.length; ) {
        var a = n;
        n = [], a.forEach(s);
      }
      n = {
        push: function(i) {
          return s(i);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(s) {
      r = !0;
      var a = [];
      if (n.length) {
        var i = n;
        n = [], i.forEach(s), a = n;
      }
      var c = function() {
        var f = a;
        a = [], f.forEach(s);
      }, l = function() {
        return Promise.resolve().then(c);
      };
      l(), n = {
        push: function(f) {
          a.push(f), l();
        },
        filter: function(f) {
          return a = a.filter(f), n;
        }
      };
    }
  };
  return o;
}
function ha(e) {
  e === void 0 && (e = {});
  var t = ma(null);
  return t.options = de({ async: !0, ssr: !1 }, e), t;
}
var Cr = function(e) {
  var t = e.sideCar, n = Sr(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return d.createElement(r, de({}, n));
};
Cr.isSideCarExport = !0;
function ga(e, t) {
  return e.useMedium(t), Cr;
}
var Er = ha(), Nt = function() {
}, bt = d.forwardRef(function(e, t) {
  var n = d.useRef(null), r = d.useState({
    onScrollCapture: Nt,
    onWheelCapture: Nt,
    onTouchMoveCapture: Nt
  }), o = r[0], s = r[1], a = e.forwardProps, i = e.children, c = e.className, l = e.removeScrollBar, f = e.enabled, p = e.shards, h = e.sideCar, g = e.noRelative, y = e.noIsolation, u = e.inert, m = e.allowPinchZoom, b = e.as, v = b === void 0 ? "div" : b, w = e.gapMode, C = Sr(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), E = h, A = fa([n, t]), R = de(de({}, C), o);
  return d.createElement(
    d.Fragment,
    null,
    f && d.createElement(E, { sideCar: Er, removeScrollBar: l, shards: p, noRelative: g, noIsolation: y, inert: u, setCallbacks: s, allowPinchZoom: !!m, lockRef: n, gapMode: w }),
    a ? d.cloneElement(d.Children.only(i), de(de({}, R), { ref: A })) : d.createElement(v, de({}, R, { className: c, ref: A }), i)
  );
});
bt.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
bt.classNames = {
  fullWidth: ct,
  zeroRight: at
};
var va = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function ba() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = va();
  return t && e.setAttribute("nonce", t), e;
}
function ya(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function wa(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var xa = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = ba()) && (ya(t, n), wa(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Sa = function() {
  var e = xa();
  return function(t, n) {
    d.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Rr = function() {
  var e = Sa(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Ca = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, kt = function(e) {
  return parseInt(e || "", 10) || 0;
}, Ea = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [kt(n), kt(r), kt(o)];
}, Ra = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Ca;
  var t = Ea(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Pa = Rr(), je = "data-scroll-locked", Aa = function(e, t, n, r) {
  var o = e.left, s = e.top, a = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(ca, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(je, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(s, `px;
    padding-right: `).concat(a, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(i, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(at, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(ct, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(at, " .").concat(at, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(ct, " .").concat(ct, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(je, `] {
    `).concat(la, ": ").concat(i, `px;
  }
`);
}, In = function() {
  var e = parseInt(document.body.getAttribute(je) || "0", 10);
  return isFinite(e) ? e : 0;
}, Ta = function() {
  d.useEffect(function() {
    return document.body.setAttribute(je, (In() + 1).toString()), function() {
      var e = In() - 1;
      e <= 0 ? document.body.removeAttribute(je) : document.body.setAttribute(je, e.toString());
    };
  }, []);
}, Oa = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Ta();
  var s = d.useMemo(function() {
    return Ra(o);
  }, [o]);
  return d.createElement(Pa, { styles: Aa(s, !t, o, n ? "" : "!important") });
}, Ft = !1;
if (typeof window < "u")
  try {
    var ot = Object.defineProperty({}, "passive", {
      get: function() {
        return Ft = !0, !0;
      }
    });
    window.addEventListener("test", ot, ot), window.removeEventListener("test", ot, ot);
  } catch {
    Ft = !1;
  }
var _e = Ft ? { passive: !1 } : !1, Na = function(e) {
  return e.tagName === "TEXTAREA";
}, Pr = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Na(e) && n[t] === "visible")
  );
}, ka = function(e) {
  return Pr(e, "overflowY");
}, _a = function(e) {
  return Pr(e, "overflowX");
}, Mn = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Ar(e, r);
    if (o) {
      var s = Tr(e, r), a = s[1], i = s[2];
      if (a > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Ia = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Ma = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Ar = function(e, t) {
  return e === "v" ? ka(t) : _a(t);
}, Tr = function(e, t) {
  return e === "v" ? Ia(t) : Ma(t);
}, La = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, ja = function(e, t, n, r, o) {
  var s = La(e, window.getComputedStyle(t).direction), a = s * r, i = n.target, c = t.contains(i), l = !1, f = a > 0, p = 0, h = 0;
  do {
    if (!i)
      break;
    var g = Tr(e, i), y = g[0], u = g[1], m = g[2], b = u - m - s * y;
    (y || b) && Ar(e, i) && (p += b, h += y);
    var v = i.parentNode;
    i = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v;
  } while (
    // portaled content
    !c && i !== document.body || // self content
    c && (t.contains(i) || t === i)
  );
  return (f && Math.abs(p) < 1 || !f && Math.abs(h) < 1) && (l = !0), l;
}, st = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Ln = function(e) {
  return [e.deltaX, e.deltaY];
}, jn = function(e) {
  return e && "current" in e ? e.current : e;
}, Da = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Fa = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Wa = 0, Ie = [];
function Ba(e) {
  var t = d.useRef([]), n = d.useRef([0, 0]), r = d.useRef(), o = d.useState(Wa++)[0], s = d.useState(Rr)[0], a = d.useRef(e);
  d.useEffect(function() {
    a.current = e;
  }, [e]), d.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var u = aa([e.lockRef.current], (e.shards || []).map(jn), !0).filter(Boolean);
      return u.forEach(function(m) {
        return m.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), u.forEach(function(m) {
          return m.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = d.useCallback(function(u, m) {
    if ("touches" in u && u.touches.length === 2 || u.type === "wheel" && u.ctrlKey)
      return !a.current.allowPinchZoom;
    var b = st(u), v = n.current, w = "deltaX" in u ? u.deltaX : v[0] - b[0], C = "deltaY" in u ? u.deltaY : v[1] - b[1], E, A = u.target, R = Math.abs(w) > Math.abs(C) ? "h" : "v";
    if ("touches" in u && R === "h" && A.type === "range")
      return !1;
    var k = Mn(R, A);
    if (!k)
      return !0;
    if (k ? E = R : (E = R === "v" ? "h" : "v", k = Mn(R, A)), !k)
      return !1;
    if (!r.current && "changedTouches" in u && (w || C) && (r.current = E), !E)
      return !0;
    var F = r.current || E;
    return ja(F, m, u, F === "h" ? w : C);
  }, []), c = d.useCallback(function(u) {
    var m = u;
    if (!(!Ie.length || Ie[Ie.length - 1] !== s)) {
      var b = "deltaY" in m ? Ln(m) : st(m), v = t.current.filter(function(E) {
        return E.name === m.type && (E.target === m.target || m.target === E.shadowParent) && Da(E.delta, b);
      })[0];
      if (v && v.should) {
        m.cancelable && m.preventDefault();
        return;
      }
      if (!v) {
        var w = (a.current.shards || []).map(jn).filter(Boolean).filter(function(E) {
          return E.contains(m.target);
        }), C = w.length > 0 ? i(m, w[0]) : !a.current.noIsolation;
        C && m.cancelable && m.preventDefault();
      }
    }
  }, []), l = d.useCallback(function(u, m, b, v) {
    var w = { name: u, delta: m, target: b, should: v, shadowParent: za(b) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(C) {
        return C !== w;
      });
    }, 1);
  }, []), f = d.useCallback(function(u) {
    n.current = st(u), r.current = void 0;
  }, []), p = d.useCallback(function(u) {
    l(u.type, Ln(u), u.target, i(u, e.lockRef.current));
  }, []), h = d.useCallback(function(u) {
    l(u.type, st(u), u.target, i(u, e.lockRef.current));
  }, []);
  d.useEffect(function() {
    return Ie.push(s), e.setCallbacks({
      onScrollCapture: p,
      onWheelCapture: p,
      onTouchMoveCapture: h
    }), document.addEventListener("wheel", c, _e), document.addEventListener("touchmove", c, _e), document.addEventListener("touchstart", f, _e), function() {
      Ie = Ie.filter(function(u) {
        return u !== s;
      }), document.removeEventListener("wheel", c, _e), document.removeEventListener("touchmove", c, _e), document.removeEventListener("touchstart", f, _e);
    };
  }, []);
  var g = e.removeScrollBar, y = e.inert;
  return d.createElement(
    d.Fragment,
    null,
    y ? d.createElement(s, { styles: Fa(o) }) : null,
    g ? d.createElement(Oa, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function za(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Va = ga(Er, Ba);
var Or = d.forwardRef(function(e, t) {
  return d.createElement(bt, de({}, e, { ref: t, sideCar: Va }));
});
Or.classNames = bt.classNames;
var $a = [" ", "Enter", "ArrowUp", "ArrowDown"], Ha = [" ", "Enter"], Oe = "Select", [yt, wt, Ua] = is(Oe), [ze, Lc] = Ut(Oe, [
  Ua,
  ur
]), xt = ur(), [Ya, Re] = ze(Oe), [Ga, Ka] = ze(Oe), Nr = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    value: a,
    defaultValue: i,
    onValueChange: c,
    dir: l,
    name: f,
    autoComplete: p,
    disabled: h,
    required: g,
    form: y
  } = e, u = xt(t), [m, b] = d.useState(null), [v, w] = d.useState(null), [C, E] = d.useState(!1), A = cs(l), [R, k] = kn({
    prop: r,
    defaultProp: o ?? !1,
    onChange: s,
    caller: Oe
  }), [F, j] = kn({
    prop: a,
    defaultProp: i,
    onChange: c,
    caller: Oe
  }), B = d.useRef(null), T = m ? y || !!m.closest("form") : !0, [z, L] = d.useState(/* @__PURE__ */ new Set()), H = Array.from(z).map((_) => _.props.value).join(";");
  return /* @__PURE__ */ S.jsx(Yi, { ...u, children: /* @__PURE__ */ S.jsxs(
    Ya,
    {
      required: g,
      scope: t,
      trigger: m,
      onTriggerChange: b,
      valueNode: v,
      onValueNodeChange: w,
      valueNodeHasChildren: C,
      onValueNodeHasChildrenChange: E,
      contentId: Yt(),
      value: F,
      onValueChange: j,
      open: R,
      onOpenChange: k,
      dir: A,
      triggerPointerDownPosRef: B,
      disabled: h,
      children: [
        /* @__PURE__ */ S.jsx(yt.Provider, { scope: t, children: /* @__PURE__ */ S.jsx(
          Ga,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: d.useCallback((_) => {
              L((D) => new Set(D).add(_));
            }, []),
            onNativeOptionRemove: d.useCallback((_) => {
              L((D) => {
                const O = new Set(D);
                return O.delete(_), O;
              });
            }, []),
            children: n
          }
        ) }),
        T ? /* @__PURE__ */ S.jsxs(
          to,
          {
            "aria-hidden": !0,
            required: g,
            tabIndex: -1,
            name: f,
            autoComplete: p,
            value: F,
            onChange: (_) => j(_.target.value),
            disabled: h,
            form: y,
            children: [
              F === void 0 ? /* @__PURE__ */ S.jsx("option", { value: "" }) : null,
              Array.from(z)
            ]
          },
          H
        ) : null
      ]
    }
  ) });
};
Nr.displayName = Oe;
var kr = "SelectTrigger", _r = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...o } = e, s = xt(n), a = Re(kr, n), i = a.disabled || r, c = ee(t, a.onTriggerChange), l = wt(n), f = d.useRef("touch"), [p, h, g] = ro((u) => {
      const m = l().filter((w) => !w.disabled), b = m.find((w) => w.value === a.value), v = oo(m, u, b);
      v !== void 0 && a.onValueChange(v.value);
    }), y = (u) => {
      i || (a.onOpenChange(!0), g()), u && (a.triggerPointerDownPosRef.current = {
        x: Math.round(u.pageX),
        y: Math.round(u.pageY)
      });
    };
    return /* @__PURE__ */ S.jsx(Gi, { asChild: !0, ...s, children: /* @__PURE__ */ S.jsx(
      q.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": a.contentId,
        "aria-expanded": a.open,
        "aria-required": a.required,
        "aria-autocomplete": "none",
        dir: a.dir,
        "data-state": a.open ? "open" : "closed",
        disabled: i,
        "data-disabled": i ? "" : void 0,
        "data-placeholder": no(a.value) ? "" : void 0,
        ...o,
        ref: c,
        onClick: Z(o.onClick, (u) => {
          u.currentTarget.focus(), f.current !== "mouse" && y(u);
        }),
        onPointerDown: Z(o.onPointerDown, (u) => {
          f.current = u.pointerType;
          const m = u.target;
          m.hasPointerCapture(u.pointerId) && m.releasePointerCapture(u.pointerId), u.button === 0 && u.ctrlKey === !1 && u.pointerType === "mouse" && (y(u), u.preventDefault());
        }),
        onKeyDown: Z(o.onKeyDown, (u) => {
          const m = p.current !== "";
          !(u.ctrlKey || u.altKey || u.metaKey) && u.key.length === 1 && h(u.key), !(m && u.key === " ") && $a.includes(u.key) && (y(), u.preventDefault());
        })
      }
    ) });
  }
);
_r.displayName = kr;
var Ir = "SelectValue", Mr = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, children: s, placeholder: a = "", ...i } = e, c = Re(Ir, n), { onValueNodeHasChildrenChange: l } = c, f = s !== void 0, p = ee(t, c.onValueNodeChange);
    return te(() => {
      l(f);
    }, [l, f]), /* @__PURE__ */ S.jsx(
      q.span,
      {
        ...i,
        ref: p,
        style: { pointerEvents: "none" },
        children: no(c.value) ? /* @__PURE__ */ S.jsx(S.Fragment, { children: a }) : s
      }
    );
  }
);
Mr.displayName = Ir;
var Xa = "SelectIcon", Lr = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: r, ...o } = e;
    return /* @__PURE__ */ S.jsx(q.span, { "aria-hidden": !0, ...o, ref: t, children: r || "▼" });
  }
);
Lr.displayName = Xa;
var qa = "SelectPortal", jr = (e) => /* @__PURE__ */ S.jsx(yr, { asChild: !0, ...e });
jr.displayName = qa;
var Ne = "SelectContent", Dr = d.forwardRef(
  (e, t) => {
    const n = Re(Ne, e.__scopeSelect), [r, o] = d.useState();
    if (te(() => {
      o(new DocumentFragment());
    }, []), !n.open) {
      const s = r;
      return s ? mt.createPortal(
        /* @__PURE__ */ S.jsx(Fr, { scope: e.__scopeSelect, children: /* @__PURE__ */ S.jsx(yt.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ S.jsx("div", { children: e.children }) }) }),
        s
      ) : null;
    }
    return /* @__PURE__ */ S.jsx(Wr, { ...e, ref: t });
  }
);
Dr.displayName = Ne;
var ie = 10, [Fr, Pe] = ze(Ne), Za = "SelectContentImpl", Ja = /* @__PURE__ */ qe("SelectContent.RemoveScroll"), Wr = d.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      position: r = "item-aligned",
      onCloseAutoFocus: o,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      //
      // PopperContent props
      side: i,
      sideOffset: c,
      align: l,
      alignOffset: f,
      arrowPadding: p,
      collisionBoundary: h,
      collisionPadding: g,
      sticky: y,
      hideWhenDetached: u,
      avoidCollisions: m,
      //
      ...b
    } = e, v = Re(Ne, n), [w, C] = d.useState(null), [E, A] = d.useState(null), R = ee(t, (N) => C(N)), [k, F] = d.useState(null), [j, B] = d.useState(
      null
    ), T = wt(n), [z, L] = d.useState(!1), H = d.useRef(!1);
    d.useEffect(() => {
      if (w) return ia(w);
    }, [w]), vs();
    const _ = d.useCallback(
      (N) => {
        const [I, ...K] = T().map((Y) => Y.ref.current), [V] = K.slice(-1), $ = document.activeElement;
        for (const Y of N)
          if (Y === $ || (Y == null || Y.scrollIntoView({ block: "nearest" }), Y === I && E && (E.scrollTop = 0), Y === V && E && (E.scrollTop = E.scrollHeight), Y == null || Y.focus(), document.activeElement !== $)) return;
      },
      [T, E]
    ), D = d.useCallback(
      () => _([k, w]),
      [_, k, w]
    );
    d.useEffect(() => {
      z && D();
    }, [z, D]);
    const { onOpenChange: O, triggerPointerDownPosRef: W } = v;
    d.useEffect(() => {
      if (w) {
        let N = { x: 0, y: 0 };
        const I = (V) => {
          var $, Y;
          N = {
            x: Math.abs(Math.round(V.pageX) - ((($ = W.current) == null ? void 0 : $.x) ?? 0)),
            y: Math.abs(Math.round(V.pageY) - (((Y = W.current) == null ? void 0 : Y.y) ?? 0))
          };
        }, K = (V) => {
          N.x <= 10 && N.y <= 10 ? V.preventDefault() : w.contains(V.target) || O(!1), document.removeEventListener("pointermove", I), W.current = null;
        };
        return W.current !== null && (document.addEventListener("pointermove", I), document.addEventListener("pointerup", K, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", I), document.removeEventListener("pointerup", K, { capture: !0 });
        };
      }
    }, [w, O, W]), d.useEffect(() => {
      const N = () => O(!1);
      return window.addEventListener("blur", N), window.addEventListener("resize", N), () => {
        window.removeEventListener("blur", N), window.removeEventListener("resize", N);
      };
    }, [O]);
    const [x, P] = ro((N) => {
      const I = T().filter(($) => !$.disabled), K = I.find(($) => $.ref.current === document.activeElement), V = oo(I, N, K);
      V && setTimeout(() => V.ref.current.focus());
    }), U = d.useCallback(
      (N, I, K) => {
        const V = !H.current && !K;
        (v.value !== void 0 && v.value === I || V) && (F(N), V && (H.current = !0));
      },
      [v.value]
    ), X = d.useCallback(() => w == null ? void 0 : w.focus(), [w]), J = d.useCallback(
      (N, I, K) => {
        const V = !H.current && !K;
        (v.value !== void 0 && v.value === I || V) && B(N);
      },
      [v.value]
    ), Q = r === "popper" ? Wt : Br, se = Q === Wt ? {
      side: i,
      sideOffset: c,
      align: l,
      alignOffset: f,
      arrowPadding: p,
      collisionBoundary: h,
      collisionPadding: g,
      sticky: y,
      hideWhenDetached: u,
      avoidCollisions: m
    } : {};
    return /* @__PURE__ */ S.jsx(
      Fr,
      {
        scope: n,
        content: w,
        viewport: E,
        onViewportChange: A,
        itemRefCallback: U,
        selectedItem: k,
        onItemLeave: X,
        itemTextRefCallback: J,
        focusSelectedItem: D,
        selectedItemText: j,
        position: r,
        isPositioned: z,
        searchRef: x,
        children: /* @__PURE__ */ S.jsx(Or, { as: Ja, allowPinchZoom: !0, children: /* @__PURE__ */ S.jsx(
          Xn,
          {
            asChild: !0,
            trapped: v.open,
            onMountAutoFocus: (N) => {
              N.preventDefault();
            },
            onUnmountAutoFocus: Z(o, (N) => {
              var I;
              (I = v.trigger) == null || I.focus({ preventScroll: !0 }), N.preventDefault();
            }),
            children: /* @__PURE__ */ S.jsx(
              Gn,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: s,
                onPointerDownOutside: a,
                onFocusOutside: (N) => N.preventDefault(),
                onDismiss: () => v.onOpenChange(!1),
                children: /* @__PURE__ */ S.jsx(
                  Q,
                  {
                    role: "listbox",
                    id: v.contentId,
                    "data-state": v.open ? "open" : "closed",
                    dir: v.dir,
                    onContextMenu: (N) => N.preventDefault(),
                    ...b,
                    ...se,
                    onPlaced: () => L(!0),
                    ref: R,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...b.style
                    },
                    onKeyDown: Z(b.onKeyDown, (N) => {
                      const I = N.ctrlKey || N.altKey || N.metaKey;
                      if (N.key === "Tab" && N.preventDefault(), !I && N.key.length === 1 && P(N.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(N.key)) {
                        let V = T().filter(($) => !$.disabled).map(($) => $.ref.current);
                        if (["ArrowUp", "End"].includes(N.key) && (V = V.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(N.key)) {
                          const $ = N.target, Y = V.indexOf($);
                          V = V.slice(Y + 1);
                        }
                        setTimeout(() => _(V)), N.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
Wr.displayName = Za;
var Qa = "SelectItemAlignedPosition", Br = d.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: r, ...o } = e, s = Re(Ne, n), a = Pe(Ne, n), [i, c] = d.useState(null), [l, f] = d.useState(null), p = ee(t, (R) => f(R)), h = wt(n), g = d.useRef(!1), y = d.useRef(!0), { viewport: u, selectedItem: m, selectedItemText: b, focusSelectedItem: v } = a, w = d.useCallback(() => {
    if (s.trigger && s.valueNode && i && l && u && m && b) {
      const R = s.trigger.getBoundingClientRect(), k = l.getBoundingClientRect(), F = s.valueNode.getBoundingClientRect(), j = b.getBoundingClientRect();
      if (s.dir !== "rtl") {
        const $ = j.left - k.left, Y = F.left - $, ne = R.left - Y, ue = R.width + ne, Ve = Math.max(ue, k.width), $e = window.innerWidth - ie, He = pn(Y, [
          ie,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(ie, $e - Ve)
        ]);
        i.style.minWidth = ue + "px", i.style.left = He + "px";
      } else {
        const $ = k.right - j.right, Y = window.innerWidth - F.right - $, ne = window.innerWidth - R.right - Y, ue = R.width + ne, Ve = Math.max(ue, k.width), $e = window.innerWidth - ie, He = pn(Y, [
          ie,
          Math.max(ie, $e - Ve)
        ]);
        i.style.minWidth = ue + "px", i.style.right = He + "px";
      }
      const B = h(), T = window.innerHeight - ie * 2, z = u.scrollHeight, L = window.getComputedStyle(l), H = parseInt(L.borderTopWidth, 10), _ = parseInt(L.paddingTop, 10), D = parseInt(L.borderBottomWidth, 10), O = parseInt(L.paddingBottom, 10), W = H + _ + z + O + D, x = Math.min(m.offsetHeight * 5, W), P = window.getComputedStyle(u), U = parseInt(P.paddingTop, 10), X = parseInt(P.paddingBottom, 10), J = R.top + R.height / 2 - ie, Q = T - J, se = m.offsetHeight / 2, N = m.offsetTop + se, I = H + _ + N, K = W - I;
      if (I <= J) {
        const $ = B.length > 0 && m === B[B.length - 1].ref.current;
        i.style.bottom = "0px";
        const Y = l.clientHeight - u.offsetTop - u.offsetHeight, ne = Math.max(
          Q,
          se + // viewport might have padding bottom, include it to avoid a scrollable viewport
          ($ ? X : 0) + Y + D
        ), ue = I + ne;
        i.style.height = ue + "px";
      } else {
        const $ = B.length > 0 && m === B[0].ref.current;
        i.style.top = "0px";
        const ne = Math.max(
          J,
          H + u.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          ($ ? U : 0) + se
        ) + K;
        i.style.height = ne + "px", u.scrollTop = I - J + u.offsetTop;
      }
      i.style.margin = `${ie}px 0`, i.style.minHeight = x + "px", i.style.maxHeight = T + "px", r == null || r(), requestAnimationFrame(() => g.current = !0);
    }
  }, [
    h,
    s.trigger,
    s.valueNode,
    i,
    l,
    u,
    m,
    b,
    s.dir,
    r
  ]);
  te(() => w(), [w]);
  const [C, E] = d.useState();
  te(() => {
    l && E(window.getComputedStyle(l).zIndex);
  }, [l]);
  const A = d.useCallback(
    (R) => {
      R && y.current === !0 && (w(), v == null || v(), y.current = !1);
    },
    [w, v]
  );
  return /* @__PURE__ */ S.jsx(
    tc,
    {
      scope: n,
      contentWrapper: i,
      shouldExpandOnScrollRef: g,
      onScrollButtonChange: A,
      children: /* @__PURE__ */ S.jsx(
        "div",
        {
          ref: c,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: C
          },
          children: /* @__PURE__ */ S.jsx(
            q.div,
            {
              ...o,
              ref: p,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...o.style
              }
            }
          )
        }
      )
    }
  );
});
Br.displayName = Qa;
var ec = "SelectPopperPosition", Wt = d.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: r = "start",
    collisionPadding: o = ie,
    ...s
  } = e, a = xt(n);
  return /* @__PURE__ */ S.jsx(
    Ki,
    {
      ...a,
      ...s,
      ref: t,
      align: r,
      collisionPadding: o,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...s.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
Wt.displayName = ec;
var [tc, nn] = ze(Ne, {}), Bt = "SelectViewport", zr = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: r, ...o } = e, s = Pe(Bt, n), a = nn(Bt, n), i = ee(t, s.onViewportChange), c = d.useRef(0);
    return /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
      /* @__PURE__ */ S.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: r
        }
      ),
      /* @__PURE__ */ S.jsx(yt.Slot, { scope: n, children: /* @__PURE__ */ S.jsx(
        q.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...o,
          ref: i,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...o.style
          },
          onScroll: Z(o.onScroll, (l) => {
            const f = l.currentTarget, { contentWrapper: p, shouldExpandOnScrollRef: h } = a;
            if (h != null && h.current && p) {
              const g = Math.abs(c.current - f.scrollTop);
              if (g > 0) {
                const y = window.innerHeight - ie * 2, u = parseFloat(p.style.minHeight), m = parseFloat(p.style.height), b = Math.max(u, m);
                if (b < y) {
                  const v = b + g, w = Math.min(y, v), C = v - w;
                  p.style.height = w + "px", p.style.bottom === "0px" && (f.scrollTop = C > 0 ? C : 0, p.style.justifyContent = "flex-end");
                }
              }
            }
            c.current = f.scrollTop;
          })
        }
      ) })
    ] });
  }
);
zr.displayName = Bt;
var Vr = "SelectGroup", [nc, rc] = ze(Vr), $r = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = Yt();
    return /* @__PURE__ */ S.jsx(nc, { scope: n, id: o, children: /* @__PURE__ */ S.jsx(q.div, { role: "group", "aria-labelledby": o, ...r, ref: t }) });
  }
);
$r.displayName = Vr;
var Hr = "SelectLabel", Ur = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = rc(Hr, n);
    return /* @__PURE__ */ S.jsx(q.div, { id: o.id, ...r, ref: t });
  }
);
Ur.displayName = Hr;
var pt = "SelectItem", [oc, Yr] = ze(pt), Gr = d.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: r,
      disabled: o = !1,
      textValue: s,
      ...a
    } = e, i = Re(pt, n), c = Pe(pt, n), l = i.value === r, [f, p] = d.useState(s ?? ""), [h, g] = d.useState(!1), y = ee(
      t,
      (v) => {
        var w;
        return (w = c.itemRefCallback) == null ? void 0 : w.call(c, v, r, o);
      }
    ), u = Yt(), m = d.useRef("touch"), b = () => {
      o || (i.onValueChange(r), i.onOpenChange(!1));
    };
    if (r === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ S.jsx(
      oc,
      {
        scope: n,
        value: r,
        disabled: o,
        textId: u,
        isSelected: l,
        onItemTextChange: d.useCallback((v) => {
          p((w) => w || ((v == null ? void 0 : v.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ S.jsx(
          yt.ItemSlot,
          {
            scope: n,
            value: r,
            disabled: o,
            textValue: f,
            children: /* @__PURE__ */ S.jsx(
              q.div,
              {
                role: "option",
                "aria-labelledby": u,
                "data-highlighted": h ? "" : void 0,
                "aria-selected": l && h,
                "data-state": l ? "checked" : "unchecked",
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
                tabIndex: o ? void 0 : -1,
                ...a,
                ref: y,
                onFocus: Z(a.onFocus, () => g(!0)),
                onBlur: Z(a.onBlur, () => g(!1)),
                onClick: Z(a.onClick, () => {
                  m.current !== "mouse" && b();
                }),
                onPointerUp: Z(a.onPointerUp, () => {
                  m.current === "mouse" && b();
                }),
                onPointerDown: Z(a.onPointerDown, (v) => {
                  m.current = v.pointerType;
                }),
                onPointerMove: Z(a.onPointerMove, (v) => {
                  var w;
                  m.current = v.pointerType, o ? (w = c.onItemLeave) == null || w.call(c) : m.current === "mouse" && v.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: Z(a.onPointerLeave, (v) => {
                  var w;
                  v.currentTarget === document.activeElement && ((w = c.onItemLeave) == null || w.call(c));
                }),
                onKeyDown: Z(a.onKeyDown, (v) => {
                  var C;
                  ((C = c.searchRef) == null ? void 0 : C.current) !== "" && v.key === " " || (Ha.includes(v.key) && b(), v.key === " " && v.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
Gr.displayName = pt;
var Xe = "SelectItemText", Kr = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, ...s } = e, a = Re(Xe, n), i = Pe(Xe, n), c = Yr(Xe, n), l = Ka(Xe, n), [f, p] = d.useState(null), h = ee(
      t,
      (b) => p(b),
      c.onItemTextChange,
      (b) => {
        var v;
        return (v = i.itemTextRefCallback) == null ? void 0 : v.call(i, b, c.value, c.disabled);
      }
    ), g = f == null ? void 0 : f.textContent, y = d.useMemo(
      () => /* @__PURE__ */ S.jsx("option", { value: c.value, disabled: c.disabled, children: g }, c.value),
      [c.disabled, c.value, g]
    ), { onNativeOptionAdd: u, onNativeOptionRemove: m } = l;
    return te(() => (u(y), () => m(y)), [u, m, y]), /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
      /* @__PURE__ */ S.jsx(q.span, { id: c.textId, ...s, ref: h }),
      c.isSelected && a.valueNode && !a.valueNodeHasChildren ? mt.createPortal(s.children, a.valueNode) : null
    ] });
  }
);
Kr.displayName = Xe;
var Xr = "SelectItemIndicator", qr = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return Yr(Xr, n).isSelected ? /* @__PURE__ */ S.jsx(q.span, { "aria-hidden": !0, ...r, ref: t }) : null;
  }
);
qr.displayName = Xr;
var zt = "SelectScrollUpButton", Zr = d.forwardRef((e, t) => {
  const n = Pe(zt, e.__scopeSelect), r = nn(zt, e.__scopeSelect), [o, s] = d.useState(!1), a = ee(t, r.onScrollButtonChange);
  return te(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const l = c.scrollTop > 0;
        s(l);
      };
      const c = n.viewport;
      return i(), c.addEventListener("scroll", i), () => c.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ S.jsx(
    Qr,
    {
      ...e,
      ref: a,
      onAutoScroll: () => {
        const { viewport: i, selectedItem: c } = n;
        i && c && (i.scrollTop = i.scrollTop - c.offsetHeight);
      }
    }
  ) : null;
});
Zr.displayName = zt;
var Vt = "SelectScrollDownButton", Jr = d.forwardRef((e, t) => {
  const n = Pe(Vt, e.__scopeSelect), r = nn(Vt, e.__scopeSelect), [o, s] = d.useState(!1), a = ee(t, r.onScrollButtonChange);
  return te(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const l = c.scrollHeight - c.clientHeight, f = Math.ceil(c.scrollTop) < l;
        s(f);
      };
      const c = n.viewport;
      return i(), c.addEventListener("scroll", i), () => c.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ S.jsx(
    Qr,
    {
      ...e,
      ref: a,
      onAutoScroll: () => {
        const { viewport: i, selectedItem: c } = n;
        i && c && (i.scrollTop = i.scrollTop + c.offsetHeight);
      }
    }
  ) : null;
});
Jr.displayName = Vt;
var Qr = d.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: r, ...o } = e, s = Pe("SelectScrollButton", n), a = d.useRef(null), i = wt(n), c = d.useCallback(() => {
    a.current !== null && (window.clearInterval(a.current), a.current = null);
  }, []);
  return d.useEffect(() => () => c(), [c]), te(() => {
    var f;
    const l = i().find((p) => p.ref.current === document.activeElement);
    (f = l == null ? void 0 : l.ref.current) == null || f.scrollIntoView({ block: "nearest" });
  }, [i]), /* @__PURE__ */ S.jsx(
    q.div,
    {
      "aria-hidden": !0,
      ...o,
      ref: t,
      style: { flexShrink: 0, ...o.style },
      onPointerDown: Z(o.onPointerDown, () => {
        a.current === null && (a.current = window.setInterval(r, 50));
      }),
      onPointerMove: Z(o.onPointerMove, () => {
        var l;
        (l = s.onItemLeave) == null || l.call(s), a.current === null && (a.current = window.setInterval(r, 50));
      }),
      onPointerLeave: Z(o.onPointerLeave, () => {
        c();
      })
    }
  );
}), sc = "SelectSeparator", eo = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return /* @__PURE__ */ S.jsx(q.div, { "aria-hidden": !0, ...r, ref: t });
  }
);
eo.displayName = sc;
var $t = "SelectArrow", ic = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = xt(n), s = Re($t, n), a = Pe($t, n);
    return s.open && a.position === "popper" ? /* @__PURE__ */ S.jsx(Xi, { ...o, ...r, ref: t }) : null;
  }
);
ic.displayName = $t;
var ac = "SelectBubbleInput", to = d.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, r) => {
    const o = d.useRef(null), s = ee(r, o), a = ea(t);
    return d.useEffect(() => {
      const i = o.current;
      if (!i) return;
      const c = window.HTMLSelectElement.prototype, f = Object.getOwnPropertyDescriptor(
        c,
        "value"
      ).set;
      if (a !== t && f) {
        const p = new Event("change", { bubbles: !0 });
        f.call(i, t), i.dispatchEvent(p);
      }
    }, [a, t]), /* @__PURE__ */ S.jsx(
      q.select,
      {
        ...n,
        style: { ...wr, ...n.style },
        ref: s,
        defaultValue: t
      }
    );
  }
);
to.displayName = ac;
function no(e) {
  return e === "" || e === void 0;
}
function ro(e) {
  const t = Ae(e), n = d.useRef(""), r = d.useRef(0), o = d.useCallback(
    (a) => {
      const i = n.current + a;
      t(i), function c(l) {
        n.current = l, window.clearTimeout(r.current), l !== "" && (r.current = window.setTimeout(() => c(""), 1e3));
      }(i);
    },
    [t]
  ), s = d.useCallback(() => {
    n.current = "", window.clearTimeout(r.current);
  }, []);
  return d.useEffect(() => () => window.clearTimeout(r.current), []), [n, o, s];
}
function oo(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((l) => l === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let a = cc(e, Math.max(s, 0));
  o.length === 1 && (a = a.filter((l) => l !== n));
  const c = a.find(
    (l) => l.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function cc(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var lc = Nr, uc = _r, dc = Mr, fc = Lr, pc = jr, mc = Dr, hc = zr, gc = $r, vc = Ur, bc = Gr, yc = Kr, wc = qr, xc = Zr, Sc = Jr, Cc = eo, Ec = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Rc = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Pc = (e, t) => {
  const n = lo(
    ({ color: r = "currentColor", size: o = 24, strokeWidth: s = 2, absoluteStrokeWidth: a, children: i, ...c }, l) => on(
      "svg",
      {
        ref: l,
        ...Ec,
        width: o,
        height: o,
        stroke: r,
        strokeWidth: a ? Number(s) * 24 / Number(o) : s,
        className: `lucide lucide-${Rc(e)}`,
        ...c
      },
      [
        ...t.map(([f, p]) => on(f, p)),
        ...(Array.isArray(i) ? i : [i]) || []
      ]
    )
  );
  return n.displayName = `${e}`, n;
};
var rn = Pc;
const Ac = rn("Check", [
  ["polyline", { points: "20 6 9 17 4 12", key: "10jjfj" }]
]), so = rn("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]), Tc = rn("ChevronUp", [
  ["path", { d: "m18 15-6-6-6 6", key: "153udz" }]
]);
function jc({
  ...e
}) {
  return /* @__PURE__ */ S.jsx(lc, { "data-slot": "select", ...e });
}
function Dc({
  ...e
}) {
  return /* @__PURE__ */ S.jsx(gc, { "data-slot": "select-group", ...e });
}
function Fc({
  ...e
}) {
  return /* @__PURE__ */ S.jsx(dc, { "data-slot": "select-value", ...e });
}
function Wc({
  className: e,
  size: t = "default",
  children: n,
  ...r
}) {
  return /* @__PURE__ */ S.jsxs(
    uc,
    {
      "data-slot": "select-trigger",
      "data-size": t,
      className: ae(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ S.jsx(fc, { asChild: !0, children: /* @__PURE__ */ S.jsx(so, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function Bc({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  return /* @__PURE__ */ S.jsx(pc, { children: /* @__PURE__ */ S.jsxs(
    mc,
    {
      "data-slot": "select-content",
      className: ae(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ S.jsx(Oc, {}),
        /* @__PURE__ */ S.jsx(
          hc,
          {
            className: ae(
              "p-1",
              n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ S.jsx(Nc, {})
      ]
    }
  ) });
}
function zc({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ S.jsx(
    vc,
    {
      "data-slot": "select-label",
      className: ae("text-muted-foreground px-2 py-1.5 text-xs", e),
      ...t
    }
  );
}
function Vc({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ S.jsxs(
    bc,
    {
      "data-slot": "select-item",
      className: ae(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ S.jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ S.jsx(wc, { children: /* @__PURE__ */ S.jsx(Ac, { className: "size-4" }) }) }),
        /* @__PURE__ */ S.jsx(yc, { children: t })
      ]
    }
  );
}
function $c({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ S.jsx(
    Cc,
    {
      "data-slot": "select-separator",
      className: ae("bg-border pointer-events-none -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
function Oc({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ S.jsx(
    xc,
    {
      "data-slot": "select-scroll-up-button",
      className: ae(
        "flex cursor-default items-center justify-center py-1",
        e
      ),
      ...t,
      children: /* @__PURE__ */ S.jsx(Tc, { className: "size-4" })
    }
  );
}
function Nc({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ S.jsx(
    Sc,
    {
      "data-slot": "select-scroll-down-button",
      className: ae(
        "flex cursor-default items-center justify-center py-1",
        e
      ),
      ...t,
      children: /* @__PURE__ */ S.jsx(so, { className: "size-4" })
    }
  );
}
export {
  es as Button,
  Ic as Input,
  Mc as Label,
  jc as Select,
  Bc as SelectContent,
  Dc as SelectGroup,
  Vc as SelectItem,
  zc as SelectLabel,
  Nc as SelectScrollDownButton,
  Oc as SelectScrollUpButton,
  $c as SelectSeparator,
  Wc as SelectTrigger,
  Fc as SelectValue,
  Qo as buttonVariants,
  ae as cn
};
//# sourceMappingURL=index.js.map

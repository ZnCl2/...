/*
     FILE ARCHIVED ON 22:28:51 Jul 10, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:53:27 Jul 31, 2016.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*72555ce*/
! function(e, t) {
    'object' == typeof module && 'object' == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error('jQuery requires a window with a document');
        return t(e)
    } : t(e)
}('undefined' != typeof window ? window : this, function(e, i) {
    var m = [],
        s = e.document,
        f = m.slice,
        je = m.concat,
        V = m.push,
        L = m.indexOf,
        F = {},
        Mt = F.toString,
        A = F.hasOwnProperty,
        r = {},
        Ae = '2.2.3',
        t = function(e, i) {
            return new t.fn.init(e, i)
        },
        Et = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        Ot = /^-ms-/,
        zt = /-([\da-z])/gi,
        Lt = function(e, t) {
            return t.toUpperCase()
        };
    t.fn = t.prototype = {
        jquery: Ae,
        constructor: t,
        selector: '',
        length: 0,
        toArray: function() {
            return f.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : f.call(this)
        },
        pushStack: function(e) {
            var i = t.merge(this.constructor(), e);
            return i.prevObject = this, i.context = this.context, i
        },
        each: function(e) {
            return t.each(this, e)
        },
        map: function(e) {
            return this.pushStack(t.map(this, function(t, i) {
                return e.call(t, i, t)
            }))
        },
        slice: function() {
            return this.pushStack(f.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var i = this.length,
                t = +e + (0 > e ? i : 0);
            return this.pushStack(t >= 0 && i > t ? [this[t]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: V,
        sort: m.sort,
        splice: m.splice
    }, t.extend = t.fn.extend = function() {
        var o, r, n, i, a, l, e = arguments[0] || {},
            s = 1,
            u = arguments.length,
            c = !1;
        for ('boolean' == typeof e && (c = e, e = arguments[s] || {}, s++), 'object' == typeof e || t.isFunction(e) || (e = {}), s === u && (e = this, s--); u > s; s++)
            if (null != (o = arguments[s]))
                for (r in o) n = e[r], i = o[r], e !== i && (c && i && (t.isPlainObject(i) || (a = t.isArray(i))) ? (a ? (a = !1, l = n && t.isArray(n) ? n : []) : l = n && t.isPlainObject(n) ? n : {}, e[r] = t.extend(c, l, i)) : void 0 !== i && (e[r] = i));
        return e
    }, t.extend({
        expando: 'jQuery' + (Ae + Math.random()).replace(/\D/g, ''),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return 'function' === t.type(e)
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            var i = e && e.toString();
            return !t.isArray(e) && i - parseFloat(i) + 1 >= 0
        },
        isPlainObject: function(e) {
            var i;
            if ('object' !== t.type(e) || e.nodeType || t.isWindow(e)) return !1;
            if (e.constructor && !A.call(e, 'constructor') && !A.call(e.constructor.prototype || {}, 'isPrototypeOf')) return !1;
            for (i in e);
            return void 0 === i || A.call(e, i)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + '' : 'object' == typeof e || 'function' == typeof e ? F[Mt.call(e)] || 'object' : typeof e
        },
        globalEval: function(e) {
            var i, n = eval;
            e = t.trim(e), e && (1 === e.indexOf('use strict') ? (i = s.createElement('script'), i.text = e, s.head.appendChild(i).parentNode.removeChild(i)) : n(e))
        },
        camelCase: function(e) {
            return e.replace(Ot, 'ms-').replace(zt, Lt)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t) {
            var n, i = 0;
            if (G(e)) {
                for (n = e.length; n > i; i++)
                    if (t.call(e[i], i, e[i]) === !1) break
            } else
                for (i in e)
                    if (t.call(e[i], i, e[i]) === !1) break; return e
        },
        trim: function(e) {
            return null == e ? '' : (e + '').replace(Et, '')
        },
        makeArray: function(e, i) {
            var n = i || [];
            return null != e && (G(Object(e)) ? t.merge(n, 'string' == typeof e ? [e] : e) : V.call(n, e)), n
        },
        inArray: function(e, t, i) {
            return null == t ? -1 : L.call(t, e, i)
        },
        merge: function(e, t) {
            for (var s = +t.length, i = 0, n = e.length; s > i; i++) e[n++] = t[i];
            return e.length = n, e
        },
        grep: function(e, t, i) {
            for (var s, r = [], n = 0, o = e.length, a = !i; o > n; n++) s = !t(e[n], n), s !== a && r.push(e[n]);
            return r
        },
        map: function(e, t, i) {
            var o, s, n = 0,
                r = [];
            if (G(e))
                for (o = e.length; o > n; n++) s = t(e[n], n, i), null != s && r.push(s);
            else
                for (n in e) s = t(e[n], n, i), null != s && r.push(s);
            return je.apply([], r)
        },
        guid: 1,
        proxy: function(e, i) {
            var s, r, n;
            return 'string' == typeof i && (s = e[i], i = e, e = s), t.isFunction(e) ? (r = f.call(arguments, 2), n = function() {
                return e.apply(i || this, r.concat(f.call(arguments)))
            }, n.guid = e.guid = e.guid || t.guid++, n) : void 0
        },
        now: Date.now,
        support: r
    }), 'function' == typeof Symbol && (t.fn[Symbol.iterator] = m[Symbol.iterator]), t.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function(e, t) {
        F['[object ' + t + ']'] = t.toLowerCase()
    });

    function G(e) {
        var i = !!e && 'length' in e && e.length,
            n = t.type(e);
        return 'function' === n || t.isWindow(e) ? !1 : 'array' === n || 0 === i || 'number' == typeof i && i > 0 && i - 1 in e
    };
    var w = function(e) {
        var D, o, t, A, G, I, H, Z, N, v, S, y, n, c, u, l, w, M, P, a = 'sizzle' + 1 * new Date,
            h = e.document,
            p = 0,
            ce = 0,
            ee = Y(),
            te = Y(),
            E = Y(),
            W = function(e, t) {
                return e === t && (S = !0), 0
            },
            ie = 1 << 31,
            ue = {}.hasOwnProperty,
            x = [],
            he = x.pop,
            de = x.push,
            b = x.push,
            ne = x.slice,
            k = function(e, t) {
                for (var i = 0, n = e.length; n > i; i++)
                    if (e[i] === t) return i;
                return -1
            },
            R = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
            s = '[\\x20\\t\\r\\n\\f]',
            C = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
            se = '\\[' + s + '*(' + C + ')(?:' + s + '*([*^$|!~]?=)' + s + '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + C + '))|)' + s + '*\\]',
            B = ':(' + C + ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' + se + ')*)|.*)\\)|)',
            fe = new RegExp(s + '+', 'g'),
            O = new RegExp('^' + s + '+|((?:^|[^\\\\])(?:\\\\.)*)' + s + '+$', 'g'),
            pe = new RegExp('^' + s + '*,' + s + '*'),
            me = new RegExp('^' + s + '*([>+~]|' + s + ')' + s + '*'),
            ge = new RegExp('=' + s + '*([^\\]\'"]*?)' + s + '*\\]', 'g'),
            ve = new RegExp(B),
            re = new RegExp('^' + C + '$'),
            z = {
                ID: new RegExp('^#(' + C + ')'),
                CLASS: new RegExp('^\\.(' + C + ')'),
                TAG: new RegExp('^(' + C + '|[*])'),
                ATTR: new RegExp('^' + se),
                PSEUDO: new RegExp('^' + B),
                CHILD: new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + s + '*(even|odd|(([+-]|)(\\d*)n|)' + s + '*(?:([+-]|)' + s + '*(\\d+)|))' + s + '*\\)|)', 'i'),
                bool: new RegExp('^(?:' + R + ')$', 'i'),
                needsContext: new RegExp('^' + s + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + s + '*((?:-\\d)?\\d*)' + s + '*\\)|)(?=[^-]|$)', 'i')
            },
            ye = /^(?:input|select|textarea|button)$/i,
            be = /^h\d$/i,
            j = /^[^{]+\{\s*\[native \w/,
            we = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            q = /[+~]/,
            xe = /'|\\/g,
            m = new RegExp('\\\\([\\da-f]{1,6}' + s + '?|(' + s + ')|.)', 'ig'),
            g = function(e, t, i) {
                var n = '0x' + t - 65536;
                return n !== n || i ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
            },
            oe = function() {
                y()
            };
        try {
            b.apply(x = ne.call(h.childNodes), h.childNodes), x[h.childNodes.length].nodeType
        } catch (i) {
            b = {
                apply: x.length ? function(e, t) {
                    de.apply(e, ne.call(t))
                } : function(e, t) {
                    var i = e.length,
                        n = 0;
                    while (e[i++] = t[n++]);
                    e.length = i - 1
                }
            }
        };

        function r(e, t, i, s) {
            var d, v, f, c, k, w, m, x, g = t && t.ownerDocument,
                p = t ? t.nodeType : 9;
            if (i = i || [], 'string' != typeof e || !e || 1 !== p && 9 !== p && 11 !== p) return i;
            if (!s && ((t ? t.ownerDocument || t : h) !== n && y(t), t = t || n, u)) {
                if (11 !== p && (w = we.exec(e)))
                    if (d = w[1]) {
                        if (9 === p) {
                            if (!(f = t.getElementById(d))) return i;
                            if (f.id === d) return i.push(f), i
                        } else if (g && (f = g.getElementById(d)) && P(t, f) && f.id === d) return i.push(f), i
                    } else {
                        if (w[2]) return b.apply(i, t.getElementsByTagName(e)), i;
                        if ((d = w[3]) && o.getElementsByClassName && t.getElementsByClassName) return b.apply(i, t.getElementsByClassName(d)), i
                    };
                if (o.qsa && !E[e + ' '] && (!l || !l.test(e))) {
                    if (1 !== p) g = t, x = e;
                    else if ('object' !== t.nodeName.toLowerCase()) {
                        (c = t.getAttribute('id')) ? c = c.replace(xe, '\\$&'): t.setAttribute('id', c = a), m = I(e), v = m.length, k = re.test(c) ? '#' + c : '[id=\'' + c + '\']';
                        while (v--) m[v] = k + ' ' + L(m[v]);
                        x = m.join(','), g = q.test(e) && X(t.parentNode) || t
                    };
                    if (x) try {
                        return b.apply(i, g.querySelectorAll(x)), i
                    } catch (r) {} finally {
                        c === a && t.removeAttribute('id')
                    }
                }
            };
            return Z(e.replace(O, '$1'), t, i, s)
        };

        function Y() {
            var i = [];

            function e(n, s) {
                return i.push(n + ' ') > t.cacheLength && delete e[i.shift()], e[n + ' '] = s
            };
            return e
        };

        function d(e) {
            return e[a] = !0, e
        };

        function f(e) {
            var i = n.createElement('div');
            try {
                return !!e(i)
            } catch (t) {
                return !1
            } finally {
                i.parentNode && i.parentNode.removeChild(i), i = null
            }
        };

        function U(e, i) {
            var n = e.split('|'),
                s = n.length;
            while (s--) t.attrHandle[n[s]] = i
        };

        function ae(e, t) {
            var i = t && e,
                n = i && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || ie) - (~e.sourceIndex || ie);
            if (n) return n;
            if (i)
                while (i = i.nextSibling)
                    if (i === t) return -1;
            return e ? 1 : -1
        };

        function ke(e) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return 'input' === i && t.type === e
            }
        };

        function Ce(e) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return ('input' === i || 'button' === i) && t.type === e
            }
        };

        function T(e) {
            return d(function(t) {
                return t = +t, d(function(i, n) {
                    var s, r = e([], i.length, t),
                        o = r.length;
                    while (o--) i[s = r[o]] && (i[s] = !(n[s] = i[s]))
                })
            })
        };

        function X(e) {
            return e && 'undefined' != typeof e.getElementsByTagName && e
        };
        o = r.support = {}, G = r.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? 'HTML' !== t.nodeName : !1
        }, y = r.setDocument = function(e) {
            var d, i, r = e ? e.ownerDocument || e : h;
            return r !== n && 9 === r.nodeType && r.documentElement ? (n = r, c = n.documentElement, u = !G(n), (i = n.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener('unload', oe, !1) : i.attachEvent && i.attachEvent('onunload', oe)), o.attributes = f(function(e) {
                return e.className = 'i', !e.getAttribute('className')
            }), o.getElementsByTagName = f(function(e) {
                return e.appendChild(n.createComment('')), !e.getElementsByTagName('*').length
            }), o.getElementsByClassName = j.test(n.getElementsByClassName), o.getById = f(function(e) {
                return c.appendChild(e).id = a, !n.getElementsByName || !n.getElementsByName(a).length
            }), o.getById ? (t.find.ID = function(e, t) {
                if ('undefined' != typeof t.getElementById && u) {
                    var i = t.getElementById(e);
                    return i ? [i] : []
                }
            }, t.filter.ID = function(e) {
                var t = e.replace(m, g);
                return function(e) {
                    return e.getAttribute('id') === t
                }
            }) : (delete t.find.ID, t.filter.ID = function(e) {
                var t = e.replace(m, g);
                return function(e) {
                    var i = 'undefined' != typeof e.getAttributeNode && e.getAttributeNode('id');
                    return i && i.value === t
                }
            }), t.find.TAG = o.getElementsByTagName ? function(e, t) {
                return 'undefined' != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : o.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var i, n = [],
                    r = 0,
                    s = t.getElementsByTagName(e);
                if ('*' === e) {
                    while (i = s[r++]) 1 === i.nodeType && n.push(i);
                    return n
                };
                return s
            }, t.find.CLASS = o.getElementsByClassName && function(e, t) {
                return 'undefined' != typeof t.getElementsByClassName && u ? t.getElementsByClassName(e) : void 0
            }, w = [], l = [], (o.qsa = j.test(n.querySelectorAll)) && (f(function(e) {
                c.appendChild(e).innerHTML = '<a id=\'' + a + '\'></a><select id=\'' + a + '-\r\\\' msallowcapture=\'\'><option selected=\'\'></option></select>', e.querySelectorAll('[msallowcapture^=\'\']').length && l.push('[*^$]=' + s + '*(?:\'\'|"")'), e.querySelectorAll('[selected]').length || l.push('\\[' + s + '*(?:value|' + R + ')'), e.querySelectorAll('[id~=' + a + '-]').length || l.push('~='), e.querySelectorAll(':checked').length || l.push(':checked'), e.querySelectorAll('a#' + a + '+*').length || l.push('.#.+[+~]')
            }), f(function(e) {
                var t = n.createElement('input');
                t.setAttribute('type', 'hidden'), e.appendChild(t).setAttribute('name', 'D'), e.querySelectorAll('[name=d]').length && l.push('name' + s + '*[*^$|!~]?='), e.querySelectorAll(':enabled').length || l.push(':enabled', ':disabled'), e.querySelectorAll('*,:x'), l.push(',.*:')
            })), (o.matchesSelector = j.test(M = c.matches || c.webkitMatchesSelector || c.mozMatchesSelector || c.oMatchesSelector || c.msMatchesSelector)) && f(function(e) {
                o.disconnectedMatch = M.call(e, 'div'), M.call(e, '[s!=\'\']:x'), w.push('!=', B)
            }), l = l.length && new RegExp(l.join('|')), w = w.length && new RegExp(w.join('|')), d = j.test(c.compareDocumentPosition), P = d || j.test(c.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            } : function(e, t) {
                if (t)
                    while (t = t.parentNode)
                        if (t === e) return !0;
                return !1
            }, W = d ? function(e, t) {
                if (e === t) return S = !0, 0;
                var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return i ? i : (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & i || !o.sortDetached && t.compareDocumentPosition(e) === i ? e === n || e.ownerDocument === h && P(h, e) ? -1 : t === n || t.ownerDocument === h && P(h, t) ? 1 : v ? k(v, e) - k(v, t) : 0 : 4 & i ? -1 : 1)
            } : function(e, t) {
                if (e === t) return S = !0, 0;
                var i, s = 0,
                    a = e.parentNode,
                    l = t.parentNode,
                    r = [e],
                    o = [t];
                if (!a || !l) return e === n ? -1 : t === n ? 1 : a ? -1 : l ? 1 : v ? k(v, e) - k(v, t) : 0;
                if (a === l) return ae(e, t);
                i = e;
                while (i = i.parentNode) r.unshift(i);
                i = t;
                while (i = i.parentNode) o.unshift(i);
                while (r[s] === o[s]) s++;
                return s ? ae(r[s], o[s]) : r[s] === h ? -1 : o[s] === h ? 1 : 0
            }, n) : n
        }, r.matches = function(e, t) {
            return r(e, null, null, t)
        }, r.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== n && y(e), t = t.replace(ge, '=\'$1\']'), o.matchesSelector && u && !E[t + ' '] && (!w || !w.test(t)) && (!l || !l.test(t))) try {
                var s = M.call(e, t);
                if (s || o.disconnectedMatch || e.document && 11 !== e.document.nodeType) return s
            } catch (i) {};
            return r(t, n, null, [e]).length > 0
        }, r.contains = function(e, t) {
            return (e.ownerDocument || e) !== n && y(e), P(e, t)
        }, r.attr = function(e, i) {
            (e.ownerDocument || e) !== n && y(e);
            var r = t.attrHandle[i.toLowerCase()],
                s = r && ue.call(t.attrHandle, i.toLowerCase()) ? r(e, i, !u) : void 0;
            return void 0 !== s ? s : o.attributes || !u ? e.getAttribute(i) : (s = e.getAttributeNode(i)) && s.specified ? s.value : null
        }, r.error = function(e) {
            throw new Error('Syntax error, unrecognized expression: ' + e)
        }, r.uniqueSort = function(e) {
            var n, s = [],
                t = 0,
                i = 0;
            if (S = !o.detectDuplicates, v = !o.sortStable && e.slice(0), e.sort(W), S) {
                while (n = e[i++]) n === e[i] && (t = s.push(i));
                while (t--) e.splice(s[t], 1)
            };
            return v = null, e
        }, A = r.getText = function(e) {
            var n, i = '',
                s = 0,
                t = e.nodeType;
            if (t) {
                if (1 === t || 9 === t || 11 === t) {
                    if ('string' == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) i += A(e)
                } else if (3 === t || 4 === t) return e.nodeValue
            } else
                while (n = e[s++]) i += A(n);
            return i
        }, t = r.selectors = {
            cacheLength: 50,
            createPseudo: d,
            match: z,
            attrHandle: {},
            find: {},
            relative: {
                '>': {
                    dir: 'parentNode',
                    first: !0
                },
                ' ': {
                    dir: 'parentNode'
                },
                '+': {
                    dir: 'previousSibling',
                    first: !0
                },
                '~': {
                    dir: 'previousSibling'
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(m, g), e[3] = (e[3] || e[4] || e[5] || '').replace(m, g), '~=' === e[2] && (e[3] = ' ' + e[3] + ' '), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), 'nth' === e[1].slice(0, 3) ? (e[3] || r.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ('even' === e[3] || 'odd' === e[3])), e[5] = +(e[7] + e[8] || 'odd' === e[3])) : e[3] && r.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var i, t = !e[6] && e[2];
                    return z.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || '' : t && ve.test(t) && (i = I(t, !0)) && (i = t.indexOf(')', t.length - i) - t.length) && (e[0] = e[0].slice(0, i), e[2] = t.slice(0, i)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(m, g).toLowerCase();
                    return '*' === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = ee[e + ' '];
                    return t || (t = new RegExp('(^|' + s + ')' + e + '(' + s + '|$)')) && ee(e, function(e) {
                        return t.test('string' == typeof e.className && e.className || 'undefined' != typeof e.getAttribute && e.getAttribute('class') || '')
                    })
                },
                ATTR: function(e, t, i) {
                    return function(n) {
                        var s = r.attr(n, e);
                        return null == s ? '!=' === t : t ? (s += '', '=' === t ? s === i : '!=' === t ? s !== i : '^=' === t ? i && 0 === s.indexOf(i) : '*=' === t ? i && s.indexOf(i) > -1 : '$=' === t ? i && s.slice(-i.length) === i : '~=' === t ? (' ' + s.replace(fe, ' ') + ' ').indexOf(i) > -1 : '|=' === t ? s === i || s.slice(0, i.length + 1) === i + '-' : !1) : !0
                    }
                },
                CHILD: function(e, t, i, n, s) {
                    var l = 'nth' !== e.slice(0, 3),
                        o = 'last' !== e.slice(-4),
                        r = 'of-type' === t;
                    return 1 === n && 0 === s ? function(e) {
                        return !!e.parentNode
                    } : function(t, i, c) {
                        var m, g, f, u, d, v, y = l !== o ? 'nextSibling' : 'previousSibling',
                            b = t.parentNode,
                            x = r && t.nodeName.toLowerCase(),
                            w = !c && !r,
                            h = !1;
                        if (b) {
                            if (l) {
                                while (y) {
                                    u = t;
                                    while (u = u[y])
                                        if (r ? u.nodeName.toLowerCase() === x : 1 === u.nodeType) return !1;
                                    v = y = 'only' === e && !v && 'nextSibling'
                                };
                                return !0
                            };
                            if (v = [o ? b.firstChild : b.lastChild], o && w) {
                                u = b, f = u[a] || (u[a] = {}), g = f[u.uniqueID] || (f[u.uniqueID] = {}), m = g[e] || [], d = m[0] === p && m[1], h = d && m[2], u = d && b.childNodes[d];
                                while (u = ++d && u && u[y] || (h = d = 0) || v.pop())
                                    if (1 === u.nodeType && ++h && u === t) {
                                        g[e] = [p, d, h];
                                        break
                                    }
                            } else if (w && (u = t, f = u[a] || (u[a] = {}), g = f[u.uniqueID] || (f[u.uniqueID] = {}), m = g[e] || [], d = m[0] === p && m[1], h = d), h === !1)
                                while (u = ++d && u && u[y] || (h = d = 0) || v.pop())
                                    if ((r ? u.nodeName.toLowerCase() === x : 1 === u.nodeType) && ++h && (w && (f = u[a] || (u[a] = {}), g = f[u.uniqueID] || (f[u.uniqueID] = {}), g[e] = [p, h]), u === t)) break;
                            return h -= s, h === n || h % n === 0 && h / n >= 0
                        }
                    }
                },
                PSEUDO: function(e, i) {
                    var s, n = t.pseudos[e] || t.setFilters[e.toLowerCase()] || r.error('unsupported pseudo: ' + e);
                    return n[a] ? n(i) : n.length > 1 ? (s = [e, e, '', i], t.setFilters.hasOwnProperty(e.toLowerCase()) ? d(function(e, t) {
                        var s, r = n(e, i),
                            o = r.length;
                        while (o--) s = k(e, r[o]), e[s] = !(t[s] = r[o])
                    }) : function(e) {
                        return n(e, 0, s)
                    }) : n
                }
            },
            pseudos: {
                not: d(function(e) {
                    var t = [],
                        n = [],
                        i = H(e.replace(O, '$1'));
                    return i[a] ? d(function(e, t, n, s) {
                        var o, a = i(e, null, s, []),
                            r = e.length;
                        while (r--)(o = a[r]) && (e[r] = !(t[r] = o))
                    }) : function(e, s, r) {
                        return t[0] = e, i(t, null, r, n), t[0] = null, !n.pop()
                    }
                }),
                has: d(function(e) {
                    return function(t) {
                        return r(e, t).length > 0
                    }
                }),
                contains: d(function(e) {
                    return e = e.replace(m, g),
                        function(t) {
                            return (t.textContent || t.innerText || A(t)).indexOf(e) > -1
                        }
                }),
                lang: d(function(e) {
                    return re.test(e || '') || r.error('unsupported lang: ' + e), e = e.replace(m, g).toLowerCase(),
                        function(t) {
                            var i;
                            do
                                if (i = u ? t.lang : t.getAttribute('xml:lang') || t.getAttribute('lang')) return i = i.toLowerCase(), i === e || 0 === i.indexOf(e + '-');
                            while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var i = e.location && e.location.hash;
                    return i && i.slice(1) === t.id
                },
                root: function(e) {
                    return e === c
                },
                focus: function(e) {
                    return e === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return 'input' === t && !!e.checked || 'option' === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !t.pseudos.empty(e)
                },
                header: function(e) {
                    return be.test(e.nodeName)
                },
                input: function(e) {
                    return ye.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return 'input' === t && 'button' === e.type || 'button' === t
                },
                text: function(e) {
                    var t;
                    return 'input' === e.nodeName.toLowerCase() && 'text' === e.type && (null == (t = e.getAttribute('type')) || 'text' === t.toLowerCase())
                },
                first: T(function() {
                    return [0]
                }),
                last: T(function(e, t) {
                    return [t - 1]
                }),
                eq: T(function(e, t, i) {
                    return [0 > i ? i + t : i]
                }),
                even: T(function(e, t) {
                    for (var i = 0; t > i; i += 2) e.push(i);
                    return e
                }),
                odd: T(function(e, t) {
                    for (var i = 1; t > i; i += 2) e.push(i);
                    return e
                }),
                lt: T(function(e, t, i) {
                    for (var n = 0 > i ? i + t : i; --n >= 0;) e.push(n);
                    return e
                }),
                gt: T(function(e, t, i) {
                    for (var n = 0 > i ? i + t : i; ++n < t;) e.push(n);
                    return e
                })
            }
        }, t.pseudos.nth = t.pseudos.eq;
        for (D in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) t.pseudos[D] = ke(D);
        for (D in {
                submit: !0,
                reset: !0
            }) t.pseudos[D] = Ce(D);

        function le() {};
        le.prototype = t.filters = t.pseudos, t.setFilters = new le, I = r.tokenize = function(e, i) {
            var o, s, l, a, n, c, u, h = te[e + ' '];
            if (h) return i ? 0 : h.slice(0);
            n = e, c = [], u = t.preFilter;
            while (n) {
                o && !(s = pe.exec(n)) || (s && (n = n.slice(s[0].length) || n), c.push(l = [])), o = !1, (s = me.exec(n)) && (o = s.shift(), l.push({
                    value: o,
                    type: s[0].replace(O, ' ')
                }), n = n.slice(o.length));
                for (a in t.filter) !(s = z[a].exec(n)) || u[a] && !(s = u[a](s)) || (o = s.shift(), l.push({
                    value: o,
                    type: a,
                    matches: s
                }), n = n.slice(o.length));
                if (!o) break
            };
            return i ? n.length : n ? r.error(e) : te(e, c).slice(0)
        };

        function L(e) {
            for (var t = 0, n = e.length, i = ''; n > t; t++) i += e[t].value;
            return i
        };

        function K(e, t, i) {
            var n = t.dir,
                s = i && 'parentNode' === n,
                r = ce++;
            return t.first ? function(t, i, r) {
                while (t = t[n])
                    if (1 === t.nodeType || s) return e(t, i, r)
            } : function(t, i, o) {
                var l, c, u, h = [p, r];
                if (o) {
                    while (t = t[n])
                        if ((1 === t.nodeType || s) && e(t, i, o)) return !0
                } else
                    while (t = t[n])
                        if (1 === t.nodeType || s) {
                            if (u = t[a] || (t[a] = {}), c = u[t.uniqueID] || (u[t.uniqueID] = {}), (l = c[n]) && l[0] === p && l[1] === r) return h[2] = l[2];
                            if (c[n] = h, h[2] = e(t, i, o)) return !0
                        }
            }
        };

        function Q(e) {
            return e.length > 1 ? function(t, i, n) {
                var s = e.length;
                while (s--)
                    if (!e[s](t, i, n)) return !1;
                return !0
            } : e[0]
        };

        function Te(e, t, i) {
            for (var n = 0, s = t.length; s > n; n++) r(e, t[n], i);
            return i
        };

        function F(e, t, i, n, s) {
            for (var o, a = [], r = 0, l = e.length, c = null != t; l > r; r++)(o = e[r]) && (i && !i(o, n, s) || (a.push(o), c && t.push(r)));
            return a
        };

        function J(e, t, i, n, s, r) {
            return n && !n[a] && (n = J(n)), s && !s[a] && (s = J(s, r)), d(function(r, o, a, l) {
                var h, u, d, m = [],
                    p = [],
                    g = o.length,
                    v = r || Te(t || '*', a.nodeType ? [a] : a, []),
                    f = !e || !r && t ? v : F(v, m, e, a, l),
                    c = i ? s || (r ? e : g || n) ? [] : o : f;
                if (i && i(f, c, a, l), n) {
                    h = F(c, p), n(h, [], a, l), u = h.length;
                    while (u--)(d = h[u]) && (c[p[u]] = !(f[p[u]] = d))
                };
                if (r) {
                    if (s || e) {
                        if (s) {
                            h = [], u = c.length;
                            while (u--)(d = c[u]) && h.push(f[u] = d);
                            s(null, c = [], h, l)
                        };
                        u = c.length;
                        while (u--)(d = c[u]) && (h = s ? k(r, d) : m[u]) > -1 && (r[h] = !(o[h] = d))
                    }
                } else c = F(c === o ? c.splice(g, c.length) : c), s ? s(null, o, c, l) : b.apply(o, c)
            })
        };

        function V(e) {
            for (var o, s, n, l = e.length, c = t.relative[e[0].type], u = c || t.relative[' '], i = c ? 1 : 0, h = K(function(e) {
                    return e === o
                }, u, !0), d = K(function(e) {
                    return k(o, e) > -1
                }, u, !0), r = [function(e, t, i) {
                    var n = !c && (i || t !== N) || ((o = t).nodeType ? h(e, t, i) : d(e, t, i));
                    return o = null, n
                }]; l > i; i++)
                if (s = t.relative[e[i].type]) r = [K(Q(r), s)];
                else {
                    if (s = t.filter[e[i].type].apply(null, e[i].matches), s[a]) {
                        for (n = ++i; l > n; n++)
                            if (t.relative[e[n].type]) break;
                        return J(i > 1 && Q(r), i > 1 && L(e.slice(0, i - 1).concat({
                            value: ' ' === e[i - 2].type ? '*' : ''
                        })).replace(O, '$1'), s, n > i && V(e.slice(i, n)), l > n && V(e = e.slice(n)), l > n && L(e))
                    };
                    r.push(s)
                };
            return Q(r)
        };

        function De(e, i) {
            var s = i.length > 0,
                o = e.length > 0,
                a = function(a, l, c, h, d) {
                    var f, x, v, w = 0,
                        m = '0',
                        k = a && [],
                        g = [],
                        C = N,
                        T = a || o && t.find.TAG('*', d),
                        D = p += null == C ? 1 : Math.random() || .1,
                        S = T.length;
                    for (d && (N = l === n || l || d); m !== S && null != (f = T[m]); m++) {
                        if (o && f) {
                            x = 0, l || f.ownerDocument === n || (y(f), c = !u);
                            while (v = e[x++])
                                if (v(f, l || n, c)) {
                                    h.push(f);
                                    break
                                };
                            d && (p = D)
                        };
                        s && ((f = !v && f) && w--, a && k.push(f))
                    };
                    if (w += m, s && m !== w) {
                        x = 0;
                        while (v = i[x++]) v(k, g, l, c);
                        if (a) {
                            if (w > 0)
                                while (m--) k[m] || g[m] || (g[m] = he.call(h));
                            g = F(g)
                        };
                        b.apply(h, g), d && !a && g.length > 0 && w + i.length > 1 && r.uniqueSort(h)
                    };
                    return d && (p = D, N = C), k
                };
            return s ? d(a) : a
        };
        return H = r.compile = function(e, t) {
            var n, s = [],
                r = [],
                i = E[e + ' '];
            if (!i) {
                t || (t = I(e)), n = t.length;
                while (n--) i = V(t[n]), i[a] ? s.push(i) : r.push(i);
                i = E(e, De(r, s)), i.selector = e
            };
            return i
        }, Z = r.select = function(e, i, n, s) {
            var l, r, a, d, f, h = 'function' == typeof e && e,
                c = !s && I(e = h.selector || e);
            if (n = n || [], 1 === c.length) {
                if (r = c[0] = c[0].slice(0), r.length > 2 && 'ID' === (a = r[0]).type && o.getById && 9 === i.nodeType && u && t.relative[r[1].type]) {
                    if (i = (t.find.ID(a.matches[0].replace(m, g), i) || [])[0], !i) return n;
                    h && (i = i.parentNode), e = e.slice(r.shift().value.length)
                };
                l = z.needsContext.test(e) ? 0 : r.length;
                while (l--) {
                    if (a = r[l], t.relative[d = a.type]) break;
                    if ((f = t.find[d]) && (s = f(a.matches[0].replace(m, g), q.test(r[0].type) && X(i.parentNode) || i))) {
                        if (r.splice(l, 1), e = s.length && L(r), !e) return b.apply(n, s), n;
                        break
                    }
                }
            };
            return (h || H(e, c))(s, i, !u, n, !i || q.test(e) && X(i.parentNode) || i), n
        }, o.sortStable = a.split('').sort(W).join('') === a, o.detectDuplicates = !!S, y(), o.sortDetached = f(function(e) {
            return 1 & e.compareDocumentPosition(n.createElement('div'))
        }), f(function(e) {
            return e.innerHTML = '<a href=\'#\'></a>', '#' === e.firstChild.getAttribute('href')
        }) || U('type|href|height|width', function(e, t, i) {
            return i ? void 0 : e.getAttribute(t, 'type' === t.toLowerCase() ? 1 : 2)
        }), o.attributes && f(function(e) {
            return e.innerHTML = '<input/>', e.firstChild.setAttribute('value', ''), '' === e.firstChild.getAttribute('value')
        }) || U('value', function(e, t, i) {
            return i || 'input' !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), f(function(e) {
            return null == e.getAttribute('disabled')
        }) || U(R, function(e, t, i) {
            var n;
            return i ? void 0 : e[t] === !0 ? t.toLowerCase() : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
        }), r
    }(e);
    t.find = w, t.expr = w.selectors, t.expr[':'] = t.expr.pseudos, t.uniqueSort = t.unique = w.uniqueSort, t.text = w.getText, t.isXMLDoc = w.isXML, t.contains = w.contains;
    var b = function(e, i, n) {
            var s = [],
                r = void 0 !== n;
            while ((e = e[i]) && 9 !== e.nodeType)
                if (1 === e.nodeType) {
                    if (r && t(e).is(n)) break;
                    s.push(e)
                };
            return s
        },
        Se = function(e, t) {
            for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
            return i
        },
        Ie = t.expr.match.needsContext,
        Pe = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        Nt = /^.[^:#\[\.,]*$/;

    function Z(e, i, n) {
        if (t.isFunction(i)) return t.grep(e, function(e, t) {
            return !!i.call(e, t, e) !== n
        });
        if (i.nodeType) return t.grep(e, function(e) {
            return e === i !== n
        });
        if ('string' == typeof i) {
            if (Nt.test(i)) return t.filter(i, e, n);
            i = t.filter(i, e)
        };
        return t.grep(e, function(e) {
            return L.call(i, e) > -1 !== n
        })
    };
    t.filter = function(e, i, n) {
        var s = i[0];
        return n && (e = ':not(' + e + ')'), 1 === i.length && 1 === s.nodeType ? t.find.matchesSelector(s, e) ? [s] : [] : t.find.matches(e, t.grep(i, function(e) {
            return 1 === e.nodeType
        }))
    }, t.fn.extend({
        find: function(e) {
            var i, s = this.length,
                n = [],
                r = this;
            if ('string' != typeof e) return this.pushStack(t(e).filter(function() {
                for (i = 0; s > i; i++)
                    if (t.contains(r[i], this)) return !0
            }));
            for (i = 0; s > i; i++) t.find(e, r[i], n);
            return n = this.pushStack(s > 1 ? t.unique(n) : n), n.selector = this.selector ? this.selector + ' ' + e : e, n
        },
        filter: function(e) {
            return this.pushStack(Z(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(Z(this, e || [], !0))
        },
        is: function(e) {
            return !!Z(this, 'string' == typeof e && Ie.test(e) ? t(e) : e || [], !1).length
        }
    });
    var De, jt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        At = t.fn.init = function(e, i, n) {
            var r, o;
            if (!e) return this;
            if (n = n || De, 'string' == typeof e) {
                if (r = '<' === e[0] && '>' === e[e.length - 1] && e.length >= 3 ? [null, e, null] : jt.exec(e), !r || !r[1] && i) return !i || i.jquery ? (i || n).find(e) : this.constructor(i).find(e);
                if (r[1]) {
                    if (i = i instanceof t ? i[0] : i, t.merge(this, t.parseHTML(r[1], i && i.nodeType ? i.ownerDocument || i : s, !0)), Pe.test(r[1]) && t.isPlainObject(i))
                        for (r in i) t.isFunction(this[r]) ? this[r](i[r]) : this.attr(r, i[r]);
                    return this
                };
                return o = s.getElementById(r[2]), o && o.parentNode && (this.length = 1, this[0] = o), this.context = s, this.selector = e, this
            };
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : t.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(t) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), t.makeArray(e, this))
        };
    At.prototype = t.fn, De = t(s);
    var It = /^(?:parents|prev(?:Until|All))/,
        Pt = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    t.fn.extend({
        has: function(e) {
            var i = t(e, this),
                n = i.length;
            return this.filter(function() {
                for (var e = 0; n > e; e++)
                    if (t.contains(this, i[e])) return !0
            })
        },
        closest: function(e, i) {
            for (var n, r = 0, a = this.length, s = [], o = Ie.test(e) || 'string' != typeof e ? t(e, i || this.context) : 0; a > r; r++)
                for (n = this[r]; n && n !== i; n = n.parentNode)
                    if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && t.find.matchesSelector(n, e))) {
                        s.push(n);
                        break
                    };
            return this.pushStack(s.length > 1 ? t.uniqueSort(s) : s)
        },
        index: function(e) {
            return e ? 'string' == typeof e ? L.call(t(e), this[0]) : L.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, i) {
            return this.pushStack(t.uniqueSort(t.merge(this.get(), t(e, i))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    });

    function Ne(e, t) {
        while ((e = e[t]) && 1 !== e.nodeType);
        return e
    };
    t.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return b(e, 'parentNode')
        },
        parentsUntil: function(e, t, i) {
            return b(e, 'parentNode', i)
        },
        next: function(e) {
            return Ne(e, 'nextSibling')
        },
        prev: function(e) {
            return Ne(e, 'previousSibling')
        },
        nextAll: function(e) {
            return b(e, 'nextSibling')
        },
        prevAll: function(e) {
            return b(e, 'previousSibling')
        },
        nextUntil: function(e, t, i) {
            return b(e, 'nextSibling', i)
        },
        prevUntil: function(e, t, i) {
            return b(e, 'previousSibling', i)
        },
        siblings: function(e) {
            return Se((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return Se(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || t.merge([], e.childNodes)
        }
    }, function(e, i) {
        t.fn[e] = function(n, s) {
            var r = t.map(this, i, n);
            return 'Until' !== e.slice(-5) && (s = n), s && 'string' == typeof s && (r = t.filter(s, r)), this.length > 1 && (Pt[e] || t.uniqueSort(r), It.test(e) && r.reverse()), this.pushStack(r)
        }
    });
    var u = /\S+/g;

    function Ft(e) {
        var i = {};
        return t.each(e.match(u) || [], function(e, t) {
            i[t] = !0
        }), i
    };
    t.Callbacks = function(e) {
        e = 'string' == typeof e ? Ft(e) : t.extend({}, e);
        var a, n, c, r, i = [],
            o = [],
            s = -1,
            u = function() {
                for (r = e.once, c = a = !0; o.length; s = -1) {
                    n = o.shift();
                    while (++s < i.length) i[s].apply(n[0], n[1]) === !1 && e.stopOnFalse && (s = i.length, n = !1)
                };
                e.memory || (n = !1), a = !1, r && (i = n ? [] : '')
            },
            l = {
                add: function() {
                    return i && (n && !a && (s = i.length - 1, o.push(n)), function r(n) {
                        t.each(n, function(n, s) {
                            t.isFunction(s) ? e.unique && l.has(s) || i.push(s) : s && s.length && 'string' !== t.type(s) && r(s)
                        })
                    }(arguments), n && !a && u()), this
                },
                remove: function() {
                    return t.each(arguments, function(e, n) {
                        var r;
                        while ((r = t.inArray(n, i, r)) > -1) i.splice(r, 1), s >= r && s--
                    }), this
                },
                has: function(e) {
                    return e ? t.inArray(e, i) > -1 : i.length > 0
                },
                empty: function() {
                    return i && (i = []), this
                },
                disable: function() {
                    return r = o = [], i = n = '', this
                },
                disabled: function() {
                    return !i
                },
                lock: function() {
                    return r = o = [], n || (i = n = ''), this
                },
                locked: function() {
                    return !!r
                },
                fireWith: function(e, t) {
                    return r || (t = t || [], t = [e, t.slice ? t.slice() : t], o.push(t), a || u()), this
                },
                fire: function() {
                    return l.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!c
                }
            };
        return l
    }, t.extend({
        Deferred: function(e) {
            var s = [
                    ['resolve', 'done', t.Callbacks('once memory'), 'resolved'],
                    ['reject', 'fail', t.Callbacks('once memory'), 'rejected'],
                    ['notify', 'progress', t.Callbacks('memory')]
                ],
                r = 'pending',
                n = {
                    state: function() {
                        return r
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return t.Deferred(function(r) {
                            t.each(s, function(s, o) {
                                var a = t.isFunction(e[s]) && e[s];
                                i[o[1]](function() {
                                    var e = a && a.apply(this, arguments);
                                    e && t.isFunction(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[o[0] + 'With'](this === n ? r.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? t.extend(e, n) : n
                    }
                },
                i = {};
            return n.pipe = n.then, t.each(s, function(e, t) {
                var o = t[2],
                    a = t[3];
                n[t[1]] = o.add, a && o.add(function() {
                    r = a
                }, s[1 ^ e][2].disable, s[2][2].lock), i[t[0]] = function() {
                    return i[t[0] + 'With'](this === i ? n : this, arguments), this
                }, i[t[0] + 'With'] = o.fireWith
            }), n.promise(i), e && e.call(i, i), i
        },
        when: function(e) {
            var i = 0,
                s = f.call(arguments),
                n = s.length,
                o = 1 !== n || e && t.isFunction(e.promise) ? n : 0,
                r = 1 === o ? e : t.Deferred(),
                c = function(e, t, i) {
                    return function(n) {
                        t[e] = this, i[e] = arguments.length > 1 ? f.call(arguments) : n, i === a ? r.notifyWith(t, i) : --o || r.resolveWith(t, i)
                    }
                },
                a, u, l;
            if (n > 1)
                for (a = new Array(n), u = new Array(n), l = new Array(n); n > i; i++) s[i] && t.isFunction(s[i].promise) ? s[i].promise().progress(c(i, u, a)).done(c(i, l, s)).fail(r.reject) : --o;
            return o || r.resolveWith(l, s), r.promise()
        }
    });
    var z;
    t.fn.ready = function(e) {
        return t.ready.promise().done(e), this
    }, t.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? t.readyWait++ : t.ready(!0)
        },
        ready: function(e) {
            (e === !0 ? --t.readyWait : t.isReady) || (t.isReady = !0, e !== !0 && --t.readyWait > 0 || (z.resolveWith(s, [t]), t.fn.triggerHandler && (t(s).triggerHandler('ready'), t(s).off('ready'))))
        }
    });

    function H() {
        s.removeEventListener('DOMContentLoaded', H), e.removeEventListener('load', H), t.ready()
    };
    t.ready.promise = function(i) {
        return z || (z = t.Deferred(), 'complete' === s.readyState || 'loading' !== s.readyState && !s.documentElement.doScroll ? e.setTimeout(t.ready) : (s.addEventListener('DOMContentLoaded', H), e.addEventListener('load', H))), z.promise(i)
    }, t.ready.promise();
    var d = function(e, i, n, s, r, a, l) {
            var o = 0,
                u = e.length,
                c = null == n;
            if ('object' === t.type(n)) {
                r = !0;
                for (o in n) d(e, i, o, n[o], !0, a, l)
            } else if (void 0 !== s && (r = !0, t.isFunction(s) || (l = !0), c && (l ? (i.call(e, s), i = null) : (c = i, i = function(e, i, n) {
                    return c.call(t(e), n)
                })), i))
                for (; u > o; o++) i(e[o], n, l ? s : s.call(e[o], o, i(e[o], n)));
            return r ? e : c ? i.call(e) : u ? i(e[0], n) : a
        },
        j = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };

    function N() {
        this.expando = t.expando + N.uid++
    };
    N.uid = 1, N.prototype = {
        register: function(e, t) {
            var i = t || {};
            return e.nodeType ? e[this.expando] = i : Object.defineProperty(e, this.expando, {
                value: i,
                writable: !0,
                configurable: !0
            }), e[this.expando]
        },
        cache: function(e) {
            if (!j(e)) return {};
            var t = e[this.expando];
            return t || (t = {}, j(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, i) {
            var n, s = this.cache(e);
            if ('string' == typeof t) s[t] = i;
            else
                for (n in t) s[n] = t[n];
            return s
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
        },
        access: function(e, i, n) {
            var s;
            return void 0 === i || i && 'string' == typeof i && void 0 === n ? (s = this.get(e, i), void 0 !== s ? s : this.get(e, t.camelCase(i))) : (this.set(e, i, n), void 0 !== n ? n : i)
        },
        remove: function(e, i) {
            var r, n, o, s = e[this.expando];
            if (void 0 !== s) {
                if (void 0 === i) this.register(e);
                else {
                    t.isArray(i) ? n = i.concat(i.map(t.camelCase)) : (o = t.camelCase(i), i in s ? n = [i, o] : (n = o, n = n in s ? [n] : n.match(u) || [])), r = n.length;
                    while (r--) delete s[n[r]]
                }(void 0 === i || t.isEmptyObject(s)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var i = e[this.expando];
            return void 0 !== i && !t.isEmptyObject(i)
        }
    };
    var n = new N,
        o = new N,
        St = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Te = /[A-Z]/g;

    function Me(e, i, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType)
            if (r = 'data-' + i.replace(Te, '-$&').toLowerCase(), n = e.getAttribute(r), 'string' == typeof n) {
                try {
                    n = 'true' === n ? !0 : 'false' === n ? !1 : 'null' === n ? null : +n + '' === n ? +n : St.test(n) ? t.parseJSON(n) : n
                } catch (s) {};
                o.set(e, i, n)
            } else n = void 0;
        return n
    };
    t.extend({
        hasData: function(e) {
            return o.hasData(e) || n.hasData(e)
        },
        data: function(e, t, i) {
            return o.access(e, t, i)
        },
        removeData: function(e, t) {
            o.remove(e, t)
        },
        _data: function(e, t, i) {
            return n.access(e, t, i)
        },
        _removeData: function(e, t) {
            n.remove(e, t)
        }
    }), t.fn.extend({
        data: function(e, i) {
            var a, r, l, s = this[0],
                c = s && s.attributes;
            if (void 0 === e) {
                if (this.length && (l = o.get(s), 1 === s.nodeType && !n.get(s, 'hasDataAttrs'))) {
                    a = c.length;
                    while (a--) c[a] && (r = c[a].name, 0 === r.indexOf('data-') && (r = t.camelCase(r.slice(5)), Me(s, r, l[r])));
                    n.set(s, 'hasDataAttrs', !0)
                };
                return l
            };
            return 'object' == typeof e ? this.each(function() {
                o.set(this, e)
            }) : d(this, function(i) {
                var n, r;
                if (s && void 0 === i) {
                    if (n = o.get(s, e) || o.get(s, e.replace(Te, '-$&').toLowerCase()), void 0 !== n) return n;
                    if (r = t.camelCase(e), n = o.get(s, r), void 0 !== n) return n;
                    if (n = Me(s, r, void 0), void 0 !== n) return n
                } else r = t.camelCase(e), this.each(function() {
                    var t = o.get(this, r);
                    o.set(this, r, i), e.indexOf('-') > -1 && void 0 !== t && o.set(this, e, i)
                })
            }, null, i, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                o.remove(this, e)
            })
        }
    }), t.extend({
        queue: function(e, i, s) {
            var r;
            return e ? (i = (i || 'fx') + 'queue', r = n.get(e, i), s && (!r || t.isArray(s) ? r = n.access(e, i, t.makeArray(s)) : r.push(s)), r || []) : void 0
        },
        dequeue: function(e, i) {
            i = i || 'fx';
            var n = t.queue(e, i),
                o = n.length,
                s = n.shift(),
                r = t._queueHooks(e, i),
                a = function() {
                    t.dequeue(e, i)
                };
            'inprogress' === s && (s = n.shift(), o--), s && ('fx' === i && n.unshift('inprogress'), delete r.stop, s.call(e, a, r)), !o && r && r.empty.fire()
        },
        _queueHooks: function(e, i) {
            var s = i + 'queueHooks';
            return n.get(e, s) || n.access(e, s, {
                empty: t.Callbacks('once memory').add(function() {
                    n.remove(e, [i + 'queue', s])
                })
            })
        }
    }), t.fn.extend({
        queue: function(e, i) {
            var n = 2;
            return 'string' != typeof e && (i = e, e = 'fx', n--), arguments.length < n ? t.queue(this[0], e) : void 0 === i ? this : this.each(function() {
                var n = t.queue(this, e, i);
                t._queueHooks(this, e), 'fx' === e && 'inprogress' !== n[0] && t.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                t.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || 'fx', [])
        },
        promise: function(e, i) {
            var s, o = 1,
                a = t.Deferred(),
                r = this,
                l = this.length,
                c = function() {
                    --o || a.resolveWith(r, [r])
                };
            'string' != typeof e && (i = e, e = void 0), e = e || 'fx';
            while (l--) s = n.get(r[l], e + 'queueHooks'), s && s.empty && (o++, s.empty.add(c));
            return c(), a.promise(i)
        }
    });
    var Ce = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        I = new RegExp('^(?:([+-])=|)(' + Ce + ')([a-z%]*)$', 'i'),
        p = ['Top', 'Right', 'Bottom', 'Left'],
        P = function(e, i) {
            return e = i || e, 'none' === t.css(e, 'display') || !t.contains(e.ownerDocument, e)
        };

    function Ee(e, i, n, s) {
        var c, o = 1,
            h = 20,
            u = s ? function() {
                return s.cur()
            } : function() {
                return t.css(e, i, '')
            },
            l = u(),
            a = n && n[3] || (t.cssNumber[i] ? '' : 'px'),
            r = (t.cssNumber[i] || 'px' !== a && +l) && I.exec(t.css(e, i));
        if (r && r[3] !== a) {
            a = a || r[3], n = n || [], r = +l || 1;
            do o = o || '.5', r /= o, t.style(e, i, r + a); while (o !== (o = u() / l) && 1 !== o && --h)
        };
        return n && (r = +r || +l || 0, c = n[1] ? r + (n[1] + 1) * n[2] : +n[2], s && (s.unit = a, s.start = r, s.end = c)), c
    };
    var we = /^(?:checkbox|radio)$/i,
        xe = /<([\w:-]+)/,
        ke = /^$|\/(?:java|ecma)script/i,
        c = {
            option: [1, '<select multiple=\'multiple\'>', '</select>'],
            thead: [1, '<table>', '</table>'],
            col: [2, '<table><colgroup>', '</colgroup></table>'],
            tr: [2, '<table><tbody>', '</tbody></table>'],
            td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
            _default: [0, '', '']
        };
    c.optgroup = c.option, c.tbody = c.tfoot = c.colgroup = c.caption = c.thead, c.th = c.td;

    function a(e, i) {
        var n = 'undefined' != typeof e.getElementsByTagName ? e.getElementsByTagName(i || '*') : 'undefined' != typeof e.querySelectorAll ? e.querySelectorAll(i || '*') : [];
        return void 0 === i || i && t.nodeName(e, i) ? t.merge([e], n) : n
    };

    function ee(e, t) {
        for (var i = 0, s = e.length; s > i; i++) n.set(e[i], 'globalEval', !t || n.get(t[i], 'globalEval'))
    };
    var Dt = /<|&#?\w+;/;

    function Oe(e, i, n, s, o) {
        for (var r, l, m, d, g, f, u = i.createDocumentFragment(), p = [], h = 0, v = e.length; v > h; h++)
            if (r = e[h], r || 0 === r)
                if ('object' === t.type(r)) t.merge(p, r.nodeType ? [r] : r);
                else if (Dt.test(r)) {
            l = l || u.appendChild(i.createElement('div')), m = (xe.exec(r) || ['', ''])[1].toLowerCase(), d = c[m] || c._default, l.innerHTML = d[1] + t.htmlPrefilter(r) + d[2], f = d[0];
            while (f--) l = l.lastChild;
            t.merge(p, l.childNodes), l = u.firstChild, l.textContent = ''
        } else p.push(i.createTextNode(r));
        u.textContent = '', h = 0;
        while (r = p[h++])
            if (s && t.inArray(r, s) > -1) o && o.push(r);
            else if (g = t.contains(r.ownerDocument, r), l = a(u.appendChild(r), 'script'), g && ee(l), n) {
            f = 0;
            while (r = l[f++]) ke.test(r.type || '') && n.push(r)
        };
        return u
    };
    ! function() {
        var i = s.createDocumentFragment(),
            e = i.appendChild(s.createElement('div')),
            t = s.createElement('input');
        t.setAttribute('type', 'radio'), t.setAttribute('checked', 'checked'), t.setAttribute('name', 't'), e.appendChild(t), r.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = '<textarea>x</textarea>', r.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
    }();
    var Ct = /^key/,
        Tt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        be = /^([^.]*)(?:\.(.+)|)/;

    function W() {
        return !0
    };

    function x() {
        return !1
    };

    function ze() {
        try {
            return s.activeElement
        } catch (e) {}
    };

    function te(e, i, n, s, r, o) {
        var a, l;
        if ('object' == typeof i) {
            'string' != typeof n && (s = s || n, n = void 0);
            for (l in i) te(e, l, n, s, i[l], o);
            return e
        };
        if (null == s && null == r ? (r = n, s = n = void 0) : null == r && ('string' == typeof n ? (r = s, s = void 0) : (r = s, s = n, n = void 0)), r === !1) r = x;
        else if (!r) return e;
        return 1 === o && (a = r, r = function(e) {
            return t().off(e), a.apply(this, arguments)
        }, r.guid = a.guid || (a.guid = t.guid++)), e.each(function() {
            t.event.add(this, i, r, s, n)
        })
    };
    t.event = {
        global: {},
        add: function(e, i, s, r, o) {
            var f, p, g, m, v, c, l, h, a, y, b, d = n.get(e);
            if (d) {
                s.handler && (f = s, s = f.handler, o = f.selector), s.guid || (s.guid = t.guid++), (m = d.events) || (m = d.events = {}), (p = d.handle) || (p = d.handle = function(i) {
                    return 'undefined' != typeof t && t.event.triggered !== i.type ? t.event.dispatch.apply(e, arguments) : void 0
                }), i = (i || '').match(u) || [''], v = i.length;
                while (v--) g = be.exec(i[v]) || [], a = b = g[1], y = (g[2] || '').split('.').sort(), a && (l = t.event.special[a] || {}, a = (o ? l.delegateType : l.bindType) || a, l = t.event.special[a] || {}, c = t.extend({
                    type: a,
                    origType: b,
                    data: r,
                    handler: s,
                    guid: s.guid,
                    selector: o,
                    needsContext: o && t.expr.match.needsContext.test(o),
                    namespace: y.join('.')
                }, f), (h = m[a]) || (h = m[a] = [], h.delegateCount = 0, l.setup && l.setup.call(e, r, y, p) !== !1 || e.addEventListener && e.addEventListener(a, p)), l.add && (l.add.call(e, c), c.handler.guid || (c.handler.guid = s.guid)), o ? h.splice(h.delegateCount++, 0, c) : h.push(c), t.event.global[a] = !0)
            }
        },
        remove: function(e, i, s, r, o) {
            var p, y, c, f, m, l, h, d, a, v, b, g = n.hasData(e) && n.get(e);
            if (g && (f = g.events)) {
                i = (i || '').match(u) || [''], m = i.length;
                while (m--)
                    if (c = be.exec(i[m]) || [], a = b = c[1], v = (c[2] || '').split('.').sort(), a) {
                        h = t.event.special[a] || {}, a = (r ? h.delegateType : h.bindType) || a, d = f[a] || [], c = c[2] && new RegExp('(^|\\.)' + v.join('\\.(?:.*\\.|)') + '(\\.|$)'), y = p = d.length;
                        while (p--) l = d[p], !o && b !== l.origType || s && s.guid !== l.guid || c && !c.test(l.namespace) || r && r !== l.selector && ('**' !== r || !l.selector) || (d.splice(p, 1), l.selector && d.delegateCount--, h.remove && h.remove.call(e, l));
                        y && !d.length && (h.teardown && h.teardown.call(e, v, g.handle) !== !1 || t.removeEvent(e, a, g.handle), delete f[a])
                    } else
                        for (a in f) t.event.remove(e, a + i[m], s, r, !0);
                t.isEmptyObject(f) && n.remove(e, 'handle events')
            }
        },
        dispatch: function(e) {
            e = t.event.fix(e);
            var a, l, o, s, i, c = [],
                u = f.call(arguments),
                h = (n.get(this, 'events') || {})[e.type] || [],
                r = t.event.special[e.type] || {};
            if (u[0] = e, e.delegateTarget = this, !r.preDispatch || r.preDispatch.call(this, e) !== !1) {
                c = t.event.handlers.call(this, e, h), a = 0;
                while ((s = c[a++]) && !e.isPropagationStopped()) {
                    e.currentTarget = s.elem, l = 0;
                    while ((i = s.handlers[l++]) && !e.isImmediatePropagationStopped()) e.rnamespace && !e.rnamespace.test(i.namespace) || (e.handleObj = i, e.data = i.data, o = ((t.event.special[i.origType] || {}).handle || i.handler).apply(s.elem, u), void 0 !== o && (e.result = o) === !1 && (e.preventDefault(), e.stopPropagation()))
                };
                return r.postDispatch && r.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, i) {
            var o, s, r, a, c = [],
                l = i.delegateCount,
                n = e.target;
            if (l && n.nodeType && ('click' !== e.type || isNaN(e.button) || e.button < 1))
                for (; n !== this; n = n.parentNode || this)
                    if (1 === n.nodeType && (n.disabled !== !0 || 'click' !== e.type)) {
                        for (s = [], o = 0; l > o; o++) a = i[o], r = a.selector + ' ', void 0 === s[r] && (s[r] = a.needsContext ? t(r, this).index(n) > -1 : t.find(r, this, null, [n]).length), s[r] && s.push(a);
                        s.length && c.push({
                            elem: n,
                            handlers: s
                        })
                    };
            return l < i.length && c.push({
                elem: this,
                handlers: i.slice(l)
            }), c
        },
        props: 'altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
        fixHooks: {},
        keyHooks: {
            props: 'char charCode key keyCode'.split(' '),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: 'button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
            filter: function(e, t) {
                var o, i, n, r = t.button;
                return null == e.pageX && null != t.clientX && (o = e.target.ownerDocument || s, i = o.documentElement, n = o.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[t.expando]) return e;
            var r, o, a, n = e.type,
                l = e,
                i = this.fixHooks[n];
            i || (this.fixHooks[n] = i = Tt.test(n) ? this.mouseHooks : Ct.test(n) ? this.keyHooks : {}), a = i.props ? this.props.concat(i.props) : this.props, e = new t.Event(l), r = a.length;
            while (r--) o = a[r], e[o] = l[o];
            return e.target || (e.target = s), 3 === e.target.nodeType && (e.target = e.target.parentNode), i.filter ? i.filter(e, l) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== ze() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: 'focusin'
            },
            blur: {
                trigger: function() {
                    return this === ze() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: 'focusout'
            },
            click: {
                trigger: function() {
                    return 'checkbox' === this.type && this.click && t.nodeName(this, 'input') ? (this.click(), !1) : void 0
                },
                _default: function(e) {
                    return t.nodeName(e.target, 'a')
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, t.removeEvent = function(e, t, i) {
        e.removeEventListener && e.removeEventListener(t, i)
    }, t.Event = function(e, i) {
        return this instanceof t.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? W : x) : this.type = e, i && t.extend(this, i), this.timeStamp = e && e.timeStamp || t.now(), void(this[t.expando] = !0)) : new t.Event(e, i)
    }, t.Event.prototype = {
        constructor: t.Event,
        isDefaultPrevented: x,
        isPropagationStopped: x,
        isImmediatePropagationStopped: x,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = W, e && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = W, e && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = W, e && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, t.each({
        mouseenter: 'mouseover',
        mouseleave: 'mouseout',
        pointerenter: 'pointerover',
        pointerleave: 'pointerout'
    }, function(e, i) {
        t.event.special[e] = {
            delegateType: i,
            bindType: i,
            handle: function(e) {
                var s, r = this,
                    n = e.relatedTarget,
                    o = e.handleObj;
                return n && (n === r || t.contains(r, n)) || (e.type = o.origType, s = o.handler.apply(this, arguments), e.type = i), s
            }
        }
    }), t.fn.extend({
        on: function(e, t, i, n) {
            return te(this, e, t, i, n)
        },
        one: function(e, t, i, n) {
            return te(this, e, t, i, n, 1)
        },
        off: function(e, i, n) {
            var s, r;
            if (e && e.preventDefault && e.handleObj) return s = e.handleObj, t(e.delegateTarget).off(s.namespace ? s.origType + '.' + s.namespace : s.origType, s.selector, s.handler), this;
            if ('object' == typeof e) {
                for (r in e) this.off(r, i, e[r]);
                return this
            };
            return i !== !1 && 'function' != typeof i || (n = i, i = void 0), n === !1 && (n = x), this.each(function() {
                t.event.remove(this, e, n, i)
            })
        }
    });
    var yt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        bt = /<script|<style|<link/i,
        wt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        xt = /^true\/(.*)/,
        kt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function Le(e, i) {
        return t.nodeName(e, 'table') && t.nodeName(11 !== i.nodeType ? i : i.firstChild, 'tr') ? e.getElementsByTagName('tbody')[0] || e.appendChild(e.ownerDocument.createElement('tbody')) : e
    };

    function Ht(e) {
        return e.type = (null !== e.getAttribute('type')) + '/' + e.type, e
    };

    function Wt(e) {
        var t = xt.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute('type'), e
    };

    function Fe(e, i) {
        var s, u, r, l, c, h, d, a;
        if (1 === i.nodeType) {
            if (n.hasData(e) && (l = n.access(e), c = n.set(i, l), a = l.events)) {
                delete c.handle, c.events = {};
                for (r in a)
                    for (s = 0, u = a[r].length; u > s; s++) t.event.add(i, r, a[r][s])
            };
            o.hasData(e) && (h = o.access(e), d = t.extend({}, h), o.set(i, d))
        }
    };

    function Rt(e, t) {
        var i = t.nodeName.toLowerCase();
        'input' === i && we.test(e.type) ? t.checked = e.checked : 'input' !== i && 'textarea' !== i || (t.defaultValue = e.defaultValue)
    };

    function g(e, i, s, o) {
        i = je.apply([], i);
        var h, m, u, d, l, v, c = 0,
            f = e.length,
            b = f - 1,
            p = i[0],
            y = t.isFunction(p);
        if (y || f > 1 && 'string' == typeof p && !r.checkClone && wt.test(p)) return e.each(function(t) {
            var n = e.eq(t);
            y && (i[0] = p.call(this, t, n.html())), g(n, i, s, o)
        });
        if (f && (h = Oe(i, e[0].ownerDocument, !1, e, o), m = h.firstChild, 1 === h.childNodes.length && (h = m), m || o)) {
            for (u = t.map(a(h, 'script'), Ht), d = u.length; f > c; c++) l = h, c !== b && (l = t.clone(l, !0, !0), d && t.merge(u, a(l, 'script'))), s.call(e[c], l, c);
            if (d)
                for (v = u[u.length - 1].ownerDocument, t.map(u, Wt), c = 0; d > c; c++) l = u[c], ke.test(l.type || '') && !n.access(l, 'globalEval') && t.contains(v, l) && (l.src ? t._evalUrl && t._evalUrl(l.src) : t.globalEval(l.textContent.replace(kt, '')))
        };
        return e
    };

    function He(e, i, n) {
        for (var s, o = i ? t.filter(i, e) : e, r = 0; null != (s = o[r]); r++) n || 1 !== s.nodeType || t.cleanData(a(s)), s.parentNode && (n && t.contains(s.ownerDocument, s) && ee(a(s, 'script')), s.parentNode.removeChild(s));
        return e
    };
    t.extend({
        htmlPrefilter: function(e) {
            return e.replace(yt, '<$1></$2>')
        },
        clone: function(e, i, n) {
            var s, u, l, o, c = e.cloneNode(!0),
                h = t.contains(e.ownerDocument, e);
            if (!(r.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || t.isXMLDoc(e)))
                for (o = a(c), l = a(e), s = 0, u = l.length; u > s; s++) Rt(l[s], o[s]);
            if (i)
                if (n)
                    for (l = l || a(e), o = o || a(c), s = 0, u = l.length; u > s; s++) Fe(l[s], o[s]);
                else Fe(e, c);
            return o = a(c, 'script'), o.length > 0 && ee(o, !h && a(e, 'script')), c
        },
        cleanData: function(e) {
            for (var s, i, r, l = t.event.special, a = 0; void 0 !== (i = e[a]); a++)
                if (j(i)) {
                    if (s = i[n.expando]) {
                        if (s.events)
                            for (r in s.events) l[r] ? t.event.remove(i, r) : t.removeEvent(i, r, s.handle);
                        i[n.expando] = void 0
                    };
                    i[o.expando] && (i[o.expando] = void 0)
                }
        }
    }), t.fn.extend({
        domManip: g,
        detach: function(e) {
            return He(this, e, !0)
        },
        remove: function(e) {
            return He(this, e)
        },
        text: function(e) {
            return d(this, function(e) {
                return void 0 === e ? t.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return g(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Le(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return g(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Le(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return g(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return g(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, i = 0; null != (e = this[i]); i++) 1 === e.nodeType && (t.cleanData(a(e, !1)), e.textContent = '');
            return this
        },
        clone: function(e, i) {
            return e = null == e ? !1 : e, i = null == i ? e : i, this.map(function() {
                return t.clone(this, e, i)
            })
        },
        html: function(e) {
            return d(this, function(e) {
                var n = this[0] || {},
                    s = 0,
                    r = this.length;
                if (void 0 === e && 1 === n.nodeType) return n.innerHTML;
                if ('string' == typeof e && !bt.test(e) && !c[(xe.exec(e) || ['', ''])[1].toLowerCase()]) {
                    e = t.htmlPrefilter(e);
                    try {
                        for (; r > s; s++) n = this[s] || {}, 1 === n.nodeType && (t.cleanData(a(n, !1)), n.innerHTML = e);
                        n = 0
                    } catch (i) {}
                };
                n && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return g(this, arguments, function(i) {
                var n = this.parentNode;
                t.inArray(this, e) < 0 && (t.cleanData(a(this)), n && n.replaceChild(i, this))
            }, e)
        }
    }), t.each({
        appendTo: 'append',
        prependTo: 'prepend',
        insertBefore: 'before',
        insertAfter: 'after',
        replaceAll: 'replaceWith'
    }, function(e, i) {
        t.fn[e] = function(e) {
            for (var s, r = [], o = t(e), a = o.length - 1, n = 0; a >= n; n++) s = n === a ? this : this.clone(!0), t(o[n])[i](s), V.apply(r, s.get());
            return this.pushStack(r)
        }
    });
    var O, ye = {
        HTML: 'block',
        BODY: 'block'
    };

    function We(e, i) {
        var n = t(i.createElement(e)).appendTo(i.body),
            s = t.css(n[0], 'display');
        return n.detach(), s
    };

    function ie(e) {
        var n = s,
            i = ye[e];
        return i || (i = We(e, n), 'none' !== i && i || (O = (O || t('<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>')).appendTo(n.documentElement), n = O[0].contentDocument, n.write(), n.close(), i = We(e, n), O.detach()), ye[e] = i), i
    };
    var ve = /^margin/,
        Q = new RegExp('^(' + Ce + ')(?!px)[a-z%]+$', 'i'),
        E = function(t) {
            var i = t.ownerDocument.defaultView;
            return i && i.opener || (i = e), i.getComputedStyle(t)
        },
        J = function(e, t, i, n) {
            var r, s, o = {};
            for (s in t) o[s] = e.style[s], e.style[s] = t[s];
            r = i.apply(e, n || []);
            for (s in t) e.style[s] = o[s];
            return r
        },
        S = s.documentElement;
    ! function() {
        var l, o, c, u, n = s.createElement('div'),
            i = s.createElement('div');
        if (i.style) {
            i.style.backgroundClip = 'content-box', i.cloneNode(!0).style.backgroundClip = '', r.clearCloneStyle = 'content-box' === i.style.backgroundClip, n.style.cssText = 'border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute', n.appendChild(i);

            function a() {
                i.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%', i.innerHTML = '', S.appendChild(n);
                var t = e.getComputedStyle(i);
                l = '1%' !== t.top, u = '2px' === t.marginLeft, o = '4px' === t.width, i.style.marginRight = '50%', c = '4px' === t.marginRight, S.removeChild(n)
            };
            t.extend(r, {
                pixelPosition: function() {
                    return a(), l
                },
                boxSizingReliable: function() {
                    return null == o && a(), o
                },
                pixelMarginRight: function() {
                    return null == o && a(), c
                },
                reliableMarginLeft: function() {
                    return null == o && a(), u
                },
                reliableMarginRight: function() {
                    var r, t = i.appendChild(s.createElement('div'));
                    return t.style.cssText = i.style.cssText = '-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0', t.style.marginRight = t.style.width = '0', i.style.width = '1px', S.appendChild(n), r = !parseFloat(e.getComputedStyle(t).marginRight), S.removeChild(n), i.removeChild(t), r
                }
            })
        }
    }();

    function k(e, i, n) {
        var a, l, c, s, o = e.style;
        return n = n || E(e), s = n ? n.getPropertyValue(i) || n[i] : void 0, '' !== s && void 0 !== s || t.contains(e.ownerDocument, e) || (s = t.style(e, i)), n && !r.pixelMarginRight() && Q.test(s) && ve.test(i) && (a = o.width, l = o.minWidth, c = o.maxWidth, o.minWidth = o.maxWidth = o.width = s, s = n.width, o.width = a, o.minWidth = l, o.maxWidth = c), void 0 !== s ? s + '' : s
    };

    function ne(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    };
    var gt = /^(none|table(?!-c[ea]).+)/,
        vt = {
            position: 'absolute',
            visibility: 'hidden',
            display: 'block'
        },
        pe = {
            letterSpacing: '0',
            fontWeight: '400'
        },
        me = ['Webkit', 'O', 'Moz', 'ms'],
        ge = s.createElement('div').style;

    function Re(e) {
        if (e in ge) return e;
        var i = e[0].toUpperCase() + e.slice(1),
            t = me.length;
        while (t--)
            if (e = me[t] + i, e in ge) return e
    };

    function Be(e, t, i) {
        var n = I.exec(t);
        return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || 'px') : t
    };

    function qe(e, i, n, s, r) {
        for (var o = n === (s ? 'border' : 'content') ? 4 : 'width' === i ? 1 : 0, a = 0; 4 > o; o += 2) 'margin' === n && (a += t.css(e, n + p[o], !0, r)), s ? ('content' === n && (a -= t.css(e, 'padding' + p[o], !0, r)), 'margin' !== n && (a -= t.css(e, 'border' + p[o] + 'Width', !0, r))) : (a += t.css(e, 'padding' + p[o], !0, r), 'padding' !== n && (a += t.css(e, 'border' + p[o] + 'Width', !0, r)));
        return a
    };

    function Ye(i, n, o) {
        var c = !0,
            a = 'width' === n ? i.offsetWidth : i.offsetHeight,
            l = E(i),
            u = 'border-box' === t.css(i, 'boxSizing', !1, l);
        if (s.msFullscreenElement && e.top !== e && i.getClientRects().length && (a = Math.round(100 * i.getBoundingClientRect()[n])), 0 >= a || null == a) {
            if (a = k(i, n, l), (0 > a || null == a) && (a = i.style[n]), Q.test(a)) return a;
            c = u && (r.boxSizingReliable() || a === i.style[n]), a = parseFloat(a) || 0
        };
        return a + qe(i, n, o || (u ? 'border' : 'content'), c, l) + 'px'
    };

    function Ue(e, i) {
        for (var o, s, l, a = [], r = 0, c = e.length; c > r; r++) s = e[r], s.style && (a[r] = n.get(s, 'olddisplay'), o = s.style.display, i ? (a[r] || 'none' !== o || (s.style.display = ''), '' === s.style.display && P(s) && (a[r] = n.access(s, 'olddisplay', ie(s.nodeName)))) : (l = P(s), 'none' === o && l || n.set(s, 'olddisplay', l ? o : t.css(s, 'display'))));
        for (r = 0; c > r; r++) s = e[r], s.style && (i && 'none' !== s.style.display && '' !== s.style.display || (s.style.display = i ? a[r] || '' : 'none'));
        return e
    };
    t.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var i = k(e, 'opacity');
                        return '' === i ? '1' : i
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            'float': 'cssFloat'
        },
        style: function(e, i, n, s) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, c, a, l = t.camelCase(i),
                    u = e.style;
                return i = t.cssProps[l] || (t.cssProps[l] = Re(l) || l), a = t.cssHooks[i] || t.cssHooks[l], void 0 === n ? a && 'get' in a && void 0 !== (o = a.get(e, !1, s)) ? o : u[i] : (c = typeof n, 'string' === c && (o = I.exec(n)) && o[1] && (n = Ee(e, i, o), c = 'number'), null != n && n === n && ('number' === c && (n += o && o[3] || (t.cssNumber[l] ? '' : 'px')), r.clearCloneStyle || '' !== n || 0 !== i.indexOf('background') || (u[i] = 'inherit'), a && 'set' in a && void 0 === (n = a.set(e, n, s)) || (u[i] = n)), void 0)
            }
        },
        css: function(e, i, n, s) {
            var r, l, a, o = t.camelCase(i);
            return i = t.cssProps[o] || (t.cssProps[o] = Re(o) || o), a = t.cssHooks[i] || t.cssHooks[o], a && 'get' in a && (r = a.get(e, !0, n)), void 0 === r && (r = k(e, i, s)), 'normal' === r && i in pe && (r = pe[i]), '' === n || n ? (l = parseFloat(r), n === !0 || isFinite(l) ? l || 0 : r) : r
        }
    }), t.each(['height', 'width'], function(e, i) {
        t.cssHooks[i] = {
            get: function(e, n, s) {
                return n ? gt.test(t.css(e, 'display')) && 0 === e.offsetWidth ? J(e, vt, function() {
                    return Ye(e, i, s)
                }) : Ye(e, i, s) : void 0
            },
            set: function(e, n, s) {
                var r, o = s && E(e),
                    a = s && qe(e, i, s, 'border-box' === t.css(e, 'boxSizing', !1, o), o);
                return a && (r = I.exec(n)) && 'px' !== (r[3] || 'px') && (e.style[i] = n, n = t.css(e, i)), Be(e, n, a)
            }
        }
    }), t.cssHooks.marginLeft = ne(r.reliableMarginLeft, function(e, t) {
        return t ? (parseFloat(k(e, 'marginLeft')) || e.getBoundingClientRect().left - J(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + 'px' : void 0
    }), t.cssHooks.marginRight = ne(r.reliableMarginRight, function(e, t) {
        return t ? J(e, {
            display: 'inline-block'
        }, k, [e, 'marginRight']) : void 0
    }), t.each({
        margin: '',
        padding: '',
        border: 'Width'
    }, function(e, i) {
        t.cssHooks[e + i] = {
            expand: function(t) {
                for (var n = 0, r = {}, s = 'string' == typeof t ? t.split(' ') : [t]; 4 > n; n++) r[e + p[n] + i] = s[n] || s[n - 2] || s[0];
                return r
            }
        }, ve.test(e) || (t.cssHooks[e + i].set = Be)
    }), t.fn.extend({
        css: function(e, i) {
            return d(this, function(e, i, n) {
                var r, o, a = {},
                    s = 0;
                if (t.isArray(i)) {
                    for (r = E(e), o = i.length; o > s; s++) a[i[s]] = t.css(e, i[s], !1, r);
                    return a
                };
                return void 0 !== n ? t.style(e, i, n) : t.css(e, i)
            }, e, i, arguments.length > 1)
        },
        show: function() {
            return Ue(this, !0)
        },
        hide: function() {
            return Ue(this)
        },
        toggle: function(e) {
            return 'boolean' == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                P(this) ? t(this).show() : t(this).hide()
            })
        }
    });

    function l(e, t, i, n, s) {
        return new l.prototype.init(e, t, i, n, s)
    };
    t.Tween = l, l.prototype = {
        constructor: l,
        init: function(e, i, n, s, r, o) {
            this.elem = e, this.prop = n, this.easing = r || t.easing._default, this.options = i, this.start = this.now = this.cur(), this.end = s, this.unit = o || (t.cssNumber[n] ? '' : 'px')
        },
        cur: function() {
            var e = l.propHooks[this.prop];
            return e && e.get ? e.get(this) : l.propHooks._default.get(this)
        },
        run: function(e) {
            var i, n = l.propHooks[this.prop];
            return this.options.duration ? this.pos = i = t.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = i = e, this.now = (this.end - this.start) * i + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : l.propHooks._default.set(this), this
        }
    }, l.prototype.init.prototype = l.prototype, l.propHooks = {
        _default: {
            get: function(e) {
                var i;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (i = t.css(e.elem, e.prop, ''), i && 'auto' !== i ? i : 0)
            },
            set: function(e) {
                t.fx.step[e.prop] ? t.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[t.cssProps[e.prop]] && !t.cssHooks[e.prop] ? e.elem[e.prop] = e.now : t.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, l.propHooks.scrollTop = l.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, t.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: 'swing'
    }, t.fx = l.prototype.init, t.fx.step = {};
    var y, M, pt = /^(?:toggle|show|hide)$/,
        mt = /queueHooks$/;

    function Xe() {
        return e.setTimeout(function() {
            y = void 0
        }), y = t.now()
    };

    function R(e, t) {
        var n, s = 0,
            i = {
                height: e
            };
        for (t = t ? 1 : 0; 4 > s; s += 2 - t) n = p[s], i['margin' + n] = i['padding' + n] = e;
        return t && (i.opacity = i.width = e), i
    };

    function Ke(e, t, i) {
        for (var s, r = (h.tweeners[t] || []).concat(h.tweeners['*']), n = 0, o = r.length; o > n; n++)
            if (s = r[n].call(i, t, e)) return s
    };

    function Bt(e, i, s) {
        var r, d, m, f, a, g, c, v, h = this,
            p = {},
            l = e.style,
            u = e.nodeType && P(e),
            o = n.get(e, 'fxshow');
        s.queue || (a = t._queueHooks(e, 'fx'), null == a.unqueued && (a.unqueued = 0, g = a.empty.fire, a.empty.fire = function() {
            a.unqueued || g()
        }), a.unqueued++, h.always(function() {
            h.always(function() {
                a.unqueued--, t.queue(e, 'fx').length || a.empty.fire()
            })
        })), 1 === e.nodeType && ('height' in i || 'width' in i) && (s.overflow = [l.overflow, l.overflowX, l.overflowY], c = t.css(e, 'display'), v = 'none' === c ? n.get(e, 'olddisplay') || ie(e.nodeName) : c, 'inline' === v && 'none' === t.css(e, 'float') && (l.display = 'inline-block')), s.overflow && (l.overflow = 'hidden', h.always(function() {
            l.overflow = s.overflow[0], l.overflowX = s.overflow[1], l.overflowY = s.overflow[2]
        }));
        for (r in i)
            if (d = i[r], pt.exec(d)) {
                if (delete i[r], m = m || 'toggle' === d, d === (u ? 'hide' : 'show')) {
                    if ('show' !== d || !o || void 0 === o[r]) continue;
                    u = !0
                };
                p[r] = o && o[r] || t.style(e, r)
            } else c = void 0;
        if (t.isEmptyObject(p)) 'inline' === ('none' === c ? ie(e.nodeName) : c) && (l.display = c);
        else {
            o ? 'hidden' in o && (u = o.hidden) : o = n.access(e, 'fxshow', {}), m && (o.hidden = !u), u ? t(e).show() : h.done(function() {
                t(e).hide()
            }), h.done(function() {
                var i;
                n.remove(e, 'fxshow');
                for (i in p) t.style(e, i, p[i])
            });
            for (r in p) f = Ke(u ? o[r] : 0, r, h), r in o || (o[r] = f.start, u && (f.end = f.start, f.start = 'width' === r || 'height' === r ? 1 : 0))
        }
    };

    function qt(e, i) {
        var n, r, o, s, a;
        for (n in e)
            if (r = t.camelCase(n), o = i[r], s = e[n], t.isArray(s) && (o = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), a = t.cssHooks[r], a && 'expand' in a) {
                s = a.expand(s), delete e[r];
                for (n in s) n in e || (e[n] = s[n], i[n] = o)
            } else i[r] = o
    };

    function h(e, i, n) {
        var o, a, l = 0,
            d = h.prefilters.length,
            r = t.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (a) return !1;
                for (var l = y || Xe(), t = Math.max(0, s.startTime + s.duration - l), c = t / s.duration || 0, i = 1 - c, n = 0, o = s.tweens.length; o > n; n++) s.tweens[n].run(i);
                return r.notifyWith(e, [s, i, t]), 1 > i && o ? t : (r.resolveWith(e, [s]), !1)
            },
            s = r.promise({
                elem: e,
                props: t.extend({}, i),
                opts: t.extend(!0, {
                    specialEasing: {},
                    easing: t.easing._default
                }, n),
                originalProperties: i,
                originalOptions: n,
                startTime: y || Xe(),
                duration: n.duration,
                tweens: [],
                createTween: function(i, n) {
                    var r = t.Tween(e, s.opts, i, n, s.opts.specialEasing[i] || s.opts.easing);
                    return s.tweens.push(r), r
                },
                stop: function(t) {
                    var i = 0,
                        n = t ? s.tweens.length : 0;
                    if (a) return this;
                    for (a = !0; n > i; i++) s.tweens[i].run(1);
                    return t ? (r.notifyWith(e, [s, 1, 0]), r.resolveWith(e, [s, t])) : r.rejectWith(e, [s, t]), this
                }
            }),
            c = s.props;
        for (qt(c, s.opts.specialEasing); d > l; l++)
            if (o = h.prefilters[l].call(s, e, c, s.opts)) return t.isFunction(o.stop) && (t._queueHooks(s.elem, s.opts.queue).stop = t.proxy(o.stop, o)), o;
        return t.map(c, Ke, s), t.isFunction(s.opts.start) && s.opts.start.call(e, s), t.fx.timer(t.extend(u, {
            elem: e,
            anim: s,
            queue: s.opts.queue
        })), s.progress(s.opts.progress).done(s.opts.done, s.opts.complete).fail(s.opts.fail).always(s.opts.always)
    };
    t.Animation = t.extend(h, {
            tweeners: {
                '*': [function(e, t) {
                    var i = this.createTween(e, t);
                    return Ee(i.elem, e, I.exec(t), i), i
                }]
            },
            tweener: function(e, i) {
                t.isFunction(e) ? (i = e, e = ['*']) : e = e.match(u);
                for (var n, s = 0, r = e.length; r > s; s++) n = e[s], h.tweeners[n] = h.tweeners[n] || [], h.tweeners[n].unshift(i)
            },
            prefilters: [Bt],
            prefilter: function(e, t) {
                t ? h.prefilters.unshift(e) : h.prefilters.push(e)
            }
        }), t.speed = function(e, i, n) {
            var s = e && 'object' == typeof e ? t.extend({}, e) : {
                complete: n || !n && i || t.isFunction(e) && e,
                duration: e,
                easing: n && i || i && !t.isFunction(i) && i
            };
            return s.duration = t.fx.off ? 0 : 'number' == typeof s.duration ? s.duration : s.duration in t.fx.speeds ? t.fx.speeds[s.duration] : t.fx.speeds._default, null != s.queue && s.queue !== !0 || (s.queue = 'fx'), s.old = s.complete, s.complete = function() {
                t.isFunction(s.old) && s.old.call(this), s.queue && t.dequeue(this, s.queue)
            }, s
        }, t.fn.extend({
            fadeTo: function(e, t, i, n) {
                return this.filter(P).css('opacity', 0).show().end().animate({
                    opacity: t
                }, e, i, n)
            },
            animate: function(e, i, s, r) {
                var l = t.isEmptyObject(e),
                    a = t.speed(i, s, r),
                    o = function() {
                        var i = h(this, t.extend({}, e), a);
                        (l || n.get(this, 'finish')) && i.stop(!0)
                    };
                return o.finish = o, l || a.queue === !1 ? this.each(o) : this.queue(a.queue, o)
            },
            stop: function(e, i, s) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop, t(s)
                };
                return 'string' != typeof e && (s = i, i = e, e = void 0), i && e !== !1 && this.queue(e || 'fx', []), this.each(function() {
                    var l = !0,
                        i = null != e && e + 'queueHooks',
                        a = t.timers,
                        o = n.get(this);
                    if (i) o[i] && o[i].stop && r(o[i]);
                    else
                        for (i in o) o[i] && o[i].stop && mt.test(i) && r(o[i]);
                    for (i = a.length; i--;) a[i].elem !== this || null != e && a[i].queue !== e || (a[i].anim.stop(s), l = !1, a.splice(i, 1));
                    !l && s || t.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || 'fx'), this.each(function() {
                    var i, o = n.get(this),
                        s = o[e + 'queue'],
                        a = o[e + 'queueHooks'],
                        r = t.timers,
                        l = s ? s.length : 0;
                    for (o.finish = !0, t.queue(this, e, []), a && a.stop && a.stop.call(this, !0), i = r.length; i--;) r[i].elem === this && r[i].queue === e && (r[i].anim.stop(!0), r.splice(i, 1));
                    for (i = 0; l > i; i++) s[i] && s[i].finish && s[i].finish.call(this);
                    delete o.finish
                })
            }
        }), t.each(['toggle', 'show', 'hide'], function(e, i) {
            var n = t.fn[i];
            t.fn[i] = function(e, t, s) {
                return null == e || 'boolean' == typeof e ? n.apply(this, arguments) : this.animate(R(i, !0), e, t, s)
            }
        }), t.each({
            slideDown: R('show'),
            slideUp: R('hide'),
            slideToggle: R('toggle'),
            fadeIn: {
                opacity: 'show'
            },
            fadeOut: {
                opacity: 'hide'
            },
            fadeToggle: {
                opacity: 'toggle'
            }
        }, function(e, i) {
            t.fn[e] = function(e, t, n) {
                return this.animate(i, e, t, n)
            }
        }), t.timers = [], t.fx.tick = function() {
            var n, e = 0,
                i = t.timers;
            for (y = t.now(); e < i.length; e++) n = i[e], n() || i[e] !== n || i.splice(e--, 1);
            i.length || t.fx.stop(), y = void 0
        }, t.fx.timer = function(e) {
            t.timers.push(e), e() ? t.fx.start() : t.timers.pop()
        }, t.fx.interval = 13, t.fx.start = function() {
            M || (M = e.setInterval(t.fx.tick, t.fx.interval))
        }, t.fx.stop = function() {
            e.clearInterval(M), M = null
        }, t.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, t.fn.delay = function(i, n) {
            return i = t.fx ? t.fx.speeds[i] || i : i, n = n || 'fx', this.queue(n, function(t, n) {
                var s = e.setTimeout(t, i);
                n.stop = function() {
                    e.clearTimeout(s)
                }
            })
        },
        function() {
            var e = s.createElement('input'),
                t = s.createElement('select'),
                i = t.appendChild(s.createElement('option'));
            e.type = 'checkbox', r.checkOn = '' !== e.value, r.optSelected = i.selected, t.disabled = !0, r.optDisabled = !i.disabled, e = s.createElement('input'), e.value = 't', e.type = 'radio', r.radioValue = 't' === e.value
        }();
    var fe, D = t.expr.attrHandle;
    t.fn.extend({
        attr: function(e, i) {
            return d(this, t.attr, e, i, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                t.removeAttr(this, e)
            })
        }
    }), t.extend({
        attr: function(e, i, n) {
            var s, r, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 'undefined' == typeof e.getAttribute ? t.prop(e, i, n) : (1 === o && t.isXMLDoc(e) || (i = i.toLowerCase(), r = t.attrHooks[i] || (t.expr.match.bool.test(i) ? fe : void 0)), void 0 !== n ? null === n ? void t.removeAttr(e, i) : r && 'set' in r && void 0 !== (s = r.set(e, n, i)) ? s : (e.setAttribute(i, n + ''), n) : r && 'get' in r && null !== (s = r.get(e, i)) ? s : (s = t.find.attr(e, i), null == s ? void 0 : s))
        },
        attrHooks: {
            type: {
                set: function(e, i) {
                    if (!r.radioValue && 'radio' === i && t.nodeName(e, 'input')) {
                        var n = e.value;
                        return e.setAttribute('type', i), n && (e.value = n), i
                    }
                }
            }
        },
        removeAttr: function(e, i) {
            var n, s, o = 0,
                r = i && i.match(u);
            if (r && 1 === e.nodeType)
                while (n = r[o++]) s = t.propFix[n] || n, t.expr.match.bool.test(n) && (e[s] = !1), e.removeAttribute(n)
        }
    }), fe = {
        set: function(e, i, n) {
            return i === !1 ? t.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, t.each(t.expr.match.bool.source.match(/\w+/g), function(e, i) {
        var n = D[i] || t.find.attr;
        D[i] = function(e, t, i) {
            var s, r;
            return i || (r = D[t], D[t] = s, s = null != n(e, t, i) ? t.toLowerCase() : null, D[t] = r), s
        }
    });
    var dt = /^(?:input|select|textarea|button)$/i,
        ft = /^(?:a|area)$/i;
    t.fn.extend({
        prop: function(e, i) {
            return d(this, t.prop, e, i, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[t.propFix[e] || e]
            })
        }
    }), t.extend({
        prop: function(e, i, n) {
            var r, s, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && t.isXMLDoc(e) || (i = t.propFix[i] || i, s = t.propHooks[i]), void 0 !== n ? s && 'set' in s && void 0 !== (r = s.set(e, n, i)) ? r : e[i] = n : s && 'get' in s && null !== (r = s.get(e, i)) ? r : e[i]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var i = t.find.attr(e, 'tabindex');
                    return i ? parseInt(i, 10) : dt.test(e.nodeName) || ft.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            'for': 'htmlFor',
            'class': 'className'
        }
    }), r.optSelected || (t.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), t.each(['tabIndex', 'readOnly', 'maxLength', 'cellSpacing', 'cellPadding', 'rowSpan', 'colSpan', 'useMap', 'frameBorder', 'contentEditable'], function() {
        t.propFix[this.toLowerCase()] = this
    });
    var K = /[\t\r\n\f]/g;

    function v(e) {
        return e.getAttribute && e.getAttribute('class') || ''
    };
    t.fn.extend({
        addClass: function(e) {
            var a, i, n, s, r, l, o, c = 0;
            if (t.isFunction(e)) return this.each(function(i) {
                t(this).addClass(e.call(this, i, v(this)))
            });
            if ('string' == typeof e && e) {
                a = e.match(u) || [];
                while (i = this[c++])
                    if (s = v(i), n = 1 === i.nodeType && (' ' + s + ' ').replace(K, ' ')) {
                        l = 0;
                        while (r = a[l++]) n.indexOf(' ' + r + ' ') < 0 && (n += r + ' ');
                        o = t.trim(n), s !== o && i.setAttribute('class', o)
                    }
            };
            return this
        },
        removeClass: function(e) {
            var a, n, i, s, r, l, o, c = 0;
            if (t.isFunction(e)) return this.each(function(i) {
                t(this).removeClass(e.call(this, i, v(this)))
            });
            if (!arguments.length) return this.attr('class', '');
            if ('string' == typeof e && e) {
                a = e.match(u) || [];
                while (n = this[c++])
                    if (s = v(n), i = 1 === n.nodeType && (' ' + s + ' ').replace(K, ' ')) {
                        l = 0;
                        while (r = a[l++])
                            while (i.indexOf(' ' + r + ' ') > -1) i = i.replace(' ' + r + ' ', ' ');
                        o = t.trim(i), s !== o && n.setAttribute('class', o)
                    }
            };
            return this
        },
        toggleClass: function(e, i) {
            var s = typeof e;
            return 'boolean' == typeof i && 'string' === s ? i ? this.addClass(e) : this.removeClass(e) : t.isFunction(e) ? this.each(function(n) {
                t(this).toggleClass(e.call(this, n, v(this), i), i)
            }) : this.each(function() {
                var i, o, r, a;
                if ('string' === s) {
                    o = 0, r = t(this), a = e.match(u) || [];
                    while (i = a[o++]) r.hasClass(i) ? r.removeClass(i) : r.addClass(i)
                } else void 0 !== e && 'boolean' !== s || (i = v(this), i && n.set(this, '__className__', i), this.setAttribute && this.setAttribute('class', i || e === !1 ? '' : n.get(this, '__className__') || ''))
            })
        },
        hasClass: function(e) {
            var i, t, n = 0;
            i = ' ' + e + ' ';
            while (t = this[n++])
                if (1 === t.nodeType && (' ' + v(t) + ' ').replace(K, ' ').indexOf(i) > -1) return !0;
            return !1
        }
    });
    var ut = /\r/g,
        ht = /[\x20\t\r\n\f]+/g;
    t.fn.extend({
        val: function(e) {
            var i, n, r, s = this[0]; {
                if (arguments.length) return r = t.isFunction(e), this.each(function(n) {
                    var s;
                    1 === this.nodeType && (s = r ? e.call(this, n, t(this).val()) : e, null == s ? s = '' : 'number' == typeof s ? s += '' : t.isArray(s) && (s = t.map(s, function(e) {
                        return null == e ? '' : e + ''
                    })), i = t.valHooks[this.type] || t.valHooks[this.nodeName.toLowerCase()], i && 'set' in i && void 0 !== i.set(this, s, 'value') || (this.value = s))
                });
                if (s) return i = t.valHooks[s.type] || t.valHooks[s.nodeName.toLowerCase()], i && 'get' in i && void 0 !== (n = i.get(s, 'value')) ? n : (n = s.value, 'string' == typeof n ? n.replace(ut, '') : null == n ? '' : n)
            }
        }
    }), t.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var i = t.find.attr(e, 'value');
                    return null != i ? i : t.trim(t.text(e)).replace(ht, ' ')
                }
            },
            select: {
                get: function(e) {
                    for (var a, i, l = e.options, n = e.selectedIndex, s = 'select-one' === e.type || 0 > n, c = s ? null : [], u = s ? n + 1 : l.length, o = 0 > n ? u : s ? n : 0; u > o; o++)
                        if (i = l[o], (i.selected || o === n) && (r.optDisabled ? !i.disabled : null === i.getAttribute('disabled')) && (!i.parentNode.disabled || !t.nodeName(i.parentNode, 'optgroup'))) {
                            if (a = t(i).val(), s) return a;
                            c.push(a)
                        };
                    return c
                },
                set: function(e, i) {
                    var s, n, r = e.options,
                        o = t.makeArray(i),
                        a = r.length;
                    while (a--) n = r[a], (n.selected = t.inArray(t.valHooks.option.get(n), o) > -1) && (s = !0);
                    return s || (e.selectedIndex = -1), o
                }
            }
        }
    }), t.each(['radio', 'checkbox'], function() {
        t.valHooks[this] = {
            set: function(e, i) {
                return t.isArray(i) ? e.checked = t.inArray(t(e).val(), i) > -1 : void 0
            }
        }, r.checkOn || (t.valHooks[this].get = function(e) {
            return null === e.getAttribute('value') ? 'on' : e.value
        })
    });
    var de = /^(?:focusinfocus|focusoutblur)$/;
    t.extend(t.event, {
        trigger: function(i, r, o, a) {
            var g, l, u, v, d, f, h, m = [o || s],
                c = A.call(i, 'type') ? i.type : i,
                p = A.call(i, 'namespace') ? i.namespace.split('.') : [];
            if (l = u = o = o || s, 3 !== o.nodeType && 8 !== o.nodeType && !de.test(c + t.event.triggered) && (c.indexOf('.') > -1 && (p = c.split('.'), c = p.shift(), p.sort()), d = c.indexOf(':') < 0 && 'on' + c, i = i[t.expando] ? i : new t.Event(c, 'object' == typeof i && i), i.isTrigger = a ? 2 : 3, i.namespace = p.join('.'), i.rnamespace = i.namespace ? new RegExp('(^|\\.)' + p.join('\\.(?:.*\\.|)') + '(\\.|$)') : null, i.result = void 0, i.target || (i.target = o), r = null == r ? [i] : t.makeArray(r, [i]), h = t.event.special[c] || {}, a || !h.trigger || h.trigger.apply(o, r) !== !1)) {
                if (!a && !h.noBubble && !t.isWindow(o)) {
                    for (v = h.delegateType || c, de.test(v + c) || (l = l.parentNode); l; l = l.parentNode) m.push(l), u = l;
                    u === (o.ownerDocument || s) && m.push(u.defaultView || u.parentWindow || e)
                };
                g = 0;
                while ((l = m[g++]) && !i.isPropagationStopped()) i.type = g > 1 ? v : h.bindType || c, f = (n.get(l, 'events') || {})[i.type] && n.get(l, 'handle'), f && f.apply(l, r), f = d && l[d], f && f.apply && j(l) && (i.result = f.apply(l, r), i.result === !1 && i.preventDefault());
                return i.type = c, a || i.isDefaultPrevented() || h._default && h._default.apply(m.pop(), r) !== !1 || !j(o) || d && t.isFunction(o[c]) && !t.isWindow(o) && (u = o[d], u && (o[d] = null), t.event.triggered = c, o[c](), t.event.triggered = void 0, u && (o[d] = u)), i.result
            }
        },
        simulate: function(e, i, n) {
            var s = t.extend(new t.Event, n, {
                type: e,
                isSimulated: !0
            });
            t.event.trigger(s, null, i), s.isDefaultPrevented() && n.preventDefault()
        }
    }), t.fn.extend({
        trigger: function(e, i) {
            return this.each(function() {
                t.event.trigger(e, i, this)
            })
        },
        triggerHandler: function(e, i) {
            var n = this[0];
            return n ? t.event.trigger(e, i, n, !0) : void 0
        }
    }), t.each('blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(' '), function(e, i) {
        t.fn[i] = function(e, t) {
            return arguments.length > 0 ? this.on(i, null, e, t) : this.trigger(i)
        }
    }), t.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), r.focusin = 'onfocusin' in e, r.focusin || t.each({
        focus: 'focusin',
        blur: 'focusout'
    }, function(e, i) {
        var s = function(e) {
            t.event.simulate(i, e.target, t.event.fix(e))
        };
        t.event.special[i] = {
            setup: function() {
                var t = this.ownerDocument || this,
                    r = n.access(t, i);
                r || t.addEventListener(e, s, !0), n.access(t, i, (r || 0) + 1)
            },
            teardown: function() {
                var t = this.ownerDocument || this,
                    r = n.access(t, i) - 1;
                r ? n.access(t, i, r) : (t.removeEventListener(e, s, !0), n.remove(t, i))
            }
        }
    });
    var T = e.location,
        U = t.now(),
        X = /\?/;
    t.parseJSON = function(e) {
        return JSON.parse(e + '')
    }, t.parseXML = function(i) {
        var s;
        if (!i || 'string' != typeof i) return null;
        try {
            s = (new e.DOMParser).parseFromString(i, 'text/xml')
        } catch (n) {
            s = void 0
        };
        return s && !s.getElementsByTagName('parsererror').length || t.error('Invalid XML: ' + i), s
    };
    var rt = /#.*$/,
        ce = /([?&])_=[^&]*/,
        ot = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        at = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        lt = /^(?:GET|HEAD)$/,
        ct = /^\/\//,
        ue = {},
        q = {},
        he = '*/'.concat('*'),
        Y = s.createElement('a');
    Y.href = T.href;

    function Qe(e) {
        return function(i, n) {
            'string' != typeof i && (n = i, i = '*');
            var s, r = 0,
                o = i.toLowerCase().match(u) || [];
            if (t.isFunction(n))
                while (s = o[r++]) '+' === s[0] ? (s = s.slice(1) || '*', (e[s] = e[s] || []).unshift(n)) : (e[s] = e[s] || []).push(n)
        }
    };

    function Je(e, i, n, s) {
        var r = {},
            a = e === q;

        function o(l) {
            var c;
            return r[l] = !0, t.each(e[l] || [], function(e, t) {
                var l = t(i, n, s);
                return 'string' != typeof l || a || r[l] ? a ? !(c = l) : void 0 : (i.dataTypes.unshift(l), o(l), !1)
            }), c
        };
        return o(i.dataTypes[0]) || !r['*'] && o('*')
    };

    function se(e, i) {
        var n, s, r = t.ajaxSettings.flatOptions || {};
        for (n in i) void 0 !== i[n] && ((r[n] ? e : s || (s = {}))[n] = i[n]);
        return s && t.extend(!0, e, s), e
    };

    function Yt(e, t, i) {
        var o, s, r, a, l = e.contents,
            n = e.dataTypes;
        while ('*' === n[0]) n.shift(), void 0 === o && (o = e.mimeType || t.getResponseHeader('Content-Type'));
        if (o)
            for (s in l)
                if (l[s] && l[s].test(o)) {
                    n.unshift(s);
                    break
                };
        if (n[0] in i) r = n[0];
        else {
            for (s in i) {
                if (!n[0] || e.converters[s + ' ' + n[0]]) {
                    r = s;
                    break
                };
                a || (a = s)
            };
            r = r || a
        };
        return r ? (r !== n[0] && n.unshift(r), i[r]) : void 0
    };

    function Ut(e, t, i, n) {
        var u, r, o, c, a, l = {},
            h = e.dataTypes.slice();
        if (h[1])
            for (o in e.converters) l[o.toLowerCase()] = e.converters[o];
        r = h.shift();
        while (r)
            if (e.responseFields[r] && (i[e.responseFields[r]] = t), !a && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = r, r = h.shift())
                if ('*' === r) r = a;
                else if ('*' !== a && a !== r) {
            if (o = l[a + ' ' + r] || l['* ' + r], !o)
                for (u in l)
                    if (c = u.split(' '), c[1] === r && (o = l[a + ' ' + c[0]] || l['* ' + c[0]])) {
                        o === !0 ? o = l[u] : l[u] !== !0 && (r = c[0], h.unshift(c[1]));
                        break
                    };
            if (o !== !0)
                if (o && e['throws']) t = o(t);
                else try {
                    t = o(t)
                } catch (s) {
                    return {
                        state: 'parsererror',
                        error: o ? s : 'No conversion from ' + a + ' to ' + r
                    }
                }
        };
        return {
            state: 'success',
            data: t
        }
    };
    t.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: T.href,
            type: 'GET',
            isLocal: at.test(T.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            accepts: {
                '*': he,
                text: 'text/plain',
                html: 'text/html',
                xml: 'application/xml, text/xml',
                json: 'application/json, text/javascript'
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: 'responseXML',
                text: 'responseText',
                json: 'responseJSON'
            },
            converters: {
                '* text': String,
                'text html': !0,
                'text json': t.parseJSON,
                'text xml': t.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, i) {
            return i ? se(se(e, t.ajaxSettings), i) : se(t.ajaxSettings, e)
        },
        ajaxPrefilter: Qe(ue),
        ajaxTransport: Qe(q),
        ajax: function(i, n) {
            'object' == typeof i && (n = i, i = void 0), n = n || {};
            var p, l, b, g, w, d, m, f, r = t.ajaxSetup({}, n),
                h = r.context || r,
                x = r.context && (h.nodeType || h.jquery) ? t(h) : t.event,
                k = t.Deferred(),
                C = t.Callbacks('once memory'),
                v = r.statusCode || {},
                D = {},
                S = {},
                c = 0,
                I = 'canceled',
                o = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === c) {
                            if (!g) {
                                g = {};
                                while (t = ot.exec(b)) g[t[1].toLowerCase()] = t[2]
                            };
                            t = g[e.toLowerCase()]
                        };
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === c ? b : null
                    },
                    setRequestHeader: function(e, t) {
                        var i = e.toLowerCase();
                        return c || (e = S[i] = S[i] || e, D[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return c || (r.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > c)
                                for (t in e) v[t] = [v[t], e[t]];
                            else o.always(e[o.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || I;
                        return p && p.abort(t), y(0, t), this
                    }
                };
            if (k.promise(o).complete = C.add, o.success = o.done, o.error = o.fail, r.url = ((i || r.url || T.href) + '').replace(rt, '').replace(ct, T.protocol + '//'), r.type = n.method || n.type || r.method || r.type, r.dataTypes = t.trim(r.dataType || '*').toLowerCase().match(u) || [''], null == r.crossDomain) {
                d = s.createElement('a');
                try {
                    d.href = r.url, d.href = d.href, r.crossDomain = Y.protocol + '//' + Y.host != d.protocol + '//' + d.host
                } catch (a) {
                    r.crossDomain = !0
                }
            };
            if (r.data && r.processData && 'string' != typeof r.data && (r.data = t.param(r.data, r.traditional)), Je(ue, r, n, o), 2 === c) return o;
            m = t.event && r.global, m && 0 === t.active++ && t.event.trigger('ajaxStart'), r.type = r.type.toUpperCase(), r.hasContent = !lt.test(r.type), l = r.url, r.hasContent || (r.data && (l = r.url += (X.test(l) ? '&' : '?') + r.data, delete r.data), r.cache === !1 && (r.url = ce.test(l) ? l.replace(ce, '$1_=' + U++) : l + (X.test(l) ? '&' : '?') + '_=' + U++)), r.ifModified && (t.lastModified[l] && o.setRequestHeader('If-Modified-Since', t.lastModified[l]), t.etag[l] && o.setRequestHeader('If-None-Match', t.etag[l])), (r.data && r.hasContent && r.contentType !== !1 || n.contentType) && o.setRequestHeader('Content-Type', r.contentType), o.setRequestHeader('Accept', r.dataTypes[0] && r.accepts[r.dataTypes[0]] ? r.accepts[r.dataTypes[0]] + ('*' !== r.dataTypes[0] ? ', ' + he + '; q=0.01' : '') : r.accepts['*']);
            for (f in r.headers) o.setRequestHeader(f, r.headers[f]);
            if (r.beforeSend && (r.beforeSend.call(h, o, r) === !1 || 2 === c)) return o.abort();
            I = 'abort';
            for (f in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) o[f](r[f]);
            if (p = Je(q, r, n, o)) {
                if (o.readyState = 1, m && x.trigger('ajaxSend', [o, r]), 2 === c) return o;
                r.async && r.timeout > 0 && (w = e.setTimeout(function() {
                    o.abort('timeout')
                }, r.timeout));
                try {
                    c = 1, p.send(D, y)
                } catch (a) {
                    if (!(2 > c)) throw a;
                    y(-1, a)
                }
            } else y(-1, 'No Transport');

            function y(i, n, s, a) {
                var d, T, y, f, g, u = n;
                2 !== c && (c = 2, w && e.clearTimeout(w), p = void 0, b = a || '', o.readyState = i > 0 ? 4 : 0, d = i >= 200 && 300 > i || 304 === i, s && (f = Yt(r, o, s)), f = Ut(r, f, o, d), d ? (r.ifModified && (g = o.getResponseHeader('Last-Modified'), g && (t.lastModified[l] = g), g = o.getResponseHeader('etag'), g && (t.etag[l] = g)), 204 === i || 'HEAD' === r.type ? u = 'nocontent' : 304 === i ? u = 'notmodified' : (u = f.state, T = f.data, y = f.error, d = !y)) : (y = u, !i && u || (u = 'error', 0 > i && (i = 0))), o.status = i, o.statusText = (n || u) + '', d ? k.resolveWith(h, [T, u, o]) : k.rejectWith(h, [o, u, y]), o.statusCode(v), v = void 0, m && x.trigger(d ? 'ajaxSuccess' : 'ajaxError', [o, r, d ? T : y]), C.fireWith(h, [o, u]), m && (x.trigger('ajaxComplete', [o, r]), --t.active || t.event.trigger('ajaxStop')))
            };
            return o
        },
        getJSON: function(e, i, n) {
            return t.get(e, i, n, 'json')
        },
        getScript: function(e, i) {
            return t.get(e, void 0, i, 'script')
        }
    }), t.each(['get', 'post'], function(e, i) {
        t[i] = function(e, n, s, r) {
            return t.isFunction(n) && (r = r || s, s = n, n = void 0), t.ajax(t.extend({
                url: e,
                type: i,
                dataType: r,
                data: n,
                success: s
            }, t.isPlainObject(e) && e))
        }
    }), t._evalUrl = function(e) {
        return t.ajax({
            url: e,
            type: 'GET',
            dataType: 'script',
            async: !1,
            global: !1,
            'throws': !0
        })
    }, t.fn.extend({
        wrapAll: function(e) {
            var i;
            return t.isFunction(e) ? this.each(function(i) {
                t(this).wrapAll(e.call(this, i))
            }) : (this[0] && (i = t(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && i.insertBefore(this[0]), i.map(function() {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function(e) {
            return t.isFunction(e) ? this.each(function(i) {
                t(this).wrapInner(e.call(this, i))
            }) : this.each(function() {
                var i = t(this),
                    n = i.contents();
                n.length ? n.wrapAll(e) : i.append(e)
            })
        },
        wrap: function(e) {
            var i = t.isFunction(e);
            return this.each(function(n) {
                t(this).wrapAll(i ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                t.nodeName(this, 'body') || t(this).replaceWith(this.childNodes)
            }).end()
        }
    }), t.expr.filters.hidden = function(e) {
        return !t.expr.filters.visible(e)
    }, t.expr.filters.visible = function(e) {
        return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
    };
    var tt = /%20/g,
        it = /\[\]$/,
        le = /\r?\n/g,
        nt = /^(?:submit|button|image|reset|file)$/i,
        st = /^(?:input|select|textarea|keygen)/i;

    function re(e, i, n, s) {
        var r;
        if (t.isArray(i)) t.each(i, function(t, i) {
            n || it.test(e) ? s(e, i) : re(e + '[' + ('object' == typeof i && null != i ? t : '') + ']', i, n, s)
        });
        else if (n || 'object' !== t.type(i)) s(e, i);
        else
            for (r in i) re(e + '[' + r + ']', i[r], n, s)
    };
    t.param = function(e, i) {
        var n, s = [],
            r = function(e, i) {
                i = t.isFunction(i) ? i() : null == i ? '' : i, s[s.length] = encodeURIComponent(e) + '=' + encodeURIComponent(i)
            };
        if (void 0 === i && (i = t.ajaxSettings && t.ajaxSettings.traditional), t.isArray(e) || e.jquery && !t.isPlainObject(e)) t.each(e, function() {
            r(this.name, this.value)
        });
        else
            for (n in e) re(n, e[n], i, r);
        return s.join('&').replace(tt, '+')
    }, t.fn.extend({
        serialize: function() {
            return t.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = t.prop(this, 'elements');
                return e ? t.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !t(this).is(':disabled') && st.test(this.nodeName) && !nt.test(e) && (this.checked || !we.test(e))
            }).map(function(e, i) {
                var n = t(this).val();
                return null == n ? null : t.isArray(n) ? t.map(n, function(e) {
                    return {
                        name: i.name,
                        value: e.replace(le, '\r\n')
                    }
                }) : {
                    name: i.name,
                    value: n.replace(le, '\r\n')
                }
            }).get()
        }
    }), t.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    };
    var et = {
            0: 200,
            1223: 204
        },
        C = t.ajaxSettings.xhr();
    r.cors = !!C && 'withCredentials' in C, r.ajax = C = !!C, t.ajaxTransport(function(t) {
        var i, n;
        return r.cors || C && !t.crossDomain ? {
            send: function(s, r) {
                var l, a = t.xhr();
                if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (l in t.xhrFields) a[l] = t.xhrFields[l];
                t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || s['X-Requested-With'] || (s['X-Requested-With'] = 'XMLHttpRequest');
                for (l in s) a.setRequestHeader(l, s[l]);
                i = function(e) {
                    return function() {
                        i && (i = n = a.onload = a.onerror = a.onabort = a.onreadystatechange = null, 'abort' === e ? a.abort() : 'error' === e ? 'number' != typeof a.status ? r(0, 'error') : r(a.status, a.statusText) : r(et[a.status] || a.status, a.statusText, 'text' !== (a.responseType || 'text') || 'string' != typeof a.responseText ? {
                            binary: a.response
                        } : {
                            text: a.responseText
                        }, a.getAllResponseHeaders()))
                    }
                }, a.onload = i(), n = a.onerror = i('error'), void 0 !== a.onabort ? a.onabort = n : a.onreadystatechange = function() {
                    4 === a.readyState && e.setTimeout(function() {
                        i && n()
                    })
                }, i = i('abort');
                try {
                    a.send(t.hasContent && t.data || null)
                } catch (o) {
                    if (i) throw o
                }
            },
            abort: function() {
                i && i()
            }
        } : void 0
    }), t.ajaxSetup({
        accepts: {
            script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            'text script': function(e) {
                return t.globalEval(e), e
            }
        }
    }), t.ajaxPrefilter('script', function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = 'GET')
    }), t.ajaxTransport('script', function(e) {
        if (e.crossDomain) {
            var n, i;
            return {
                send: function(r, o) {
                    n = t('<script>').prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on('load error', i = function(e) {
                        n.remove(), i = null, e && o('error' === e.type ? 404 : 200, e.type)
                    }), s.head.appendChild(n[0])
                },
                abort: function() {
                    i && i()
                }
            }
        }
    });
    var ae = [],
        B = /(=)\?(?=&|$)|\?\?/;
    t.ajaxSetup({
        jsonp: 'callback',
        jsonpCallback: function() {
            var e = ae.pop() || t.expando + '_' + U++;
            return this[e] = !0, e
        }
    }), t.ajaxPrefilter('json jsonp', function(i, n, s) {
        var r, o, a, l = i.jsonp !== !1 && (B.test(i.url) ? 'url' : 'string' == typeof i.data && 0 === (i.contentType || '').indexOf('application/x-www-form-urlencoded') && B.test(i.data) && 'data');
        return l || 'jsonp' === i.dataTypes[0] ? (r = i.jsonpCallback = t.isFunction(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback, l ? i[l] = i[l].replace(B, '$1' + r) : i.jsonp !== !1 && (i.url += (X.test(i.url) ? '&' : '?') + i.jsonp + '=' + r), i.converters['script json'] = function() {
            return a || t.error(r + ' was not called'), a[0]
        }, i.dataTypes[0] = 'json', o = e[r], e[r] = function() {
            a = arguments
        }, s.always(function() {
            void 0 === o ? t(e).removeProp(r) : e[r] = o, i[r] && (i.jsonpCallback = n.jsonpCallback, ae.push(r)), a && t.isFunction(o) && o(a[0]), a = o = void 0
        }), 'script') : void 0
    }), t.parseHTML = function(e, i, n) {
        if (!e || 'string' != typeof e) return null;
        'boolean' == typeof i && (n = i, i = !1), i = i || s;
        var r = Pe.exec(e),
            o = !n && [];
        return r ? [i.createElement(r[1])] : (r = Oe([e], i, o), o && o.length && t(o).remove(), t.merge([], r.childNodes))
    };
    var oe = t.fn.load;
    t.fn.load = function(e, i, n) {
        if ('string' != typeof e && oe) return oe.apply(this, arguments);
        var s, a, l, r = this,
            o = e.indexOf(' ');
        return o > -1 && (s = t.trim(e.slice(o)), e = e.slice(0, o)), t.isFunction(i) ? (n = i, i = void 0) : i && 'object' == typeof i && (a = 'POST'), r.length > 0 && t.ajax({
            url: e,
            type: a || 'GET',
            dataType: 'html',
            data: i
        }).done(function(e) {
            l = arguments, r.html(s ? t('<div>').append(t.parseHTML(e)).find(s) : e)
        }).always(n && function(e, t) {
            r.each(function() {
                n.apply(this, l || [e.responseText, t, e])
            })
        }), this
    }, t.each(['ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend'], function(e, i) {
        t.fn[i] = function(e) {
            return this.on(i, e)
        }
    }), t.expr.filters.animated = function(e) {
        return t.grep(t.timers, function(t) {
            return e === t.elem
        }).length
    };

    function Ve(e) {
        return t.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    };
    t.offset = {
        setOffset: function(e, i, n) {
            var o, a, l, c, s, u, f, h = t.css(e, 'position'),
                d = t(e),
                r = {};
            'static' === h && (e.style.position = 'relative'), s = d.offset(), l = t.css(e, 'top'), u = t.css(e, 'left'), f = ('absolute' === h || 'fixed' === h) && (l + u).indexOf('auto') > -1, f ? (o = d.position(), c = o.top, a = o.left) : (c = parseFloat(l) || 0, a = parseFloat(u) || 0), t.isFunction(i) && (i = i.call(e, n, t.extend({}, s))), null != i.top && (r.top = i.top - s.top + c), null != i.left && (r.left = i.left - s.left + a), 'using' in i ? i.using.call(e, r) : d.css(r)
        }
    }, t.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(i) {
                t.offset.setOffset(this, e, i)
            });
            var i, r, n = this[0],
                s = {
                    top: 0,
                    left: 0
                },
                o = n && n.ownerDocument;
            if (o) return i = o.documentElement, t.contains(i, n) ? (s = n.getBoundingClientRect(), r = Ve(o), {
                top: s.top + r.pageYOffset - i.clientTop,
                left: s.left + r.pageXOffset - i.clientLeft
            }) : s
        },
        position: function() {
            if (this[0]) {
                var e, n, s = this[0],
                    i = {
                        top: 0,
                        left: 0
                    };
                return 'fixed' === t.css(s, 'position') ? n = s.getBoundingClientRect() : (e = this.offsetParent(), n = this.offset(), t.nodeName(e[0], 'html') || (i = e.offset()), i.top += t.css(e[0], 'borderTopWidth', !0), i.left += t.css(e[0], 'borderLeftWidth', !0)), {
                    top: n.top - i.top - t.css(s, 'marginTop', !0),
                    left: n.left - i.left - t.css(s, 'marginLeft', !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent;
                while (e && 'static' === t.css(e, 'position')) e = e.offsetParent;
                return e || S
            })
        }
    }), t.each({
        scrollLeft: 'pageXOffset',
        scrollTop: 'pageYOffset'
    }, function(e, i) {
        var n = 'pageYOffset' === i;
        t.fn[e] = function(t) {
            return d(this, function(e, t, s) {
                var r = Ve(e);
                return void 0 === s ? r ? r[i] : e[t] : void(r ? r.scrollTo(n ? r.pageXOffset : s, n ? s : r.pageYOffset) : e[t] = s)
            }, e, t, arguments.length)
        }
    }), t.each(['top', 'left'], function(e, i) {
        t.cssHooks[i] = ne(r.pixelPosition, function(e, n) {
            return n ? (n = k(e, i), Q.test(n) ? t(e).position()[i] + 'px' : n) : void 0
        })
    }), t.each({
        Height: 'height',
        Width: 'width'
    }, function(e, i) {
        t.each({
            padding: 'inner' + e,
            content: i,
            '': 'outer' + e
        }, function(n, s) {
            t.fn[s] = function(s, r) {
                var o = arguments.length && (n || 'boolean' != typeof s),
                    a = n || (s === !0 || r === !0 ? 'margin' : 'border');
                return d(this, function(i, n, s) {
                    var r;
                    return t.isWindow(i) ? i.document.documentElement['client' + e] : 9 === i.nodeType ? (r = i.documentElement, Math.max(i.body['scroll' + e], r['scroll' + e], i.body['offset' + e], r['offset' + e], r['client' + e])) : void 0 === s ? t.css(i, n, a) : t.style(i, n, s, a)
                }, i, o ? s : void 0, o, null)
            }
        })
    }), t.fn.extend({
        bind: function(e, t, i) {
            return this.on(e, null, t, i)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, i, n) {
            return this.on(t, e, i, n)
        },
        undelegate: function(e, t, i) {
            return 1 === arguments.length ? this.off(e, '**') : this.off(t, e || '**', i)
        },
        size: function() {
            return this.length
        }
    }), t.fn.andSelf = t.fn.addBack, 'function' == typeof define && define.amd && define('jquery', [], function() {
        return t
    });
    var Ge = e.jQuery,
        Ze = e.$;
    return t.noConflict = function(i) {
        return e.$ === t && (e.$ = Ze), i && e.jQuery === t && (e.jQuery = Ge), t
    }, i || (e.jQuery = e.$ = t), t
});
(function(e, t, i) {
    e.migrateVersion = '1.3.0';
    var c = {};
    e.migrateWarnings = [];
    if (!e.migrateMute && t.console && t.console.log) {
        t.console.log('JQMIGRATE: Logging is active')
    };
    if (e.migrateTrace === i) {
        e.migrateTrace = !0
    };
    e.migrateReset = function() {
        c = {};
        e.migrateWarnings.length = 0
    };

    function n(i) {
        var n = t.console;
        if (!c[i]) {
            c[i] = !0;
            e.migrateWarnings.push(i);
            if (n && n.warn && !e.migrateMute) {
                n.warn('JQMIGRATE: ' + i);
                if (e.migrateTrace && n.trace) {
                    n.trace()
                }
            }
        }
    };

    function r(t, i, s, r) {
        if (Object.defineProperty) {
            try {
                Object.defineProperty(t, i, {
                    configurable: !0,
                    enumerable: !0,
                    get: function() {
                        n(r);
                        return s
                    },
                    set: function(e) {
                        n(r);
                        s = e
                    }
                });
                return
            } catch (o) {}
        };
        e._definePropertyBroken = !0;
        t[i] = s
    };
    if (document.compatMode === 'BackCompat') {
        n('jQuery is not compatible with Quirks Mode')
    };
    var l = e('<input/>', {
            size: 1
        }).attr('size') && e.attrFn,
        v = e.attr,
        M = e.attrHooks.value && e.attrHooks.value.get || function() {
            return null
        },
        E = e.attrHooks.value && e.attrHooks.value.set || function() {
            return i
        },
        O = /^(?:input|button)$/i,
        z = /^[238]$/,
        L = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        F = /^(?:checked|selected)$/i;
    r(e, 'attrFn', l || {}, 'jQuery.attrFn is deprecated');
    e.attr = function(t, s, r, o) {
        var a = s.toLowerCase(),
            c = t && t.nodeType;
        if (o) {
            if (v.length < 4) {
                n('jQuery.fn.attr( props, pass ) is deprecated')
            };
            if (t && !z.test(c) && (l ? s in l : e.isFunction(e.fn[s]))) {
                return e(t)[s](r)
            }
        };
        if (s === 'type' && r !== i && O.test(t.nodeName) && t.parentNode) {
            n('Can\'t change the \'type\' of an input or button in IE 6/7/8')
        };
        if (!e.attrHooks[a] && L.test(a)) {
            e.attrHooks[a] = {
                get: function(t, n) {
                    var s, r = e.prop(t, n);
                    return r === !0 || typeof r !== 'boolean' && (s = t.getAttributeNode(n)) && s.nodeValue !== !1 ? n.toLowerCase() : i
                },
                set: function(t, i, n) {
                    var s;
                    if (i === !1) {
                        e.removeAttr(t, n)
                    } else {
                        s = e.propFix[n] || n;
                        if (s in t) {
                            t[s] = !0
                        };
                        t.setAttribute(n, n.toLowerCase())
                    };
                    return n
                }
            };
            if (F.test(a)) {
                n('jQuery.fn.attr(\'' + a + '\') might use property instead of attribute')
            }
        };
        return v.call(e, t, s, r)
    };
    e.attrHooks.value = {
        get: function(e, t) {
            var i = (e.nodeName || '').toLowerCase();
            if (i === 'button') {
                return M.apply(this, arguments)
            };
            if (i !== 'input' && i !== 'option') {
                n('jQuery.fn.attr(\'value\') no longer gets properties')
            };
            return t in e ? e.value : null
        },
        set: function(e, t) {
            var i = (e.nodeName || '').toLowerCase();
            if (i === 'button') {
                return E.apply(this, arguments)
            };
            if (i !== 'input' && i !== 'option') {
                n('jQuery.fn.attr(\'value\', val) no longer sets properties')
            };
            e.value = t
        }
    };
    var o, s, g = e.fn.init,
        j = e.parseJSON,
        A = /^\s*</,
        N = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
    e.fn.init = function(t, s, r) {
        var a, o;
        if (t && typeof t === 'string' && !e.isPlainObject(s) && (a = N.exec(e.trim(t))) && a[0]) {
            if (!A.test(t)) {
                n('$(html) HTML strings must start with \'<\' character')
            };
            if (a[3]) {
                n('$(html) HTML text after last tag is ignored')
            };
            if (a[0].charAt(0) === '#') {
                n('HTML string cannot start with a \'#\' character');
                e.error('JQMIGRATE: Invalid selector string (XSS)')
            };
            if (s && s.context) {
                s = s.context
            };
            if (e.parseHTML) {
                return g.call(this, e.parseHTML(a[2], s && s.ownerDocument || s || document, !0), s, r)
            }
        };
        if (t === '#') {
            n('jQuery( \'#\' ) is not a valid selector');
            t = []
        };
        o = g.apply(this, arguments);
        if (t && t.selector !== i) {
            o.selector = t.selector;
            o.context = t.context
        } else {
            o.selector = typeof t === 'string' ? t : '';
            if (t) {
                o.context = t.nodeType ? t : s || document
            }
        };
        return o
    };
    e.fn.init.prototype = e.fn;
    e.parseJSON = function(e) {
        if (!e) {
            n('jQuery.parseJSON requires a valid JSON string');
            return null
        };
        return j.apply(this, arguments)
    };
    e.uaMatch = function(e) {
        e = e.toLowerCase();
        var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
        return {
            browser: t[1] || '',
            version: t[2] || '0'
        }
    };
    if (!e.browser) {
        o = e.uaMatch(navigator.userAgent);
        s = {};
        if (o.browser) {
            s[o.browser] = !0;
            s.version = o.version
        };
        if (s.chrome) {
            s.webkit = !0
        } else if (s.webkit) {
            s.safari = !0
        };
        e.browser = s
    };
    r(e, 'browser', e.browser, 'jQuery.browser is deprecated');
    e.boxModel = e.support.boxModel = (document.compatMode === 'CSS1Compat');
    r(e, 'boxModel', e.boxModel, 'jQuery.boxModel is deprecated');
    r(e.support, 'boxModel', e.support.boxModel, 'jQuery.support.boxModel is deprecated');
    e.sub = function() {
        function t(e, i) {
            return new t.fn.init(e, i)
        };
        e.extend(!0, t, this);
        t.superclass = this;
        t.fn = t.prototype = this();
        t.fn.constructor = t;
        t.sub = this.sub;
        t.fn.init = function(n, s) {
            var r = e.fn.init.call(this, n, s, i);
            return r instanceof t ? r : t(r)
        };
        t.fn.init.prototype = t.fn;
        var i = t(document);
        n('jQuery.sub() is deprecated');
        return t
    };
    e.fn.size = function() {
        n('jQuery.fn.size() is deprecated; use the .length property');
        return this.length
    };
    var a = !1;
    if (e.swap) {
        e.each(['height', 'width', 'reliableMarginRight'], function(t, i) {
            var n = e.cssHooks[i] && e.cssHooks[i].get;
            if (n) {
                e.cssHooks[i].get = function() {
                    var e;
                    a = !0;
                    e = n.apply(this, arguments);
                    a = !1;
                    return e
                }
            }
        })
    };
    e.swap = function(e, t, i, s) {
        var o, r, l = {};
        if (!a) {
            n('jQuery.swap() is undocumented and deprecated')
        };
        for (r in t) {
            l[r] = e.style[r];
            e.style[r] = t[r]
        };
        o = i.apply(e, s || []);
        for (r in t) {
            e.style[r] = l[r]
        };
        return o
    };
    e.ajaxSetup({
        converters: {
            'text json': e.parseJSON
        }
    });
    var P = e.fn.data;
    e.fn.data = function(t) {
        var r, s, o = this[0];
        if (o && t === 'events' && arguments.length === 1) {
            r = e.data(o, t);
            s = e._data(o, t);
            if ((r === i || r === s) && s !== i) {
                n('Use of jQuery.fn.data(\'events\') is deprecated');
                return s
            }
        };
        return P.apply(this, arguments)
    };
    var I = /\/(java|ecma)script/i;
    if (!e.clean) {
        e.clean = function(t, i, s, r) {
            i = i || document;
            i = !i.nodeType && i[0] || i;
            i = i.ownerDocument || i;
            n('jQuery.clean() is deprecated');
            var a, o, c, u, l = [];
            e.merge(l, e.buildFragment(t, i).childNodes);
            if (s) {
                c = function(e) {
                    if (!e.type || I.test(e.type)) {
                        return r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : s.appendChild(e)
                    }
                };
                for (a = 0;
                    (o = l[a]) != null; a++) {
                    if (!(e.nodeName(o, 'script') && c(o))) {
                        s.appendChild(o);
                        if (typeof o.getElementsByTagName !== 'undefined') {
                            u = e.grep(e.merge([], o.getElementsByTagName('script')), c);
                            l.splice.apply(l, [a + 1, 0].concat(u));
                            a += u.length
                        }
                    }
                }
            };
            return l
        }
    };
    var k = e.event.add,
        C = e.event.remove,
        T = e.event.trigger,
        D = e.fn.toggle,
        u = e.fn.live,
        h = e.fn.die,
        S = e.fn.load,
        d = 'ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess',
        f = new RegExp('\\b(?:' + d + ')\\b'),
        p = /(?:^|\s)hover(\.\S+|)\b/,
        m = function(t) {
            if (typeof(t) !== 'string' || e.event.special.hover) {
                return t
            };
            if (p.test(t)) {
                n('\'hover\' pseudo-event is deprecated, use \'mouseenter mouseleave\'')
            };
            return t && t.replace(p, 'mouseenter$1 mouseleave$1')
        };
    if (e.event.props && e.event.props[0] !== 'attrChange') {
        e.event.props.unshift('attrChange', 'attrName', 'relatedNode', 'srcElement')
    };
    if (e.event.dispatch) {
        r(e.event, 'handle', e.event.dispatch, 'jQuery.event.handle is undocumented and deprecated')
    };
    e.event.add = function(e, t, i, s, r) {
        if (e !== document && f.test(t)) {
            n('AJAX events should be attached to document: ' + t)
        };
        k.call(this, e, m(t || ''), i, s, r)
    };
    e.event.remove = function(e, t, i, n, s) {
        C.call(this, e, m(t) || '', i, n, s)
    };
    e.each(['load', 'unload', 'error'], function(t, i) {
        e.fn[i] = function() {
            var e = Array.prototype.slice.call(arguments, 0);
            n('jQuery.fn.' + i + '() is deprecated');
            if (i === 'load' && typeof arguments[0] === 'string') {
                return S.apply(this, arguments)
            };
            e.splice(0, 0, i);
            if (arguments.length) {
                return this.bind.apply(this, e)
            };
            this.triggerHandler.apply(this, e);
            return this
        }
    });
    e.fn.toggle = function(t, i) {
        if (!e.isFunction(t) || !e.isFunction(i)) {
            return D.apply(this, arguments)
        };
        n('jQuery.fn.toggle(handler, handler...) is deprecated');
        var s = arguments,
            o = t.guid || e.guid++,
            r = 0,
            a = function(i) {
                var n = (e._data(this, 'lastToggle' + t.guid) || 0) % r;
                e._data(this, 'lastToggle' + t.guid, n + 1);
                i.preventDefault();
                return s[n].apply(this, arguments) || !1
            };
        a.guid = o;
        while (r < s.length) {
            s[r++].guid = o
        };
        return this.click(a)
    };
    e.fn.live = function(t, i, s) {
        n('jQuery.fn.live() is deprecated');
        if (u) {
            return u.apply(this, arguments)
        };
        e(this.context).on(t, this.selector, i, s);
        return this
    };
    e.fn.die = function(t, i) {
        n('jQuery.fn.die() is deprecated');
        if (h) {
            return h.apply(this, arguments)
        };
        e(this.context).off(t, this.selector || '**', i);
        return this
    };
    e.event.trigger = function(e, t, i, s) {
        if (!i && !f.test(e)) {
            n('Global events are undocumented and deprecated')
        };
        return T.call(this, e, t, i || document, s)
    };
    e.each(d.split('|'), function(t, i) {
        e.event.special[i] = {
            setup: function() {
                var t = this;
                if (t !== document) {
                    e.event.add(document, i + '.' + e.guid, function() {
                        e.event.trigger(i, Array.prototype.slice.call(arguments, 1), t, !0)
                    });
                    e._data(this, i, e.guid++)
                };
                return !1
            },
            teardown: function() {
                if (this !== document) {
                    e.event.remove(document, i + '.' + e._data(this, i))
                };
                return !1
            }
        }
    });
    e.event.special.ready = {
        setup: function() {
            n('\'ready\' event is deprecated')
        }
    };
    var w = e.fn.andSelf || e.fn.addBack,
        x = e.fn.find;
    e.fn.andSelf = function() {
        n('jQuery.fn.andSelf() replaced by jQuery.fn.addBack()');
        return w.apply(this, arguments)
    };
    e.fn.find = function(e) {
        var t = x.apply(this, arguments);
        t.context = this.context;
        t.selector = this.selector ? this.selector + ' ' + e : e;
        return t
    };
    if (e.Callbacks) {
        var y = e.Deferred,
            b = [
                ['resolve', 'done', e.Callbacks('once memory'), e.Callbacks('once memory'), 'resolved'],
                ['reject', 'fail', e.Callbacks('once memory'), e.Callbacks('once memory'), 'rejected'],
                ['notify', 'progress', e.Callbacks('memory'), e.Callbacks('memory')]
            ];
        e.Deferred = function(t) {
            var i = y(),
                s = i.promise();
            i.pipe = s.pipe = function() {
                var t = arguments;
                n('deferred.pipe() is deprecated');
                return e.Deferred(function(n) {
                    e.each(b, function(r, o) {
                        var a = e.isFunction(t[r]) && t[r];
                        i[o[1]](function() {
                            var t = a && a.apply(this, arguments);
                            if (t && e.isFunction(t.promise)) {
                                t.promise().done(n.resolve).fail(n.reject).progress(n.notify)
                            } else {
                                n[o[0] + 'With'](this === s ? n.promise() : this, a ? [t] : arguments)
                            }
                        })
                    });
                    t = null
                }).promise()
            };
            i.isResolved = function() {
                n('deferred.isResolved is deprecated');
                return i.state() === 'resolved'
            };
            i.isRejected = function() {
                n('deferred.isRejected is deprecated');
                return i.state() === 'rejected'
            };
            if (t) {
                t.call(i, i)
            };
            return i
        }
    }
})(jQuery, window);
(function(e) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], e)
    } else {
        e((typeof(jQuery) != 'undefined') ? jQuery : window.Zepto)
    }
}(function(e) {
    'use strict';
    var i = {};
    i.fileapi = e('<input type=\'file\'/>').get(0).files !== undefined;
    i.formdata = window.FormData !== undefined;
    var r = !!e.fn.prop;
    e.fn.attr2 = function() {
        if (!r) {
            return this.attr.apply(this, arguments)
        };
        var e = this.prop.apply(this, arguments);
        if ((e && e.jquery) || typeof e === 'string') {
            return e
        };
        return this.attr.apply(this, arguments)
    };
    e.fn.ajaxSubmit = function(n) {
        if (!this.length) {
            t('ajaxSubmit: skipping submit process - no element selected');
            return this
        };
        var o, y, a, s = this;
        if (typeof n == 'function') {
            n = {
                success: n
            }
        } else if (n === undefined) {
            n = {}
        };
        o = n.type || this.attr2('method');
        y = n.url || this.attr2('action');
        a = (typeof y === 'string') ? e.trim(y) : '';
        a = a || window.location.href || '';
        if (a) {
            a = (a.match(/^([^#]+)/) || [])[1]
        };
        n = e.extend(!0, {
            url: a,
            success: e.ajaxSettings.success,
            type: o || e.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
        }, n);
        var m = {};
        this.trigger('form-pre-serialize', [this, n, m]);
        if (m.veto) {
            t('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
            return this
        };
        if (n.beforeSerialize && n.beforeSerialize(this, n) === !1) {
            t('ajaxSubmit: submit aborted via beforeSerialize callback');
            return this
        };
        var p = n.traditional;
        if (p === undefined) {
            p = e.ajaxSettings.traditional
        };
        var d = [],
            f, c = this.formToArray(n.semantic, d);
        if (n.data) {
            n.extraData = n.data;
            f = e.param(n.data, p)
        };
        if (n.beforeSubmit && n.beforeSubmit(c, this, n) === !1) {
            t('ajaxSubmit: submit aborted via beforeSubmit callback');
            return this
        };
        this.trigger('form-submit-validate', [c, this, n, m]);
        if (m.veto) {
            t('ajaxSubmit: submit vetoed via form-submit-validate trigger');
            return this
        };
        var h = e.param(c, p);
        if (f) {
            h = (h ? (h + '&' + f) : f)
        };
        if (n.type.toUpperCase() == 'GET') {
            n.url += (n.url.indexOf('?') >= 0 ? '&' : '?') + h;
            n.data = null
        } else {
            n.data = h
        };
        var l = [];
        if (n.resetForm) {
            l.push(function() {
                s.resetForm()
            })
        };
        if (n.clearForm) {
            l.push(function() {
                s.clearForm(n.includeHidden)
            })
        };
        if (!n.dataType && n.target) {
            var I = n.success || function() {};
            l.push(function(t) {
                var i = n.replaceTarget ? 'replaceWith' : 'html';
                e(n.target)[i](t).each(I, arguments)
            })
        } else if (n.success) {
            l.push(n.success)
        };
        n.success = function(e, t, i) {
            var a = n.context || this;
            for (var r = 0, o = l.length; r < o; r++) {
                l[r].apply(a, [e, t, i || s, s])
            }
        };
        if (n.error) {
            var S = n.error;
            n.error = function(e, t, i) {
                var r = n.context || this;
                S.apply(r, [e, t, i, s])
            }
        };
        if (n.complete) {
            var D = n.complete;
            n.complete = function(e, t) {
                var i = n.context || this;
                D.apply(i, [e, t, s])
            }
        };
        var T = e('input[type=file]:enabled', this).filter(function() {
                return e(this).val() !== ''
            }),
            b = T.length > 0,
            w = 'multipart/form-data',
            x = (s.attr('enctype') == w || s.attr('encoding') == w),
            v = i.fileapi && i.formdata;
        t('fileAPI :' + v);
        var C = (b || x) && !v,
            u;
        if (n.iframe !== !1 && (n.iframe || C)) {
            if (n.closeKeepAlive) {
                e.get(n.closeKeepAlive, function() {
                    u = k(c)
                })
            } else {
                u = k(c)
            }
        } else if ((b || x) && v) {
            u = j(c)
        } else {
            u = e.ajax(n)
        };
        s.removeData('jqxhr').data('jqxhr', u);
        for (var g = 0; g < d.length; g++) {
            d[g] = null
        };
        this.trigger('form-submit-notify', [this, n]);
        return this;

        function P(t) {
            var s = e.param(t, n.traditional).split('&'),
                a = s.length,
                o = [],
                i, r;
            for (i = 0; i < a; i++) {
                s[i] = s[i].replace(/\+/g, ' ');
                r = s[i].split('=');
                o.push([decodeURIComponent(r[0]), decodeURIComponent(r[1])])
            };
            return o
        };

        function j(t) {
            var a = new FormData();
            for (var i = 0; i < t.length; i++) {
                a.append(t[i].name, t[i].value)
            };
            if (n.extraData) {
                var r = P(n.extraData);
                for (i = 0; i < r.length; i++) {
                    if (r[i]) {
                        a.append(r[i][0], r[i][1])
                    }
                }
            };
            n.data = null;
            var s = e.extend(!0, {}, e.ajaxSettings, n, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: o || 'POST'
            });
            if (n.uploadProgress) {
                s.xhr = function() {
                    var t = e.ajaxSettings.xhr();
                    if (t.upload) {
                        t.upload.addEventListener('progress', function(e) {
                            var t = 0,
                                i = e.loaded || e.position,
                                s = e.total;
                            if (e.lengthComputable) {
                                t = Math.ceil(i / s * 100)
                            };
                            n.uploadProgress(e, i, s, t)
                        }, !1)
                    };
                    return t
                }
            };
            s.data = null;
            var l = s.beforeSend;
            s.beforeSend = function(e, t) {
                if (n.formData) {
                    t.data = n.formData
                } else {
                    t.data = a
                };
                if (l) {
                    l.call(this, e, t)
                }
            };
            return e.ajax(s)
        };

        function k(i) {
            var u = s[0],
                C, x, a, m, b, f, h, l, y, g, T, w, p = e.Deferred();
            p.abort = function(e) {
                l.abort(e)
            };
            if (i) {
                for (x = 0; x < d.length; x++) {
                    C = e(d[x]);
                    if (r) {
                        C.prop('disabled', !1)
                    } else {
                        C.removeAttr('disabled')
                    }
                }
            };
            a = e.extend(!0, {}, e.ajaxSettings, n);
            a.context = a.context || a;
            b = 'jqFormIO' + (new Date().getTime());
            if (a.iframeTarget) {
                f = e(a.iframeTarget);
                g = f.attr2('name');
                if (!g) {
                    f.attr2('name', b)
                } else {
                    b = g
                }
            } else {
                f = e('<iframe name="' + b + '" src="' + a.iframeSrc + '" />');
                f.css({
                    position: 'absolute',
                    top: '-1000px',
                    left: '-1000px'
                })
            };
            h = f[0];
            l = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: 'n/a',
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(i) {
                    var s = (i === 'timeout' ? 'timeout' : 'aborted');
                    t('aborting upload... ' + s);
                    this.aborted = 1;
                    try {
                        if (h.contentWindow.document.execCommand) {
                            h.contentWindow.document.execCommand('Stop')
                        }
                    } catch (n) {};
                    f.attr('src', a.iframeSrc);
                    l.error = s;
                    if (a.error) {
                        a.error.call(a.context, l, s, i)
                    };
                    if (m) {
                        e.event.trigger('ajaxError', [l, a, s])
                    };
                    if (a.complete) {
                        a.complete.call(a.context, l, s)
                    }
                }
            };
            m = a.global;
            if (m && 0 === e.active++) {
                e.event.trigger('ajaxStart')
            };
            if (m) {
                e.event.trigger('ajaxSend', [l, a])
            };
            if (a.beforeSend && a.beforeSend.call(a.context, l, a) === !1) {
                if (a.global) {
                    e.active--
                };
                p.reject();
                return p
            };
            if (l.aborted) {
                p.reject();
                return p
            };
            y = u.clk;
            if (y) {
                g = y.name;
                if (g && !y.disabled) {
                    a.extraData = a.extraData || {};
                    a.extraData[g] = y.value;
                    if (y.type == 'image') {
                        a.extraData[g + '.x'] = u.clk_x;
                        a.extraData[g + '.y'] = u.clk_y
                    }
                }
            };
            var j = 1,
                k = 2;

            function A(e) {
                var n = null;
                try {
                    if (e.contentWindow) {
                        n = e.contentWindow.document
                    }
                } catch (i) {
                    t('cannot get iframe.contentWindow document: ' + i)
                };
                if (n) {
                    return n
                };
                try {
                    n = e.contentDocument ? e.contentDocument : e.document
                } catch (i) {
                    t('cannot get iframe.contentDocument: ' + i);
                    n = e.document
                };
                return n
            };
            var I = e('meta[name=csrf-token]').attr('content'),
                P = e('meta[name=csrf-param]').attr('content');
            if (P && I) {
                a.extraData = a.extraData || {};
                a.extraData[P] = I
            };

            function N() {
                var l = s.attr2('target'),
                    c = s.attr2('action'),
                    m = 'multipart/form-data',
                    g = s.attr('enctype') || s.attr('encoding') || m;
                u.setAttribute('target', b);
                if (!o || /post/i.test(o)) {
                    u.setAttribute('method', 'POST')
                };
                if (c != a.url) {
                    u.setAttribute('action', a.url)
                };
                if (!a.skipEncodingOverride && (!o || /post/i.test(o))) {
                    s.attr({
                        encoding: 'multipart/form-data',
                        enctype: 'multipart/form-data'
                    })
                };
                if (a.timeout) {
                    w = setTimeout(function() {
                        T = !0;
                        v(j)
                    }, a.timeout)
                };

                function d() {
                    try {
                        var i = A(h).readyState;
                        t('state = ' + i);
                        if (i && i.toLowerCase() == 'uninitialized') {
                            setTimeout(d, 50)
                        }
                    } catch (e) {
                        t('Server abort: ', e, ' (', e.name, ')');
                        v(k);
                        if (w) {
                            clearTimeout(w)
                        };
                        w = undefined
                    }
                };
                var r = [];
                try {
                    if (a.extraData) {
                        for (var n in a.extraData) {
                            if (a.extraData.hasOwnProperty(n)) {
                                if (e.isPlainObject(a.extraData[n]) && a.extraData[n].hasOwnProperty('name') && a.extraData[n].hasOwnProperty('value')) {
                                    r.push(e('<input type="hidden" name="' + a.extraData[n].name + '">').val(a.extraData[n].value).appendTo(u)[0])
                                } else {
                                    r.push(e('<input type="hidden" name="' + n + '">').val(a.extraData[n]).appendTo(u)[0])
                                }
                            }
                        }
                    };
                    if (!a.iframeTarget) {
                        f.appendTo('body')
                    };
                    if (h.attachEvent) {
                        h.attachEvent('onload', v)
                    } else {
                        h.addEventListener('load', v, !1)
                    };
                    setTimeout(d, 15);
                    try {
                        u.submit()
                    } catch (i) {
                        var p = document.createElement('form').submit;
                        p.apply(u)
                    }
                } finally {
                    u.setAttribute('action', c);
                    u.setAttribute('enctype', g);
                    if (l) {
                        u.setAttribute('target', l)
                    } else {
                        s.removeAttr('target')
                    };
                    e(r).remove()
                }
            };
            if (a.forceSync) {
                N()
            } else {
                setTimeout(N, 10)
            };
            var D, c, z = 50,
                S;

            function v(i) {
                if (l.aborted || S) {
                    return
                };
                c = A(h);
                if (!c) {
                    t('cannot access response document');
                    i = k
                };
                if (i === j && l) {
                    l.abort('timeout');
                    p.reject(l, 'timeout');
                    return
                } else if (i == k && l) {
                    l.abort('server abort');
                    p.reject(l, 'error', 'server abort');
                    return
                };
                if (!c || c.location.href == a.iframeSrc) {
                    if (!T) {
                        return
                    }
                };
                if (h.detachEvent) {
                    h.detachEvent('onload', v)
                } else {
                    h.removeEventListener('load', v, !1)
                };
                var s = 'success',
                    r;
                try {
                    if (T) {
                        throw 'timeout'
                    };
                    var b = a.dataType == 'xml' || c.XMLDocument || e.isXMLDoc(c);
                    t('isXml=' + b);
                    if (!b && window.opera && (c.body === null || !c.body.innerHTML)) {
                        if (--z) {
                            t('requeing onLoad callback, DOM not available');
                            setTimeout(v, 250);
                            return
                        }
                    };
                    var o = c.body ? c.body : c.documentElement;
                    l.responseText = o ? o.innerHTML : null;
                    l.responseXML = c.XMLDocument ? c.XMLDocument : c;
                    if (b) {
                        a.dataType = 'xml'
                    };
                    l.getResponseHeader = function(e) {
                        var t = {
                            'content-type': a.dataType
                        };
                        return t[e.toLowerCase()]
                    };
                    if (o) {
                        l.status = Number(o.getAttribute('status')) || l.status;
                        l.statusText = o.getAttribute('statusText') || l.statusText
                    };
                    var y = (a.dataType || '').toLowerCase(),
                        x = /(json|script|text)/.test(y);
                    if (x || a.textarea) {
                        var g = c.getElementsByTagName('textarea')[0];
                        if (g) {
                            l.responseText = g.value;
                            l.status = Number(g.getAttribute('status')) || l.status;
                            l.statusText = g.getAttribute('statusText') || l.statusText
                        } else if (x) {
                            var u = c.getElementsByTagName('pre')[0],
                                d = c.getElementsByTagName('body')[0];
                            if (u) {
                                l.responseText = u.textContent ? u.textContent : u.innerText
                            } else if (d) {
                                l.responseText = d.textContent ? d.textContent : d.innerText
                            }
                        }
                    } else if (y == 'xml' && !l.responseXML && l.responseText) {
                        l.responseXML = M(l.responseText)
                    };
                    try {
                        D = O(l, y, a)
                    } catch (n) {
                        s = 'parsererror';
                        l.error = r = (n || s)
                    }
                } catch (n) {
                    t('error caught: ', n);
                    s = 'error';
                    l.error = r = (n || s)
                };
                if (l.aborted) {
                    t('upload aborted');
                    s = null
                };
                if (l.status) {
                    s = (l.status >= 200 && l.status < 300 || l.status === 304) ? 'success' : 'error'
                };
                if (s === 'success') {
                    if (a.success) {
                        a.success.call(a.context, D, 'success', l)
                    };
                    p.resolve(l.responseText, 'success', l);
                    if (m) {
                        e.event.trigger('ajaxSuccess', [l, a])
                    }
                } else if (s) {
                    if (r === undefined) {
                        r = l.statusText
                    };
                    if (a.error) {
                        a.error.call(a.context, l, s, r)
                    };
                    p.reject(l, 'error', r);
                    if (m) {
                        e.event.trigger('ajaxError', [l, a, r])
                    }
                };
                if (m) {
                    e.event.trigger('ajaxComplete', [l, a])
                };
                if (m && !--e.active) {
                    e.event.trigger('ajaxStop')
                };
                if (a.complete) {
                    a.complete.call(a.context, l, s)
                };
                S = !0;
                if (a.timeout) {
                    clearTimeout(w)
                };
                setTimeout(function() {
                    if (!a.iframeTarget) {
                        f.remove()
                    } else {
                        f.attr('src', a.iframeSrc)
                    };
                    l.responseXML = null
                }, 100)
            };
            var M = e.parseXML || function(e, t) {
                    if (window.ActiveXObject) {
                        t = new ActiveXObject('Microsoft.XMLDOM');
                        t.async = 'false';
                        t.loadXML(e)
                    } else {
                        t = (new DOMParser()).parseFromString(e, 'text/xml')
                    };
                    return (t && t.documentElement && t.documentElement.nodeName != 'parsererror') ? t : null
                },
                E = e.parseJSON || function(e) {
                    return window['eval']('(' + e + ')')
                },
                O = function(t, i, n) {
                    var r = t.getResponseHeader('content-type') || '',
                        o = i === 'xml' || !i && r.indexOf('xml') >= 0,
                        s = o ? t.responseXML : t.responseText;
                    if (o && s.documentElement.nodeName === 'parsererror') {
                        if (e.error) {
                            e.error('parsererror')
                        }
                    };
                    if (n && n.dataFilter) {
                        s = n.dataFilter(s, i)
                    };
                    if (typeof s === 'string') {
                        if (i === 'json' || !i && r.indexOf('json') >= 0) {
                            s = E(s)
                        } else if (i === 'script' || !i && r.indexOf('javascript') >= 0) {
                            e.globalEval(s)
                        }
                    };
                    return s
                };
            return p
        }
    };
    e.fn.ajaxForm = function(i) {
        i = i || {};
        i.delegation = i.delegation && e.isFunction(e.fn.on);
        if (!i.delegation && this.length === 0) {
            var r = {
                s: this.selector,
                c: this.context
            };
            if (!e.isReady && r.s) {
                t('DOM not ready, queuing ajaxForm');
                e(function() {
                    e(r.s, r.c).ajaxForm(i)
                });
                return this
            };
            t('terminating; zero elements found by selector' + (e.isReady ? '' : ' (DOM not ready)'));
            return this
        };
        if (i.delegation) {
            e(document).off('submit.form-plugin', this.selector, n).off('click.form-plugin', this.selector, s).on('submit.form-plugin', this.selector, i, n).on('click.form-plugin', this.selector, i, s);
            return this
        };
        return this.ajaxFormUnbind().bind('submit.form-plugin', i, n).bind('click.form-plugin', i, s)
    };

    function n(t) {
        var i = t.data;
        if (!t.isDefaultPrevented()) {
            t.preventDefault();
            e(t.target).ajaxSubmit(i)
        }
    };

    function s(t) {
        var n = t.target,
            s = e(n);
        if (!(s.is('[type=submit],[type=image]'))) {
            var o = s.closest('[type=submit]');
            if (o.length === 0) {
                return
            };
            n = o[0]
        };
        var i = this;
        i.clk = n;
        if (n.type == 'image') {
            if (t.offsetX !== undefined) {
                i.clk_x = t.offsetX;
                i.clk_y = t.offsetY
            } else if (typeof e.fn.offset == 'function') {
                var r = s.offset();
                i.clk_x = t.pageX - r.left;
                i.clk_y = t.pageY - r.top
            } else {
                i.clk_x = t.pageX - n.offsetLeft;
                i.clk_y = t.pageY - n.offsetTop
            }
        };
        setTimeout(function() {
            i.clk = i.clk_x = i.clk_y = null
        }, 100)
    };
    e.fn.ajaxFormUnbind = function() {
        return this.unbind('submit.form-plugin click.form-plugin')
    };
    e.fn.formToArray = function(t, n) {
        var o = [];
        if (this.length === 0) {
            return o
        };
        var a = this[0],
            y = this.attr('id'),
            l = t ? a.getElementsByTagName('*') : a.elements,
            p;
        if (l && !/MSIE [678]/.test(navigator.userAgent)) {
            l = e(l).get()
        };
        if (y) {
            p = e(':input[form="' + y + '"]').get();
            if (p.length) {
                l = (l || []).concat(p)
            }
        };
        if (!l || !l.length) {
            return o
        };
        var h, c, r, u, s, g, v;
        for (h = 0, g = l.length; h < g; h++) {
            s = l[h];
            r = s.name;
            if (!r || s.disabled) {
                continue
            };
            if (t && a.clk && s.type == 'image') {
                if (a.clk == s) {
                    o.push({
                        name: r,
                        value: e(s).val(),
                        type: s.type
                    });
                    o.push({
                        name: r + '.x',
                        value: a.clk_x
                    }, {
                        name: r + '.y',
                        value: a.clk_y
                    })
                };
                continue
            };
            u = e.fieldValue(s, !0);
            if (u && u.constructor == Array) {
                if (n) {
                    n.push(s)
                };
                for (c = 0, v = u.length; c < v; c++) {
                    o.push({
                        name: r,
                        value: u[c]
                    })
                }
            } else if (i.fileapi && s.type == 'file') {
                if (n) {
                    n.push(s)
                };
                var f = s.files;
                if (f.length) {
                    for (c = 0; c < f.length; c++) {
                        o.push({
                            name: r,
                            value: f[c],
                            type: s.type
                        })
                    }
                } else {
                    o.push({
                        name: r,
                        value: '',
                        type: s.type
                    })
                }
            } else if (u !== null && typeof u != 'undefined') {
                if (n) {
                    n.push(s)
                };
                o.push({
                    name: r,
                    value: u,
                    type: s.type,
                    required: s.required
                })
            }
        };
        if (!t && a.clk) {
            var m = e(a.clk),
                d = m[0];
            r = d.name;
            if (r && !d.disabled && d.type == 'image') {
                o.push({
                    name: r,
                    value: m.val()
                });
                o.push({
                    name: r + '.x',
                    value: a.clk_x
                }, {
                    name: r + '.y',
                    value: a.clk_y
                })
            }
        };
        return o
    };
    e.fn.formSerialize = function(t) {
        return e.param(this.formToArray(t))
    };
    e.fn.fieldSerialize = function(t) {
        var i = [];
        this.each(function() {
            var r = this.name;
            if (!r) {
                return
            };
            var n = e.fieldValue(this, t);
            if (n && n.constructor == Array) {
                for (var s = 0, o = n.length; s < o; s++) {
                    i.push({
                        name: r,
                        value: n[s]
                    })
                }
            } else if (n !== null && typeof n != 'undefined') {
                i.push({
                    name: this.name,
                    value: n
                })
            }
        });
        return e.param(i)
    };
    e.fn.fieldValue = function(t) {
        for (var n = [], s = 0, o = this.length; s < o; s++) {
            var r = this[s],
                i = e.fieldValue(r, t);
            if (i === null || typeof i == 'undefined' || (i.constructor == Array && !i.length)) {
                continue
            };
            if (i.constructor == Array) {
                e.merge(n, i)
            } else {
                n.push(i)
            }
        };
        return n
    };
    e.fieldValue = function(t, i) {
        var f = t.name,
            s = t.type,
            h = t.tagName.toLowerCase();
        if (i === undefined) {
            i = !0
        };
        if (i && (!f || t.disabled || s == 'reset' || s == 'button' || (s == 'checkbox' || s == 'radio') && !t.checked || (s == 'submit' || s == 'image') && t.form && t.form.clk != t || h == 'select' && t.selectedIndex == -1)) {
            return null
        };
        if (h == 'select') {
            var l = t.selectedIndex;
            if (l < 0) {
                return null
            };
            var c = [],
                u = t.options,
                a = (s == 'select-one'),
                d = (a ? l + 1 : u.length);
            for (var o = (a ? l : 0); o < d; o++) {
                var n = u[o];
                if (n.selected) {
                    var r = n.value;
                    if (!r) {
                        r = (n.attributes && n.attributes.value && !(n.attributes.value.specified)) ? n.text : n.value
                    };
                    if (a) {
                        return r
                    };
                    c.push(r)
                }
            };
            return c
        };
        return e(t).val()
    };
    e.fn.clearForm = function(t) {
        return this.each(function() {
            e('input,select,textarea', this).clearFields(t)
        })
    };
    e.fn.clearFields = e.fn.clearInputs = function(t) {
        var i = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var n = this.type,
                s = this.tagName.toLowerCase();
            if (i.test(n) || s == 'textarea') {
                this.value = ''
            } else if (n == 'checkbox' || n == 'radio') {
                this.checked = !1
            } else if (s == 'select') {
                this.selectedIndex = -1
            } else if (n == 'file') {
                if (/MSIE/.test(navigator.userAgent)) {
                    e(this).replaceWith(e(this).clone(!0))
                } else {
                    e(this).val('')
                }
            } else if (t) {
                if ((t === !0 && /hidden/.test(n)) || (typeof t == 'string' && e(this).is(t))) {
                    this.value = ''
                }
            }
        })
    };
    e.fn.resetForm = function() {
        return this.each(function() {
            if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
                this.reset()
            }
        })
    };
    e.fn.enable = function(e) {
        if (e === undefined) {
            e = !0
        };
        return this.each(function() {
            this.disabled = !e
        })
    };
    e.fn.selected = function(t) {
        if (t === undefined) {
            t = !0
        };
        return this.each(function() {
            var n = this.type;
            if (n == 'checkbox' || n == 'radio') {
                this.checked = t
            } else if (this.tagName.toLowerCase() == 'option') {
                var i = e(this).parent('select');
                if (t && i[0] && i[0].type == 'select-one') {
                    i.find('option').selected(!1)
                };
                this.selected = t
            }
        })
    };
    e.fn.ajaxSubmit.debug = !1;

    function t() {
        if (!e.fn.ajaxSubmit.debug) {
            return
        };
        var t = '[jquery.form] ' + Array.prototype.join.call(arguments, '');
        if (window.console && window.console.log) {
            window.console.log(t)
        } else if (window.opera && window.opera.postError) {
            window.opera.postError(t)
        }
    }
}));
jQuery.cookie = function(e, t, i) {
    if (typeof t != 'undefined') {
        i = i || {};
        if (t === null) {
            t = '';
            i.expires = -1
        };
        var l = '';
        if (i.expires && (typeof i.expires == 'number' || i.expires.toUTCString)) {
            var n;
            if (typeof i.expires == 'number') {
                n = new Date();
                n.setTime(n.getTime() + (i.expires * 24 * 60 * 60 * 1000))
            } else {
                n = i.expires
            };
            l = '; expires=' + n.toUTCString()
        };
        var c = i.path ? '; path=' + (i.path) : '',
            u = i.domain ? '; domain=' + (i.domain) : '',
            h = i.secure ? '; secure' : '';
        document.cookie = [e, '=', encodeURIComponent(t), l, c, u, h].join('')
    } else {
        var a = null;
        if (document.cookie && document.cookie != '') {
            var o = document.cookie.split(';');
            for (var s = 0; s < o.length; s++) {
                var r = jQuery.trim(o[s]);
                if (r.substring(0, e.length + 1) == (e + '=')) {
                    a = decodeURIComponent(r.substring(e.length + 1));
                    break
                }
            }
        };
        return a
    }
};
(function(e, t, i) {
    'use strict';
    e.map(['localStorage', 'sessionStorage'], function(n) {
        var r = {
            cookiePrefix: 'fallback:' + n + ':',
            cookieOptions: {
                path: '/',
                domain: i.domain,
                expires: ('localStorage' === n) ? {
                    expires: 365
                } : undefined
            }
        };
        try {
            e.support[n] = n in t && t[n] !== null
        } catch (s) {
            e.support[n] = !1
        };
        e[n] = function(s, o) {
            var a = e.extend({}, r, e[n].options);
            this.getItem = function(i) {
                var o = function(i) {
                    return JSON.parse(e.support[n] ? t[n].getItem(i) : e.cookie(a.cookiePrefix + i))
                };
                if (typeof i === 'string') return o(i);
                var r = [],
                    s = i.length;
                while (s--) r[s] = o(i[s]);
                return r
            };
            this.setItem = function(i, s) {
                s = JSON.stringify(s);
                return e.support[n] ? t[n].setItem(i, s) : e.cookie(a.cookiePrefix + i, s, a.cookieOptions)
            };
            this.removeItem = function(i) {
                return e.support[n] ? t[n].removeItem(i) : e.cookie(a.cookiePrefix + i, null, e.extend(a.cookieOptions, {
                    expires: -1
                }))
            };
            this.clear = function() {
                if (e.support[n]) {
                    return t[n].clear()
                } else {
                    var s = new RegExp('^' + a.cookiePrefix, ''),
                        r = e.extend(a.cookieOptions, {
                            expires: -1
                        });
                    if (i.cookie && i.cookie !== '') {
                        e.map(i.cookie.split(';'), function(t) {
                            if (s.test(t = e.trim(t))) {
                                e.cookie(t.substr(0, t.indexOf('=')), null, r)
                            }
                        })
                    }
                }
            };
            if (typeof s !== 'undefined') {
                return typeof o !== 'undefined' ? (o === null ? this.removeItem(s) : this.setItem(s, o)) : this.getItem(s)
            };
            return this
        };
        e[n].options = r
    })
}(jQuery, window, document));
$.fn.customFileInput = function() {
    return $(this).each(function() {
        var e = $(this).addClass('customfile-input').mouseover(function() {
                t.addClass('customfile-hover')
            }).mouseout(function() {
                t.removeClass('customfile-hover')
            }).focus(function() {
                t.addClass('customfile-focus');
                e.data('val', e.val())
            }).blur(function() {
                t.removeClass('customfile-focus');
                $(this).trigger('checkChange')
            }).bind('disable', function() {
                e.prop('disabled', !0);
                t.addClass('customfile-disabled')
            }).bind('enable', function() {
                e.prop('disabled', !1);
                t.removeClass('customfile-disabled')
            }).bind('checkChange', function() {
                if (e.val() && e.val() != e.data('val')) {
                    e.trigger('change')
                }
            }).bind('change', function() {
                var e = $(this).val().split(/\\/).pop(),
                    t = 'customfile-ext-' + e.split('.').pop().toLowerCase();
                i.text(e).removeClass(i.data('fileExt') || '').addClass(t).data('fileExt', t).addClass('customfile-feedback-populated');
                n.html('<span>Change</span>')
            }).click(function() {
                e.data('val', e.val());
                setTimeout(function() {
                    e.trigger('checkChange')
                }, 100)
            }),
            t = $('<div class="customfile"></div>'),
            i = $('<span class="customfile-feedback" aria-hidden="true">No file selected...</span>').appendTo(t),
            n = $('<span class="customfile-button siteButton bigButton" aria-hidden="true"><span>Browse</span></span>').appendTo(t);
        if (e.is('[disabled]')) {
            e.trigger('disable')
        };
        t.mousemove(function(i) {
            e.css({
                'left': i.pageX - t.offset().left - e.outerWidth() + 20,
                'top': i.pageY - t.offset().top - 10
            })
        }).insertAfter(e);
        e.appendTo(t)
    })
};
(function(e) {
    e.fn.showPassword = function(t, i) {
        var n = e(this);
        e.fn.showPassword.checker = function(t, i) {
            e('input[id="' + t + '"]').click(function() {
                if (e(this).attr('checked')) {
                    e('input.' + i).val(n.val()).attr('id', n.attr('id')).attr('name', n.attr('name'));
                    e('input.' + i).css('display', 'inline');
                    n.css('display', 'none').removeAttr('id').removeAttr('name')
                } else {
                    n.val(e('input.' + i).val()).attr('id', e('input.' + i).attr('id')).attr('name', e('input.' + i).attr('name'));
                    n.css('display', 'inline');
                    e('input.' + i).css('display', 'none').removeAttr('id').removeAttr('name')
                }
            })
        };
        return this.each(function() {
            var s = {
                classname: 'nobr block font11px lightgrey',
                name: 'password-input',
                text: ' Show password'
            };
            var r = 'spcb_' + parseInt(Math.random() * 1000),
                o = r.replace('spcb_', 'spin_');
            if (n.attr('class') !== '') {
                var l = o + ' ' + n.attr('class')
            } else {
                var l = o
            };
            if (typeof t == 'object') {
                e.extend(s, t)
            };
            if (typeof i == 'object') {
                e.extend(s, i)
            };
            var c = s.name;
            if (s.classname == '') {
                theclass = ''
            } else {
                theclass = ' class="' + s.classname + '"'
            };
            e(this).before('<input type="text" value="" class="' + l + '" style="display: none;" />');
            var a = '<label' + theclass + '><input type="checkbox" id="' + r + '" name="' + c + '" value="sp" />' + s.text + '</label>';
            if (t == 'object' || typeof t == 'undefined') {
                e(this).after(a)
            } else {
                e(t).html(a)
            };
            e.fn.showPassword.checker(r, o);
            return this
        })
    }
})(jQuery);
jQuery.notification = (function(e, t) {
    var i = (function() {
            if (t.Notification && t.Notification.permissionLevel) return t.Notification;
            var n = t.webkitNotifications;
            if (!n) return (function() {
                var t = {};
                t.permissionLevel = function() {
                    return 'unsupported'
                };
                t.requestPermission = e.noop;
                return t
            }());
            var s = ['granted', 'default', 'denied'],
                i = function(t, s) {
                    s = s || {};
                    if (!t) {
                        return
                    };
                    var r = n.createNotification(s.iconUrl || '', t, s.body || '');
                    r.titleDir = s.titleDir || 'auto';
                    r.body = s.body || '';
                    r.bodyDir = s.bodyDir || 'auto';
                    r.tag = s.tag || '';
                    r.replaceId = s.tag || '';
                    r.iconUrl = s.iconUrl || '';
                    r.onclick = s.onclick || e.noop;
                    r.onshow = s.onshow || e.noop;
                    r.onerror = s.onerror || e.noop;
                    r.onclose = s.onclose || e.noop;
                    if (i.permissionLevel() === 'granted') {
                        r.show()
                    };
                    return r
                };
            i.permissionLevel = function() {
                return i.permission = s[n.checkPermission()]
            };
            i.permissionLevel();
            i.requestPermission = function(s) {
                if (i.permissionLevel() !== 'default') {
                    s();
                    return
                };
                e(document).one('click', function() {
                    if (n.requestPermission.length) {
                        n.requestPermission(function() {
                            i.permissionLevel();
                            s()
                        });
                        return
                    };
                    n.requestPermission();
                    var e = t.setInterval(function() {
                        var n = i.permissionLevel();
                        if (n !== 'default') {
                            t.clearInterval(e);
                            s()
                        }
                    }, 200)
                })
            };
            return i
        }()),
        n = function(t) {
            var n = e.Deferred();
            if (!i.prototype) {
                n.reject('unsupported');
                return n.promise()
            };
            if (typeof t === 'string') {
                t = {
                    title: t
                }
            };
            t = t || {};
            t.autoclose = typeof t.autoclose === 'undefined' ? !0 : t.autoclose;
            t.timeout = t.timeout || Infinity;
            i.requestPermission(function() {
                if ((i.permission || i.permissionLevel()) !== 'granted') {
                    n.reject(i.permissionLevel());
                    return
                };
                var e = new i(t.title, t);
                if (isFinite(t.timeout)) {
                    e.addEventListener('show', function() {
                        setTimeout(function() {
                            e.cancel()
                        }, t.timeout)
                    }, !1)
                };
                if (t.autoclose) {
                    e.addEventListener('click', function() {
                        e.cancel()
                    }, !1)
                };
                n.resolve(e)
            });
            return n.promise()
        };
    n.permissionLevel = i.permissionLevel;
    n.requestPermission = i.requestPermission;
    return n
}(jQuery, window));
this.vtip = function() {
    this.xOffset = -10;
    this.yOffset = 10;
    $('.vtip').unbind().hover(function(e) {
        var t = $(this).next('.vtipContentjs').size() ? $(this).next('.vtipContentjs').html() : this.title;
        this.t = this.title;
        this.title = '';
        $('body').append('<div id="vtip"><img id="vtipArrow" />' + t + '</div>');
        $('div#vtip').css({
            top: e.pageY + yOffset,
            left: e.pageX + xOffset
        }).fadeIn('fast')
    }, function() {
        this.title = this.t;
        $('div#vtip').fadeOut('slow').remove()
    })
};
jQuery(document).ready(function(e) {
    vtip()
});
(function(e) {
    'function' == typeof define && define.amd ? define(['jquery'], e) : e(jQuery)
})(function(e) {
    function r(t, i) {
        var n, s, r, a = t.nodeName.toLowerCase();
        return 'area' === a ? (n = t.parentNode, s = n.name, t.href && s && 'map' === n.nodeName.toLowerCase() ? (r = e('img[usemap=\'#' + s + '\']')[0], !!r && o(r)) : !1) : (/^(input|select|textarea|button|object)$/.test(a) ? !t.disabled : 'a' === a ? t.href || i : i) && o(t)
    };

    function o(t) {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
            return 'hidden' === e.css(this, 'visibility')
        }).length
    };

    function h(e) {
        for (var t, i; e.length && e[0] !== document;) {
            if (t = e.css('position'), ('absolute' === t || 'relative' === t || 'fixed' === t) && (i = parseInt(e.css('zIndex'), 10), !isNaN(i) && 0 !== i)) return i;
            e = e.parent()
        };
        return 0
    };

    function a() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = 'ui-datepicker-div', this._inlineClass = 'ui-datepicker-inline', this._appendClass = 'ui-datepicker-append', this._triggerClass = 'ui-datepicker-trigger', this._dialogClass = 'ui-datepicker-dialog', this._disableClass = 'ui-datepicker-disabled', this._unselectableClass = 'ui-datepicker-unselectable', this._currentClass = 'ui-datepicker-current-day', this._dayOverClass = 'ui-datepicker-days-cell-over', this.regional = [], this.regional[''] = {
            closeText: 'Done',
            prevText: 'Prev',
            nextText: 'Next',
            currentText: 'Today',
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            weekHeader: 'Wk',
            dateFormat: 'mm/dd/yy',
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ''
        }, this._defaults = {
            showOn: 'focus',
            showAnim: 'fadeIn',
            showOptions: {},
            defaultDate: null,
            appendText: '',
            buttonText: '...',
            buttonImage: '',
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: 'c-10:c+10',
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: '+10',
            minDate: null,
            maxDate: null,
            duration: 'fast',
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: '',
            altFormat: '',
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, e.extend(this._defaults, this.regional['']), this.regional.en = e.extend(!0, {}, this.regional['']), this.regional['en-US'] = e.extend(!0, {}, this.regional.en), this.dpDiv = l(e('<div id=\'' + this._mainDivId + '\' class=\'ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\'></div>'))
    };

    function l(t) {
        var i = 'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';
        return t.delegate(i, 'mouseout', function() {
            e(this).removeClass('ui-state-hover'), -1 !== this.className.indexOf('ui-datepicker-prev') && e(this).removeClass('ui-datepicker-prev-hover'), -1 !== this.className.indexOf('ui-datepicker-next') && e(this).removeClass('ui-datepicker-next-hover')
        }).delegate(i, 'mouseover', c)
    };

    function c() {
        e.datepicker._isDisabledDatepicker(t.inline ? t.dpDiv.parent()[0] : t.input[0]) || (e(this).parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover'), e(this).addClass('ui-state-hover'), -1 !== this.className.indexOf('ui-datepicker-prev') && e(this).addClass('ui-datepicker-prev-hover'), -1 !== this.className.indexOf('ui-datepicker-next') && e(this).addClass('ui-datepicker-next-hover'))
    };

    function n(t, i) {
        e.extend(t, i);
        for (var n in i) null == i[n] && (t[n] = i[n]);
        return t
    };
    e.ui = e.ui || {}, e.extend(e.ui, {
        version: '1.11.4',
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), e.fn.extend({
        scrollParent: function(t) {
            var i = this.css('position'),
                s = 'absolute' === i,
                r = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                n = this.parents().filter(function() {
                    var t = e(this);
                    return s && 'static' === t.css('position') ? !1 : r.test(t.css('overflow') + t.css('overflow-y') + t.css('overflow-x'))
                }).eq(0);
            return 'fixed' !== i && n.length ? n : e(this[0].ownerDocument || document)
        },
        uniqueId: function() {
            var e = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = 'ui-id-' + ++e)
                })
            }
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && e(this).removeAttr('id')
            })
        }
    }), e.extend(e.expr[':'], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(i) {
                return !!e.data(i, t)
            }
        }) : function(t, i, n) {
            return !!e.data(t, n[3])
        },
        focusable: function(t) {
            return r(t, !isNaN(e.attr(t, 'tabindex')))
        },
        tabbable: function(t) {
            var i = e.attr(t, 'tabindex'),
                n = isNaN(i);
            return (n || i >= 0) && r(t, !n)
        }
    }), e('<a>').outerWidth(1).jquery || e.each(['Width', 'Height'], function(t, i) {
        function r(t, i, n, s) {
            return e.each(o, function() {
                i -= parseFloat(e.css(t, 'padding' + this)) || 0, n && (i -= parseFloat(e.css(t, 'border' + this + 'Width')) || 0), s && (i -= parseFloat(e.css(t, 'margin' + this)) || 0)
            }), i
        };
        var o = 'Width' === i ? ['Left', 'Right'] : ['Top', 'Bottom'],
            n = i.toLowerCase(),
            s = {
                innerWidth: e.fn.innerWidth,
                innerHeight: e.fn.innerHeight,
                outerWidth: e.fn.outerWidth,
                outerHeight: e.fn.outerHeight
            };
        e.fn['inner' + i] = function(t) {
            return void 0 === t ? s['inner' + i].call(this) : this.each(function() {
                e(this).css(n, r(this, t) + 'px')
            })
        }, e.fn['outer' + i] = function(t, o) {
            return 'number' != typeof t ? s['outer' + i].call(this, t) : this.each(function() {
                e(this).css(n, r(this, t, !0, o) + 'px')
            })
        }
    }), e.fn.addBack || (e.fn.addBack = function(e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }), e('<a>').data('a-b', 'a').removeData('a-b').data('a-b') && (e.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
        }
    }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
        focus: function(t) {
            return function(i, n) {
                return 'number' == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        e(t).focus(), n && n.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(e.fn.focus),
        disableSelection: function() {
            var e = 'onselectstart' in document.createElement('div') ? 'selectstart' : 'mousedown';
            return function() {
                return this.bind(e + '.ui-disableSelection', function(e) {
                    e.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.unbind('.ui-disableSelection')
        },
        zIndex: function(t) {
            if (void 0 !== t) return this.css('zIndex', t);
            if (this.length)
                for (var n, s, i = e(this[0]); i.length && i[0] !== document;) {
                    if (n = i.css('position'), ('absolute' === n || 'relative' === n || 'fixed' === n) && (s = parseInt(i.css('zIndex'), 10), !isNaN(s) && 0 !== s)) return s;
                    i = i.parent()
                };
            return 0
        }
    }), e.ui.plugin = {
        add: function(t, i, n) {
            var s, r = e.ui[t].prototype;
            for (s in n) r.plugins[s] = r.plugins[s] || [], r.plugins[s].push([i, n[s]])
        },
        call: function(e, t, i, n) {
            var s, r = e.plugins[t];
            if (r && (n || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))
                for (s = 0; r.length > s; s++) e.options[r[s][0]] && r[s][1].apply(e.element, i)
        }
    };
    var u = 0,
        s = Array.prototype.slice;
    e.cleanData = function(t) {
        return function(i) {
            var s, r, o;
            for (o = 0; null != (r = i[o]); o++) try {
                s = e._data(r, 'events'), s && s.remove && e(r).triggerHandler('remove')
            } catch (n) {};
            t(i)
        }
    }(e.cleanData), e.widget = function(t, i, n) {
        var l, r, s, a, c = {},
            o = t.split('.')[0];
        return t = t.split('.')[1], l = o + '-' + t, n || (n = i, i = e.Widget), e.expr[':'][l.toLowerCase()] = function(t) {
            return !!e.data(t, l)
        }, e[o] = e[o] || {}, r = e[o][t], s = e[o][t] = function(e, t) {
            return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new s(e, t)
        }, e.extend(s, r, {
            version: n.version,
            _proto: e.extend({}, n),
            _childConstructors: []
        }), a = new i, a.options = e.widget.extend({}, a.options), e.each(n, function(t, n) {
            return e.isFunction(n) ? (c[t] = function() {
                var e = function() {
                        return i.prototype[t].apply(this, arguments)
                    },
                    s = function(e) {
                        return i.prototype[t].apply(this, e)
                    };
                return function() {
                    var t, i = this._super,
                        r = this._superApply;
                    return this._super = e, this._superApply = s, t = n.apply(this, arguments), this._super = i, this._superApply = r, t
                }
            }(), void 0) : (c[t] = n, void 0)
        }), s.prototype = e.widget.extend(a, {
            widgetEventPrefix: r ? a.widgetEventPrefix || t : t
        }, c, {
            constructor: s,
            namespace: o,
            widgetName: t,
            widgetFullName: l
        }), r ? (e.each(r._childConstructors, function(t, i) {
            var n = i.prototype;
            e.widget(n.namespace + '.' + n.widgetName, s, i._proto)
        }), delete r._childConstructors) : i._childConstructors.push(s), e.widget.bridge(t, s), s
    }, e.widget.extend = function(t) {
        for (var i, n, o = s.call(arguments, 1), r = 0, a = o.length; a > r; r++)
            for (i in o[r]) n = o[r][i], o[r].hasOwnProperty(i) && void 0 !== n && (t[i] = e.isPlainObject(n) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], n) : e.widget.extend({}, n) : n);
        return t
    }, e.widget.bridge = function(t, i) {
        var n = i.prototype.widgetFullName || t;
        e.fn[t] = function(r) {
            var l = 'string' == typeof r,
                a = s.call(arguments, 1),
                o = this;
            return l ? this.each(function() {
                var i, s = e.data(this, n);
                return 'instance' === r ? (o = s, !1) : s ? e.isFunction(s[r]) && '_' !== r.charAt(0) ? (i = s[r].apply(s, a), i !== s && void 0 !== i ? (o = i && i.jquery ? o.pushStack(i.get()) : i, !1) : void 0) : e.error('no such method \'' + r + '\' for ' + t + ' widget instance') : e.error('cannot call methods on ' + t + ' prior to initialization; attempted to call method \'' + r + '\'')
            }) : (a.length && (r = e.widget.extend.apply(null, [r].concat(a))), this.each(function() {
                var t = e.data(this, n);
                t ? (t.option(r || {}), t._init && t._init()) : e.data(this, n, new i(r, this))
            })), o
        }
    }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: 'widget',
        widgetEventPrefix: '',
        defaultElement: '<div>',
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, i) {
            i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = u++, this.eventNamespace = '.' + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(e) {
                    e.target === i && this.destroy()
                }
            }), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this._trigger('create', null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr('aria-disabled').removeClass(this.widgetFullName + '-disabled ui-state-disabled'), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass('ui-state-hover'), this.focusable.removeClass('ui-state-focus')
        },
        _destroy: e.noop,
        widget: function() {
            return this.element
        },
        option: function(t, i) {
            var n, s, r, o = t;
            if (0 === arguments.length) return e.widget.extend({}, this.options);
            if ('string' == typeof t)
                if (o = {}, n = t.split('.'), t = n.shift(), n.length) {
                    for (s = o[t] = e.widget.extend({}, this.options[t]), r = 0; n.length - 1 > r; r++) s[n[r]] = s[n[r]] || {}, s = s[n[r]];
                    if (t = n.pop(), 1 === arguments.length) return void 0 === s[t] ? null : s[t];
                    s[t] = i
                } else {
                    if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                    o[t] = i
                };
            return this._setOptions(o), this
        },
        _setOptions: function(e) {
            var t;
            for (t in e) this._setOption(t, e[t]);
            return this
        },
        _setOption: function(e, t) {
            return this.options[e] = t, 'disabled' === e && (this.widget().toggleClass(this.widgetFullName + '-disabled', !!t), t && (this.hoverable.removeClass('ui-state-hover'), this.focusable.removeClass('ui-state-focus'))), this
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function(t, i, n) {
            var r, s = this;
            'boolean' != typeof t && (n = i, i = t, t = !1), n ? (i = r = e(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, r = this.widget()), e.each(n, function(n, o) {
                function a() {
                    return t || s.options.disabled !== !0 && !e(this).hasClass('ui-state-disabled') ? ('string' == typeof o ? s[o] : o).apply(s, arguments) : void 0
                };
                'string' != typeof o && (a.guid = o.guid = o.guid || a.guid || e.guid++);
                var l = n.match(/^([\w:-]*)\s*(.*)$/),
                    c = l[1] + s.eventNamespace,
                    u = l[2];
                u ? r.delegate(u, c, a) : i.bind(c, a)
            })
        },
        _off: function(t, i) {
            i = (i || '').split(' ').join(this.eventNamespace + ' ') + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
        },
        _delay: function(e, t) {
            function n() {
                return ('string' == typeof e ? i[e] : e).apply(i, arguments)
            };
            var i = this;
            return setTimeout(n, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {
                mouseenter: function(t) {
                    e(t.currentTarget).addClass('ui-state-hover')
                },
                mouseleave: function(t) {
                    e(t.currentTarget).removeClass('ui-state-hover')
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t), this._on(t, {
                focusin: function(t) {
                    e(t.currentTarget).addClass('ui-state-focus')
                },
                focusout: function(t) {
                    e(t.currentTarget).removeClass('ui-state-focus')
                }
            })
        },
        _trigger: function(t, i, n) {
            var s, r, o = this.options[t];
            if (n = n || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], r = i.originalEvent)
                for (s in r) s in i || (i[s] = r[s]);
            return this.element.trigger(i, n), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
        }
    }, e.each({
        show: 'fadeIn',
        hide: 'fadeOut'
    }, function(t, i) {
        e.Widget.prototype['_' + t] = function(n, s, r) {
            'string' == typeof s && (s = {
                effect: s
            });
            var a, o = s ? s === !0 || 'number' == typeof s ? i : s.effect || i : t;
            s = s || {}, 'number' == typeof s && (s = {
                duration: s
            }), a = !e.isEmptyObject(s), s.complete = r, s.delay && n.delay(s.delay), a && e.effects && e.effects.effect[o] ? n[t](s) : o !== t && n[o] ? n[o](s.duration, s.easing, r) : n.queue(function(i) {
                e(this)[t](), r && r.call(n[0]), i()
            })
        }
    }), e.widget;
    var i = !1;
    e(document).mouseup(function() {
            i = !1
        }), e.widget('ui.mouse', {
            version: '1.11.4',
            options: {
                cancel: 'input,textarea,button,select,option',
                distance: 1,
                delay: 0
            },
            _mouseInit: function() {
                var t = this;
                this.element.bind('mousedown.' + this.widgetName, function(e) {
                    return t._mouseDown(e)
                }).bind('click.' + this.widgetName, function(i) {
                    return !0 === e.data(i.target, t.widgetName + '.preventClickEvent') ? (e.removeData(i.target, t.widgetName + '.preventClickEvent'), i.stopImmediatePropagation(), !1) : void 0
                }), this.started = !1
            },
            _mouseDestroy: function() {
                this.element.unbind('.' + this.widgetName), this._mouseMoveDelegate && this.document.unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function(t) {
                if (!i) {
                    this._mouseMoved = !1, this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                    var n = this,
                        s = 1 === t.which,
                        r = 'string' == typeof this.options.cancel && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
                    return s && !r && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                        n.mouseDelayMet = !0
                    }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, this.widgetName + '.preventClickEvent') && e.removeData(t.target, this.widgetName + '.preventClickEvent'), this._mouseMoveDelegate = function(e) {
                        return n._mouseMove(e)
                    }, this._mouseUpDelegate = function(e) {
                        return n._mouseUp(e)
                    }, this.document.bind('mousemove.' + this.widgetName, this._mouseMoveDelegate).bind('mouseup.' + this.widgetName, this._mouseUpDelegate), t.preventDefault(), i = !0, !0)) : !0
                }
            },
            _mouseMove: function(t) {
                if (this._mouseMoved) {
                    if (e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button) return this._mouseUp(t);
                    if (!t.which) return this._mouseUp(t)
                };
                return (t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
            },
            _mouseUp: function(t) {
                return this.document.unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + '.preventClickEvent', !0), this._mouseStop(t)), i = !1, !1
            },
            _mouseDistanceMet: function(e) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function() {
                return this.mouseDelayMet
            },
            _mouseStart: function() {},
            _mouseDrag: function() {},
            _mouseStop: function() {},
            _mouseCapture: function() {
                return !0
            }
        }),
        function() {
            function d(e, t, i) {
                return [parseFloat(e[0]) * (h.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (h.test(e[1]) ? i / 100 : 1)]
            };

            function n(t, i) {
                return parseInt(e.css(t, i), 10) || 0
            };

            function p(t) {
                var i = t[0];
                return 9 === i.nodeType ? {
                    width: t.width(),
                    height: t.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                } : e.isWindow(i) ? {
                    width: t.width(),
                    height: t.height(),
                    offset: {
                        top: t.scrollTop(),
                        left: t.scrollLeft()
                    }
                } : i.preventDefault ? {
                    width: 0,
                    height: 0,
                    offset: {
                        top: i.pageY,
                        left: i.pageX
                    }
                } : {
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    offset: t.offset()
                }
            };
            e.ui = e.ui || {};
            var s, r, i = Math.max,
                t = Math.abs,
                o = Math.round,
                a = /left|center|right/,
                l = /top|center|bottom/,
                c = /[\+\-]\d+(\.[\d]+)?%?/,
                u = /^\w+/,
                h = /%$/,
                f = e.fn.position;
            e.position = {
                    scrollbarWidth: function() {
                        if (void 0 !== s) return s;
                        var n, i, t = e('<div style=\'display:block;position:absolute;width:50px;height:50px;overflow:hidden;\'><div style=\'height:100px;width:auto;\'></div></div>'),
                            r = t.children()[0];
                        return e('body').append(t), n = r.offsetWidth, t.css('overflow', 'scroll'), i = r.offsetWidth, n === i && (i = t[0].clientWidth), t.remove(), s = n - i
                    },
                    getScrollInfo: function(t) {
                        var i = t.isWindow || t.isDocument ? '' : t.element.css('overflow-x'),
                            n = t.isWindow || t.isDocument ? '' : t.element.css('overflow-y'),
                            s = 'scroll' === i || 'auto' === i && t.width < t.element[0].scrollWidth,
                            r = 'scroll' === n || 'auto' === n && t.height < t.element[0].scrollHeight;
                        return {
                            width: r ? e.position.scrollbarWidth() : 0,
                            height: s ? e.position.scrollbarWidth() : 0
                        }
                    },
                    getWithinInfo: function(t) {
                        var i = e(t || window),
                            n = e.isWindow(i[0]),
                            s = !!i[0] && 9 === i[0].nodeType;
                        return {
                            element: i,
                            isWindow: n,
                            isDocument: s,
                            offset: i.offset() || {
                                left: 0,
                                top: 0
                            },
                            scrollLeft: i.scrollLeft(),
                            scrollTop: i.scrollTop(),
                            width: n || s ? i.width() : i.outerWidth(),
                            height: n || s ? i.height() : i.outerHeight()
                        }
                    }
                }, e.fn.position = function(s) {
                    if (!s || !s.of) return f.apply(this, arguments);
                    s = e.extend({}, s);
                    var y, h, m, v, g, w, x = e(s.of),
                        C = e.position.getWithinInfo(s.within),
                        T = e.position.getScrollInfo(C),
                        b = (s.collision || 'flip').split(' '),
                        k = {};
                    return w = p(x), x[0].preventDefault && (s.at = 'left top'), h = w.width, m = w.height, v = w.offset, g = e.extend({}, v), e.each(['my', 'at'], function() {
                        var t, i, e = (s[this] || '').split(' ');
                        1 === e.length && (e = a.test(e[0]) ? e.concat(['center']) : l.test(e[0]) ? ['center'].concat(e) : ['center', 'center']), e[0] = a.test(e[0]) ? e[0] : 'center', e[1] = l.test(e[1]) ? e[1] : 'center', t = c.exec(e[0]), i = c.exec(e[1]), k[this] = [t ? t[0] : 0, i ? i[0] : 0], s[this] = [u.exec(e[0])[0], u.exec(e[1])[0]]
                    }), 1 === b.length && (b[1] = b[0]), 'right' === s.at[0] ? g.left += h : 'center' === s.at[0] && (g.left += h / 2), 'bottom' === s.at[1] ? g.top += m : 'center' === s.at[1] && (g.top += m / 2), y = d(k.at, h, m), g.left += y[0], g.top += y[1], this.each(function() {
                        var p, w, l = e(this),
                            c = l.outerWidth(),
                            u = l.outerHeight(),
                            D = n(this, 'marginLeft'),
                            S = n(this, 'marginTop'),
                            I = c + D + n(this, 'marginRight') + T.width,
                            P = u + S + n(this, 'marginBottom') + T.height,
                            a = e.extend({}, g),
                            f = d(k.my, l.outerWidth(), l.outerHeight());
                        'right' === s.my[0] ? a.left -= c : 'center' === s.my[0] && (a.left -= c / 2), 'bottom' === s.my[1] ? a.top -= u : 'center' === s.my[1] && (a.top -= u / 2), a.left += f[0], a.top += f[1], r || (a.left = o(a.left), a.top = o(a.top)), p = {
                            marginLeft: D,
                            marginTop: S
                        }, e.each(['left', 'top'], function(t, i) {
                            e.ui.position[b[t]] && e.ui.position[b[t]][i](a, {
                                targetWidth: h,
                                targetHeight: m,
                                elemWidth: c,
                                elemHeight: u,
                                collisionPosition: p,
                                collisionWidth: I,
                                collisionHeight: P,
                                offset: [y[0] + f[0], y[1] + f[1]],
                                my: s.my,
                                at: s.at,
                                within: C,
                                elem: l
                            })
                        }), s.using && (w = function(e) {
                            var n = v.left - a.left,
                                d = n + h - c,
                                r = v.top - a.top,
                                f = r + m - u,
                                o = {
                                    target: {
                                        element: x,
                                        left: v.left,
                                        top: v.top,
                                        width: h,
                                        height: m
                                    },
                                    element: {
                                        element: l,
                                        left: a.left,
                                        top: a.top,
                                        width: c,
                                        height: u
                                    },
                                    horizontal: 0 > d ? 'left' : n > 0 ? 'right' : 'center',
                                    vertical: 0 > f ? 'top' : r > 0 ? 'bottom' : 'middle'
                                };
                            c > h && h > t(n + d) && (o.horizontal = 'center'), u > m && m > t(r + f) && (o.vertical = 'middle'), o.important = i(t(n), t(d)) > i(t(r), t(f)) ? 'horizontal' : 'vertical', s.using.call(this, e, o)
                        }), l.offset(e.extend(a, {
                            using: w
                        }))
                    })
                }, e.ui.position = {
                    fit: {
                        left: function(e, t) {
                            var c, o = t.within,
                                s = o.isWindow ? o.scrollLeft : o.offset.left,
                                a = o.width,
                                l = e.left - t.collisionPosition.marginLeft,
                                n = s - l,
                                r = l + t.collisionWidth - a - s;
                            t.collisionWidth > a ? n > 0 && 0 >= r ? (c = e.left + n + t.collisionWidth - a - s, e.left += n - c) : e.left = r > 0 && 0 >= n ? s : n > r ? s + a - t.collisionWidth : s : n > 0 ? e.left += n : r > 0 ? e.left -= r : e.left = i(e.left - l, e.left)
                        },
                        top: function(e, t) {
                            var c, a = t.within,
                                s = a.isWindow ? a.scrollTop : a.offset.top,
                                o = t.within.height,
                                l = e.top - t.collisionPosition.marginTop,
                                n = s - l,
                                r = l + t.collisionHeight - o - s;
                            t.collisionHeight > o ? n > 0 && 0 >= r ? (c = e.top + n + t.collisionHeight - o - s, e.top += n - c) : e.top = r > 0 && 0 >= n ? s : n > r ? s + o - t.collisionHeight : s : n > 0 ? e.top += n : r > 0 ? e.top -= r : e.top = i(e.top - l, e.top)
                        }
                    },
                    flip: {
                        left: function(e, i) {
                            var a, l, n = i.within,
                                p = n.offset.left + n.scrollLeft,
                                u = n.width,
                                c = n.isWindow ? n.scrollLeft : n.offset.left,
                                h = e.left - i.collisionPosition.marginLeft,
                                d = h - c,
                                f = h + i.collisionWidth - u - c,
                                s = 'left' === i.my[0] ? -i.elemWidth : 'right' === i.my[0] ? i.elemWidth : 0,
                                r = 'left' === i.at[0] ? i.targetWidth : 'right' === i.at[0] ? -i.targetWidth : 0,
                                o = -2 * i.offset[0];
                            0 > d ? (a = e.left + s + r + o + i.collisionWidth - u - p, (0 > a || t(d) > a) && (e.left += s + r + o)) : f > 0 && (l = e.left - i.collisionPosition.marginLeft + s + r + o - c, (l > 0 || f > t(l)) && (e.left += s + r + o))
                        },
                        top: function(e, i) {
                            var a, l, n = i.within,
                                p = n.offset.top + n.scrollTop,
                                u = n.height,
                                c = n.isWindow ? n.scrollTop : n.offset.top,
                                h = e.top - i.collisionPosition.marginTop,
                                d = h - c,
                                f = h + i.collisionHeight - u - c,
                                m = 'top' === i.my[1],
                                s = m ? -i.elemHeight : 'bottom' === i.my[1] ? i.elemHeight : 0,
                                r = 'top' === i.at[1] ? i.targetHeight : 'bottom' === i.at[1] ? -i.targetHeight : 0,
                                o = -2 * i.offset[1];
                            0 > d ? (l = e.top + s + r + o + i.collisionHeight - u - p, (0 > l || t(d) > l) && (e.top += s + r + o)) : f > 0 && (a = e.top - i.collisionPosition.marginTop + s + r + o - c, (a > 0 || f > t(a)) && (e.top += s + r + o))
                        }
                    },
                    flipfit: {
                        left: function() {
                            e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
                        },
                        top: function() {
                            e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
                        }
                    }
                },
                function() {
                    var t, i, n, s, o, a = document.getElementsByTagName('body')[0],
                        l = document.createElement('div');
                    t = document.createElement(a ? 'div' : 'body'), n = {
                        visibility: 'hidden',
                        width: 0,
                        height: 0,
                        border: 0,
                        margin: 0,
                        background: 'none'
                    }, a && e.extend(n, {
                        position: 'absolute',
                        left: '-1000px',
                        top: '-1000px'
                    });
                    for (o in n) t.style[o] = n[o];
                    t.appendChild(l), i = a || document.documentElement, i.insertBefore(t, i.firstChild), l.style.cssText = 'position: absolute; left: 10.7432222px;', s = e(l).offset().left, r = s > 10 && 11 > s, t.innerHTML = '', i.removeChild(t)
                }()
        }(), e.ui.position, e.widget('ui.draggable', e.ui.mouse, {
            version: '1.11.4',
            widgetEventPrefix: 'drag',
            options: {
                addClasses: !0,
                appendTo: 'parent',
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: 'auto',
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: 'original',
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: 'default',
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: 'both',
                snapTolerance: 20,
                stack: !1,
                zIndex: !1,
                drag: null,
                start: null,
                stop: null
            },
            _create: function() {
                'original' === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass('ui-draggable'), this.options.disabled && this.element.addClass('ui-draggable-disabled'), this._setHandleClassName(), this._mouseInit()
            },
            _setOption: function(e, t) {
                this._super(e, t), 'handle' === e && (this._removeHandleClassName(), this._setHandleClassName())
            },
            _destroy: function() {
                return (this.helper || this.element).is('.ui-draggable-dragging') ? (this.destroyOnClear = !0, void 0) : (this.element.removeClass('ui-draggable ui-draggable-dragging ui-draggable-disabled'), this._removeHandleClassName(), this._mouseDestroy(), void 0)
            },
            _mouseCapture: function(t) {
                var i = this.options;
                return this._blurActiveElement(t), this.helper || i.disabled || e(t.target).closest('.ui-resizable-handle').length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (this._blockFrames(i.iframeFix === !0 ? 'iframe' : i.iframeFix), !0) : !1)
            },
            _blockFrames: function(t) {
                this.iframeBlocks = this.document.find(t).map(function() {
                    var t = e(this);
                    return e('<div>').css('position', 'absolute').appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]
                })
            },
            _unblockFrames: function() {
                this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
            },
            _blurActiveElement: function(t) {
                var n = this.document[0];
                if (this.handleElement.is(t.target)) try {
                    n.activeElement && 'body' !== n.activeElement.nodeName.toLowerCase() && e(n.activeElement).blur()
                } catch (i) {}
            },
            _mouseStart: function(t) {
                var i = this.options;
                return this.helper = this._createHelper(t), this.helper.addClass('ui-draggable-dragging'), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css('position'), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
                    return 'fixed' === e(this).css('position')
                }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(t), this.originalPosition = this.position = this._generatePosition(t, !1), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger('start', t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._normalizeRightBottom(), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
            },
            _refreshOffsets: function(e) {
                this.offset = {
                    top: this.positionAbs.top - this.margins.top,
                    left: this.positionAbs.left - this.margins.left,
                    scroll: !1,
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }, this.offset.click = {
                    left: e.pageX - this.offset.left,
                    top: e.pageY - this.offset.top
                }
            },
            _mouseDrag: function(t, i) {
                if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t, !0), this.positionAbs = this._convertPositionTo('absolute'), !i) {
                    var n = this._uiHash();
                    if (this._trigger('drag', t, n) === !1) return this._mouseUp({}), !1;
                    this.position = n.position
                };
                return this.helper[0].style.left = this.position.left + 'px', this.helper[0].style.top = this.position.top + 'px', e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
            },
            _mouseStop: function(t) {
                var n = this,
                    i = !1;
                return e.ui.ddmanager && !this.options.dropBehaviour && (i = e.ui.ddmanager.drop(this, t)), this.dropped && (i = this.dropped, this.dropped = !1), 'invalid' === this.options.revert && !i || 'valid' === this.options.revert && i || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, i) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    n._trigger('stop', t) !== !1 && n._clear()
                }) : this._trigger('stop', t) !== !1 && this._clear(), !1
            },
            _mouseUp: function(t) {
                return this._unblockFrames(), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), this.handleElement.is(t.target) && this.element.focus(), e.ui.mouse.prototype._mouseUp.call(this, t)
            },
            cancel: function() {
                return this.helper.is('.ui-draggable-dragging') ? this._mouseUp({}) : this._clear(), this
            },
            _getHandle: function(t) {
                return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0
            },
            _setHandleClassName: function() {
                this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass('ui-draggable-handle')
            },
            _removeHandleClassName: function() {
                this.handleElement.removeClass('ui-draggable-handle')
            },
            _createHelper: function(t) {
                var n = this.options,
                    s = e.isFunction(n.helper),
                    i = s ? e(n.helper.apply(this.element[0], [t])) : 'clone' === n.helper ? this.element.clone().removeAttr('id') : this.element;
                return i.parents('body').length || i.appendTo('parent' === n.appendTo ? this.element[0].parentNode : n.appendTo), s && i[0] === this.element[0] && this._setPositionRelative(), i[0] === this.element[0] || /(fixed|absolute)/.test(i.css('position')) || i.css('position', 'absolute'), i
            },
            _setPositionRelative: function() {
                /^(?:r|a|f)/.test(this.element.css('position')) || (this.element[0].style.position = 'relative')
            },
            _adjustOffsetFromHelper: function(t) {
                'string' == typeof t && (t = t.split(' ')), e.isArray(t) && (t = {
                    left: +t[0],
                    top: +t[1] || 0
                }), 'left' in t && (this.offset.click.left = t.left + this.margins.left), 'right' in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), 'top' in t && (this.offset.click.top = t.top + this.margins.top), 'bottom' in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
            },
            _isRootNode: function(e) {
                return /(html|body)/i.test(e.tagName) || e === this.document[0]
            },
            _getParentOffset: function() {
                var t = this.offsetParent.offset(),
                    i = this.document[0];
                return 'absolute' === this.cssPosition && this.scrollParent[0] !== i && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (t = {
                    top: 0,
                    left: 0
                }), {
                    top: t.top + (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
                    left: t.left + (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ('relative' !== this.cssPosition) return {
                    top: 0,
                    left: 0
                };
                var e = this.element.position(),
                    t = this._isRootNode(this.scrollParent[0]);
                return {
                    top: e.top - (parseInt(this.helper.css('top'), 10) || 0) + (t ? 0 : this.scrollParent.scrollTop()),
                    left: e.left - (parseInt(this.helper.css('left'), 10) || 0) + (t ? 0 : this.scrollParent.scrollLeft())
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.element.css('marginLeft'), 10) || 0,
                    top: parseInt(this.element.css('marginTop'), 10) || 0,
                    right: parseInt(this.element.css('marginRight'), 10) || 0,
                    bottom: parseInt(this.element.css('marginBottom'), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var r, t, i, n = this.options,
                    s = this.document[0];
                return this.relativeContainer = null, n.containment ? 'window' === n.containment ? (this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || s.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : 'document' === n.containment ? (this.containment = [0, 0, e(s).width() - this.helperProportions.width - this.margins.left, (e(s).height() || s.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : n.containment.constructor === Array ? (this.containment = n.containment, void 0) : ('parent' === n.containment && (n.containment = this.helper[0].parentNode), t = e(n.containment), i = t[0], i && (r = /(scroll|auto)/.test(t.css('overflow')), this.containment = [(parseInt(t.css('borderLeftWidth'), 10) || 0) + (parseInt(t.css('paddingLeft'), 10) || 0), (parseInt(t.css('borderTopWidth'), 10) || 0) + (parseInt(t.css('paddingTop'), 10) || 0), (r ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(t.css('borderRightWidth'), 10) || 0) - (parseInt(t.css('paddingRight'), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (r ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(t.css('borderBottomWidth'), 10) || 0) - (parseInt(t.css('paddingBottom'), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = t), void 0) : (this.containment = null, void 0)
            },
            _convertPositionTo: function(e, t) {
                t || (t = this.position);
                var i = 'absolute' === e ? 1 : -1,
                    n = this._isRootNode(this.scrollParent[0]);
                return {
                    top: t.top + this.offset.relative.top * i + this.offset.parent.top * i - ('fixed' === this.cssPosition ? -this.offset.scroll.top : n ? 0 : this.offset.scroll.top) * i,
                    left: t.left + this.offset.relative.left * i + this.offset.parent.left * i - ('fixed' === this.cssPosition ? -this.offset.scroll.left : n ? 0 : this.offset.scroll.left) * i
                }
            },
            _generatePosition: function(e, t) {
                var i, l, s, r, n = this.options,
                    c = this._isRootNode(this.scrollParent[0]),
                    o = e.pageX,
                    a = e.pageY;
                return c && this.offset.scroll || (this.offset.scroll = {
                    top: this.scrollParent.scrollTop(),
                    left: this.scrollParent.scrollLeft()
                }), t && (this.containment && (this.relativeContainer ? (l = this.relativeContainer.offset(), i = [this.containment[0] + l.left, this.containment[1] + l.top, this.containment[2] + l.left, this.containment[3] + l.top]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (o = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (a = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (o = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (a = i[3] + this.offset.click.top)), n.grid && (s = n.grid[1] ? this.originalPageY + Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1] : this.originalPageY, a = i ? s - this.offset.click.top >= i[1] || s - this.offset.click.top > i[3] ? s : s - this.offset.click.top >= i[1] ? s - n.grid[1] : s + n.grid[1] : s, r = n.grid[0] ? this.originalPageX + Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0] : this.originalPageX, o = i ? r - this.offset.click.left >= i[0] || r - this.offset.click.left > i[2] ? r : r - this.offset.click.left >= i[0] ? r - n.grid[0] : r + n.grid[0] : r), 'y' === n.axis && (o = this.originalPageX), 'x' === n.axis && (a = this.originalPageY)), {
                    top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ('fixed' === this.cssPosition ? -this.offset.scroll.top : c ? 0 : this.offset.scroll.top),
                    left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ('fixed' === this.cssPosition ? -this.offset.scroll.left : c ? 0 : this.offset.scroll.left)
                }
            },
            _clear: function() {
                this.helper.removeClass('ui-draggable-dragging'), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
            },
            _normalizeRightBottom: function() {
                'y' !== this.options.axis && 'auto' !== this.helper.css('right') && (this.helper.width(this.helper.width()), this.helper.css('right', 'auto')), 'x' !== this.options.axis && 'auto' !== this.helper.css('bottom') && (this.helper.height(this.helper.height()), this.helper.css('bottom', 'auto'))
            },
            _trigger: function(t, i, n) {
                return n = n || this._uiHash(), e.ui.plugin.call(this, t, [i, n, this], !0), /^(drag|start|stop)/.test(t) && (this.positionAbs = this._convertPositionTo('absolute'), n.offset = this.positionAbs), e.Widget.prototype._trigger.call(this, t, i, n)
            },
            plugins: {},
            _uiHash: function() {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                }
            }
        }), e.ui.plugin.add('draggable', 'connectToSortable', {
            start: function(t, i, n) {
                var s = e.extend({}, i, {
                    item: n.element
                });
                n.sortables = [], e(n.options.connectToSortable).each(function() {
                    var i = e(this).sortable('instance');
                    i && !i.options.disabled && (n.sortables.push(i), i.refreshPositions(), i._trigger('activate', t, s))
                })
            },
            stop: function(t, i, n) {
                var s = e.extend({}, i, {
                    item: n.element
                });
                n.cancelHelperRemoval = !1, e.each(n.sortables, function() {
                    var e = this;
                    e.isOver ? (e.isOver = 0, n.cancelHelperRemoval = !0, e.cancelHelperRemoval = !1, e._storedCSS = {
                        position: e.placeholder.css('position'),
                        top: e.placeholder.css('top'),
                        left: e.placeholder.css('left')
                    }, e._mouseStop(t), e.options.helper = e.options._helper) : (e.cancelHelperRemoval = !0, e._trigger('deactivate', t, s))
                })
            },
            drag: function(t, i, n) {
                e.each(n.sortables, function() {
                    var r = !1,
                        s = this;
                    s.positionAbs = n.positionAbs, s.helperProportions = n.helperProportions, s.offset.click = n.offset.click, s._intersectsWith(s.containerCache) && (r = !0, e.each(n.sortables, function() {
                        return this.positionAbs = n.positionAbs, this.helperProportions = n.helperProportions, this.offset.click = n.offset.click, this !== s && this._intersectsWith(this.containerCache) && e.contains(s.element[0], this.element[0]) && (r = !1), r
                    })), r ? (s.isOver || (s.isOver = 1, n._parent = i.helper.parent(), s.currentItem = i.helper.appendTo(s.element).data('ui-sortable-item', !0), s.options._helper = s.options.helper, s.options.helper = function() {
                        return i.helper[0]
                    }, t.target = s.currentItem[0], s._mouseCapture(t, !0), s._mouseStart(t, !0, !0), s.offset.click.top = n.offset.click.top, s.offset.click.left = n.offset.click.left, s.offset.parent.left -= n.offset.parent.left - s.offset.parent.left, s.offset.parent.top -= n.offset.parent.top - s.offset.parent.top, n._trigger('toSortable', t), n.dropped = s.element, e.each(n.sortables, function() {
                        this.refreshPositions()
                    }), n.currentItem = n.element, s.fromOutside = n), s.currentItem && (s._mouseDrag(t), i.position = s.position)) : s.isOver && (s.isOver = 0, s.cancelHelperRemoval = !0, s.options._revert = s.options.revert, s.options.revert = !1, s._trigger('out', t, s._uiHash(s)), s._mouseStop(t, !0), s.options.revert = s.options._revert, s.options.helper = s.options._helper, s.placeholder && s.placeholder.remove(), i.helper.appendTo(n._parent), n._refreshOffsets(t), i.position = n._generatePosition(t, !0), n._trigger('fromSortable', t), n.dropped = !1, e.each(n.sortables, function() {
                        this.refreshPositions()
                    }))
                })
            }
        }), e.ui.plugin.add('draggable', 'cursor', {
            start: function(t, i, n) {
                var s = e('body'),
                    r = n.options;
                s.css('cursor') && (r._cursor = s.css('cursor')), s.css('cursor', r.cursor)
            },
            stop: function(t, i, n) {
                var s = n.options;
                s._cursor && e('body').css('cursor', s._cursor)
            }
        }), e.ui.plugin.add('draggable', 'opacity', {
            start: function(t, i, n) {
                var s = e(i.helper),
                    r = n.options;
                s.css('opacity') && (r._opacity = s.css('opacity')), s.css('opacity', r.opacity)
            },
            stop: function(t, i, n) {
                var s = n.options;
                s._opacity && e(i.helper).css('opacity', s._opacity)
            }
        }), e.ui.plugin.add('draggable', 'scroll', {
            start: function(e, t, i) {
                i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && 'HTML' !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
            },
            drag: function(t, i, n) {
                var s = n.options,
                    a = !1,
                    o = n.scrollParentNotHidden[0],
                    r = n.document[0];
                o !== r && 'HTML' !== o.tagName ? (s.axis && 'x' === s.axis || (n.overflowOffset.top + o.offsetHeight - t.pageY < s.scrollSensitivity ? o.scrollTop = a = o.scrollTop + s.scrollSpeed : t.pageY - n.overflowOffset.top < s.scrollSensitivity && (o.scrollTop = a = o.scrollTop - s.scrollSpeed)), s.axis && 'y' === s.axis || (n.overflowOffset.left + o.offsetWidth - t.pageX < s.scrollSensitivity ? o.scrollLeft = a = o.scrollLeft + s.scrollSpeed : t.pageX - n.overflowOffset.left < s.scrollSensitivity && (o.scrollLeft = a = o.scrollLeft - s.scrollSpeed))) : (s.axis && 'x' === s.axis || (t.pageY - e(r).scrollTop() < s.scrollSensitivity ? a = e(r).scrollTop(e(r).scrollTop() - s.scrollSpeed) : e(window).height() - (t.pageY - e(r).scrollTop()) < s.scrollSensitivity && (a = e(r).scrollTop(e(r).scrollTop() + s.scrollSpeed))), s.axis && 'y' === s.axis || (t.pageX - e(r).scrollLeft() < s.scrollSensitivity ? a = e(r).scrollLeft(e(r).scrollLeft() - s.scrollSpeed) : e(window).width() - (t.pageX - e(r).scrollLeft()) < s.scrollSensitivity && (a = e(r).scrollLeft(e(r).scrollLeft() + s.scrollSpeed)))), a !== !1 && e.ui.ddmanager && !s.dropBehaviour && e.ui.ddmanager.prepareOffsets(n, t)
            }
        }), e.ui.plugin.add('draggable', 'snap', {
            start: function(t, i, n) {
                var s = n.options;
                n.snapElements = [], e(s.snap.constructor !== String ? s.snap.items || ':data(ui-draggable)' : s.snap).each(function() {
                    var t = e(this),
                        i = t.offset();
                    this !== n.element[0] && n.snapElements.push({
                        item: this,
                        width: t.outerWidth(),
                        height: t.outerHeight(),
                        top: i.top,
                        left: i.left
                    })
                })
            },
            drag: function(t, i, n) {
                var o, a, l, c, u, d, h, f, s, g, v = n.options,
                    r = v.snapTolerance,
                    p = i.offset.left,
                    y = p + n.helperProportions.width,
                    m = i.offset.top,
                    b = m + n.helperProportions.height;
                for (s = n.snapElements.length - 1; s >= 0; s--) u = n.snapElements[s].left - n.margins.left, d = u + n.snapElements[s].width, h = n.snapElements[s].top - n.margins.top, f = h + n.snapElements[s].height, u - r > y || p > d + r || h - r > b || m > f + r || !e.contains(n.snapElements[s].item.ownerDocument, n.snapElements[s].item) ? (n.snapElements[s].snapping && n.options.snap.release && n.options.snap.release.call(n.element, t, e.extend(n._uiHash(), {
                    snapItem: n.snapElements[s].item
                })), n.snapElements[s].snapping = !1) : ('inner' !== v.snapMode && (o = r >= Math.abs(h - b), a = r >= Math.abs(f - m), l = r >= Math.abs(u - y), c = r >= Math.abs(d - p), o && (i.position.top = n._convertPositionTo('relative', {
                    top: h - n.helperProportions.height,
                    left: 0
                }).top), a && (i.position.top = n._convertPositionTo('relative', {
                    top: f,
                    left: 0
                }).top), l && (i.position.left = n._convertPositionTo('relative', {
                    top: 0,
                    left: u - n.helperProportions.width
                }).left), c && (i.position.left = n._convertPositionTo('relative', {
                    top: 0,
                    left: d
                }).left)), g = o || a || l || c, 'outer' !== v.snapMode && (o = r >= Math.abs(h - m), a = r >= Math.abs(f - b), l = r >= Math.abs(u - p), c = r >= Math.abs(d - y), o && (i.position.top = n._convertPositionTo('relative', {
                    top: h,
                    left: 0
                }).top), a && (i.position.top = n._convertPositionTo('relative', {
                    top: f - n.helperProportions.height,
                    left: 0
                }).top), l && (i.position.left = n._convertPositionTo('relative', {
                    top: 0,
                    left: u
                }).left), c && (i.position.left = n._convertPositionTo('relative', {
                    top: 0,
                    left: d - n.helperProportions.width
                }).left)), !n.snapElements[s].snapping && (o || a || l || c || g) && n.options.snap.snap && n.options.snap.snap.call(n.element, t, e.extend(n._uiHash(), {
                    snapItem: n.snapElements[s].item
                })), n.snapElements[s].snapping = o || a || l || c || g)
            }
        }), e.ui.plugin.add('draggable', 'stack', {
            start: function(t, i, n) {
                var r, o = n.options,
                    s = e.makeArray(e(o.stack)).sort(function(t, i) {
                        return (parseInt(e(t).css('zIndex'), 10) || 0) - (parseInt(e(i).css('zIndex'), 10) || 0)
                    });
                s.length && (r = parseInt(e(s[0]).css('zIndex'), 10) || 0, e(s).each(function(t) {
                    e(this).css('zIndex', r + t)
                }), this.css('zIndex', r + s.length))
            }
        }), e.ui.plugin.add('draggable', 'zIndex', {
            start: function(t, i, n) {
                var s = e(i.helper),
                    r = n.options;
                s.css('zIndex') && (r._zIndex = s.css('zIndex')), s.css('zIndex', r.zIndex)
            },
            stop: function(t, i, n) {
                var s = n.options;
                s._zIndex && e(i.helper).css('zIndex', s._zIndex)
            }
        }), e.ui.draggable, e.widget('ui.droppable', {
            version: '1.11.4',
            widgetEventPrefix: 'drop',
            options: {
                accept: '*',
                activeClass: !1,
                addClasses: !0,
                greedy: !1,
                hoverClass: !1,
                scope: 'default',
                tolerance: 'intersect',
                activate: null,
                deactivate: null,
                drop: null,
                out: null,
                over: null
            },
            _create: function() {
                var t, i = this.options,
                    n = i.accept;
                this.isover = !1, this.isout = !0, this.accept = e.isFunction(n) ? n : function(e) {
                    return e.is(n)
                }, this.proportions = function() {
                    return arguments.length ? (t = arguments[0], void 0) : t ? t : t = {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight
                    }
                }, this._addToManager(i.scope), i.addClasses && this.element.addClass('ui-droppable')
            },
            _addToManager: function(t) {
                e.ui.ddmanager.droppables[t] = e.ui.ddmanager.droppables[t] || [], e.ui.ddmanager.droppables[t].push(this)
            },
            _splice: function(e) {
                for (var t = 0; e.length > t; t++) e[t] === this && e.splice(t, 1)
            },
            _destroy: function() {
                var t = e.ui.ddmanager.droppables[this.options.scope];
                this._splice(t), this.element.removeClass('ui-droppable ui-droppable-disabled')
            },
            _setOption: function(t, i) {
                if ('accept' === t) this.accept = e.isFunction(i) ? i : function(e) {
                    return e.is(i)
                };
                else if ('scope' === t) {
                    var n = e.ui.ddmanager.droppables[this.options.scope];
                    this._splice(n), this._addToManager(i)
                };
                this._super(t, i)
            },
            _activate: function(t) {
                var i = e.ui.ddmanager.current;
                this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger('activate', t, this.ui(i))
            },
            _deactivate: function(t) {
                var i = e.ui.ddmanager.current;
                this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger('deactivate', t, this.ui(i))
            },
            _over: function(t) {
                var i = e.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger('over', t, this.ui(i)))
            },
            _out: function(t) {
                var i = e.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger('out', t, this.ui(i)))
            },
            _drop: function(t, i) {
                var n = i || e.ui.ddmanager.current,
                    s = !1;
                return n && (n.currentItem || n.element)[0] !== this.element[0] ? (this.element.find(':data(ui-droppable)').not('.ui-draggable-dragging').each(function() {
                    var i = e(this).droppable('instance');
                    return i.options.greedy && !i.options.disabled && i.options.scope === n.options.scope && i.accept.call(i.element[0], n.currentItem || n.element) && e.ui.intersect(n, e.extend(i, {
                        offset: i.element.offset()
                    }), i.options.tolerance, t) ? (s = !0, !1) : void 0
                }), s ? !1 : this.accept.call(this.element[0], n.currentItem || n.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger('drop', t, this.ui(n)), this.element) : !1) : !1
            },
            ui: function(e) {
                return {
                    draggable: e.currentItem || e.element,
                    helper: e.helper,
                    position: e.position,
                    offset: e.positionAbs
                }
            }
        }), e.ui.intersect = function() {
            function e(e, t, i) {
                return e >= t && t + i > e
            };
            return function(t, i, n, s) {
                if (!i.offset) return !1;
                var a = (t.positionAbs || t.position.absolute).left + t.margins.left,
                    l = (t.positionAbs || t.position.absolute).top + t.margins.top,
                    c = a + t.helperProportions.width,
                    u = l + t.helperProportions.height,
                    r = i.offset.left,
                    o = i.offset.top,
                    h = r + i.proportions().width,
                    d = o + i.proportions().height;
                switch (n) {
                    case 'fit':
                        return a >= r && h >= c && l >= o && d >= u;
                    case 'intersect':
                        return a + t.helperProportions.width / 2 > r && h > c - t.helperProportions.width / 2 && l + t.helperProportions.height / 2 > o && d > u - t.helperProportions.height / 2;
                    case 'pointer':
                        return e(s.pageY, o, i.proportions().height) && e(s.pageX, r, i.proportions().width);
                    case 'touch':
                        return (l >= o && d >= l || u >= o && d >= u || o > l && u > d) && (a >= r && h >= a || c >= r && h >= c || r > a && c > h);
                    default:
                        return !1
                }
            }
        }(), e.ui.ddmanager = {
            current: null,
            droppables: {
                'default': []
            },
            prepareOffsets: function(t, i) {
                var n, r, s = e.ui.ddmanager.droppables[t.options.scope] || [],
                    a = i ? i.type : null,
                    o = (t.currentItem || t.element).find(':data(ui-droppable)').addBack();
                e: for (n = 0; s.length > n; n++)
                    if (!(s[n].options.disabled || t && !s[n].accept.call(s[n].element[0], t.currentItem || t.element))) {
                        for (r = 0; o.length > r; r++)
                            if (o[r] === s[n].element[0]) {
                                s[n].proportions().height = 0;
                                continue;
                                e
                            };
                        s[n].visible = 'none' !== s[n].element.css('display'), s[n].visible && ('mousedown' === a && s[n]._activate.call(s[n], i), s[n].offset = s[n].element.offset(), s[n].proportions({
                            width: s[n].element[0].offsetWidth,
                            height: s[n].element[0].offsetHeight
                        }))
                    }
            },
            drop: function(t, i) {
                var n = !1;
                return e.each((e.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() {
                    this.options && (!this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance, i) && (n = this._drop.call(this, i) || n), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
                }), n
            },
            dragStart: function(t, i) {
                t.element.parentsUntil('body').bind('scroll.droppable', function() {
                    t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i)
                })
            },
            drag: function(t, i) {
                t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, i), e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function() {
                    if (!this.options.disabled && !this.greedyChild && this.visible) {
                        var n, o, r, a = e.ui.intersect(t, this, this.options.tolerance, i),
                            s = !a && this.isover ? 'isout' : a && !this.isover ? 'isover' : null;
                        s && (this.options.greedy && (o = this.options.scope, r = this.element.parents(':data(ui-droppable)').filter(function() {
                            return e(this).droppable('instance').options.scope === o
                        }), r.length && (n = e(r[0]).droppable('instance'), n.greedyChild = 'isover' === s)), n && 'isover' === s && (n.isover = !1, n.isout = !0, n._out.call(n, i)), this[s] = !0, this['isout' === s ? 'isover' : 'isout'] = !1, this['isover' === s ? '_over' : '_out'].call(this, i), n && 'isout' === s && (n.isout = !1, n.isover = !0, n._over.call(n, i)))
                    }
                })
            },
            dragStop: function(t, i) {
                t.element.parentsUntil('body').unbind('scroll.droppable'), t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i)
            }
        }, e.ui.droppable, e.widget('ui.resizable', e.ui.mouse, {
            version: '1.11.4',
            widgetEventPrefix: 'resize',
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: 'slow',
                animateEasing: 'swing',
                aspectRatio: !1,
                autoHide: !1,
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: 'e,s,se',
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 90,
                resize: null,
                start: null,
                stop: null
            },
            _num: function(e) {
                return parseInt(e, 10) || 0
            },
            _isNumber: function(e) {
                return !isNaN(parseInt(e, 10))
            },
            _hasScroll: function(t, i) {
                if ('hidden' === e(t).css('overflow')) return !1;
                var n = i && 'left' === i ? 'scrollLeft' : 'scrollTop',
                    s = !1;
                return t[n] > 0 ? !0 : (t[n] = 1, s = t[n] > 0, t[n] = 0, s)
            },
            _create: function() {
                var o, r, s, i, a, n = this,
                    t = this.options;
                if (this.element.addClass('ui-resizable'), e.extend(this, {
                        _aspectRatio: !!t.aspectRatio,
                        aspectRatio: t.aspectRatio,
                        originalElement: this.element,
                        _proportionallyResizeElements: [],
                        _helper: t.helper || t.ghost || t.animate ? t.helper || 'ui-resizable-helper' : null
                    }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(e('<div class=\'ui-wrapper\' style=\'overflow: hidden;\'></div>').css({
                        position: this.element.css('position'),
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight(),
                        top: this.element.css('top'),
                        left: this.element.css('left')
                    })), this.element = this.element.parent().data('ui-resizable', this.element.resizable('instance')), this.elementIsWrapper = !0, this.element.css({
                        marginLeft: this.originalElement.css('marginLeft'),
                        marginTop: this.originalElement.css('marginTop'),
                        marginRight: this.originalElement.css('marginRight'),
                        marginBottom: this.originalElement.css('marginBottom')
                    }), this.originalElement.css({
                        marginLeft: 0,
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }), this.originalResizeStyle = this.originalElement.css('resize'), this.originalElement.css('resize', 'none'), this._proportionallyResizeElements.push(this.originalElement.css({
                        position: 'static',
                        zoom: 1,
                        display: 'block'
                    })), this.originalElement.css({
                        margin: this.originalElement.css('margin')
                    }), this._proportionallyResize()), this.handles = t.handles || (e('.ui-resizable-handle', this.element).length ? {
                        n: '.ui-resizable-n',
                        e: '.ui-resizable-e',
                        s: '.ui-resizable-s',
                        w: '.ui-resizable-w',
                        se: '.ui-resizable-se',
                        sw: '.ui-resizable-sw',
                        ne: '.ui-resizable-ne',
                        nw: '.ui-resizable-nw'
                    } : 'e,s,se'), this._handles = e(), this.handles.constructor === String)
                    for ('all' === this.handles && (this.handles = 'n,e,s,w,se,sw,ne,nw'), o = this.handles.split(','), this.handles = {}, r = 0; o.length > r; r++) s = e.trim(o[r]), a = 'ui-resizable-' + s, i = e('<div class=\'ui-resizable-handle ' + a + '\'></div>'), i.css({
                        zIndex: t.zIndex
                    }), 'se' === s && i.addClass('ui-icon ui-icon-gripsmall-diagonal-se'), this.handles[s] = '.ui-resizable-' + s, this.element.append(i);
                this._renderAxis = function(t) {
                    var i, s, r, o;
                    t = t || this.element;
                    for (i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = e(this.handles[i]), this._on(this.handles[i], {
                        mousedown: n._mouseDown
                    })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = e(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), r = ['padding', /ne|nw|n/.test(i) ? 'Top' : /se|sw|s/.test(i) ? 'Bottom' : /^e$/.test(i) ? 'Right' : 'Left'].join(''), t.css(r, o), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i])
                }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find('.ui-resizable-handle')), this._handles.disableSelection(), this._handles.mouseover(function() {
                    n.resizing || (this.className && (i = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), n.axis = i && i[1] ? i[1] : 'se')
                }), t.autoHide && (this._handles.hide(), e(this.element).addClass('ui-resizable-autohide').mouseenter(function() {
                    t.disabled || (e(this).removeClass('ui-resizable-autohide'), n._handles.show())
                }).mouseleave(function() {
                    t.disabled || n.resizing || (e(this).addClass('ui-resizable-autohide'), n._handles.hide())
                })), this._mouseInit()
            },
            _destroy: function() {
                this._mouseDestroy();
                var t, i = function(t) {
                    e(t).removeClass('ui-resizable ui-resizable-disabled ui-resizable-resizing').removeData('resizable').removeData('ui-resizable').unbind('.resizable').find('.ui-resizable-handle').remove()
                };
                return this.elementIsWrapper && (i(this.element), t = this.element, this.originalElement.css({
                    position: t.css('position'),
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    top: t.css('top'),
                    left: t.css('left')
                }).insertAfter(t), t.remove()), this.originalElement.css('resize', this.originalResizeStyle), i(this.originalElement), this
            },
            _mouseCapture: function(t) {
                var n, i, s = !1;
                for (n in this.handles) i = e(this.handles[n])[0], (i === t.target || e.contains(i, t.target)) && (s = !0);
                return !this.options.disabled && s
            },
            _mouseStart: function(t) {
                var s, r, o, n = this.options,
                    i = this.element;
                return this.resizing = !0, this._renderProxy(), s = this._num(this.helper.css('left')), r = this._num(this.helper.css('top')), n.containment && (s += e(n.containment).scrollLeft() || 0, r += e(n.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                    left: s,
                    top: r
                }, this.size = this._helper ? {
                    width: this.helper.width(),
                    height: this.helper.height()
                } : {
                    width: i.width(),
                    height: i.height()
                }, this.originalSize = this._helper ? {
                    width: i.outerWidth(),
                    height: i.outerHeight()
                } : {
                    width: i.width(),
                    height: i.height()
                }, this.sizeDiff = {
                    width: i.outerWidth() - i.width(),
                    height: i.outerHeight() - i.height()
                }, this.originalPosition = {
                    left: s,
                    top: r
                }, this.originalMousePosition = {
                    left: t.pageX,
                    top: t.pageY
                }, this.aspectRatio = 'number' == typeof n.aspectRatio ? n.aspectRatio : this.originalSize.width / this.originalSize.height || 1, o = e('.ui-resizable-' + this.axis).css('cursor'), e('body').css('cursor', 'auto' === o ? this.axis + '-resize' : o), i.addClass('ui-resizable-resizing'), this._propagate('start', t), !0
            },
            _mouseDrag: function(t) {
                var i, n, s = this.originalMousePosition,
                    o = this.axis,
                    a = t.pageX - s.left || 0,
                    l = t.pageY - s.top || 0,
                    r = this._change[o];
                return this._updatePrevProperties(), r ? (i = r.apply(this, [t, a, l]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._updateCache(i), this._propagate('resize', t), n = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), e.isEmptyObject(n) || (this._updatePrevProperties(), this._trigger('resize', t, this.ui()), this._applyChanges()), !1) : !1
            },
            _mouseStop: function(t) {
                this.resizing = !1;
                var n, s, r, o, a, l, c, u = this.options,
                    i = this;
                return this._helper && (n = this._proportionallyResizeElements, s = n.length && /textarea/i.test(n[0].nodeName), r = s && this._hasScroll(n[0], 'left') ? 0 : i.sizeDiff.height, o = s ? 0 : i.sizeDiff.width, a = {
                    width: i.helper.width() - o,
                    height: i.helper.height() - r
                }, l = parseInt(i.element.css('left'), 10) + (i.position.left - i.originalPosition.left) || null, c = parseInt(i.element.css('top'), 10) + (i.position.top - i.originalPosition.top) || null, u.animate || this.element.css(e.extend(a, {
                    top: c,
                    left: l
                })), i.helper.height(i.size.height), i.helper.width(i.size.width), this._helper && !u.animate && this._proportionallyResize()), e('body').css('cursor', 'auto'), this.element.removeClass('ui-resizable-resizing'), this._propagate('stop', t), this._helper && this.helper.remove(), !1
            },
            _updatePrevProperties: function() {
                this.prevPosition = {
                    top: this.position.top,
                    left: this.position.left
                }, this.prevSize = {
                    width: this.size.width,
                    height: this.size.height
                }
            },
            _applyChanges: function() {
                var e = {};
                return this.position.top !== this.prevPosition.top && (e.top = this.position.top + 'px'), this.position.left !== this.prevPosition.left && (e.left = this.position.left + 'px'), this.size.width !== this.prevSize.width && (e.width = this.size.width + 'px'), this.size.height !== this.prevSize.height && (e.height = this.size.height + 'px'), this.helper.css(e), e
            },
            _updateVirtualBoundaries: function(e) {
                var n, s, r, o, t, i = this.options;
                t = {
                    minWidth: this._isNumber(i.minWidth) ? i.minWidth : 0,
                    maxWidth: this._isNumber(i.maxWidth) ? i.maxWidth : 1 / 0,
                    minHeight: this._isNumber(i.minHeight) ? i.minHeight : 0,
                    maxHeight: this._isNumber(i.maxHeight) ? i.maxHeight : 1 / 0
                }, (this._aspectRatio || e) && (n = t.minHeight * this.aspectRatio, r = t.minWidth / this.aspectRatio, s = t.maxHeight * this.aspectRatio, o = t.maxWidth / this.aspectRatio, n > t.minWidth && (t.minWidth = n), r > t.minHeight && (t.minHeight = r), t.maxWidth > s && (t.maxWidth = s), t.maxHeight > o && (t.maxHeight = o)), this._vBoundaries = t
            },
            _updateCache: function(e) {
                this.offset = this.helper.offset(), this._isNumber(e.left) && (this.position.left = e.left), this._isNumber(e.top) && (this.position.top = e.top), this._isNumber(e.height) && (this.size.height = e.height), this._isNumber(e.width) && (this.size.width = e.width)
            },
            _updateRatio: function(e) {
                var t = this.position,
                    i = this.size,
                    n = this.axis;
                return this._isNumber(e.height) ? e.width = e.height * this.aspectRatio : this._isNumber(e.width) && (e.height = e.width / this.aspectRatio), 'sw' === n && (e.left = t.left + (i.width - e.width), e.top = null), 'nw' === n && (e.top = t.top + (i.height - e.height), e.left = t.left + (i.width - e.width)), e
            },
            _respectSize: function(e) {
                var t = this._vBoundaries,
                    i = this.axis,
                    n = this._isNumber(e.width) && t.maxWidth && t.maxWidth < e.width,
                    s = this._isNumber(e.height) && t.maxHeight && t.maxHeight < e.height,
                    r = this._isNumber(e.width) && t.minWidth && t.minWidth > e.width,
                    o = this._isNumber(e.height) && t.minHeight && t.minHeight > e.height,
                    a = this.originalPosition.left + this.originalSize.width,
                    l = this.position.top + this.size.height,
                    c = /sw|nw|w/.test(i),
                    u = /nw|ne|n/.test(i);
                return r && (e.width = t.minWidth), o && (e.height = t.minHeight), n && (e.width = t.maxWidth), s && (e.height = t.maxHeight), r && c && (e.left = a - t.minWidth), n && c && (e.left = a - t.maxWidth), o && u && (e.top = l - t.minHeight), s && u && (e.top = l - t.maxHeight), e.width || e.height || e.left || !e.top ? e.width || e.height || e.top || !e.left || (e.left = null) : e.top = null, e
            },
            _getPaddingPlusBorderDimensions: function(e) {
                for (var t = 0, i = [], n = [e.css('borderTopWidth'), e.css('borderRightWidth'), e.css('borderBottomWidth'), e.css('borderLeftWidth')], s = [e.css('paddingTop'), e.css('paddingRight'), e.css('paddingBottom'), e.css('paddingLeft')]; 4 > t; t++) i[t] = parseInt(n[t], 10) || 0, i[t] += parseInt(s[t], 10) || 0;
                return {
                    height: i[0] + i[2],
                    width: i[1] + i[3]
                }
            },
            _proportionallyResize: function() {
                if (this._proportionallyResizeElements.length)
                    for (var e, t = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > t; t++) e = this._proportionallyResizeElements[t], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(e)), e.css({
                        height: i.height() - this.outerDimensions.height || 0,
                        width: i.width() - this.outerDimensions.width || 0
                    })
            },
            _renderProxy: function() {
                var t = this.element,
                    i = this.options;
                this.elementOffset = t.offset(), this._helper ? (this.helper = this.helper || e('<div style=\'overflow:hidden;\'></div>'), this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() - 1,
                    height: this.element.outerHeight() - 1,
                    position: 'absolute',
                    left: this.elementOffset.left + 'px',
                    top: this.elementOffset.top + 'px',
                    zIndex: ++i.zIndex
                }), this.helper.appendTo('body').disableSelection()) : this.helper = this.element
            },
            _change: {
                e: function(e, t) {
                    return {
                        width: this.originalSize.width + t
                    }
                },
                w: function(e, t) {
                    var i = this.originalSize,
                        n = this.originalPosition;
                    return {
                        left: n.left + t,
                        width: i.width - t
                    }
                },
                n: function(e, t, i) {
                    var n = this.originalSize,
                        s = this.originalPosition;
                    return {
                        top: s.top + i,
                        height: n.height - i
                    }
                },
                s: function(e, t, i) {
                    return {
                        height: this.originalSize.height + i
                    }
                },
                se: function(t, i, n) {
                    return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, n]))
                },
                sw: function(t, i, n) {
                    return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, n]))
                },
                ne: function(t, i, n) {
                    return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, n]))
                },
                nw: function(t, i, n) {
                    return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, n]))
                }
            },
            _propagate: function(t, i) {
                e.ui.plugin.call(this, t, [i, this.ui()]), 'resize' !== t && this._trigger(t, i, this.ui())
            },
            plugins: {},
            ui: function() {
                return {
                    originalElement: this.originalElement,
                    element: this.element,
                    helper: this.helper,
                    position: this.position,
                    size: this.size,
                    originalSize: this.originalSize,
                    originalPosition: this.originalPosition
                }
            }
        }), e.ui.plugin.add('resizable', 'animate', {
            stop: function(t) {
                var i = e(this).resizable('instance'),
                    s = i.options,
                    n = i._proportionallyResizeElements,
                    r = n.length && /textarea/i.test(n[0].nodeName),
                    l = r && i._hasScroll(n[0], 'left') ? 0 : i.sizeDiff.height,
                    c = r ? 0 : i.sizeDiff.width,
                    u = {
                        width: i.size.width - c,
                        height: i.size.height - l
                    },
                    o = parseInt(i.element.css('left'), 10) + (i.position.left - i.originalPosition.left) || null,
                    a = parseInt(i.element.css('top'), 10) + (i.position.top - i.originalPosition.top) || null;
                i.element.animate(e.extend(u, a && o ? {
                    top: a,
                    left: o
                } : {}), {
                    duration: s.animateDuration,
                    easing: s.animateEasing,
                    step: function() {
                        var s = {
                            width: parseInt(i.element.css('width'), 10),
                            height: parseInt(i.element.css('height'), 10),
                            top: parseInt(i.element.css('top'), 10),
                            left: parseInt(i.element.css('left'), 10)
                        };
                        n && n.length && e(n[0]).css({
                            width: s.width,
                            height: s.height
                        }), i._updateCache(s), i._propagate('resize', t)
                    }
                })
            }
        }), e.ui.plugin.add('resizable', 'containment', {
            start: function() {
                var n, r, o, a, l, c, u, t = e(this).resizable('instance'),
                    h = t.options,
                    d = t.element,
                    s = h.containment,
                    i = s instanceof e ? s.get(0) : /parent/.test(s) ? d.parent().get(0) : s;
                i && (t.containerElement = e(i), /document/.test(s) || s === document ? (t.containerOffset = {
                    left: 0,
                    top: 0
                }, t.containerPosition = {
                    left: 0,
                    top: 0
                }, t.parentData = {
                    element: e(document),
                    left: 0,
                    top: 0,
                    width: e(document).width(),
                    height: e(document).height() || document.body.parentNode.scrollHeight
                }) : (n = e(i), r = [], e(['Top', 'Right', 'Left', 'Bottom']).each(function(e, i) {
                    r[e] = t._num(n.css('padding' + i))
                }), t.containerOffset = n.offset(), t.containerPosition = n.position(), t.containerSize = {
                    height: n.innerHeight() - r[3],
                    width: n.innerWidth() - r[1]
                }, o = t.containerOffset, a = t.containerSize.height, l = t.containerSize.width, c = t._hasScroll(i, 'left') ? i.scrollWidth : l, u = t._hasScroll(i) ? i.scrollHeight : a, t.parentData = {
                    element: i,
                    left: o.left,
                    top: o.top,
                    width: c,
                    height: u
                }))
            },
            resize: function(t) {
                var a, l, c, u, i = e(this).resizable('instance'),
                    f = i.options,
                    n = i.containerOffset,
                    h = i.position,
                    r = i._aspectRatio || t.shiftKey,
                    o = {
                        top: 0,
                        left: 0
                    },
                    d = i.containerElement,
                    s = !0;
                d[0] !== document && /static/.test(d.css('position')) && (o = n), h.left < (i._helper ? n.left : 0) && (i.size.width = i.size.width + (i._helper ? i.position.left - n.left : i.position.left - o.left), r && (i.size.height = i.size.width / i.aspectRatio, s = !1), i.position.left = f.helper ? n.left : 0), h.top < (i._helper ? n.top : 0) && (i.size.height = i.size.height + (i._helper ? i.position.top - n.top : i.position.top), r && (i.size.width = i.size.height * i.aspectRatio, s = !1), i.position.top = i._helper ? n.top : 0), c = i.containerElement.get(0) === i.element.parent().get(0), u = /relative|absolute/.test(i.containerElement.css('position')), c && u ? (i.offset.left = i.parentData.left + i.position.left, i.offset.top = i.parentData.top + i.position.top) : (i.offset.left = i.element.offset().left, i.offset.top = i.element.offset().top), a = Math.abs(i.sizeDiff.width + (i._helper ? i.offset.left - o.left : i.offset.left - n.left)), l = Math.abs(i.sizeDiff.height + (i._helper ? i.offset.top - o.top : i.offset.top - n.top)), a + i.size.width >= i.parentData.width && (i.size.width = i.parentData.width - a, r && (i.size.height = i.size.width / i.aspectRatio, s = !1)), l + i.size.height >= i.parentData.height && (i.size.height = i.parentData.height - l, r && (i.size.width = i.size.height * i.aspectRatio, s = !1)), s || (i.position.left = i.prevPosition.left, i.position.top = i.prevPosition.top, i.size.width = i.prevSize.width, i.size.height = i.prevSize.height)
            },
            stop: function() {
                var t = e(this).resizable('instance'),
                    n = t.options,
                    s = t.containerOffset,
                    r = t.containerPosition,
                    o = t.containerElement,
                    i = e(t.helper),
                    a = i.offset(),
                    l = i.outerWidth() - t.sizeDiff.width,
                    c = i.outerHeight() - t.sizeDiff.height;
                t._helper && !n.animate && /relative/.test(o.css('position')) && e(this).css({
                    left: a.left - r.left - s.left,
                    width: l,
                    height: c
                }), t._helper && !n.animate && /static/.test(o.css('position')) && e(this).css({
                    left: a.left - r.left - s.left,
                    width: l,
                    height: c
                })
            }
        }), e.ui.plugin.add('resizable', 'alsoResize', {
            start: function() {
                var t = e(this).resizable('instance'),
                    i = t.options;
                e(i.alsoResize).each(function() {
                    var t = e(this);
                    t.data('ui-resizable-alsoresize', {
                        width: parseInt(t.width(), 10),
                        height: parseInt(t.height(), 10),
                        left: parseInt(t.css('left'), 10),
                        top: parseInt(t.css('top'), 10)
                    })
                })
            },
            resize: function(t, i) {
                var n = e(this).resizable('instance'),
                    o = n.options,
                    s = n.originalSize,
                    r = n.originalPosition,
                    a = {
                        height: n.size.height - s.height || 0,
                        width: n.size.width - s.width || 0,
                        top: n.position.top - r.top || 0,
                        left: n.position.left - r.left || 0
                    };
                e(o.alsoResize).each(function() {
                    var t = e(this),
                        s = e(this).data('ui-resizable-alsoresize'),
                        n = {},
                        r = t.parents(i.originalElement[0]).length ? ['width', 'height'] : ['width', 'height', 'top', 'left'];
                    e.each(r, function(e, t) {
                        var i = (s[t] || 0) + (a[t] || 0);
                        i && i >= 0 && (n[t] = i || null)
                    }), t.css(n)
                })
            },
            stop: function() {
                e(this).removeData('resizable-alsoresize')
            }
        }), e.ui.plugin.add('resizable', 'ghost', {
            start: function() {
                var t = e(this).resizable('instance'),
                    i = t.options,
                    n = t.size;
                t.ghost = t.originalElement.clone(), t.ghost.css({
                    opacity: .25,
                    display: 'block',
                    position: 'relative',
                    height: n.height,
                    width: n.width,
                    margin: 0,
                    left: 0,
                    top: 0
                }).addClass('ui-resizable-ghost').addClass('string' == typeof i.ghost ? i.ghost : ''), t.ghost.appendTo(t.helper)
            },
            resize: function() {
                var t = e(this).resizable('instance');
                t.ghost && t.ghost.css({
                    position: 'relative',
                    height: t.size.height,
                    width: t.size.width
                })
            },
            stop: function() {
                var t = e(this).resizable('instance');
                t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
            }
        }), e.ui.plugin.add('resizable', 'grid', {
            resize: function() {
                var c, t = e(this).resizable('instance'),
                    i = t.options,
                    p = t.size,
                    a = t.originalSize,
                    l = t.originalPosition,
                    u = t.axis,
                    h = 'number' == typeof i.grid ? [i.grid, i.grid] : i.grid,
                    r = h[0] || 1,
                    o = h[1] || 1,
                    d = Math.round((p.width - a.width) / r) * r,
                    f = Math.round((p.height - a.height) / o) * o,
                    n = a.width + d,
                    s = a.height + f,
                    m = i.maxWidth && n > i.maxWidth,
                    g = i.maxHeight && s > i.maxHeight,
                    v = i.minWidth && i.minWidth > n,
                    y = i.minHeight && i.minHeight > s;
                i.grid = h, v && (n += r), y && (s += o), m && (n -= r), g && (s -= o), /^(se|s|e)$/.test(u) ? (t.size.width = n, t.size.height = s) : /^(ne)$/.test(u) ? (t.size.width = n, t.size.height = s, t.position.top = l.top - f) : /^(sw)$/.test(u) ? (t.size.width = n, t.size.height = s, t.position.left = l.left - d) : ((0 >= s - o || 0 >= n - r) && (c = t._getPaddingPlusBorderDimensions(this)), s - o > 0 ? (t.size.height = s, t.position.top = l.top - f) : (s = o - c.height, t.size.height = s, t.position.top = l.top + a.height - s), n - r > 0 ? (t.size.width = n, t.position.left = l.left - d) : (n = r - c.width, t.size.width = n, t.position.left = l.left + a.width - n))
            }
        }), e.ui.resizable, e.widget('ui.selectable', e.ui.mouse, {
            version: '1.11.4',
            options: {
                appendTo: 'body',
                autoRefresh: !0,
                distance: 0,
                filter: '*',
                tolerance: 'touch',
                selected: null,
                selecting: null,
                start: null,
                stop: null,
                unselected: null,
                unselecting: null
            },
            _create: function() {
                var t, i = this;
                this.element.addClass('ui-selectable'), this.dragged = !1, this.refresh = function() {
                    t = e(i.options.filter, i.element[0]), t.addClass('ui-selectee'), t.each(function() {
                        var t = e(this),
                            i = t.offset();
                        e.data(this, 'selectable-item', {
                            element: this,
                            $element: t,
                            left: i.left,
                            top: i.top,
                            right: i.left + t.outerWidth(),
                            bottom: i.top + t.outerHeight(),
                            startselected: !1,
                            selected: t.hasClass('ui-selected'),
                            selecting: t.hasClass('ui-selecting'),
                            unselecting: t.hasClass('ui-unselecting')
                        })
                    })
                }, this.refresh(), this.selectees = t.addClass('ui-selectee'), this._mouseInit(), this.helper = e('<div class=\'ui-selectable-helper\'></div>')
            },
            _destroy: function() {
                this.selectees.removeClass('ui-selectee').removeData('selectable-item'), this.element.removeClass('ui-selectable ui-selectable-disabled'), this._mouseDestroy()
            },
            _mouseStart: function(t) {
                var i = this,
                    n = this.options;
                this.opos = [t.pageX, t.pageY], this.options.disabled || (this.selectees = e(n.filter, this.element[0]), this._trigger('start', t), e(n.appendTo).append(this.helper), this.helper.css({
                    left: t.pageX,
                    top: t.pageY,
                    width: 0,
                    height: 0
                }), n.autoRefresh && this.refresh(), this.selectees.filter('.ui-selected').each(function() {
                    var n = e.data(this, 'selectable-item');
                    n.startselected = !0, t.metaKey || t.ctrlKey || (n.$element.removeClass('ui-selected'), n.selected = !1, n.$element.addClass('ui-unselecting'), n.unselecting = !0, i._trigger('unselecting', t, {
                        unselecting: n.element
                    }))
                }), e(t.target).parents().addBack().each(function() {
                    var s, n = e.data(this, 'selectable-item');
                    return n ? (s = !t.metaKey && !t.ctrlKey || !n.$element.hasClass('ui-selected'), n.$element.removeClass(s ? 'ui-unselecting' : 'ui-selected').addClass(s ? 'ui-selecting' : 'ui-unselecting'), n.unselecting = !s, n.selecting = s, n.selected = s, s ? i._trigger('selecting', t, {
                        selecting: n.element
                    }) : i._trigger('unselecting', t, {
                        unselecting: n.element
                    }), !1) : void 0
                }))
            },
            _mouseDrag: function(t) {
                if (this.dragged = !0, !this.options.disabled) {
                    var o, a = this,
                        l = this.options,
                        i = this.opos[0],
                        n = this.opos[1],
                        s = t.pageX,
                        r = t.pageY;
                    return i > s && (o = s, s = i, i = o), n > r && (o = r, r = n, n = o), this.helper.css({
                        left: i,
                        top: n,
                        width: s - i,
                        height: r - n
                    }), this.selectees.each(function() {
                        var o = e.data(this, 'selectable-item'),
                            c = !1;
                        o && o.element !== a.element[0] && ('touch' === l.tolerance ? c = !(o.left > s || i > o.right || o.top > r || n > o.bottom) : 'fit' === l.tolerance && (c = o.left > i && s > o.right && o.top > n && r > o.bottom), c ? (o.selected && (o.$element.removeClass('ui-selected'), o.selected = !1), o.unselecting && (o.$element.removeClass('ui-unselecting'), o.unselecting = !1), o.selecting || (o.$element.addClass('ui-selecting'), o.selecting = !0, a._trigger('selecting', t, {
                            selecting: o.element
                        }))) : (o.selecting && ((t.metaKey || t.ctrlKey) && o.startselected ? (o.$element.removeClass('ui-selecting'), o.selecting = !1, o.$element.addClass('ui-selected'), o.selected = !0) : (o.$element.removeClass('ui-selecting'), o.selecting = !1, o.startselected && (o.$element.addClass('ui-unselecting'), o.unselecting = !0), a._trigger('unselecting', t, {
                            unselecting: o.element
                        }))), o.selected && (t.metaKey || t.ctrlKey || o.startselected || (o.$element.removeClass('ui-selected'), o.selected = !1, o.$element.addClass('ui-unselecting'), o.unselecting = !0, a._trigger('unselecting', t, {
                            unselecting: o.element
                        })))))
                    }), !1
                }
            },
            _mouseStop: function(t) {
                var i = this;
                return this.dragged = !1, e('.ui-unselecting', this.element[0]).each(function() {
                    var n = e.data(this, 'selectable-item');
                    n.$element.removeClass('ui-unselecting'), n.unselecting = !1, n.startselected = !1, i._trigger('unselected', t, {
                        unselected: n.element
                    })
                }), e('.ui-selecting', this.element[0]).each(function() {
                    var n = e.data(this, 'selectable-item');
                    n.$element.removeClass('ui-selecting').addClass('ui-selected'), n.selecting = !1, n.selected = !0, n.startselected = !0, i._trigger('selected', t, {
                        selected: n.element
                    })
                }), this._trigger('stop', t), this.helper.remove(), !1
            }
        }), e.widget('ui.sortable', e.ui.mouse, {
            version: '1.11.4',
            widgetEventPrefix: 'sort',
            ready: !1,
            options: {
                appendTo: 'parent',
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: 'auto',
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: 'original',
                items: '> *',
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: 'default',
                tolerance: 'intersect',
                zIndex: 1e3,
                activate: null,
                beforeStop: null,
                change: null,
                deactivate: null,
                out: null,
                over: null,
                receive: null,
                remove: null,
                sort: null,
                start: null,
                stop: null,
                update: null
            },
            _isOverAxis: function(e, t, i) {
                return e >= t && t + i > e
            },
            _isFloating: function(e) {
                return /left|right/.test(e.css('float')) || /inline|table-cell/.test(e.css('display'))
            },
            _create: function() {
                this.containerCache = {}, this.element.addClass('ui-sortable'), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
            },
            _setOption: function(e, t) {
                this._super(e, t), 'handle' === e && this._setHandleClassName()
            },
            _setHandleClassName: function() {
                this.element.find('.ui-sortable-handle').removeClass('ui-sortable-handle'), e.each(this.items, function() {
                    (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass('ui-sortable-handle')
                })
            },
            _destroy: function() {
                this.element.removeClass('ui-sortable ui-sortable-disabled').find('.ui-sortable-handle').removeClass('ui-sortable-handle'), this._mouseDestroy();
                for (var e = this.items.length - 1; e >= 0; e--) this.items[e].item.removeData(this.widgetName + '-item');
                return this
            },
            _mouseCapture: function(t, i) {
                var n = null,
                    r = !1,
                    s = this;
                return this.reverting ? !1 : this.options.disabled || 'static' === this.options.type ? !1 : (this._refreshItems(t), e(t.target).parents().each(function() {
                    return e.data(this, s.widgetName + '-item') === s ? (n = e(this), !1) : void 0
                }), e.data(t.target, s.widgetName + '-item') === s && (n = e(t.target)), n ? !this.options.handle || i || (e(this.options.handle, n).find('*').addBack().each(function() {
                    this === t.target && (r = !0)
                }), r) ? (this.currentItem = n, this._removeCurrentsFromItems(), !0) : !1 : !1)
            },
            _mouseStart: function(t, i, n) {
                var r, o, s = this.options;
                if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left
                    }, e.extend(this.offset, {
                        click: {
                            left: t.pageX - this.offset.left,
                            top: t.pageY - this.offset.top
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset()
                    }), this.helper.css('position', 'absolute'), this.cssPosition = this.helper.css('position'), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, s.cursorAt && this._adjustOffsetFromHelper(s.cursorAt), this.domPosition = {
                        prev: this.currentItem.prev()[0],
                        parent: this.currentItem.parent()[0]
                    }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), s.containment && this._setContainment(), s.cursor && 'auto' !== s.cursor && (o = this.document.find('body'), this.storedCursor = o.css('cursor'), o.css('cursor', s.cursor), this.storedStylesheet = e('<style>*{ cursor: ' + s.cursor + ' !important; }</style>').appendTo(o)), s.opacity && (this.helper.css('opacity') && (this._storedOpacity = this.helper.css('opacity')), this.helper.css('opacity', s.opacity)), s.zIndex && (this.helper.css('zIndex') && (this._storedZIndex = this.helper.css('zIndex')), this.helper.css('zIndex', s.zIndex)), this.scrollParent[0] !== this.document[0] && 'HTML' !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger('start', t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !n)
                    for (r = this.containers.length - 1; r >= 0; r--) this.containers[r]._trigger('activate', t, this._uiHash(this));
                return e.ui.ddmanager && (e.ui.ddmanager.current = this), e.ui.ddmanager && !s.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass('ui-sortable-helper'), this._mouseDrag(t), !0
            },
            _mouseDrag: function(t) {
                var o, s, r, a, i = this.options,
                    n = !1;
                for (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo('absolute'), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && 'HTML' !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? this.scrollParent[0].scrollTop = n = this.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - this.overflowOffset.top < i.scrollSensitivity && (this.scrollParent[0].scrollTop = n = this.scrollParent[0].scrollTop - i.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? this.scrollParent[0].scrollLeft = n = this.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - this.overflowOffset.left < i.scrollSensitivity && (this.scrollParent[0].scrollLeft = n = this.scrollParent[0].scrollLeft - i.scrollSpeed)) : (t.pageY - this.document.scrollTop() < i.scrollSensitivity ? n = this.document.scrollTop(this.document.scrollTop() - i.scrollSpeed) : this.window.height() - (t.pageY - this.document.scrollTop()) < i.scrollSensitivity && (n = this.document.scrollTop(this.document.scrollTop() + i.scrollSpeed)), t.pageX - this.document.scrollLeft() < i.scrollSensitivity ? n = this.document.scrollLeft(this.document.scrollLeft() - i.scrollSpeed) : this.window.width() - (t.pageX - this.document.scrollLeft()) < i.scrollSensitivity && (n = this.document.scrollLeft(this.document.scrollLeft() + i.scrollSpeed))), n !== !1 && e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo('absolute'), this.options.axis && 'y' === this.options.axis || (this.helper[0].style.left = this.position.left + 'px'), this.options.axis && 'x' === this.options.axis || (this.helper[0].style.top = this.position.top + 'px'), o = this.items.length - 1; o >= 0; o--)
                    if (s = this.items[o], r = s.item[0], a = this._intersectsWithPointer(s), a && s.instance === this.currentContainer && r !== this.currentItem[0] && this.placeholder[1 === a ? 'next' : 'prev']()[0] !== r && !e.contains(this.placeholder[0], r) && ('semi-dynamic' === this.options.type ? !e.contains(this.element[0], r) : !0)) {
                        if (this.direction = 1 === a ? 'down' : 'up', 'pointer' !== this.options.tolerance && !this._intersectsWithSides(s)) break;
                        this._rearrange(t, s), this._trigger('change', t, this._uiHash());
                        break
                    };
                return this._contactContainers(t), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), this._trigger('sort', t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
            },
            _mouseStop: function(t, i) {
                if (t) {
                    if (e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t), this.options.revert) {
                        var o = this,
                            r = this.placeholder.offset(),
                            n = this.options.axis,
                            s = {};
                        n && 'x' !== n || (s.left = r.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), n && 'y' !== n || (s.top = r.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, e(this.helper).animate(s, parseInt(this.options.revert, 10) || 500, function() {
                            o._clear(t)
                        })
                    } else this._clear(t, i);
                    return !1
                }
            },
            cancel: function() {
                if (this.dragging) {
                    this._mouseUp({
                        target: null
                    }), 'original' === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass('ui-sortable-helper') : this.currentItem.show();
                    for (var t = this.containers.length - 1; t >= 0; t--) this.containers[t]._trigger('deactivate', null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger('out', null, this._uiHash(this)), this.containers[t].containerCache.over = 0)
                };
                return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 'original' !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), e.extend(this, {
                    helper: null,
                    dragging: !1,
                    reverting: !1,
                    _noFinalSort: null
                }), this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) : e(this.domPosition.parent).prepend(this.currentItem)), this
            },
            serialize: function(t) {
                var n = this._getItemsAsjQuery(t && t.connected),
                    i = [];
                return t = t || {}, e(n).each(function() {
                    var n = (e(t.item || this).attr(t.attribute || 'id') || '').match(t.expression || /(.+)[\-=_](.+)/);
                    n && i.push((t.key || n[1] + '[]') + '=' + (t.key && t.expression ? n[1] : n[2]))
                }), !i.length && t.key && i.push(t.key + '='), i.join('&')
            },
            toArray: function(t) {
                var n = this._getItemsAsjQuery(t && t.connected),
                    i = [];
                return t = t || {}, n.each(function() {
                    i.push(e(t.item || this).attr(t.attribute || 'id') || '')
                }), i
            },
            _intersectsWith: function(e) {
                var t = this.positionAbs.left,
                    c = t + this.helperProportions.width,
                    i = this.positionAbs.top,
                    u = i + this.helperProportions.height,
                    n = e.left,
                    r = n + e.width,
                    s = e.top,
                    o = s + e.height,
                    a = this.offset.click.top,
                    l = this.offset.click.left,
                    h = 'x' === this.options.axis || i + a > s && o > i + a,
                    d = 'y' === this.options.axis || t + l > n && r > t + l,
                    f = h && d;
                return 'pointer' === this.options.tolerance || this.options.forcePointerForContainers || 'pointer' !== this.options.tolerance && this.helperProportions[this.floating ? 'width' : 'height'] > e[this.floating ? 'width' : 'height'] ? f : t + this.helperProportions.width / 2 > n && r > c - this.helperProportions.width / 2 && i + this.helperProportions.height / 2 > s && o > u - this.helperProportions.height / 2
            },
            _intersectsWithPointer: function(e) {
                var n = 'x' === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, e.top, e.height),
                    s = 'y' === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, e.left, e.width),
                    r = n && s,
                    t = this._getDragVerticalDirection(),
                    i = this._getDragHorizontalDirection();
                return r ? this.floating ? i && 'right' === i || 'down' === t ? 2 : 1 : t && ('down' === t ? 2 : 1) : !1
            },
            _intersectsWithSides: function(e) {
                var n = this._isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height),
                    s = this._isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width),
                    t = this._getDragVerticalDirection(),
                    i = this._getDragHorizontalDirection();
                return this.floating && i ? 'right' === i && s || 'left' === i && !s : t && ('down' === t && n || 'up' === t && !n)
            },
            _getDragVerticalDirection: function() {
                var e = this.positionAbs.top - this.lastPositionAbs.top;
                return 0 !== e && (e > 0 ? 'down' : 'up')
            },
            _getDragHorizontalDirection: function() {
                var e = this.positionAbs.left - this.lastPositionAbs.left;
                return 0 !== e && (e > 0 ? 'right' : 'left')
            },
            refresh: function(e) {
                return this._refreshItems(e), this._setHandleClassName(), this.refreshPositions(), this
            },
            _connectWith: function() {
                var e = this.options;
                return e.connectWith.constructor === String ? [e.connectWith] : e.connectWith
            },
            _getItemsAsjQuery: function(t) {
                function c() {
                    l.push(this)
                };
                var n, s, o, i, l = [],
                    r = [],
                    a = this._connectWith();
                if (a && t)
                    for (n = a.length - 1; n >= 0; n--)
                        for (o = e(a[n], this.document[0]), s = o.length - 1; s >= 0; s--) i = e.data(o[s], this.widgetFullName), i && i !== this && !i.options.disabled && r.push([e.isFunction(i.options.items) ? i.options.items.call(i.element) : e(i.options.items, i.element).not('.ui-sortable-helper').not('.ui-sortable-placeholder'), i]);
                for (r.push([e.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                        options: this.options,
                        item: this.currentItem
                    }) : e(this.options.items, this.element).not('.ui-sortable-helper').not('.ui-sortable-placeholder'), this]), n = r.length - 1; n >= 0; n--) r[n][0].each(c);
                return e(l)
            },
            _removeCurrentsFromItems: function() {
                var t = this.currentItem.find(':data(' + this.widgetName + '-item)');
                this.items = e.grep(this.items, function(e) {
                    for (var i = 0; t.length > i; i++)
                        if (t[i] === e.item[0]) return !1;
                    return !0
                })
            },
            _refreshItems: function(t) {
                this.items = [], this.containers = [this];
                var n, s, o, i, a, l, c, h, d = this.items,
                    r = [
                        [e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
                            item: this.currentItem
                        }) : e(this.options.items, this.element), this]
                    ],
                    u = this._connectWith();
                if (u && this.ready)
                    for (n = u.length - 1; n >= 0; n--)
                        for (o = e(u[n], this.document[0]), s = o.length - 1; s >= 0; s--) i = e.data(o[s], this.widgetFullName), i && i !== this && !i.options.disabled && (r.push([e.isFunction(i.options.items) ? i.options.items.call(i.element[0], t, {
                            item: this.currentItem
                        }) : e(i.options.items, i.element), i]), this.containers.push(i));
                for (n = r.length - 1; n >= 0; n--)
                    for (a = r[n][1], l = r[n][0], s = 0, h = l.length; h > s; s++) c = e(l[s]), c.data(this.widgetName + '-item', a), d.push({
                        item: c,
                        instance: a,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
            },
            refreshPositions: function(t) {
                this.floating = this.items.length ? 'x' === this.options.axis || this._isFloating(this.items[0].item) : !1, this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                var i, n, r, s;
                for (i = this.items.length - 1; i >= 0; i--) n = this.items[i], n.instance !== this.currentContainer && this.currentContainer && n.item[0] !== this.currentItem[0] || (r = this.options.toleranceElement ? e(this.options.toleranceElement, n.item) : n.item, t || (n.width = r.outerWidth(), n.height = r.outerHeight()), s = r.offset(), n.left = s.left, n.top = s.top);
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else
                    for (i = this.containers.length - 1; i >= 0; i--) s = this.containers[i].element.offset(), this.containers[i].containerCache.left = s.left, this.containers[i].containerCache.top = s.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                return this
            },
            _createPlaceholder: function(t) {
                t = t || this;
                var n, i = t.options;
                i.placeholder && i.placeholder.constructor !== String || (n = i.placeholder, i.placeholder = {
                    element: function() {
                        var s = t.currentItem[0].nodeName.toLowerCase(),
                            i = e('<' + s + '>', t.document[0]).addClass(n || t.currentItem[0].className + ' ui-sortable-placeholder').removeClass('ui-sortable-helper');
                        return 'tbody' === s ? t._createTrPlaceholder(t.currentItem.find('tr').eq(0), e('<tr>', t.document[0]).appendTo(i)) : 'tr' === s ? t._createTrPlaceholder(t.currentItem, i) : 'img' === s && i.attr('src', t.currentItem.attr('src')), n || i.css('visibility', 'hidden'), i
                    },
                    update: function(e, s) {
                        (!n || i.forcePlaceholderSize) && (s.height() || s.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css('paddingTop') || 0, 10) - parseInt(t.currentItem.css('paddingBottom') || 0, 10)), s.width() || s.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css('paddingLeft') || 0, 10) - parseInt(t.currentItem.css('paddingRight') || 0, 10)))
                    }
                }), t.placeholder = e(i.placeholder.element.call(t.element, t.currentItem)), t.currentItem.after(t.placeholder), i.placeholder.update(t, t.placeholder)
            },
            _createTrPlaceholder: function(t, i) {
                var n = this;
                t.children().each(function() {
                    e('<td>&#160;</td>', n.document[0]).attr('colspan', e(this).attr('colspan') || 1).appendTo(i)
                })
            },
            _contactContainers: function(t) {
                var n, s, u, r, d, f, a, h, l, c, o = null,
                    i = null;
                for (n = this.containers.length - 1; n >= 0; n--)
                    if (!e.contains(this.currentItem[0], this.containers[n].element[0]))
                        if (this._intersectsWith(this.containers[n].containerCache)) {
                            if (o && e.contains(this.containers[n].element[0], o.element[0])) continue;
                            o = this.containers[n], i = n
                        } else this.containers[n].containerCache.over && (this.containers[n]._trigger('out', t, this._uiHash(this)), this.containers[n].containerCache.over = 0);
                if (o)
                    if (1 === this.containers.length) this.containers[i].containerCache.over || (this.containers[i]._trigger('over', t, this._uiHash(this)), this.containers[i].containerCache.over = 1);
                    else {
                        for (u = 1e4, r = null, l = o.floating || this._isFloating(this.currentItem), d = l ? 'left' : 'top', f = l ? 'width' : 'height', c = l ? 'clientX' : 'clientY', s = this.items.length - 1; s >= 0; s--) e.contains(this.containers[i].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (a = this.items[s].item.offset()[d], h = !1, t[c] - a > this.items[s][f] / 2 && (h = !0), u > Math.abs(t[c] - a) && (u = Math.abs(t[c] - a), r = this.items[s], this.direction = h ? 'up' : 'down'));
                        if (!r && !this.options.dropOnEmpty) return;
                        if (this.currentContainer === this.containers[i]) return this.currentContainer.containerCache.over || (this.containers[i]._trigger('over', t, this._uiHash()), this.currentContainer.containerCache.over = 1), void 0;
                        r ? this._rearrange(t, r, null, !0) : this._rearrange(t, null, this.containers[i].element, !0), this._trigger('change', t, this._uiHash()), this.containers[i]._trigger('change', t, this._uiHash(this)), this.currentContainer = this.containers[i], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[i]._trigger('over', t, this._uiHash(this)), this.containers[i].containerCache.over = 1
                    }
            },
            _createHelper: function(t) {
                var n = this.options,
                    i = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t, this.currentItem])) : 'clone' === n.helper ? this.currentItem.clone() : this.currentItem;
                return i.parents('body').length || e('parent' !== n.appendTo ? n.appendTo : this.currentItem[0].parentNode)[0].appendChild(i[0]), i[0] === this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css('position'),
                    top: this.currentItem.css('top'),
                    left: this.currentItem.css('left')
                }), (!i[0].style.width || n.forceHelperSize) && i.width(this.currentItem.width()), (!i[0].style.height || n.forceHelperSize) && i.height(this.currentItem.height()), i
            },
            _adjustOffsetFromHelper: function(t) {
                'string' == typeof t && (t = t.split(' ')), e.isArray(t) && (t = {
                    left: +t[0],
                    top: +t[1] || 0
                }), 'left' in t && (this.offset.click.left = t.left + this.margins.left), 'right' in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), 'top' in t && (this.offset.click.top = t.top + this.margins.top), 'bottom' in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                this.offsetParent = this.helper.offsetParent();
                var t = this.offsetParent.offset();
                return 'absolute' === this.cssPosition && this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && 'html' === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {
                    top: 0,
                    left: 0
                }), {
                    top: t.top + (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
                    left: t.left + (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ('relative' === this.cssPosition) {
                    var e = this.currentItem.position();
                    return {
                        top: e.top - (parseInt(this.helper.css('top'), 10) || 0) + this.scrollParent.scrollTop(),
                        left: e.left - (parseInt(this.helper.css('left'), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                };
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.currentItem.css('marginLeft'), 10) || 0,
                    top: parseInt(this.currentItem.css('marginTop'), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var t, n, s, i = this.options;
                'parent' === i.containment && (i.containment = this.helper[0].parentNode), ('document' === i.containment || 'window' === i.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, 'document' === i.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ('document' === i.containment ? this.document.width() : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(i.containment) || (t = e(i.containment)[0], n = e(i.containment).offset(), s = 'hidden' !== e(t).css('overflow'), this.containment = [n.left + (parseInt(e(t).css('borderLeftWidth'), 10) || 0) + (parseInt(e(t).css('paddingLeft'), 10) || 0) - this.margins.left, n.top + (parseInt(e(t).css('borderTopWidth'), 10) || 0) + (parseInt(e(t).css('paddingTop'), 10) || 0) - this.margins.top, n.left + (s ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(e(t).css('borderLeftWidth'), 10) || 0) - (parseInt(e(t).css('paddingRight'), 10) || 0) - this.helperProportions.width - this.margins.left, n.top + (s ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(e(t).css('borderTopWidth'), 10) || 0) - (parseInt(e(t).css('paddingBottom'), 10) || 0) - this.helperProportions.height - this.margins.top])
            },
            _convertPositionTo: function(t, i) {
                i || (i = this.position);
                var n = 'absolute' === t ? 1 : -1,
                    s = 'absolute' !== this.cssPosition || this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    r = /(html|body)/i.test(s[0].tagName);
                return {
                    top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ('fixed' === this.cssPosition ? -this.scrollParent.scrollTop() : r ? 0 : s.scrollTop()) * n,
                    left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ('fixed' === this.cssPosition ? -this.scrollParent.scrollLeft() : r ? 0 : s.scrollLeft()) * n
                }
            },
            _generatePosition: function(t) {
                var n, s, i = this.options,
                    r = t.pageX,
                    o = t.pageY,
                    a = 'absolute' !== this.cssPosition || this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    l = /(html|body)/i.test(a[0].tagName);
                return 'relative' !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (r = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (r = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top)), i.grid && (n = this.originalPageY + Math.round((o - this.originalPageY) / i.grid[1]) * i.grid[1], o = this.containment ? n - this.offset.click.top >= this.containment[1] && n - this.offset.click.top <= this.containment[3] ? n : n - this.offset.click.top >= this.containment[1] ? n - i.grid[1] : n + i.grid[1] : n, s = this.originalPageX + Math.round((r - this.originalPageX) / i.grid[0]) * i.grid[0], r = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - i.grid[0] : s + i.grid[0] : s)), {
                    top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ('fixed' === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : a.scrollTop()),
                    left: r - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ('fixed' === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : a.scrollLeft())
                }
            },
            _rearrange: function(e, t, i, n) {
                i ? i[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], 'down' === this.direction ? t.item[0] : t.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
                var s = this.counter;
                this._delay(function() {
                    s === this.counter && this.refreshPositions(!n)
                })
            },
            _clear: function(e, t) {
                function s(e, t, i) {
                    return function(n) {
                        i._trigger(e, n, t._uiHash(t))
                    }
                };
                this.reverting = !1;
                var i, n = [];
                if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                    for (i in this._storedCSS)('auto' === this._storedCSS[i] || 'static' === this._storedCSS[i]) && (this._storedCSS[i] = '');
                    this.currentItem.css(this._storedCSS).removeClass('ui-sortable-helper')
                } else this.currentItem.show();
                for (this.fromOutside && !t && n.push(function(e) {
                        this._trigger('receive', e, this._uiHash(this.fromOutside))
                    }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not('.ui-sortable-helper')[0] && this.domPosition.parent === this.currentItem.parent()[0] || t || n.push(function(e) {
                        this._trigger('update', e, this._uiHash())
                    }), this !== this.currentContainer && (t || (n.push(function(e) {
                        this._trigger('remove', e, this._uiHash())
                    }), n.push(function(e) {
                        return function(t) {
                            e._trigger('receive', t, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)), n.push(function(e) {
                        return function(t) {
                            e._trigger('update', t, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--) t || n.push(s('deactivate', this, this.containers[i])), this.containers[i].containerCache.over && (n.push(s('out', this, this.containers[i])), this.containers[i].containerCache.over = 0);
                if (this.storedCursor && (this.document.find('body').css('cursor', this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css('opacity', this._storedOpacity), this._storedZIndex && this.helper.css('zIndex', 'auto' === this._storedZIndex ? '' : this._storedZIndex), this.dragging = !1, t || this._trigger('beforeStop', e, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !t) {
                    for (i = 0; n.length > i; i++) n[i].call(this, e);
                    this._trigger('stop', e, this._uiHash())
                };
                return this.fromOutside = !1, !this.cancelHelperRemoval
            },
            _trigger: function() {
                e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
            },
            _uiHash: function(t) {
                var i = t || this;
                return {
                    helper: i.helper,
                    placeholder: i.placeholder || e([]),
                    position: i.position,
                    originalPosition: i.originalPosition,
                    offset: i.positionAbs,
                    item: i.currentItem,
                    sender: t ? t.element : null
                }
            }
        }), e.widget('ui.menu', {
            version: '1.11.4',
            defaultElement: '<ul>',
            delay: 300,
            options: {
                icons: {
                    submenu: 'ui-icon-carat-1-e'
                },
                items: '> *',
                menus: 'ul',
                position: {
                    my: 'left-1 top',
                    at: 'right top'
                },
                role: 'menu',
                blur: null,
                focus: null,
                select: null
            },
            _create: function() {
                this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass('ui-menu ui-widget ui-widget-content').toggleClass('ui-menu-icons', !!this.element.find('.ui-icon').length).attr({
                    role: this.options.role,
                    tabIndex: 0
                }), this.options.disabled && this.element.addClass('ui-state-disabled').attr('aria-disabled', 'true'), this._on({
                    'mousedown .ui-menu-item': function(e) {
                        e.preventDefault()
                    },
                    'click .ui-menu-item': function(t) {
                        var i = e(t.target);
                        !this.mouseHandled && i.not('.ui-state-disabled').length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), i.has('.ui-menu').length ? this.expand(t) : !this.element.is(':focus') && e(this.document[0].activeElement).closest('.ui-menu').length && (this.element.trigger('focus', [!0]), this.active && 1 === this.active.parents('.ui-menu').length && clearTimeout(this.timer)))
                    },
                    'mouseenter .ui-menu-item': function(t) {
                        if (!this.previousFilter) {
                            var i = e(t.currentTarget);
                            i.siblings('.ui-state-active').removeClass('ui-state-active'), this.focus(t, i)
                        }
                    },
                    mouseleave: 'collapseAll',
                    'mouseleave .ui-menu': 'collapseAll',
                    focus: function(e, t) {
                        var i = this.active || this.element.find(this.options.items).eq(0);
                        t || this.focus(e, i)
                    },
                    blur: function(t) {
                        this._delay(function() {
                            e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
                        })
                    },
                    keydown: '_keydown'
                }), this.refresh(), this._on(this.document, {
                    click: function(e) {
                        this._closeOnDocumentClick(e) && this.collapseAll(e), this.mouseHandled = !1
                    }
                })
            },
            _destroy: function() {
                this.element.removeAttr('aria-activedescendant').find('.ui-menu').addBack().removeClass('ui-menu ui-widget ui-widget-content ui-menu-icons ui-front').removeAttr('role').removeAttr('tabIndex').removeAttr('aria-labelledby').removeAttr('aria-expanded').removeAttr('aria-hidden').removeAttr('aria-disabled').removeUniqueId().show(), this.element.find('.ui-menu-item').removeClass('ui-menu-item').removeAttr('role').removeAttr('aria-disabled').removeUniqueId().removeClass('ui-state-hover').removeAttr('tabIndex').removeAttr('role').removeAttr('aria-haspopup').children().each(function() {
                    var t = e(this);
                    t.data('ui-menu-submenu-carat') && t.remove()
                }), this.element.find('.ui-menu-divider').removeClass('ui-menu-divider ui-widget-content')
            },
            _keydown: function(t) {
                var i, s, n, r, o = !0;
                switch (t.keyCode) {
                    case e.ui.keyCode.PAGE_UP:
                        this.previousPage(t);
                        break;
                    case e.ui.keyCode.PAGE_DOWN:
                        this.nextPage(t);
                        break;
                    case e.ui.keyCode.HOME:
                        this._move('first', 'first', t);
                        break;
                    case e.ui.keyCode.END:
                        this._move('last', 'last', t);
                        break;
                    case e.ui.keyCode.UP:
                        this.previous(t);
                        break;
                    case e.ui.keyCode.DOWN:
                        this.next(t);
                        break;
                    case e.ui.keyCode.LEFT:
                        this.collapse(t);
                        break;
                    case e.ui.keyCode.RIGHT:
                        this.active && !this.active.is('.ui-state-disabled') && this.expand(t);
                        break;
                    case e.ui.keyCode.ENTER:
                    case e.ui.keyCode.SPACE:
                        this._activate(t);
                        break;
                    case e.ui.keyCode.ESCAPE:
                        this.collapse(t);
                        break;
                    default:
                        o = !1, s = this.previousFilter || '', n = String.fromCharCode(t.keyCode), r = !1, clearTimeout(this.filterTimer), n === s ? r = !0 : n = s + n, i = this._filterMenuItems(n), i = r && -1 !== i.index(this.active.next()) ? this.active.nextAll('.ui-menu-item') : i, i.length || (n = String.fromCharCode(t.keyCode), i = this._filterMenuItems(n)), i.length ? (this.focus(t, i), this.previousFilter = n, this.filterTimer = this._delay(function() {
                            delete this.previousFilter
                        }, 1e3)) : delete this.previousFilter
                };
                o && t.preventDefault()
            },
            _activate: function(e) {
                this.active.is('.ui-state-disabled') || (this.active.is('[aria-haspopup=\'true\']') ? this.expand(e) : this.select(e))
            },
            refresh: function() {
                var i, t, s = this,
                    r = this.options.icons.submenu,
                    n = this.element.find(this.options.menus);
                this.element.toggleClass('ui-menu-icons', !!this.element.find('.ui-icon').length), n.filter(':not(.ui-menu)').addClass('ui-menu ui-widget ui-widget-content ui-front').hide().attr({
                    role: this.options.role,
                    'aria-hidden': 'true',
                    'aria-expanded': 'false'
                }).each(function() {
                    var t = e(this),
                        i = t.parent(),
                        n = e('<span>').addClass('ui-menu-icon ui-icon ' + r).data('ui-menu-submenu-carat', !0);
                    i.attr('aria-haspopup', 'true').prepend(n), t.attr('aria-labelledby', i.attr('id'))
                }), i = n.add(this.element), t = i.find(this.options.items), t.not('.ui-menu-item').each(function() {
                    var t = e(this);
                    s._isDivider(t) && t.addClass('ui-widget-content ui-menu-divider')
                }), t.not('.ui-menu-item, .ui-menu-divider').addClass('ui-menu-item').uniqueId().attr({
                    tabIndex: -1,
                    role: this._itemRole()
                }), t.filter('.ui-state-disabled').attr('aria-disabled', 'true'), this.active && !e.contains(this.element[0], this.active[0]) && this.blur()
            },
            _itemRole: function() {
                return {
                    menu: 'menuitem',
                    listbox: 'option'
                }[this.options.role]
            },
            _setOption: function(e, t) {
                'icons' === e && this.element.find('.ui-menu-icon').removeClass(this.options.icons.submenu).addClass(t.submenu), 'disabled' === e && this.element.toggleClass('ui-state-disabled', !!t).attr('aria-disabled', t), this._super(e, t)
            },
            focus: function(e, t) {
                var i, n;
                this.blur(e, e && 'focus' === e.type), this._scrollIntoView(t), this.active = t.first(), n = this.active.addClass('ui-state-focus').removeClass('ui-state-active'), this.options.role && this.element.attr('aria-activedescendant', n.attr('id')), this.active.parent().closest('.ui-menu-item').addClass('ui-state-active'), e && 'keydown' === e.type ? this._close() : this.timer = this._delay(function() {
                    this._close()
                }, this.delay), i = t.children('.ui-menu'), i.length && e && /^mouse/.test(e.type) && this._startOpening(i), this.activeMenu = t.parent(), this._trigger('focus', e, {
                    item: t
                })
            },
            _scrollIntoView: function(t) {
                var o, a, i, n, s, r;
                this._hasScroll() && (o = parseFloat(e.css(this.activeMenu[0], 'borderTopWidth')) || 0, a = parseFloat(e.css(this.activeMenu[0], 'paddingTop')) || 0, i = t.offset().top - this.activeMenu.offset().top - o - a, n = this.activeMenu.scrollTop(), s = this.activeMenu.height(), r = t.outerHeight(), 0 > i ? this.activeMenu.scrollTop(n + i) : i + r > s && this.activeMenu.scrollTop(n + i - s + r))
            },
            blur: function(e, t) {
                t || clearTimeout(this.timer), this.active && (this.active.removeClass('ui-state-focus'), this.active = null, this._trigger('blur', e, {
                    item: this.active
                }))
            },
            _startOpening: function(e) {
                clearTimeout(this.timer), 'true' === e.attr('aria-hidden') && (this.timer = this._delay(function() {
                    this._close(), this._open(e)
                }, this.delay))
            },
            _open: function(t) {
                var i = e.extend({
                    of: this.active
                }, this.options.position);
                clearTimeout(this.timer), this.element.find('.ui-menu').not(t.parents('.ui-menu')).hide().attr('aria-hidden', 'true'), t.show().removeAttr('aria-hidden').attr('aria-expanded', 'true').position(i)
            },
            collapseAll: function(t, i) {
                clearTimeout(this.timer), this.timer = this._delay(function() {
                    var n = i ? this.element : e(t && t.target).closest(this.element.find('.ui-menu'));
                    n.length || (n = this.element), this._close(n), this.blur(t), this.activeMenu = n
                }, this.delay)
            },
            _close: function(e) {
                e || (e = this.active ? this.active.parent() : this.element), e.find('.ui-menu').hide().attr('aria-hidden', 'true').attr('aria-expanded', 'false').end().find('.ui-state-active').not('.ui-state-focus').removeClass('ui-state-active')
            },
            _closeOnDocumentClick: function(t) {
                return !e(t.target).closest('.ui-menu').length
            },
            _isDivider: function(e) {
                return !/[^\-\u2014\u2013\s]/.test(e.text())
            },
            collapse: function(e) {
                var t = this.active && this.active.parent().closest('.ui-menu-item', this.element);
                t && t.length && (this._close(), this.focus(e, t))
            },
            expand: function(e) {
                var t = this.active && this.active.children('.ui-menu ').find(this.options.items).first();
                t && t.length && (this._open(t.parent()), this._delay(function() {
                    this.focus(e, t)
                }))
            },
            next: function(e) {
                this._move('next', 'first', e)
            },
            previous: function(e) {
                this._move('prev', 'last', e)
            },
            isFirstItem: function() {
                return this.active && !this.active.prevAll('.ui-menu-item').length
            },
            isLastItem: function() {
                return this.active && !this.active.nextAll('.ui-menu-item').length
            },
            _move: function(e, t, i) {
                var n;
                this.active && (n = 'first' === e || 'last' === e ? this.active['first' === e ? 'prevAll' : 'nextAll']('.ui-menu-item').eq(-1) : this.active[e + 'All']('.ui-menu-item').eq(0)), n && n.length && this.active || (n = this.activeMenu.find(this.options.items)[t]()), this.focus(i, n)
            },
            nextPage: function(t) {
                var i, n, s;
                return this.active ? (this.isLastItem() || (this._hasScroll() ? (n = this.active.offset().top, s = this.element.height(), this.active.nextAll('.ui-menu-item').each(function() {
                    return i = e(this), 0 > i.offset().top - n - s
                }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items)[this.active ? 'last' : 'first']())), void 0) : (this.next(t), void 0)
            },
            previousPage: function(t) {
                var i, n, s;
                return this.active ? (this.isFirstItem() || (this._hasScroll() ? (n = this.active.offset().top, s = this.element.height(), this.active.prevAll('.ui-menu-item').each(function() {
                    return i = e(this), i.offset().top - n + s > 0
                }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items).first())), void 0) : (this.next(t), void 0)
            },
            _hasScroll: function() {
                return this.element.outerHeight() < this.element.prop('scrollHeight')
            },
            select: function(t) {
                this.active = this.active || e(t.target).closest('.ui-menu-item');
                var i = {
                    item: this.active
                };
                this.active.has('.ui-menu').length || this.collapseAll(t, !0), this._trigger('select', t, i)
            },
            _filterMenuItems: function(t) {
                var i = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'),
                    n = RegExp('^' + i, 'i');
                return this.activeMenu.find(this.options.items).filter('.ui-menu-item').filter(function() {
                    return n.test(e.trim(e(this).text()))
                })
            }
        }), e.widget('ui.autocomplete', {
            version: '1.11.4',
            defaultElement: '<input>',
            options: {
                appendTo: null,
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: 'left top',
                    at: 'left bottom',
                    collision: 'none'
                },
                source: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                response: null,
                search: null,
                select: null
            },
            requestIndex: 0,
            pending: 0,
            _create: function() {
                var t, i, n, s = this.element[0].nodeName.toLowerCase(),
                    r = 'textarea' === s,
                    o = 'input' === s;
                this.isMultiLine = r ? !0 : o ? !1 : this.element.prop('isContentEditable'), this.valueMethod = this.element[r || o ? 'val' : 'text'], this.isNewMenu = !0, this.element.addClass('ui-autocomplete-input').attr('autocomplete', 'off'), this._on(this.element, {
                    keydown: function(s) {
                        if (this.element.prop('readOnly')) return t = !0, n = !0, i = !0, void 0;
                        t = !1, n = !1, i = !1;
                        var r = e.ui.keyCode;
                        switch (s.keyCode) {
                            case r.PAGE_UP:
                                t = !0, this._move('previousPage', s);
                                break;
                            case r.PAGE_DOWN:
                                t = !0, this._move('nextPage', s);
                                break;
                            case r.UP:
                                t = !0, this._keyEvent('previous', s);
                                break;
                            case r.DOWN:
                                t = !0, this._keyEvent('next', s);
                                break;
                            case r.ENTER:
                                this.menu.active && (t = !0, s.preventDefault(), this.menu.select(s));
                                break;
                            case r.TAB:
                                this.menu.active && this.menu.select(s);
                                break;
                            case r.ESCAPE:
                                this.menu.element.is(':visible') && (this.isMultiLine || this._value(this.term), this.close(s), s.preventDefault());
                                break;
                            default:
                                i = !0, this._searchTimeout(s)
                        }
                    },
                    keypress: function(n) {
                        if (t) return t = !1, (!this.isMultiLine || this.menu.element.is(':visible')) && n.preventDefault(), void 0;
                        if (!i) {
                            var s = e.ui.keyCode;
                            switch (n.keyCode) {
                                case s.PAGE_UP:
                                    this._move('previousPage', n);
                                    break;
                                case s.PAGE_DOWN:
                                    this._move('nextPage', n);
                                    break;
                                case s.UP:
                                    this._keyEvent('previous', n);
                                    break;
                                case s.DOWN:
                                    this._keyEvent('next', n)
                            }
                        }
                    },
                    input: function(e) {
                        return n ? (n = !1, e.preventDefault(), void 0) : (this._searchTimeout(e), void 0)
                    },
                    focus: function() {
                        this.selectedItem = null, this.previous = this._value()
                    },
                    blur: function(e) {
                        return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(e), this._change(e), void 0)
                    }
                }), this._initSource(), this.menu = e('<ul>').addClass('ui-autocomplete ui-front').appendTo(this._appendTo()).menu({
                    role: null
                }).hide().menu('instance'), this._on(this.menu.element, {
                    mousedown: function(t) {
                        t.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                            delete this.cancelBlur
                        });
                        var i = this.menu.element[0];
                        e(t.target).closest('.ui-menu-item').length || this._delay(function() {
                            var t = this;
                            this.document.one('mousedown', function(n) {
                                n.target === t.element[0] || n.target === i || e.contains(i, n.target) || t.close()
                            })
                        })
                    },
                    menufocus: function(t, i) {
                        var n, s;
                        return this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type)) ? (this.menu.blur(), this.document.one('mousemove', function() {
                            e(t.target).trigger(t.originalEvent)
                        }), void 0) : (s = i.item.data('ui-autocomplete-item'), !1 !== this._trigger('focus', t, {
                            item: s
                        }) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(s.value), n = i.item.attr('aria-label') || s.value, n && e.trim(n).length && (this.liveRegion.children().hide(), e('<div>').text(n).appendTo(this.liveRegion)), void 0)
                    },
                    menuselect: function(e, t) {
                        var i = t.item.data('ui-autocomplete-item'),
                            n = this.previous;
                        this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = n, this._delay(function() {
                            this.previous = n, this.selectedItem = i
                        })), !1 !== this._trigger('select', e, {
                            item: i
                        }) && this._value(i.value), this.term = this._value(), this.close(e), this.selectedItem = i
                    }
                }), this.liveRegion = e('<span>', {
                    role: 'status',
                    'aria-live': 'assertive',
                    'aria-relevant': 'additions'
                }).addClass('ui-helper-hidden-accessible').appendTo(this.document[0].body), this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr('autocomplete')
                    }
                })
            },
            _destroy: function() {
                clearTimeout(this.searching), this.element.removeClass('ui-autocomplete-input').removeAttr('autocomplete'), this.menu.element.remove(), this.liveRegion.remove()
            },
            _setOption: function(e, t) {
                this._super(e, t), 'source' === e && this._initSource(), 'appendTo' === e && this.menu.element.appendTo(this._appendTo()), 'disabled' === e && t && this.xhr && this.xhr.abort()
            },
            _appendTo: function() {
                var t = this.options.appendTo;
                return t && (t = t.jquery || t.nodeType ? e(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest('.ui-front')), t.length || (t = this.document[0].body), t
            },
            _initSource: function() {
                var i, n, t = this;
                e.isArray(this.options.source) ? (i = this.options.source, this.source = function(t, n) {
                    n(e.ui.autocomplete.filter(i, t.term))
                }) : 'string' == typeof this.options.source ? (n = this.options.source, this.source = function(i, s) {
                    t.xhr && t.xhr.abort(), t.xhr = e.ajax({
                        url: n,
                        data: i,
                        dataType: 'json',
                        success: function(e) {
                            s(e)
                        },
                        error: function() {
                            s([])
                        }
                    })
                }) : this.source = this.options.source
            },
            _searchTimeout: function(e) {
                clearTimeout(this.searching), this.searching = this._delay(function() {
                    var t = this.term === this._value(),
                        i = this.menu.element.is(':visible'),
                        n = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
                    (!t || t && !i && !n) && (this.selectedItem = null, this.search(null, e))
                }, this.options.delay)
            },
            search: function(e, t) {
                return e = null != e ? e : this._value(), this.term = this._value(), e.length < this.options.minLength ? this.close(t) : this._trigger('search', t) !== !1 ? this._search(e) : void 0
            },
            _search: function(e) {
                this.pending++, this.element.addClass('ui-autocomplete-loading'), this.cancelSearch = !1, this.source({
                    term: e
                }, this._response())
            },
            _response: function() {
                var t = ++this.requestIndex;
                return e.proxy(function(e) {
                    t === this.requestIndex && this.__response(e), this.pending--, this.pending || this.element.removeClass('ui-autocomplete-loading')
                }, this)
            },
            __response: function(e) {
                e && (e = this._normalize(e)), this._trigger('response', null, {
                    content: e
                }), !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger('open')) : this._close()
            },
            close: function(e) {
                this.cancelSearch = !0, this._close(e)
            },
            _close: function(e) {
                this.menu.element.is(':visible') && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger('close', e))
            },
            _change: function(e) {
                this.previous !== this._value() && this._trigger('change', e, {
                    item: this.selectedItem
                })
            },
            _normalize: function(t) {
                return t.length && t[0].label && t[0].value ? t : e.map(t, function(t) {
                    return 'string' == typeof t ? {
                        label: t,
                        value: t
                    } : e.extend({}, t, {
                        label: t.label || t.value,
                        value: t.value || t.label
                    })
                })
            },
            _suggest: function(t) {
                var i = this.menu.element.empty();
                this._renderMenu(i, t), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(e.extend({
                    of: this.element
                }, this.options.position)), this.options.autoFocus && this.menu.next()
            },
            _resizeMenu: function() {
                var e = this.menu.element;
                e.outerWidth(Math.max(e.width('').outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function(t, i) {
                var n = this;
                e.each(i, function(e, i) {
                    n._renderItemData(t, i)
                })
            },
            _renderItemData: function(e, t) {
                return this._renderItem(e, t).data('ui-autocomplete-item', t)
            },
            _renderItem: function(t, i) {
                return e('<li>').text(i.label).appendTo(t)
            },
            _move: function(e, t) {
                return this.menu.element.is(':visible') ? this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e) ? (this.isMultiLine || this._value(this.term), this.menu.blur(), void 0) : (this.menu[e](t), void 0) : (this.search(null, t), void 0)
            },
            widget: function() {
                return this.menu.element
            },
            _value: function() {
                return this.valueMethod.apply(this.element, arguments)
            },
            _keyEvent: function(e, t) {
                (!this.isMultiLine || this.menu.element.is(':visible')) && (this._move(e, t), t.preventDefault())
            }
        }), e.extend(e.ui.autocomplete, {
            escapeRegex: function(e) {
                return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
            },
            filter: function(t, i) {
                var n = RegExp(e.ui.autocomplete.escapeRegex(i), 'i');
                return e.grep(t, function(e) {
                    return n.test(e.label || e.value || e)
                })
            }
        }), e.widget('ui.autocomplete', e.ui.autocomplete, {
            options: {
                messages: {
                    noResults: 'No search results.',
                    results: function(e) {
                        return e + (e > 1 ? ' results are' : ' result is') + ' available, use up and down arrow keys to navigate.'
                    }
                }
            },
            __response: function(t) {
                var i;
                this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.children().hide(), e('<div>').text(i).appendTo(this.liveRegion))
            }
        }), e.ui.autocomplete, e.extend(e.ui, {
            datepicker: {
                version: '1.11.4'
            }
        });
    var t;
    e.extend(a.prototype, {
        markerClassName: 'hasDatepicker',
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(e) {
            return n(this._defaults, e || {}), this
        },
        _attachDatepicker: function(t, i) {
            var n, r, s;
            n = t.nodeName.toLowerCase(), r = 'div' === n || 'span' === n, t.id || (this.uuid += 1, t.id = 'dp' + this.uuid), s = this._newInst(e(t), r), s.settings = e.extend({}, i || {}), 'input' === n ? this._connectDatepicker(t, s) : r && this._inlineDatepicker(t, s)
        },
        _newInst: function(t, i) {
            var n = t[0].id.replace(/([^A-Za-z0-9_\-])/g, '\\\\$1');
            return {
                id: n,
                input: t,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ? l(e('<div class=\'' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\'></div>')) : this.dpDiv
            }
        },
        _connectDatepicker: function(t, i) {
            var n = e(t);
            i.append = e([]), i.trigger = e([]), n.hasClass(this.markerClassName) || (this._attachments(n, i), n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), e.data(t, 'datepicker', i), i.settings.disabled && this._disableDatepicker(t))
        },
        _attachments: function(t, i) {
            var s, n, r, o = this._get(i, 'appendText'),
                a = this._get(i, 'isRTL');
            i.append && i.append.remove(), o && (i.append = e('<span class=\'' + this._appendClass + '\'>' + o + '</span>'), t[a ? 'before' : 'after'](i.append)), t.unbind('focus', this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, 'showOn'), ('focus' === s || 'both' === s) && t.focus(this._showDatepicker), ('button' === s || 'both' === s) && (n = this._get(i, 'buttonText'), r = this._get(i, 'buttonImage'), i.trigger = e(this._get(i, 'buttonImageOnly') ? e('<img/>').addClass(this._triggerClass).attr({
                src: r,
                alt: n,
                title: n
            }) : e('<button type=\'button\'></button>').addClass(this._triggerClass).html(r ? e('<img/>').attr({
                src: r,
                alt: n,
                title: n
            }) : n)), t[a ? 'before' : 'after'](i.trigger), i.trigger.click(function() {
                return e.datepicker._datepickerShowing && e.datepicker._lastInput === t[0] ? e.datepicker._hideDatepicker() : e.datepicker._datepickerShowing && e.datepicker._lastInput !== t[0] ? (e.datepicker._hideDatepicker(), e.datepicker._showDatepicker(t[0])) : e.datepicker._showDatepicker(t[0]), !1
            }))
        },
        _autoSize: function(e) {
            if (this._get(e, 'autoSize') && !e.inline) {
                var n, s, r, t, i = new Date(2009, 11, 20),
                    o = this._get(e, 'dateFormat');
                o.match(/[DM]/) && (n = function(e) {
                    for (s = 0, r = 0, t = 0; e.length > t; t++) e[t].length > s && (s = e[t].length, r = t);
                    return r
                }, i.setMonth(n(this._get(e, o.match(/MM/) ? 'monthNames' : 'monthNamesShort'))), i.setDate(n(this._get(e, o.match(/DD/) ? 'dayNames' : 'dayNamesShort')) + 20 - i.getDay())), e.input.attr('size', this._formatDate(e, i).length)
            }
        },
        _inlineDatepicker: function(t, i) {
            var n = e(t);
            n.hasClass(this.markerClassName) || (n.addClass(this.markerClassName).append(i.dpDiv), e.data(t, 'datepicker', i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(t), i.dpDiv.css('display', 'block'))
        },
        _dialogDatepicker: function(t, i, s, r, o) {
            var l, c, u, h, d, a = this._dialogInst;
            return a || (this.uuid += 1, l = 'dp' + this.uuid, this._dialogInput = e('<input type=\'text\' id=\'' + l + '\' style=\'position: absolute; top: -100px; width: 0px;\'/>'), this._dialogInput.keydown(this._doKeyDown), e('body').append(this._dialogInput), a = this._dialogInst = this._newInst(this._dialogInput, !1), a.settings = {}, e.data(this._dialogInput[0], 'datepicker', a)), n(a.settings, r || {}), i = i && i.constructor === Date ? this._formatDate(a, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (c = document.documentElement.clientWidth, u = document.documentElement.clientHeight, h = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [c / 2 - 100 + h, u / 2 - 150 + d]), this._dialogInput.css('left', this._pos[0] + 20 + 'px').css('top', this._pos[1] + 'px'), a.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), e.blockUI && e.blockUI(this.dpDiv), e.data(this._dialogInput[0], 'datepicker', a), this
        },
        _destroyDatepicker: function(i) {
            var n, s = e(i),
                r = e.data(i, 'datepicker');
            s.hasClass(this.markerClassName) && (n = i.nodeName.toLowerCase(), e.removeData(i, 'datepicker'), 'input' === n ? (r.append.remove(), r.trigger.remove(), s.removeClass(this.markerClassName).unbind('focus', this._showDatepicker).unbind('keydown', this._doKeyDown).unbind('keypress', this._doKeyPress).unbind('keyup', this._doKeyUp)) : ('div' === n || 'span' === n) && s.removeClass(this.markerClassName).empty(), t === r && (t = null))
        },
        _enableDatepicker: function(t) {
            var i, n, s = e(t),
                r = e.data(t, 'datepicker');
            s.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), 'input' === i ? (t.disabled = !1, r.trigger.filter('button').each(function() {
                this.disabled = !1
            }).end().filter('img').css({
                opacity: '1.0',
                cursor: ''
            })) : ('div' === i || 'span' === i) && (n = s.children('.' + this._inlineClass), n.children().removeClass('ui-state-disabled'), n.find('select.ui-datepicker-month, select.ui-datepicker-year').prop('disabled', !1)), this._disabledInputs = e.map(this._disabledInputs, function(e) {
                return e === t ? null : e
            }))
        },
        _disableDatepicker: function(t) {
            var i, n, s = e(t),
                r = e.data(t, 'datepicker');
            s.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), 'input' === i ? (t.disabled = !0, r.trigger.filter('button').each(function() {
                this.disabled = !0
            }).end().filter('img').css({
                opacity: '0.5',
                cursor: 'default'
            })) : ('div' === i || 'span' === i) && (n = s.children('.' + this._inlineClass), n.children().addClass('ui-state-disabled'), n.find('select.ui-datepicker-month, select.ui-datepicker-year').prop('disabled', !0)), this._disabledInputs = e.map(this._disabledInputs, function(e) {
                return e === t ? null : e
            }), this._disabledInputs[this._disabledInputs.length] = t)
        },
        _isDisabledDatepicker: function(e) {
            if (!e) return !1;
            for (var t = 0; this._disabledInputs.length > t; t++)
                if (this._disabledInputs[t] === e) return !0;
            return !1
        },
        _getInst: function(t) {
            try {
                return e.data(t, 'datepicker')
            } catch (i) {
                throw 'Missing instance data for this datepicker'
            }
        },
        _optionDatepicker: function(t, i, s) {
            var o, c, a, l, r = this._getInst(t);
            return 2 === arguments.length && 'string' == typeof i ? 'defaults' === i ? e.extend({}, e.datepicker._defaults) : r ? 'all' === i ? e.extend({}, r.settings) : this._get(r, i) : null : (o = i || {}, 'string' == typeof i && (o = {}, o[i] = s), r && (this._curInst === r && this._hideDatepicker(), c = this._getDateDatepicker(t, !0), a = this._getMinMaxDate(r, 'min'), l = this._getMinMaxDate(r, 'max'), n(r.settings, o), null !== a && void 0 !== o.dateFormat && void 0 === o.minDate && (r.settings.minDate = this._formatDate(r, a)), null !== l && void 0 !== o.dateFormat && void 0 === o.maxDate && (r.settings.maxDate = this._formatDate(r, l)), 'disabled' in o && (o.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)), this._attachments(e(t), r), this._autoSize(r), this._setDate(r, c), this._updateAlternate(r), this._updateDatepicker(r)), void 0)
        },
        _changeDatepicker: function(e, t, i) {
            this._optionDatepicker(e, t, i)
        },
        _refreshDatepicker: function(e) {
            var t = this._getInst(e);
            t && this._updateDatepicker(t)
        },
        _setDateDatepicker: function(e, t) {
            var i = this._getInst(e);
            i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
        },
        _getDateDatepicker: function(e, t) {
            var i = this._getInst(e);
            return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null
        },
        _doKeyDown: function(t) {
            var s, o, r, i = e.datepicker._getInst(t.target),
                n = !0,
                a = i.dpDiv.is('.ui-datepicker-rtl');
            if (i._keyEvent = !0, e.datepicker._datepickerShowing) switch (t.keyCode) {
                case 9:
                    e.datepicker._hideDatepicker(), n = !1;
                    break;
                case 13:
                    return r = e('td.' + e.datepicker._dayOverClass + ':not(.' + e.datepicker._currentClass + ')', i.dpDiv), r[0] && e.datepicker._selectDay(t.target, i.selectedMonth, i.selectedYear, r[0]), s = e.datepicker._get(i, 'onSelect'), s ? (o = e.datepicker._formatDate(i), s.apply(i.input ? i.input[0] : null, [o, i])) : e.datepicker._hideDatepicker(), !1;
                case 27:
                    e.datepicker._hideDatepicker();
                    break;
                case 33:
                    e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(i, 'stepBigMonths') : -e.datepicker._get(i, 'stepMonths'), 'M');
                    break;
                case 34:
                    e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(i, 'stepBigMonths') : +e.datepicker._get(i, 'stepMonths'), 'M');
                    break;
                case 35:
                    (t.ctrlKey || t.metaKey) && e.datepicker._clearDate(t.target), n = t.ctrlKey || t.metaKey;
                    break;
                case 36:
                    (t.ctrlKey || t.metaKey) && e.datepicker._gotoToday(t.target), n = t.ctrlKey || t.metaKey;
                    break;
                case 37:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, a ? 1 : -1, 'D'), n = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(i, 'stepBigMonths') : -e.datepicker._get(i, 'stepMonths'), 'M');
                    break;
                case 38:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, -7, 'D'), n = t.ctrlKey || t.metaKey;
                    break;
                case 39:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, a ? -1 : 1, 'D'), n = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(i, 'stepBigMonths') : +e.datepicker._get(i, 'stepMonths'), 'M');
                    break;
                case 40:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, 7, 'D'), n = t.ctrlKey || t.metaKey;
                    break;
                default:
                    n = !1
            } else 36 === t.keyCode && t.ctrlKey ? e.datepicker._showDatepicker(this) : n = !1;
            n && (t.preventDefault(), t.stopPropagation())
        },
        _doKeyPress: function(t) {
            var i, n, s = e.datepicker._getInst(t.target);
            return e.datepicker._get(s, 'constrainInput') ? (i = e.datepicker._possibleChars(e.datepicker._get(s, 'dateFormat')), n = String.fromCharCode(null == t.charCode ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || ' ' > n || !i || i.indexOf(n) > -1) : void 0
        },
        _doKeyUp: function(t) {
            var s, n = e.datepicker._getInst(t.target);
            if (n.input.val() !== n.lastVal) try {
                s = e.datepicker.parseDate(e.datepicker._get(n, 'dateFormat'), n.input ? n.input.val() : null, e.datepicker._getFormatConfig(n)), s && (e.datepicker._setDateFromField(n), e.datepicker._updateAlternate(n), e.datepicker._updateDatepicker(n))
            } catch (i) {};
            return !0
        },
        _showDatepicker: function(t) {
            if (t = t.target || t, 'input' !== t.nodeName.toLowerCase() && (t = e('input', t.parentNode)[0]), !e.datepicker._isDisabledDatepicker(t) && e.datepicker._lastInput !== t) {
                var i, a, l, s, r, o, c;
                i = e.datepicker._getInst(t), e.datepicker._curInst && e.datepicker._curInst !== i && (e.datepicker._curInst.dpDiv.stop(!0, !0), i && e.datepicker._datepickerShowing && e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])), a = e.datepicker._get(i, 'beforeShow'), l = a ? a.apply(t, [t, i]) : {}, l !== !1 && (n(i.settings, l), i.lastVal = null, e.datepicker._lastInput = t, e.datepicker._setDateFromField(i), e.datepicker._inDialog && (t.value = ''), e.datepicker._pos || (e.datepicker._pos = e.datepicker._findPos(t), e.datepicker._pos[1] += t.offsetHeight), s = !1, e(t).parents().each(function() {
                    return s |= 'fixed' === e(this).css('position'), !s
                }), r = {
                    left: e.datepicker._pos[0],
                    top: e.datepicker._pos[1]
                }, e.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                    position: 'absolute',
                    display: 'block',
                    top: '-1000px'
                }), e.datepicker._updateDatepicker(i), r = e.datepicker._checkOffset(i, r, s), i.dpDiv.css({
                    position: e.datepicker._inDialog && e.blockUI ? 'static' : s ? 'fixed' : 'absolute',
                    display: 'none',
                    left: r.left + 'px',
                    top: r.top + 'px'
                }), i.inline || (o = e.datepicker._get(i, 'showAnim'), c = e.datepicker._get(i, 'duration'), i.dpDiv.css('z-index', h(e(t)) + 1), e.datepicker._datepickerShowing = !0, e.effects && e.effects.effect[o] ? i.dpDiv.show(o, e.datepicker._get(i, 'showOptions'), c) : i.dpDiv[o || 'show'](o ? c : null), e.datepicker._shouldFocusInput(i) && i.input.focus(), e.datepicker._curInst = i))
            }
        },
        _updateDatepicker: function(i) {
            this.maxRows = 4, t = i, i.dpDiv.empty().append(this._generateHTML(i)), this._attachHandlers(i);
            var n, s = this._getNumberOfMonths(i),
                r = s[1],
                a = 17,
                o = i.dpDiv.find('.' + this._dayOverClass + ' a');
            o.length > 0 && c.apply(o.get(0)), i.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width(''), r > 1 && i.dpDiv.addClass('ui-datepicker-multi-' + r).css('width', a * r + 'em'), i.dpDiv[(1 !== s[0] || 1 !== s[1] ? 'add' : 'remove') + 'Class']('ui-datepicker-multi'), i.dpDiv[(this._get(i, 'isRTL') ? 'add' : 'remove') + 'Class']('ui-datepicker-rtl'), i === e.datepicker._curInst && e.datepicker._datepickerShowing && e.datepicker._shouldFocusInput(i) && i.input.focus(), i.yearshtml && (n = i.yearshtml, setTimeout(function() {
                n === i.yearshtml && i.yearshtml && i.dpDiv.find('select.ui-datepicker-year:first').replaceWith(i.yearshtml), n = i.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function(e) {
            return e.input && e.input.is(':visible') && !e.input.is(':disabled') && !e.input.is(':focus')
        },
        _checkOffset: function(t, i, n) {
            var s = t.dpDiv.outerWidth(),
                r = t.dpDiv.outerHeight(),
                c = t.input ? t.input.outerWidth() : 0,
                a = t.input ? t.input.outerHeight() : 0,
                o = document.documentElement.clientWidth + (n ? 0 : e(document).scrollLeft()),
                l = document.documentElement.clientHeight + (n ? 0 : e(document).scrollTop());
            return i.left -= this._get(t, 'isRTL') ? s - c : 0, i.left -= n && i.left === t.input.offset().left ? e(document).scrollLeft() : 0, i.top -= n && i.top === t.input.offset().top + a ? e(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + s > o && o > s ? Math.abs(i.left + s - o) : 0), i.top -= Math.min(i.top, i.top + r > l && l > r ? Math.abs(r + a) : 0), i
        },
        _findPos: function(t) {
            for (var i, n = this._getInst(t), s = this._get(n, 'isRTL'); t && ('hidden' === t.type || 1 !== t.nodeType || e.expr.filters.hidden(t));) t = t[s ? 'previousSibling' : 'nextSibling'];
            return i = e(t).offset(), [i.left, i.top]
        },
        _hideDatepicker: function(t) {
            var n, r, s, o, i = this._curInst;
            !i || t && i !== e.data(t, 'datepicker') || this._datepickerShowing && (n = this._get(i, 'showAnim'), r = this._get(i, 'duration'), s = function() {
                e.datepicker._tidyDialog(i)
            }, e.effects && (e.effects.effect[n] || e.effects[n]) ? i.dpDiv.hide(n, e.datepicker._get(i, 'showOptions'), r, s) : i.dpDiv['slideDown' === n ? 'slideUp' : 'fadeIn' === n ? 'fadeOut' : 'hide'](n ? r : null, s), n || s(), this._datepickerShowing = !1, o = this._get(i, 'onClose'), o && o.apply(i.input ? i.input[0] : null, [i.input ? i.input.val() : '', i]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: 'absolute',
                left: '0',
                top: '-100px'
            }), e.blockUI && (e.unblockUI(), e('body').append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function(e) {
            e.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar')
        },
        _checkExternalClick: function(t) {
            if (e.datepicker._curInst) {
                var i = e(t.target),
                    n = e.datepicker._getInst(i[0]);
                (i[0].id !== e.datepicker._mainDivId && 0 === i.parents('#' + e.datepicker._mainDivId).length && !i.hasClass(e.datepicker.markerClassName) && !i.closest('.' + e.datepicker._triggerClass).length && e.datepicker._datepickerShowing && (!e.datepicker._inDialog || !e.blockUI) || i.hasClass(e.datepicker.markerClassName) && e.datepicker._curInst !== n) && e.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(t, i, n) {
            var r = e(t),
                s = this._getInst(r[0]);
            this._isDisabledDatepicker(r[0]) || (this._adjustInstDate(s, i + ('M' === n ? this._get(s, 'showCurrentAtPos') : 0), n), this._updateDatepicker(s))
        },
        _gotoToday: function(t) {
            var n, s = e(t),
                i = this._getInst(s[0]);
            this._get(i, 'gotoCurrent') && i.currentDay ? (i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear) : (n = new Date, i.selectedDay = n.getDate(), i.drawMonth = i.selectedMonth = n.getMonth(), i.drawYear = i.selectedYear = n.getFullYear()), this._notifyChange(i), this._adjustDate(s)
        },
        _selectMonthYear: function(t, i, n) {
            var r = e(t),
                s = this._getInst(r[0]);
            s['selected' + ('M' === n ? 'Month' : 'Year')] = s['draw' + ('M' === n ? 'Month' : 'Year')] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(s), this._adjustDate(r)
        },
        _selectDay: function(t, i, n, s) {
            var r, o = e(t);
            e(s).hasClass(this._unselectableClass) || this._isDisabledDatepicker(o[0]) || (r = this._getInst(o[0]), r.selectedDay = r.currentDay = e('a', s).html(), r.selectedMonth = r.currentMonth = i, r.selectedYear = r.currentYear = n, this._selectDate(t, this._formatDate(r, r.currentDay, r.currentMonth, r.currentYear)))
        },
        _clearDate: function(t) {
            var i = e(t);
            this._selectDate(i, '')
        },
        _selectDate: function(t, i) {
            var s, r = e(t),
                n = this._getInst(r[0]);
            i = null != i ? i : this._formatDate(n), n.input && n.input.val(i), this._updateAlternate(n), s = this._get(n, 'onSelect'), s ? s.apply(n.input ? n.input[0] : null, [i, n]) : n.input && n.input.trigger('change'), n.inline ? this._updateDatepicker(n) : (this._hideDatepicker(), this._lastInput = n.input[0], 'object' != typeof n.input[0] && n.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function(t) {
            var i, n, s, r = this._get(t, 'altField');
            r && (i = this._get(t, 'altFormat') || this._get(t, 'dateFormat'), n = this._getDate(t), s = this.formatDate(i, n, this._getFormatConfig(t)), e(r).each(function() {
                e(this).val(s)
            }))
        },
        noWeekends: function(e) {
            var t = e.getDay();
            return [t > 0 && 6 > t, '']
        },
        iso8601Week: function(e) {
            var i, t = new Date(e.getTime());
            return t.setDate(t.getDate() + 4 - (t.getDay() || 7)), i = t.getTime(), t.setMonth(0), t.setDate(1), Math.floor(Math.round((i - t) / 864e5) / 7) + 1
        },
        parseDate: function(t, i, n) {
            if (null == t || null == i) throw 'Invalid arguments';
            if (i = 'object' == typeof i ? '' + i : i + '', '' === i) return null;
            var a, d, f, s, r = 0,
                p = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                b = 'string' != typeof p ? p : (new Date).getFullYear() % 100 + parseInt(p, 10),
                w = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort,
                x = (n ? n.dayNames : null) || this._defaults.dayNames,
                k = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort,
                C = (n ? n.monthNames : null) || this._defaults.monthNames,
                o = -1,
                l = -1,
                c = -1,
                m = -1,
                g = !1,
                h = function(e) {
                    var i = t.length > a + 1 && t.charAt(a + 1) === e;
                    return i && a++, i
                },
                u = function(e) {
                    var s = h(e),
                        n = '@' === e ? 14 : '!' === e ? 20 : 'y' === e && s ? 4 : 'o' === e ? 3 : 2,
                        o = 'y' === e ? n : 1,
                        a = RegExp('^\\d{' + o + ',' + n + '}'),
                        t = i.substring(r).match(a);
                    if (!t) throw 'Missing number at position ' + r;
                    return r += t[0].length, parseInt(t[0], 10)
                },
                y = function(t, n, s) {
                    var o = -1,
                        a = e.map(h(t) ? s : n, function(e, t) {
                            return [
                                [t, e]
                            ]
                        }).sort(function(e, t) {
                            return -(e[1].length - t[1].length)
                        });
                    if (e.each(a, function(e, t) {
                            var n = t[1];
                            return i.substr(r, n.length).toLowerCase() === n.toLowerCase() ? (o = t[0], r += n.length, !1) : void 0
                        }), -1 !== o) return o + 1;
                    throw 'Unknown name at position ' + r
                },
                v = function() {
                    if (i.charAt(r) !== t.charAt(a)) throw 'Unexpected literal at position ' + r;
                    r++
                };
            for (a = 0; t.length > a; a++)
                if (g) '\'' !== t.charAt(a) || h('\'') ? v() : g = !1;
                else switch (t.charAt(a)) {
                    case 'd':
                        c = u('d');
                        break;
                    case 'D':
                        y('D', w, x);
                        break;
                    case 'o':
                        m = u('o');
                        break;
                    case 'm':
                        l = u('m');
                        break;
                    case 'M':
                        l = y('M', k, C);
                        break;
                    case 'y':
                        o = u('y');
                        break;
                    case '@':
                        s = new Date(u('@')), o = s.getFullYear(), l = s.getMonth() + 1, c = s.getDate();
                        break;
                    case '!':
                        s = new Date((u('!') - this._ticksTo1970) / 1e4), o = s.getFullYear(), l = s.getMonth() + 1, c = s.getDate();
                        break;
                    case '\'':
                        h('\'') ? v() : g = !0;
                        break;
                    default:
                        v()
                };
            if (i.length > r && (f = i.substr(r), !/^\s+/.test(f))) throw 'Extra/unparsed characters found in date: ' + f;
            if (-1 === o ? o = (new Date).getFullYear() : 100 > o && (o += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (b >= o ? 0 : -100)), m > -1)
                for (l = 1, c = m;;) {
                    if (d = this._getDaysInMonth(o, l - 1), d >= c) break;
                    l++, c -= d
                };
            if (s = this._daylightSavingAdjust(new Date(o, l - 1, c)), s.getFullYear() !== o || s.getMonth() + 1 !== l || s.getDate() !== c) throw 'Invalid date';
            return s
        },
        ATOM: 'yy-mm-dd',
        COOKIE: 'D, dd M yy',
        ISO_8601: 'yy-mm-dd',
        RFC_822: 'D, d M y',
        RFC_850: 'DD, dd-M-y',
        RFC_1036: 'D, d M y',
        RFC_1123: 'D, d M yy',
        RFC_2822: 'D, d M yy',
        RSS: 'D, d M y',
        TICKS: '!',
        TIMESTAMP: '@',
        W3C: 'yy-mm-dd',
        _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function(e, t, i) {
            if (!t) return '';
            var s, c = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                u = (i ? i.dayNames : null) || this._defaults.dayNames,
                h = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                d = (i ? i.monthNames : null) || this._defaults.monthNames,
                r = function(t) {
                    var i = e.length > s + 1 && e.charAt(s + 1) === t;
                    return i && s++, i
                },
                o = function(e, t, i) {
                    var n = '' + t;
                    if (r(e))
                        for (; i > n.length;) n = '0' + n;
                    return n
                },
                l = function(e, t, i, n) {
                    return r(e) ? n[t] : i[t]
                },
                n = '',
                a = !1;
            if (t)
                for (s = 0; e.length > s; s++)
                    if (a) '\'' !== e.charAt(s) || r('\'') ? n += e.charAt(s) : a = !1;
                    else switch (e.charAt(s)) {
                        case 'd':
                            n += o('d', t.getDate(), 2);
                            break;
                        case 'D':
                            n += l('D', t.getDay(), c, u);
                            break;
                        case 'o':
                            n += o('o', Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                            break;
                        case 'm':
                            n += o('m', t.getMonth() + 1, 2);
                            break;
                        case 'M':
                            n += l('M', t.getMonth(), h, d);
                            break;
                        case 'y':
                            n += r('y') ? t.getFullYear() : (10 > t.getYear() % 100 ? '0' : '') + t.getYear() % 100;
                            break;
                        case '@':
                            n += t.getTime();
                            break;
                        case '!':
                            n += 1e4 * t.getTime() + this._ticksTo1970;
                            break;
                        case '\'':
                            r('\'') ? n += '\'' : a = !0;
                            break;
                        default:
                            n += e.charAt(s)
                    };
            return n
        },
        _possibleChars: function(e) {
            var t, i = '',
                n = !1,
                s = function(i) {
                    var n = e.length > t + 1 && e.charAt(t + 1) === i;
                    return n && t++, n
                };
            for (t = 0; e.length > t; t++)
                if (n) '\'' !== e.charAt(t) || s('\'') ? i += e.charAt(t) : n = !1;
                else switch (e.charAt(t)) {
                    case 'd':
                    case 'm':
                    case 'y':
                    case '@':
                        i += '0123456789';
                        break;
                    case 'D':
                    case 'M':
                        return null;
                    case '\'':
                        s('\'') ? i += '\'' : n = !0;
                        break;
                    default:
                        i += e.charAt(t)
                };
            return i
        },
        _get: function(e, t) {
            return void 0 !== e.settings[t] ? e.settings[t] : this._defaults[t]
        },
        _setDateFromField: function(e, t) {
            if (e.input.val() !== e.lastVal) {
                var o = this._get(e, 'dateFormat'),
                    s = e.lastVal = e.input ? e.input.val() : null,
                    r = this._getDefaultDate(e),
                    n = r,
                    a = this._getFormatConfig(e);
                try {
                    n = this.parseDate(o, s, a) || r
                } catch (i) {
                    s = t ? '' : s
                };
                e.selectedDay = n.getDate(), e.drawMonth = e.selectedMonth = n.getMonth(), e.drawYear = e.selectedYear = n.getFullYear(), e.currentDay = s ? n.getDate() : 0, e.currentMonth = s ? n.getMonth() : 0, e.currentYear = s ? n.getFullYear() : 0, this._adjustInstDate(e)
            }
        },
        _getDefaultDate: function(e) {
            return this._restrictMinMax(e, this._determineDate(e, this._get(e, 'defaultDate'), new Date))
        },
        _determineDate: function(t, i, n) {
            var r = function(e) {
                    var t = new Date;
                    return t.setDate(t.getDate() + e), t
                },
                o = function(i) {
                    try {
                        return e.datepicker.parseDate(e.datepicker._get(t, 'dateFormat'), i, e.datepicker._getFormatConfig(t))
                    } catch (n) {};
                    for (var l = (i.toLowerCase().match(/^c/) ? e.datepicker._getDate(t) : null) || new Date, o = l.getFullYear(), a = l.getMonth(), s = l.getDate(), c = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, r = c.exec(i); r;) {
                        switch (r[2] || 'd') {
                            case 'd':
                            case 'D':
                                s += parseInt(r[1], 10);
                                break;
                            case 'w':
                            case 'W':
                                s += 7 * parseInt(r[1], 10);
                                break;
                            case 'm':
                            case 'M':
                                a += parseInt(r[1], 10), s = Math.min(s, e.datepicker._getDaysInMonth(o, a));
                                break;
                            case 'y':
                            case 'Y':
                                o += parseInt(r[1], 10), s = Math.min(s, e.datepicker._getDaysInMonth(o, a))
                        };
                        r = c.exec(i)
                    };
                    return new Date(o, a, s)
                },
                s = null == i || '' === i ? n : 'string' == typeof i ? o(i) : 'number' == typeof i ? isNaN(i) ? n : r(i) : new Date(i.getTime());
            return s = s && 'Invalid Date' == '' + s ? n : s, s && (s.setHours(0), s.setMinutes(0), s.setSeconds(0), s.setMilliseconds(0)), this._daylightSavingAdjust(s)
        },
        _daylightSavingAdjust: function(e) {
            return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null
        },
        _setDate: function(e, t, i) {
            var s = !t,
                r = e.selectedMonth,
                o = e.selectedYear,
                n = this._restrictMinMax(e, this._determineDate(e, t, new Date));
            e.selectedDay = e.currentDay = n.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = n.getMonth(), e.drawYear = e.selectedYear = e.currentYear = n.getFullYear(), r === e.selectedMonth && o === e.selectedYear || i || this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(s ? '' : this._formatDate(e))
        },
        _getDate: function(e) {
            var t = !e.currentYear || e.input && '' === e.input.val() ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
            return t
        },
        _attachHandlers: function(t) {
            var n = this._get(t, 'stepMonths'),
                i = '#' + t.id.replace(/\\\\/g, '\\');
            t.dpDiv.find('[data-handler]').map(function() {
                var t = {
                    prev: function() {
                        e.datepicker._adjustDate(i, -n, 'M')
                    },
                    next: function() {
                        e.datepicker._adjustDate(i, +n, 'M')
                    },
                    hide: function() {
                        e.datepicker._hideDatepicker()
                    },
                    today: function() {
                        e.datepicker._gotoToday(i)
                    },
                    selectDay: function() {
                        return e.datepicker._selectDay(i, +this.getAttribute('data-month'), +this.getAttribute('data-year'), this), !1
                    },
                    selectMonth: function() {
                        return e.datepicker._selectMonthYear(i, this, 'M'), !1
                    },
                    selectYear: function() {
                        return e.datepicker._selectMonthYear(i, this, 'Y'), !1
                    }
                };
                e(this).bind(this.getAttribute('data-event'), t[this.getAttribute('data-handler')])
            })
        },
        _generateHTML: function(e) {
            var v, l, T, c, D, y, S, I, X, u, P, K, Q, J, V, j, w, G, A, x, a, p, N, m, M, h, s, E, O, z, L, k, F, i, H, W, b, d, C, R = new Date,
                B = this._daylightSavingAdjust(new Date(R.getFullYear(), R.getMonth(), R.getDate())),
                r = this._get(e, 'isRTL'),
                te = this._get(e, 'showButtonPanel'),
                Z = this._get(e, 'hideIfNoPrevNext'),
                q = this._get(e, 'navigationAsDateFormat'),
                o = this._getNumberOfMonths(e),
                ie = this._get(e, 'showCurrentAtPos'),
                ee = this._get(e, 'stepMonths'),
                Y = 1 !== o[0] || 1 !== o[1],
                U = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)),
                g = this._getMinMaxDate(e, 'min'),
                f = this._getMinMaxDate(e, 'max'),
                t = e.drawMonth - ie,
                n = e.drawYear;
            if (0 > t && (t += 12, n--), f)
                for (v = this._daylightSavingAdjust(new Date(f.getFullYear(), f.getMonth() - o[0] * o[1] + 1, f.getDate())), v = g && g > v ? g : v; this._daylightSavingAdjust(new Date(n, t, 1)) > v;) t--, 0 > t && (t = 11, n--);
            for (e.drawMonth = t, e.drawYear = n, l = this._get(e, 'prevText'), l = q ? this.formatDate(l, this._daylightSavingAdjust(new Date(n, t - ee, 1)), this._getFormatConfig(e)) : l, T = this._canAdjustMonth(e, -1, n, t) ? '<a class=\'ui-datepicker-prev ui-corner-all\' data-handler=\'prev\' data-event=\'click\' title=\'' + l + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (r ? 'e' : 'w') + '\'>' + l + '</span></a>' : Z ? '' : '<a class=\'ui-datepicker-prev ui-corner-all ui-state-disabled\' title=\'' + l + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (r ? 'e' : 'w') + '\'>' + l + '</span></a>', c = this._get(e, 'nextText'), c = q ? this.formatDate(c, this._daylightSavingAdjust(new Date(n, t + ee, 1)), this._getFormatConfig(e)) : c, D = this._canAdjustMonth(e, 1, n, t) ? '<a class=\'ui-datepicker-next ui-corner-all\' data-handler=\'next\' data-event=\'click\' title=\'' + c + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (r ? 'w' : 'e') + '\'>' + c + '</span></a>' : Z ? '' : '<a class=\'ui-datepicker-next ui-corner-all ui-state-disabled\' title=\'' + c + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (r ? 'w' : 'e') + '\'>' + c + '</span></a>', y = this._get(e, 'currentText'), S = this._get(e, 'gotoCurrent') && e.currentDay ? U : B, y = q ? this.formatDate(y, S, this._getFormatConfig(e)) : y, I = e.inline ? '' : '<button type=\'button\' class=\'ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all\' data-handler=\'hide\' data-event=\'click\'>' + this._get(e, 'closeText') + '</button>', X = te ? '<div class=\'ui-datepicker-buttonpane ui-widget-content\'>' + (r ? I : '') + (this._isInRange(e, S) ? '<button type=\'button\' class=\'ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all\' data-handler=\'today\' data-event=\'click\'>' + y + '</button>' : '') + (r ? '' : I) + '</div>' : '', u = parseInt(this._get(e, 'firstDay'), 10), u = isNaN(u) ? 0 : u, P = this._get(e, 'showWeek'), K = this._get(e, 'dayNames'), Q = this._get(e, 'dayNamesMin'), J = this._get(e, 'monthNames'), V = this._get(e, 'monthNamesShort'), j = this._get(e, 'beforeShowDay'), w = this._get(e, 'showOtherMonths'), G = this._get(e, 'selectOtherMonths'), A = this._getDefaultDate(e), x = '', p = 0; o[0] > p; p++) {
                for (N = '', this.maxRows = 4, m = 0; o[1] > m; m++) {
                    if (M = this._daylightSavingAdjust(new Date(n, t, e.selectedDay)), h = ' ui-corner-all', s = '', Y) {
                        if (s += '<div class=\'ui-datepicker-group', o[1] > 1) switch (m) {
                            case 0:
                                s += ' ui-datepicker-group-first', h = ' ui-corner-' + (r ? 'right' : 'left');
                                break;
                            case o[1] - 1:
                                s += ' ui-datepicker-group-last', h = ' ui-corner-' + (r ? 'left' : 'right');
                                break;
                            default:
                                s += ' ui-datepicker-group-middle', h = ''
                        };
                        s += '\'>'
                    };
                    for (s += '<div class=\'ui-datepicker-header ui-widget-header ui-helper-clearfix' + h + '\'>' + (/all|left/.test(h) && 0 === p ? r ? D : T : '') + (/all|right/.test(h) && 0 === p ? r ? T : D : '') + this._generateMonthYearHeader(e, t, n, g, f, p > 0 || m > 0, J, V) + '</div><table class=\'ui-datepicker-calendar\'><thead><tr>', E = P ? '<th class=\'ui-datepicker-week-col\'>' + this._get(e, 'weekHeader') + '</th>' : '', a = 0; 7 > a; a++) O = (a + u) % 7, E += '<th scope=\'col\'' + ((a + u + 6) % 7 >= 5 ? ' class=\'ui-datepicker-week-end\'' : '') + '><span title=\'' + K[O] + '\'>' + Q[O] + '</span></th>';
                    for (s += E + '</tr></thead><tbody>', z = this._getDaysInMonth(n, t), n === e.selectedYear && t === e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, z)), L = (this._getFirstDayOfMonth(n, t) - u + 7) % 7, k = Math.ceil((L + z) / 7), F = Y ? this.maxRows > k ? this.maxRows : k : k, this.maxRows = F, i = this._daylightSavingAdjust(new Date(n, t, 1 - L)), H = 0; F > H; H++) {
                        for (s += '<tr>', W = P ? '<td class=\'ui-datepicker-week-col\'>' + this._get(e, 'calculateWeek')(i) + '</td>' : '', a = 0; 7 > a; a++) b = j ? j.apply(e.input ? e.input[0] : null, [i]) : [!0, ''], d = i.getMonth() !== t, C = d && !G || !b[0] || g && g > i || f && i > f, W += '<td class=\'' + ((a + u + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + (d ? ' ui-datepicker-other-month' : '') + (i.getTime() === M.getTime() && t === e.selectedMonth && e._keyEvent || A.getTime() === i.getTime() && A.getTime() === M.getTime() ? ' ' + this._dayOverClass : '') + (C ? ' ' + this._unselectableClass + ' ui-state-disabled' : '') + (d && !w ? '' : ' ' + b[1] + (i.getTime() === U.getTime() ? ' ' + this._currentClass : '') + (i.getTime() === B.getTime() ? ' ui-datepicker-today' : '')) + '\'' + (d && !w || !b[2] ? '' : ' title=\'' + b[2].replace(/'/g, '&#39;') + '\'') + (C ? '' : ' data-handler=\'selectDay\' data-event=\'click\' data-month=\'' + i.getMonth() + '\' data-year=\'' + i.getFullYear() + '\'') + '>' + (d && !w ? '&#xa0;' : C ? '<span class=\'ui-state-default\'>' + i.getDate() + '</span>' : '<a class=\'ui-state-default' + (i.getTime() === B.getTime() ? ' ui-state-highlight' : '') + (i.getTime() === U.getTime() ? ' ui-state-active' : '') + (d ? ' ui-priority-secondary' : '') + '\' href=\'#\'>' + i.getDate() + '</a>') + '</td>', i.setDate(i.getDate() + 1), i = this._daylightSavingAdjust(i);
                        s += W + '</tr>'
                    };
                    t++, t > 11 && (t = 0, n++), s += '</tbody></table>' + (Y ? '</div>' + (o[0] > 0 && m === o[1] - 1 ? '<div class=\'ui-datepicker-row-break\'></div>' : '') : ''), N += s
                };
                x += N
            };
            return x += X, e._keyEvent = !1, x
        },
        _generateMonthYearHeader: function(e, t, i, n, s, o, g, w) {
            var v, y, a, h, d, f, r, u, p = this._get(e, 'changeMonth'),
                m = this._get(e, 'changeYear'),
                b = this._get(e, 'showMonthAfterYear'),
                l = '<div class=\'ui-datepicker-title\'>',
                c = '';
            if (o || !p) c += '<span class=\'ui-datepicker-month\'>' + g[t] + '</span>';
            else {
                for (v = n && n.getFullYear() === i, y = s && s.getFullYear() === i, c += '<select class=\'ui-datepicker-month\' data-handler=\'selectMonth\' data-event=\'change\'>', a = 0; 12 > a; a++)(!v || a >= n.getMonth()) && (!y || s.getMonth() >= a) && (c += '<option value=\'' + a + '\'' + (a === t ? ' selected=\'selected\'' : '') + '>' + w[a] + '</option>');
                c += '</select>'
            };
            if (b || (l += c + (!o && p && m ? '' : '&#xa0;')), !e.yearshtml)
                if (e.yearshtml = '', o || !m) l += '<span class=\'ui-datepicker-year\'>' + i + '</span>';
                else {
                    for (h = this._get(e, 'yearRange').split(':'), d = (new Date).getFullYear(), f = function(e) {
                            var t = e.match(/c[+\-].*/) ? i + parseInt(e.substring(1), 10) : e.match(/[+\-].*/) ? d + parseInt(e, 10) : parseInt(e, 10);
                            return isNaN(t) ? d : t
                        }, r = f(h[0]), u = Math.max(r, f(h[1] || '')), r = n ? Math.max(r, n.getFullYear()) : r, u = s ? Math.min(u, s.getFullYear()) : u, e.yearshtml += '<select class=\'ui-datepicker-year\' data-handler=\'selectYear\' data-event=\'change\'>'; u >= r; r++) e.yearshtml += '<option value=\'' + r + '\'' + (r === i ? ' selected=\'selected\'' : '') + '>' + r + '</option>';
                    e.yearshtml += '</select>', l += e.yearshtml, e.yearshtml = null
                };
            return l += this._get(e, 'yearSuffix'), b && (l += (!o && p && m ? '' : '&#xa0;') + c), l += '</div>'
        },
        _adjustInstDate: function(e, t, i) {
            var s = e.drawYear + ('Y' === i ? t : 0),
                r = e.drawMonth + ('M' === i ? t : 0),
                o = Math.min(e.selectedDay, this._getDaysInMonth(s, r)) + ('D' === i ? t : 0),
                n = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(s, r, o)));
            e.selectedDay = n.getDate(), e.drawMonth = e.selectedMonth = n.getMonth(), e.drawYear = e.selectedYear = n.getFullYear(), ('M' === i || 'Y' === i) && this._notifyChange(e)
        },
        _restrictMinMax: function(e, t) {
            var i = this._getMinMaxDate(e, 'min'),
                n = this._getMinMaxDate(e, 'max'),
                s = i && i > t ? i : t;
            return n && s > n ? n : s
        },
        _notifyChange: function(e) {
            var t = this._get(e, 'onChangeMonthYear');
            t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
        },
        _getNumberOfMonths: function(e) {
            var t = this._get(e, 'numberOfMonths');
            return null == t ? [1, 1] : 'number' == typeof t ? [1, t] : t
        },
        _getMinMaxDate: function(e, t) {
            return this._determineDate(e, this._get(e, t + 'Date'), null)
        },
        _getDaysInMonth: function(e, t) {
            return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate()
        },
        _getFirstDayOfMonth: function(e, t) {
            return new Date(e, t, 1).getDay()
        },
        _canAdjustMonth: function(e, t, i, n) {
            var r = this._getNumberOfMonths(e),
                s = this._daylightSavingAdjust(new Date(i, n + (0 > t ? t : r[0] * r[1]), 1));
            return 0 > t && s.setDate(this._getDaysInMonth(s.getFullYear(), s.getMonth())), this._isInRange(e, s)
        },
        _isInRange: function(e, t) {
            var i, r, o = this._getMinMaxDate(e, 'min'),
                a = this._getMinMaxDate(e, 'max'),
                n = null,
                s = null,
                l = this._get(e, 'yearRange');
            return l && (i = l.split(':'), r = (new Date).getFullYear(), n = parseInt(i[0], 10), s = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (n += r), i[1].match(/[+\-].*/) && (s += r)), (!o || t.getTime() >= o.getTime()) && (!a || t.getTime() <= a.getTime()) && (!n || t.getFullYear() >= n) && (!s || s >= t.getFullYear())
        },
        _getFormatConfig: function(e) {
            var t = this._get(e, 'shortYearCutoff');
            return t = 'string' != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
                shortYearCutoff: t,
                dayNamesShort: this._get(e, 'dayNamesShort'),
                dayNames: this._get(e, 'dayNames'),
                monthNamesShort: this._get(e, 'monthNamesShort'),
                monthNames: this._get(e, 'monthNames')
            }
        },
        _formatDate: function(e, t, i, n) {
            t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
            var s = t ? 'object' == typeof t ? t : this._daylightSavingAdjust(new Date(n, i, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
            return this.formatDate(this._get(e, 'dateFormat'), s, this._getFormatConfig(e))
        }
    }), e.fn.datepicker = function(t) {
        if (!this.length) return this;
        e.datepicker.initialized || (e(document).mousedown(e.datepicker._checkExternalClick), e.datepicker.initialized = !0), 0 === e('#' + e.datepicker._mainDivId).length && e('body').append(e.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return 'string' != typeof t || 'isDisabled' !== t && 'getDate' !== t && 'widget' !== t ? 'option' === t && 2 === arguments.length && 'string' == typeof arguments[1] ? e.datepicker['_' + t + 'Datepicker'].apply(e.datepicker, [this[0]].concat(i)) : this.each(function() {
            'string' == typeof t ? e.datepicker['_' + t + 'Datepicker'].apply(e.datepicker, [this].concat(i)) : e.datepicker._attachDatepicker(this, t)
        }) : e.datepicker['_' + t + 'Datepicker'].apply(e.datepicker, [this[0]].concat(i))
    }, e.datepicker = new a, e.datepicker.initialized = !1, e.datepicker.uuid = (new Date).getTime(), e.datepicker.version = '1.11.4', e.datepicker
});
(function(e) {
    var c, g, p, n, T, o, C, a, b, w, d = 0,
        i = {},
        u = [],
        h = 0,
        t = {},
        l = [],
        D = null,
        m = new Image(),
        P = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,
        H = /[^\.]\.(swf)\s*$/i,
        j, A = 1,
        y = 0,
        v = '',
        f, r, s = !1,
        x = e.extend(e('<div/>')[0], {
            prop: 0
        }),
        Q, S, N = function() {
            g.hide();
            m.onerror = m.onload = null;
            if (D) {
                D.abort()
            };
            c.empty()
        },
        L = function() {
            if (!1 === i.onError(u, d, i)) {
                g.hide();
                s = !1;
                return
            };
            i.titleShow = !1;
            i.width = 'auto';
            i.height = 'auto';
            c.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');
            k()
        },
        I = function() {
            var n = u[d],
                t, r, l, h, f, a;
            N();
            i = e.extend({}, e.fn.fancybox.defaults, (typeof e(n).data('fancybox') == 'undefined' ? i : e(n).data('fancybox')));
            a = i.onStart(u, d, i);
            if (a === !1) {
                s = !1;
                return
            } else if (typeof a == 'object') {
                i = e.extend(i, a)
            };
            l = i.title || (n.nodeName ? e(n).attr('title') : n.title) || '';
            if (n.nodeName && !i.orig) {
                i.orig = e(n).children('img:first').length ? e(n).children('img:first') : e(n)
            };
            if (l === '' && i.orig && i.titleFromAlt) {
                l = i.orig.attr('alt')
            };
            t = i.href || (n.nodeName ? e(n).attr('href') : n.href) || null;
            if ((/^(?:javascript)/i).test(t) || t == '#') {
                t = null
            };
            if (i.type) {
                r = i.type;
                if (!t) {
                    t = i.content
                }
            } else if (i.content) {
                r = 'html'
            } else if (t) {
                if (t.match(P)) {
                    r = 'image'
                } else if (t.match(H)) {
                    r = 'swf'
                } else if (e(n).hasClass('iframe')) {
                    r = 'iframe'
                } else if (t.indexOf('#') === 0) {
                    r = 'inline'
                } else {
                    r = 'ajax'
                }
            };
            if (!r) {
                L();
                return
            };
            if (r == 'inline') {
                n = t.substr(t.indexOf('#'));
                r = e(n).length > 0 ? 'inline' : 'ajax'
            };
            i.type = r;
            i.href = t;
            i.title = l;
            if (i.close_timeout !== undefined) {
                S = setTimeout('$.fancybox.close()', i.close_timeout)
            };
            if (i.autoDimensions) {
                if (i.type == 'html' || i.type == 'inline' || i.type == 'ajax') {
                    i.width = 'auto';
                    i.height = 'auto'
                } else {
                    i.autoDimensions = !1
                }
            };
            if (i.modal) {
                i.overlayShow = !0;
                i.hideOnOverlayClick = !1;
                i.hideOnContentClick = !1;
                i.enableEscapeButton = !1;
                i.showCloseButton = !1
            };
            i.padding = parseInt(i.padding, 20);
            i.margin = parseInt(i.margin, 0);
            c.css('padding', (i.padding + i.margin));
            e('.fancybox-inline-tmp').unbind('fancybox-cancel').bind('fancybox-change', function() {
                e(this).replaceWith(o.children())
            });
            switch (r) {
                case 'html':
                    c.html(i.content);
                    k();
                    break;
                case 'inline':
                    if (e(n).parent().is('#fancybox-content') === !0) {
                        s = !1;
                        return
                    };
                    e('<div class="fancybox-inline-tmp" />').hide().bind('fancybox-cleanup', function() {
                        e(this).replaceWith(o.children())
                    }).bind('fancybox-cancel', function() {
                        e(this).replaceWith(c.children())
                    });
                    e(n).clone().show().appendTo(c);
                    k();
                    break;
                case 'image':
                    s = !1;
                    e.fancybox.showActivity();
                    m = new Image();
                    m.onerror = function(t) {
                        e(this).attr('src', '/content/images/404.jpg')
                    };
                    m.onload = function() {
                        s = !0;
                        m.onerror = m.onload = null;
                        W()
                    };
                    m.src = t;
                    break;
                case 'swf':
                    i.scrolling = 'no';
                    h = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + i.width + '" height="' + i.height + '"><param name="movie" value="' + t + '"></param>';
                    f = '';
                    e.each(i.swf, function(e, t) {
                        h += '<param name="' + e + '" value="' + t + '"></param>';
                        f += ' ' + e + '="' + t + '"'
                    });
                    h += '<embed src="' + t + '" type="application/x-shockwave-flash" width="' + i.width + '" height="' + i.height + '"' + f + '></embed></object>';
                    c.html(h);
                    k();
                    break;
                case 'ajax':
                    s = !1;
                    e.fancybox.showActivity();
                    i.ajax.win = i.ajax.success;
                    D = e.ajax(e.extend({}, i.ajax, {
                        url: t,
                        data: i.ajax.data || {},
                        dataType: 'json',
                        crossDomain: !1,
                        error: function(e, t, i) {
                            if (e.status > 0) {
                                if (katUser && katUser.acl > 5) {
                                    c.html(e.responseText);
                                    k()
                                } else {
                                    L()
                                }
                            }
                        },
                        success: function(e, n, s) {
                            var r = typeof s == 'object' ? s : D;
                            if (r.status == 200) {
                                if (typeof i.ajax.win == 'function') {
                                    a = i.ajax.win(t, e, n, s);
                                    if (a === !1) {
                                        g.hide();
                                        return
                                    } else if (typeof a == 'string' || typeof a == 'object') {
                                        e = a
                                    }
                                };
                                if (typeof e == 'object') {
                                    if (e.method == 'error') {
                                        var e = '<h2>Error</h2><div class="alertfield">' + e.html + '</div>'
                                    } else if (e.method == 'ok') {
                                        if (e.url != null) {
                                            window.location = e.url;
                                            return
                                        };
                                        var e = '<h2>Reloading...</h2><br>';
                                        window.location.reload(!0)
                                    } else if (e.method == 'show') {
                                        var e = e.html
                                    }
                                } else if (e == '{"method":"ok","html":""}') {
                                    var e = '<h2>Reloading...</h2><br>';
                                    window.location.reload(!0)
                                };
                                c.html(e);
                                k()
                            }
                        }
                    }));
                    break;
                case 'iframe':
                    M();
                    break
            }
        },
        k = function() {
            var t = i.width,
                n = i.height;
            if (t.toString().indexOf('%') > -1) {
                t = parseInt((e(window).width() - (i.margin * 2)) * parseFloat(t) / 100, 10) + 'px'
            } else {
                t = t == 'auto' ? 'auto' : t + 'px'
            };
            if (n.toString().indexOf('%') > -1) {
                n = parseInt((e(window).height() - (i.margin * 2)) * parseFloat(n) / 100, 10) + 'px'
            } else {
                n = n == 'auto' ? 'auto' : n + 'px'
            };
            c.wrapInner('<div style="width:' + t + ';height:' + n + ';overflow: ' + (i.scrolling == 'auto' ? 'visible' : (i.scrolling == 'yes' ? 'scroll' : 'hidden')) + ';position:relative;"></div>');
            i.width = c.width();
            i.height = c.height();
            M()
        },
        W = function() {
            i.width = m.width;
            i.height = m.height;
            e('<img />').attr({
                'id': 'fancybox-img',
                'src': m.src,
                'alt': i.title
            }).appendTo(c);
            M()
        },
        M = function() {
            var m, v;
            g.hide();
            l = u;
            h = d;
            t = i;
            if (n.is(':visible') && !1 === t.onCleanup(l, h, t)) {
                e.event.trigger('fancybox-cancel');
                s = !1;
                return
            };
            s = !0;
            e(o.add(p)).unbind();
            e(window).unbind('resize.fb scroll.fb');
            e(document).unbind('keydown.fb');
            if (n.is(':visible') && t.titlePosition !== 'outside') {
                n.css('height', n.height())
            };
            if (t.overlayShow) {
                p.css({
                    'background-color': t.overlayColor,
                    'opacity': t.overlayOpacity,
                    'cursor': t.hideOnOverlayClick ? 'pointer' : 'auto',
                    'height': e(document).height()
                });
                if (!p.is(':visible')) {
                    p.show()
                }
            } else {
                p.hide()
            };
            r = U();
            B();
            if (n.is(':visible')) {
                e(C.add(b).add(w)).hide();
                m = n.position(), f = {
                    top: m.top,
                    left: m.left,
                    width: n.width(),
                    height: n.height()
                };
                v = (f.width == r.width && f.height == r.height);
                o.fadeTo(t.changeFade, 0.3, function() {
                    var n = function() {
                        o.html(c.contents()).fadeTo(t.changeFade, 1, E)
                    };
                    e.event.trigger('fancybox-change');
                    o.empty().removeAttr('filter').css({
                        'width': r.width - t.padding * 2,
                        'height': i.autoDimensions ? 'auto' : r.height - y - t.padding * 2
                    });
                    if (v) {
                        n()
                    } else {
                        x.prop = 0;
                        e(x).animate({
                            prop: 1
                        }, {
                            duration: t.changeSpeed,
                            easing: t.easingChange,
                            step: O,
                            complete: n
                        })
                    }
                });
                return
            };
            n.removeAttr('style');
            if (t.transitionIn == 'elastic') {
                f = F();
                o.html(c.contents());
                n.show();
                if (t.opacity) {
                    r.opacity = 0
                };
                x.prop = 0;
                e(x).animate({
                    prop: 1
                }, {
                    duration: t.speedIn,
                    easing: t.easingIn,
                    step: O,
                    complete: E
                });
                return
            };
            if (t.titlePosition == 'inside' && y > 0) {
                a.show()
            };
            o.css({
                'width': r.width - t.padding * 2,
                'height': i.autoDimensions ? 'auto' : r.height - y - t.padding * 2
            }).html(c.contents());
            n.css(r).fadeIn(t.transitionIn == 'none' ? 0 : t.speedIn, E)
        },
        R = function(e) {
            if (e && e.length) {
                if (t.titlePosition == 'float') {
                    return '<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + e + '</td><td id="fancybox-title-float-right"></td></tr></table>'
                };
                return '<div id="fancybox-title-' + t.titlePosition + '">' + e + '</div>'
            };
            return !1
        },
        B = function() {
            v = t.title || '';
            y = 0;
            a.empty().removeAttr('style').removeClass();
            if (t.titleShow === !1) {
                a.hide();
                return
            };
            v = e.isFunction(t.titleFormat) ? t.titleFormat(v, l, h, t) : R(v);
            if (!v || v === '') {
                a.hide();
                return
            };
            a.addClass('fancybox-title-' + t.titlePosition).html(v).appendTo('body').show();
            switch (t.titlePosition) {
                case 'inside':
                    a.css({
                        'width': r.width - (t.padding * 2),
                        'marginLeft': t.padding,
                        'marginRight': t.padding
                    });
                    y = a.outerHeight(!0);
                    a.appendTo(T);
                    r.height += y;
                    break;
                case 'over':
                    a.css({
                        'marginLeft': t.padding,
                        'width': r.width - (t.padding * 2),
                        'bottom': t.padding
                    }).appendTo(T);
                    break;
                case 'float':
                    a.css('left', parseInt((a.width() - r.width - 40) / 2, 10) * -1).appendTo(n);
                    break;
                case 'none':
                    break;
                default:
                    a.css({
                        'width': r.width - (t.padding * 2),
                        'paddingLeft': t.padding,
                        'paddingRight': t.padding
                    }).appendTo(n);
                    break
            };
            a.hide()
        },
        q = function() {
            if (t.enableEscapeButton || t.enableKeyboardNav) {
                e(document).bind('keydown.fb', function(i) {
                    if (i.keyCode == 27 && t.enableEscapeButton) {
                        i.preventDefault();
                        e.fancybox.close()
                    } else if ((i.keyCode == 37 || i.keyCode == 39) && t.enableKeyboardNav && i.target.tagName !== 'INPUT' && i.target.tagName !== 'TEXTAREA' && i.target.tagName !== 'SELECT') {
                        i.preventDefault();
                        e.fancybox[i.keyCode == 37 ? 'prev' : 'next']()
                    }
                })
            };
            if (!t.showNavArrows) {
                b.hide();
                w.hide();
                return
            };
            if ((t.cyclic && l.length > 1) || h !== 0) {
                b.show()
            };
            if ((t.cyclic && l.length > 1) || h != (l.length - 1)) {
                w.show()
            }
        },
        E = function() {
            if (i.autoDimensions) {
                o.css('height', 'auto')
            };
            n.css('height', 'auto');
            if (v && v.length) {
                a.show()
            };
            if (t.showCloseButton) {
                C.show()
            };
            q();
            if (t.hideOnContentClick) {
                o.bind('click', e.fancybox.close)
            };
            if (t.hideOnOverlayClick) {
                p.bind('click', e.fancybox.close)
            };
            e(window).bind('resize.fb', e.fancybox.resize);
            if (t.centerOnScroll) {
                e(window).bind('scroll.fb', e.fancybox.center)
            };
            if (t.type == 'iframe') {
                e('<iframe id="fancybox-frame" name="fancybox-frame' + new Date().getTime() + '" frameborder="0" hspace="0" allowtransparency="true" scrolling="' + i.scrolling + '" src="' + t.href + '"></iframe>').appendTo(o)
            };
            n.show();
            s = !1;
            e.fancybox.center();
            t.onComplete(l, h, t);
            o.find('[autofocus]').focus();
            Y()
        },
        Y = function() {
            var e, t;
            if ((l.length - 1) > h) {
                e = l[h + 1].href;
                if (typeof e !== 'undefined' && e.match(P)) {
                    t = new Image();
                    t.src = e
                }
            };
            if (h > 0) {
                e = l[h - 1].href;
                if (typeof e !== 'undefined' && e.match(P)) {
                    t = new Image();
                    t.src = e
                }
            }
        },
        O = function(e) {
            var i = {
                width: parseInt(f.width + (r.width - f.width) * e, 10),
                height: parseInt(f.height + (r.height - f.height) * e, 10),
                top: parseInt(f.top + (r.top - f.top) * e, 10),
                left: parseInt(f.left + (r.left - f.left) * e, 10)
            };
            if (typeof r.opacity !== 'undefined') {
                i.opacity = e < 0.5 ? 0.5 : e
            };
            n.css(i);
            o.css({
                'width': i.width - t.padding * 2,
                'height': i.height - (y * e) - t.padding * 2
            })
        },
        z = function() {
            return [e(window).width() - (t.margin * 2), e(window).height() - (t.margin * 2), e(document).scrollLeft() + t.margin, e(document).scrollTop() + t.margin]
        },
        U = function() {
            var n = z(),
                e = {},
                o = t.autoScale,
                s = t.padding * 2,
                r;
            if (t.width.toString().indexOf('%') > -1) {
                e.width = parseInt((n[0] * parseFloat(t.width)) / 100, 10)
            } else {
                e.width = t.width + s
            };
            if (t.height.toString().indexOf('%') > -1) {
                e.height = parseInt((n[1] * parseFloat(t.height)) / 100, 10)
            } else {
                e.height = t.height + s
            };
            if (o && (e.width > n[0] || e.height > n[1])) {
                if (i.type == 'image' || i.type == 'swf') {
                    r = (t.width) / (t.height);
                    if ((e.width) > n[0]) {
                        e.width = n[0];
                        e.height = parseInt(((e.width - s) / r) + s, 10)
                    };
                    if ((e.height) > n[1]) {
                        e.height = n[1];
                        e.width = parseInt(((e.height - s) * r) + s, 10)
                    }
                } else {
                    e.width = Math.min(e.width, n[0]);
                    e.height = Math.min(e.height, n[1])
                }
            };
            e.top = parseInt(Math.max(n[3] - 20, n[3] + ((n[1] - e.height - 40) * 0.5)), 10);
            e.left = parseInt(Math.max(n[2] - 20, n[2] + ((n[0] - e.width - 40) * 0.5)), 10);
            return e
        },
        X = function(e) {
            var t = e.offset();
            t.top += parseInt(e.css('paddingTop'), 10) || 0;
            t.left += parseInt(e.css('paddingLeft'), 10) || 0;
            t.top += parseInt(e.css('border-top-width'), 10) || 0;
            t.left += parseInt(e.css('border-left-width'), 10) || 0;
            t.width = e.width();
            t.height = e.height();
            return t
        },
        F = function() {
            var r = i.orig ? e(i.orig) : !1,
                o = {},
                n, s;
            if (r && r.length) {
                n = X(r);
                o = {
                    width: n.width + (t.padding * 2),
                    height: n.height + (t.padding * 2),
                    top: n.top - t.padding - 20,
                    left: n.left - t.padding - 20
                }
            } else {
                s = z();
                o = {
                    width: t.padding * 2,
                    height: t.padding * 2,
                    top: parseInt(s[3] + s[1] * 0.5, 10),
                    left: parseInt(s[2] + s[0] * 0.5, 10)
                }
            };
            return o
        },
        K = function() {
            if (!g.is(':visible')) {
                clearInterval(j);
                return
            };
            e('div', g).css('top', (A * -40) + 'px');
            A = (A + 1) % 12
        };
    e.fn.fancybox = function(t) {
        if (!e(this).length) {
            return this
        };
        e(this).data('fancybox', e.extend({}, t, (e.metadata ? e(this).metadata() : {}))).unbind('click.fb').bind('click.fb', function(t) {
            t.preventDefault();
            if (s) {
                return
            };
            s = !0;
            e(this).blur();
            u = [];
            d = 0;
            var i = e(this).attr('rel') || '';
            if (!i || i == '' || i === 'nofollow' || i === 'nofollow noopener noreferrer') {
                u.push(this)
            } else {
                u = e('a[rel=' + i + '], area[rel=' + i + ']');
                d = u.index(this)
            };
            I();
            return
        });
        return this
    };
    e.fancybox = function(t) {
        var n;
        if (s) {
            return
        };
        s = !0;
        n = typeof arguments[1] !== 'undefined' ? arguments[1] : {};
        u = [];
        d = parseInt(n.index, 10) || 0;
        if (e.isArray(t)) {
            for (var i = 0, r = t.length; i < r; i++) {
                if (typeof t[i] == 'object') {
                    e(t[i]).data('fancybox', e.extend({}, n, t[i]))
                } else {
                    t[i] = e({}).data('fancybox', e.extend({
                        content: t[i]
                    }, n))
                }
            };
            u = jQuery.merge(u, t)
        } else {
            if (typeof t == 'object') {
                e(t).data('fancybox', e.extend({}, n, t))
            } else {
                t = e({}).data('fancybox', e.extend({
                    content: t
                }, n))
            };
            u.push(t)
        };
        if (d > u.length || d < 0) {
            d = 0
        };
        I()
    };
    e.fancybox.isActive = function() {
        return e('#fancybox-content').is(':visible')
    };
    e.fancybox.setContent = function(t) {
        e('#fancybox-content div').html(t);
        e.fancybox.resize()
    };
    e.fancybox.queue = function(t, i) {
        if (!t.length) return;
        i = e.extend({
            onNext: null,
            timeout: 0
        }, i);
        var s = t.pop(),
            n = e(s).html();
        if (i.timeout) {
            setTimeout(function() {
                e.fancybox.close()
            }, i.timeout)
        };
        if (typeof i.onNext == 'function') {
            i.onNext.call(this, n)
        };
        if (e.fancybox.isActive()) {
            e.fancybox.setContent(n);
            return
        };
        e.fancybox({
            content: n,
            hideOnContentClick: !0,
            onCleanup: function() {
                if (t.length) {
                    e.fancybox.queue(t, i);
                    return !1
                }
            }
        })
    };
    e.fancybox.saveState = function() {
        var t = e('#fancybox-wrap'),
            i = e('#fancybox-content');
        return {
            title: i.find('h1,h2,h3').eq(0).text(),
            div: e('<div/>').hide().appendTo('body').append(i.contents()),
            wrapTop: t.css('top'),
            wrapLeft: t.css('left'),
            wrapWidth: t.css('width'),
            contentWidth: i.css('width')
        }
    };
    e.fancybox.restoreState = function(t) {
        e('#fancybox-wrap').css({
            top: t.wrapTop,
            left: t.wrapLeft,
            width: t.wrapWidth
        });
        e('#fancybox-content').empty().append(t.div.contents()).css({
            width: t.contentWidth
        });
        t.div.remove()
    };
    e.fancybox.showActivity = function() {
        clearInterval(j);
        g.show();
        j = setInterval(K, 66)
    };
    e.fancybox.hideActivity = function() {
        g.hide()
    };
    e.fancybox.next = function() {
        return e.fancybox.pos(h + 1)
    };
    e.fancybox.prev = function() {
        return e.fancybox.pos(h - 1)
    };
    e.fancybox.pos = function(e) {
        if (s) {
            return
        };
        e = parseInt(e);
        u = l;
        if (e > -1 && e < l.length) {
            d = e;
            I()
        } else if (t.cyclic && l.length > 1) {
            d = e >= l.length ? 0 : l.length - 1;
            I()
        };
        return
    };
    e.fancybox.cancel = function() {
        if (s) {
            return
        };
        s = !0;
        e.event.trigger('fancybox-cancel');
        N();
        i.onCancel(u, d, i);
        s = !1
    };
    e.fancybox.close = function() {
        if (S !== undefined) {
            clearTimeout(S);
            delete S
        };
        if (s || n.is(':hidden')) {
            return
        };
        s = !0;
        if (t && !1 === t.onCleanup(l, h, t)) {
            s = !1;
            return
        };
        N();
        e(C.add(b).add(w)).hide();
        e(o.add(p)).unbind();
        e(window).unbind('resize.fb scroll.fb');
        e(document).unbind('keydown.fb');
        o.find('iframe').attr('src', 'about:blank');
        if (t.titlePosition !== 'inside') {
            a.empty()
        };
        n.stop();

        function u() {
            p.fadeOut('fast');
            a.empty().hide();
            n.hide();
            e('.fancybox-inline-tmp').trigger('fancybox-cleanup');
            o.empty();
            t.onClosed(l, h, t);
            l = i = [];
            h = d = 0;
            t = i = {};
            s = !1
        };
        if (t.transitionOut == 'elastic') {
            f = F();
            var c = n.position();
            r = {
                top: c.top,
                left: c.left,
                width: n.width(),
                height: n.height()
            };
            if (t.opacity) {
                r.opacity = 1
            };
            a.empty().hide();
            x.prop = 1;
            e(x).animate({
                prop: 0
            }, {
                duration: t.speedOut,
                easing: t.easingOut,
                step: O,
                complete: u
            })
        } else {
            n.fadeOut(t.transitionOut == 'none' ? 0 : t.speedOut, u)
        }
    };
    e.fancybox.resize = function() {
        if (p.is(':visible')) {
            p.css('height', e(document).height())
        };
        e.fancybox.center(!0)
    };
    e.fancybox.center = function() {
        var e, i;
        if (s) {
            return
        };
        i = arguments[0] === !0 ? 1 : 0;
        e = z();
        if (!i && (n.width() > e[0] || n.height() > e[1])) {
            return
        };
        n.stop().animate({
            'top': parseInt(Math.max(e[3] - 20, e[3] + ((e[1] - o.height() - 40) * 0.5) - t.padding)),
            'left': parseInt(Math.max(e[2] - 20, e[2] + ((e[0] - o.width() - 40) * 0.5) - t.padding))
        }, typeof arguments[0] == 'number' ? arguments[0] : 200)
    };
    e.fancybox.init = function() {
        if (e('#fancybox-wrap').length) {
            return
        };
        e('body').append(c = e('<div id="fancybox-tmp"></div>'), g = e('<div id="fancybox-loading"><div></div></div>'), p = e('<div id="fancybox-overlay"></div>'), n = e('<div id="fancybox-wrap"></div>'));
        T = e('<div id="fancybox-outer"></div>').appendTo(n);
        T.append(o = e('<div id="fancybox-content"></div>'), C = e('<a data-nop id="fancybox-close"><i class="ka ka16 ka-delete"></i></a>'), a = e('<div id="fancybox-title"></div>'), b = e('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), w = e('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));
        C.click(e.fancybox.close);
        g.click(e.fancybox.cancel);
        b.click(function(t) {
            t.preventDefault();
            e.fancybox.prev()
        });
        w.click(function(t) {
            t.preventDefault();
            e.fancybox.next()
        });
        if (e.fn.mousewheel) {
            n.bind('mousewheel.fb', function(t, i) {
                if (s) {
                    t.preventDefault()
                } else if (e(t.target).get(0).clientHeight == 0 || e(t.target).get(0).scrollHeight === e(t.target).get(0).clientHeight) {
                    t.preventDefault();
                    e.fancybox[i > 0 ? 'prev' : 'next']()
                }
            })
        }
    };
    e.fn.fancybox.defaults = {
        padding: 10,
        margin: 40,
        opacity: !1,
        modal: !1,
        cyclic: !1,
        scrolling: 'auto',
        width: 560,
        height: 340,
        autoScale: !0,
        autoDimensions: !0,
        centerOnScroll: !1,
        ajax: {},
        swf: {
            wmode: 'transparent'
        },
        hideOnOverlayClick: !0,
        hideOnContentClick: !1,
        overlayShow: !0,
        overlayOpacity: 0.9,
        titleShow: !1,
        titlePosition: 'float',
        titleFormat: null,
        titleFromAlt: !1,
        transitionIn: 'fade',
        transitionOut: 'fade',
        speedIn: 300,
        speedOut: 300,
        changeSpeed: 300,
        changeFade: 'fast',
        easingIn: 'swing',
        easingOut: 'swing',
        showCloseButton: !0,
        showNavArrows: !0,
        enableEscapeButton: !0,
        enableKeyboardNav: !0,
        onStart: function() {},
        onCancel: function() {},
        onComplete: function() {},
        onCleanup: function() {},
        onClosed: function() {},
        onError: function() {}
    };
    e(document).ready(function() {
        e.fancybox.init()
    })
})(jQuery);
(function(e) {
    e.bbedit = {
        baseURL: '/content/images/',
        i18n: {
            'default': {
                'b': 'Bold',
                'i': 'Italic',
                'u': 'Underline',
                's': 'Strike through',
                'url': 'Insert link',
                'torrent': 'Insert torrent link',
                'user': 'Insert link to user profile',
                'image': 'Insert image',
                'code': 'Insert code',
                'quote': 'Insert quote',
                'smiles': 'Show smiles',
                'spoiler': 'Insert spoiler',
                'size': 'Font size',
                'align': 'Text alignment',
                'list': 'Insert List',
                'color': 'Set text color',
                'youtube': 'Embed YouTube video',
                'preview': 'Preview',
                'biggrin': 'Big grin',
                'cry': 'Cry',
                'dizzy': 'Dizzy',
                'funk': 'Funk',
                'huffy': 'Huffy',
                'lol': 'Laugh out Loud',
                'loveliness': 'Loveliness',
                'mad': 'Mad',
                'sad': 'Sad',
                'shocked': 'Shocked',
                'shy': 'Shy',
                'sleepy': 'Sleepy',
                'smile': 'Smile',
                'sweat': 'Sweat',
                'titter': 'Titter',
                'tongue': 'Tongue out',
                'pirate': 'Pirate',
                'nervous': 'Nervous Laughter',
                'white': 'White Flag',
                'cold': 'Cold Sweat',
                'lucky': 'Ya feelin lucky, punk??',
                'boo': 'Boo',
                'wink': 'Little D',
                'dull': 'Dull',
                'chuckle': 'Chuckle',
                'clap': 'Clap',
                'drunk': 'Drunk',
                'finger': 'Middle finger',
                'inlove': 'In love',
                'nerd': 'Nerd',
                'no': 'No',
                'rofl': 'ROFL',
                'sealed': 'Lips sealed',
                'smirk': 'Smirk',
                'think': 'Think',
                'yes': 'Yes',
                'wait': 'Wait',
                'wave': 'Wave',
                'cool': 'Cool dude',
                'evil': 'Evil',
                'punch': 'Punch',
                'doh': 'Doh',
                'yawn': 'Yawn',
                'tmi': 'TMI',
                'fubar': 'FUBAR',
                'rock': 'Rock',
                'bandit': 'Bandit',
                'swear': 'Swear',
                'facepalm': 'Facepalm',
                'thumb_dwn': 'Thumbs Down',
                'thumb_up': 'Thumbs Up'
            }
        },
        menus: {
            'size': {
                '200': 'Big',
                '100': 'Normal',
                'small': 'Small'
            },
            'align': {
                'left': 'Left',
                'center': 'Center',
                'right': 'Right',
                'justify': 'Justify'
            },
            'list': {
                'bullet': 'Bulleted List',
                'numeric': 'Numeric List',
                'additem': 'Add Item'
            },
            'image': {
                'upload': 'Insert image',
                'link': 'Link image',
            },
            'color': {
                'yellow': '',
                'orange': '',
                'red': '',
                'blue': '',
                'purple': '',
                'green': '',
                'white': '',
                'gray': '',
                'black': '',
            }
        }
    };
    e.fn.extend({
        bbedit: function(s) {
            this.defaults = {
                highlight: !0,
                enableToolbar: !0,
                enableSmileybar: !0,
                isforSignature: !1,
                reportbox: !1,
                lang: 'default',
                tags: 'b,i,u,s,image,url,torrent,user,code,quote,smiles,spoiler,size,align,list,color,youtube,preview',
                hasmenu: 'size,align',
                smilies: 'biggrin,cry,dizzy,funk,huffy,lol,loveliness,mad,sad,shocked,shy,sleepy,smile,sweat,titter,tongue,pirate,boo,wink,dull,chuckle,clap,drunk,finger,inlove,nerd,no,rofl,sealed,smirk,think,yes,wait,wave,cool,evil,punch,doh,yawn,tmi,fubar,rock,bandit,swear,facepalm,thumb_up,thumb_dwn',
                attachImage: !0,
                lastBBcode: ''
            };
            var s = e.extend(this.defaults, s),
                a = s.tags.split(/,\s*/),
                c = '<div class="bbedit-toolbar">';
            for (var r in a) {
                c += ((a[r] in e.bbedit.menus) ? '<div class="bbedit-hasmenu">' : '') + '<span class="ka ka-' + a[r] + ' bbedit-' + a[r] + '" title="' + e.bbedit.i18n[s.lang][a[r]] + '"></span>' + ((a[r] in e.bbedit.menus) ? '</div> ' : ' ')
            };
            c += '</div>';
            var o = s.smilies.split(/,\s*/),
                u = '<div class="clear"></div>',
                l = '<div class="bbedit-smileybar">';
            for (var r in o) {
                if (o[r] != '|' && o != undefined) {
                    l += '<img src="' + e.bbedit.baseURL + 'smiley/' + o[r] + '.gif" class="bbedit-' + o[r] + '" alt="' + o[r] + '" title="' + e.bbedit.i18n[s.lang][o[r]] + '" /> '
                } else {
                    l += '<br />'
                }
            };
            l += '</div>';
            return this.each(function() {
                var r = s;
                r.ta = this;
                var u = 'sm' + Math.random();
                u = u.replace('0.', '');
                e(this).bind('select click keyup', function() {
                    if (document.selection) {
                        var i = document.selection.createRange(),
                            e = r.ta.createTextRange(),
                            t = e.duplicate();
                        e.moveToBookmark(i.getBookmark());
                        t.setEndPoint('EndToStart', e);
                        r.selectionStart = t.text.length;
                        r.selectionEnd = t.text.length + i.text.length
                    }
                });
                if (s.enableToolbar) {
                    var a = e(c);
                    e(this).before(a);
                    if (s.isforSignature) a.find('.bbedit-code, .bbedit-quote, .bbedit-spoiler, .bbedit-youtube').remove();
                    if (s.reportbox) a.find('.bbedit-smiles, .bbedit-hasmenu:has(.bbedit-size, .bbedit-align, .bbedit-color), .bbedit-youtube').remove();
                    if (!s.preview) {
                        a.find('.bbedit-preview').remove()
                    } else {
                        a.find('.bbedit-preview').attr('data-preview', s.preview).before('<span class="bbedit-separator"></span> ')
                    };
                    a.find('.bbedit-hasmenu').each(function() {
                        i(e(this))
                    });
                    a.find('.bbedit-b').click(function() {
                        t(r, '[b]', '[/b]')
                    });
                    a.find('.bbedit-i').click(function() {
                        t(r, '[i]', '[/i]')
                    });
                    a.find('.bbedit-u').click(function() {
                        t(r, '[u]', '[/u]')
                    });
                    a.find('.bbedit-s').click(function() {
                        t(r, '[s]', '[/s]')
                    });
                    a.find('.bbedit-code').click(function() {
                        t(r, '[code]', '[/code]')
                    });
                    a.find('.bbedit-quote').click(function() {
                        t(r, '[quote]', '[/quote]')
                    });
                    a.find('.bbedit-spoiler').click(function() {
                        var e = prompt('Enter spoiler button text:');
                        if (e.replace(/ /g, '') != '') {
                            t(r, '[spoiler="' + e.replace(/"/g, '`') + '"]', '[/spoiler]')
                        } else {
                            t(r, '[spoiler]', '[/spoiler]')
                        }
                    });
                    a.find('.bbedit-align').click(function() {
                        var e = prompt('Enter alignment:');
                        if (e == 'left' || e == 'center' || e == 'right' || e == 'justify') t(r, '[' + e + ']', '[/' + e + ']')
                    });
                    a.find('[class*="bbedit-align-"]').click(function() {
                        var i = e(this).attr('class').replace(/.*bbedit-align-/, '');
                        t(r, '[' + i + ']', '[/' + i + ']')
                    });
                    a.find('.bbedit-list').click(function() {
                        t(r, '[*] ', '')
                    });
                    a.find('[class*="bbedit-list-"]').click(function() {
                        if (e(this).is('.bbedit-list-additem')) {
                            t(r, '[*] ', '')
                        } else if (e(this).is('.bbedit-list-numeric')) {
                            t(r, '[list=1]\n', '\n[/list]')
                        } else {
                            t(r, '[list]\n', '\n[/list]')
                        }
                    });
                    a.find('.bbedit-size').click(function() {
                        var e = prompt('Text size');
                        if (e) t(r, '[size=' + e + ']', '[/size]')
                    });
                    a.find('[class*="bbedit-size-"]').click(function() {
                        var i = e(this).attr('class').replace(/.*bbedit-size-/, '');
                        if (i == 'small') {
                            t(r, '[small]', '[/small]')
                        } else {
                            t(r, '[size=' + i + ']', '[/size]')
                        }
                    });
                    a.find('.bbedit-color').click(function() {
                        var i = prompt('Enter color');
                        if (/^acl[\W\D]*(\d+|elite|elite\s*uploader|eul|verified|verified\s*uploader|vul)$/i.test(i)) {
                            var n = i.match(/^acl[\W\D]*(\d+|elite|elite\s*uploader|eul|verified|verified\s*uploader|vul)$/i)[1];
                            n = n.charAt(0) == 'e' ? 'eliteuploader' : (n.charAt(0) == 'v' ? 'verified' : n);
                            var a = e('<b></b>').addClass('aclColor_' + n).css('color').match(/\d+/g);
                            i = '#';
                            for (var o = 0; o < 3; o++) {
                                var s = parseInt(a[o]).toString(16);
                                i += s.length == 1 ? '0' + s : s
                            };
                            t(r, '[color=' + i + ']', '[/color]')
                        } else if (/^#*([a-f0-9]{3}){1,2}$/i.test(i)) {
                            t(r, '[color=' + (/^#/.test(i) ? '' : '#') + i + ']', '[/color]')
                        } else if (i != '' && i != null) {
                            t(r, '[color="' + i + '"]', '[/color]')
                        }
                    });
                    a.find('[class*="bbedit-color-"]').click(function() {
                        var i = e(this).attr('class').replace(/.*bbedit-color-/, '');
                        if (i == 'menu') return;
                        t(r, '[color="' + i + '"]', '[/color]')
                    });
                    a.find('.bbedit-image-link').click(function() {
                        t(r, function(e) {
                            if (e != '') {
                                return '[img]' + e + '[/img]'
                            } else {
                                var t = prompt('Image URL: ', '');
                                if (t != null && t != '') {
                                    return '[img]' + t + '[/img]'
                                };
                                return !1
                            }
                        })
                    });
                    a.find('.bbedit-url').click(function() {
                        t(r, function(e) {
                            if (/^https?:\/\//i.test(e)) {
                                return '[url]' + e + '[/url]'
                            } else {
                                var t = prompt('URL: ', '');
                                if (t != null && t != '') {
                                    if (!/^https?:\/\//i.test(t)) {
                                        t = 'http://' + t
                                    };
                                    if (e == '') {
                                        return '[url="' + t + '"]' + t + '[/url]'
                                    } else {
                                        return '[url="' + t + '"]' + e + '[/url]'
                                    }
                                };
                                return !1
                            }
                        })
                    });
                    a.find('.bbedit-youtube').click(function() {
                        t(r, function(e) {
                            if (e.length > 0) {
                                return '[youtube]' + e + '[/youtube]'
                            } else {
                                var t = prompt('YouTube URL: ', '');
                                if (t != null && t != '') {
                                    return '[youtube]' + t + '[/youtube]'
                                };
                                return !1
                            }
                        })
                    });
                    a.find('.bbedit-image-upload, .bbedit-image').imageSelector({
                        select: function(i) {
                            for (var n in i) {
                                if (s.attachImage) {
                                    e(this).parents('form:eq(0)').find('.objectAttachmentsJs').append(e('<div/>').attr('class', 'galleryThumbSizerStills inlineblock').append(e('<input/>').attr('type', 'hidden').attr('name', 'image_ids[]').val(i[n].id)).append(e('<a/>').attr('class', 'topmarg2px leftmarg2px absolute').click(function() {
                                        e(this).parent().remove()
                                    }).append(e('<span/>').attr('class', 'ka ka16 ka-delete ka-red'))).append(e('<a/>').attr('rel', 'images_' + u).attr('class', 'galleryThumb').attr('href', i[n].link).fancybox().append(e('<img/>').attr('src', i[n].thumb_link))))
                                } else {
                                    t(r, '[image=' + i[n].name + ']')
                                }
                            }
                        }
                    });
                    a.find('.bbedit-smiles').click(function() {
                        if (e(r.ta).hasClass('activeSmiles')) {
                            e(r.ta).removeClass('activeSmiles')
                        } else {
                            e(r.ta).addClass('activeSmiles')
                        };
                        e('#' + u).toggle();
                        return !1
                    });
                    a.find('.bbedit-user').click(function() {
                        t(r, function(e) {
                            var t = prompt('Nickname: ', e);
                            if (t != null && t != '') {
                                t = t.replace(/https?.+\/user\/([^\/]+)\/.*/, '$1');
                                return '[user="' + t + '"]'
                            } else {
                                return !1
                            }
                        })
                    });
                    a.find('.bbedit-torrent').click(function() {
                        t(r, function(e) {
                            var t = prompt('Torrent link, id or hash: ', e);
                            if (t != null && t != '') {
                                t = t.replace(/https?.+t(\d+)\.html/, '$1');
                                if ((/\d+/i.test(t)) || (/^[a-f0-9]{40}/i.test(t))) {
                                    return '[torrent=' + t + ']'
                                };
                                return 'Wrong torrent: ' + t
                            } else {
                                return !1
                            }
                        })
                    });
                    a.find('.bbedit-preview').click(function() {
                        n(r, e(this).attr('data-preview'))
                    })
                };
                if (s.enableSmileybar) {
                    var h = e(l);
                    h.attr('id', u);
                    e(this).after(h);
                    h.hide();
                    for (var f in o) {
                        var d = h.find('.bbedit-' + o[f]);
                        d.click(function() {
                            t(r, '[:Q' + e(this).attr('class').replace(/bbedit-/, '') + ']')
                        })
                    }
                }
            })
        }
    });

    function t(e, t, i) {
        var n = e.ta,
            r = e.selectionStart || n.selectionStart || 0,
            l = e.selectionEnd || n.selectionEnd || 0,
            a = n.value.substring(r, l),
            s;
        if (typeof t == 'function') {
            s = t(a);
            if (s === !1) {
                return
            }
        } else {
            if (!i || i == '') {
                s = a + t
            } else {
                s = t + a + i
            }
        };
        n.value = n.value.substring(0, r) + s + n.value.substr(l);
        n.focus();
        if (typeof n.createTextRange != 'undefined') {
            var o = n.createTextRange();
            if (e.highlight) {
                o.moveStart('character', r);
                o.moveEnd('character', r + s.length)
            } else {
                o.moveStart('character', r + s.length);
                o.moveEnd('character', r + s.length)
            };
            o.select()
        } else if (typeof n.selectionStart != 'undefined') {
            if (e.highlight) {
                n.selectionStart = r;
                n.selectionEnd = r + s.length
            } else {
                n.selectionStart = r + s.length;
                n.selectionEnd = r + s.length
            }
        } else {
            n.value += s
        }
    };

    function i(t) {
        var i = t.find('[class*="bbedit-"]').attr('class').replace(/.*bbedit-/, ''),
            n = '<ul class="bbedit-menu ' + (i == 'color' ? 'bbedit-color-menu' : '') + '">';
        e.each(e.bbedit.menus[i], function(e, t) {
            if (i == 'color') {
                n += '<li style="background-color:' + e + ';" class="bbedit-' + i + '-' + e + '" title="' + t + '"><span></span><i>' + t + '</i></li>'
            } else {
                n += '<li class="ka ka-' + i + '-' + e + ' bbedit-' + i + '-' + e + '" title="' + t + '"><span></span><i>' + t + '</i></li>'
            }
        });
        t.append(n + '</ul>')
    };

    function n(t, i) {
        bbcode = t.ta.value;
        lastBBcode = t.lastBBcode;
        if (t.lastBBcode != bbcode) {
            if (bbcode.replace(/\s|\r|\t|\n/gm, '') != '') {
                e.ajax({
                    'type': 'POST',
                    'url': '/preview.php',
                    'data': {
                        data: bbcode
                    },
                    beforeSend: function() {
                        e(i).show().html('<div class="center"><img src="/content/images/indicator.gif" alt="loading"/></div>')
                    },
                    success: function(t) {
                        e(i).html(t);
                        e(i).find('.ajaxLink').fancybox()
                    }
                })
            } else {
                e(i).html('')
            };
            t.lastBBcode = bbcode
        }
    }
})(jQuery);
(function(e, t) {
    e.fn.fcbkcomplete = function(t) {
        return this.queue(function() {
            function O() {
                z();
                P(0)
            };

            function z() {
                l = e('<ul class="holder textinput"></ul>').width(n.width);
                if (n.attachto) {
                    if (typeof(n.attachto) == 'object') {
                        n.attachto.append(l)
                    } else {
                        e(n.attachto).append(l)
                    }
                } else {
                    s.after(l)
                };
                c = e('<div class="facebook-auto">').width(n.width);
                if (n.complete_text != '') {
                    var t = n.complete_text;
                    if (n.select_all_text) {
                        c.children('.default').append(e('<a href="" class="select_all_items">' + n.select_all_text + '</a>').click(function() {
                            e(s).trigger('selectAll');
                            return !1
                        }))
                    }
                };
                c.hover(function() {
                    w = 0
                }, function() {
                    w = 1
                });
                r = e('<ul id="' + f + '_feed"></ul>').width(n.width);
                l.after(c.prepend(r));
                L()
            };

            function L() {
                name = s.attr('name');
                if (n.bricket) {
                    if (typeof(name) != 'undefined' && name.indexOf('[]') == -1) {
                        name = name + '[]'
                    }
                };
                var t = e('<' + s.get(0).tagName + ' name="' + name + '" id="' + f + '" multiple="multiple" class="' + s.get(0).className + ' hidden">').data('cache', {});
                e.each(s.children('option'), function(i, n) {
                    n = e(n);
                    t.data('cache')[n.val()] = n.text();
                    if (n.hasClass('selected')) {
                        var s = u(n.text(), n.val(), !0, n.hasClass('locked'));
                        t.append('<option value="' + n.val() + '" selected="selected" id="opt_' + s + '"class="selected">' + n.text() + '</option>')
                    }
                });
                s.after(t);
                s.remove();
                s = t;
                e(s).bind('addItem', function(e, t) {
                    u(t.title, t.value, 0, 0, 0)
                });
                e(s).bind('removeItem', function(e, t) {
                    var i = l.children('li[rel=' + t.value + ']');
                    if (i.length) {
                        C(i)
                    }
                });
                e(s).bind('destroy', function(e, t) {
                    l.remove();
                    c.remove();
                    s.show()
                });
                e(s).bind('selectAll', function(t, i) {
                    var n = e(s).val() || [];
                    e.each(e(s).data('cache'), function(t, i) {
                        if (e.inArray(t, n) === -1) {
                            u(i, t, 0, 0, 0)
                        }
                    });
                    r.parent().hide()
                })
            };

            function u(t, i, r, o, a) {
                if (!p()) {
                    return !1
                };
                var m = 'bit-box' + (o ? ' locked' : ''),
                    c = E(),
                    g = document.createTextNode(d(t)),
                    h = e('<a class="closebutton" href="#"></a>'),
                    y = e('<li class="' + m + '" rel="' + i + '" id="pt_' + c + '"></li>').prepend(g).append(h);
                l.append(y);
                h.click(function() {
                    C(e(this).parent('li'));
                    return !1
                });
                if (!r) {
                    e('#' + f + '_annoninput').remove();
                    P(a);
                    var u = e('<option value="' + d(i) + '" id="opt_' + c + '" class="selected" selected="selected">' + d(t) + '</option>');
                    s.append(u);
                    if (n.onselect) {
                        I(n.onselect, u)
                    };
                    s.change()
                };
                l.children('li.bit-box.deleted').removeClass('deleted');
                v(1);
                return c
            };

            function C(t) {
                if (!t.hasClass('locked')) {
                    t.fadeOut('fast');
                    var i = t.attr('id');
                    if (n.onremove) {
                        var r = i ? e('#o' + i + '') : s.children('option[value=' + t.attr('rel') + ']');
                        I(n.onremove, r)
                    };
                    if (i) {
                        e('#o' + i + '').remove()
                    } else {
                        s.children('option[value="' + t.attr('rel') + '"]').remove()
                    };
                    t.remove();
                    s.change();
                    b = 0
                }
            };

            function P(t) {
                var s = e('<li class="bit-input" id="' + f + '_annoninput">'),
                    i = e('<input type="text" class="maininput" size="' + n.input_min_size + '" autocomplete="off">');
                if (n.input_tabindex > 0) i.attr('tabindex', n.input_tabindex);
                if (n.input_name != '') i.attr('name', n.input_name);
                l.append(s.append(i));
                i.focus(function() {
                    y = !0;
                    if (p()) {
                        c.fadeIn('fast')
                    }
                });
                i.blur(function() {
                    y = !1;
                    if (w) {
                        c.fadeOut('fast')
                    } else {}
                });
                l.click(function() {
                    if (n.input_min_size < 0 && r.length) {
                        M(m(i.val(), 1))
                    };
                    i.focus();
                    if (r.length && i.val().length > n.input_min_size) {
                        r.show()
                    } else {
                        v(1);
                        c.children('.default').show()
                    }
                });
                i.keypress(function(e) {
                    if (e.keyCode == a.enter) {
                        return !1
                    };
                    var t = (n.input_min_size > i.val().length) ? n.input_min_size : (i.val().length + 1);
                    i.attr('size', t).width(parseInt(i.css('font-size')) * t)
                });
                i.keyup(function(t) {
                    var s = m(i.val(), 1);
                    if (t.keyCode == a.backspace && s.length == 0) {
                        v(1);
                        if (!l.children('li.bit-box:last').hasClass('locked')) {
                            if (l.children('li.bit-box.deleted').length == 0) {
                                l.children('li.bit-box:last').addClass('deleted');
                                return !1
                            } else {
                                if (b) {
                                    return
                                };
                                b = 1;
                                l.children('li.bit-box.deleted').fadeOut('fast', function() {
                                    C(e(this));
                                    return !1
                                })
                            }
                        }
                    };
                    if (t.keyCode != a.downarrow && t.keyCode != a.uparrow && t.keyCode != a.leftarrow && t.keyCode != a.rightarrow && s.length >= n.input_min_size) {
                        M(s);
                        c.children('.default').hide();
                        r.show()
                    }
                });
                if (n.oncreate) {
                    I(n.oncreate, i)
                };
                if (t) {
                    setTimeout(function() {
                        i.focus();
                        c.children('.default').show()
                    }, 1)
                }
            };

            function T(t, i) {
                r.html('');
                if (!n.cache && i != null) {
                    h.clear()
                };
                W(t);
                if (i != null && i.length) {
                    e.each(i, function(e, t) {
                        h.set(m(t.key), m(t.value))
                    })
                };
                var a = n.maxshownitems < h.length() ? n.maxshownitems : h.length(),
                    l = '';
                e.each(h.search(t), function(e, i) {
                    if (a) {
                        if (n.filter_selected && s.children('option[value="' + i.key + '"]').hasClass('selected')) {} else {
                            l += '<li rel="' + i.key + '">' + d(F(i.value, t)) + '</li>';
                            g++;
                            a--
                        }
                    }
                });
                r.append(l);
                if (n.firstselected) {
                    o = r.children('li:visible:first');
                    o.addClass('auto-focus')
                };
                if (g > n.height) {
                    r.css({
                        'height': (n.height * 24) + 'px',
                        'overflow': 'auto'
                    })
                } else {
                    r.css('height', 'auto')
                };
                if (p() && c.is(':hidden')) {
                    c.show()
                }
            };

            function F(e, t) {
                var r = n.filter_begin ? '' : '(.*)',
                    o = n.filter_begin ? '<em>$1</em>$2' : '$1<em>$2</em>$3',
                    a = r + (n.filter_case ? '(' + t + ')(.*)' : '(' + t.toLowerCase() + ')(.*)');
                try {
                    var s = new RegExp(a, ((n.filter_case) ? 'g' : 'gi')),
                        e = e.replace(s, o)
                } catch (i) {};
                return e
            };

            function j() {
                r.children('li').mouseover(function() {
                    r.children('li').removeClass('auto-focus');
                    o = e(this);
                    o.addClass('auto-focus')
                });
                r.children('li').mouseout(function() {
                    e(this).removeClass('auto-focus');
                    o = null
                })
            };

            function H() {
                r.unbind('mouseover').unbind('mouseout').mousemove(function() {
                    j();
                    r.unbind('mousemove')
                })
            };

            function D() {
                var t = e('#' + f + '_annoninput').children('.maininput');
                j();
                r.children('li').unbind('mousedown').mousedown(function() {
                    var t = e(this);
                    u(t.text(), t.attr('rel'), 0, 0, 1);
                    v(1);
                    c.hide()
                });
                t.unbind('keydown');
                t.keydown(function(t) {
                    if (t.keyCode != a.backspace) {
                        l.children('li.bit-box.deleted').removeClass('deleted')
                    };
                    if ((t.keyCode == a.enter || t.keyCode == a.tab || t.keyCode == a.comma) && N()) {
                        var i = o;
                        u(i.text(), i.attr('rel'), 0, 0, 1);
                        return S(t)
                    };
                    if ((t.keyCode == a.enter || t.keyCode == a.tab || t.keyCode == a.comma) && !N()) {
                        if (n.newel) {
                            var s = m(e(this).val());
                            u(s, s, 0, 0, 1);
                            return S(t)
                        };
                        if ((n.addontab || n.addoncomma) && n.newel) {
                            o = r.children('li:visible:first');
                            var i = o;
                            u(i.text(), i.attr('rel'), 0, 0, 1);
                            return S(t)
                        }
                    };
                    if (t.keyCode == a.downarrow) {
                        A('first')
                    };
                    if (t.keyCode == a.uparrow) {
                        A('last')
                    }
                })
            };

            function A(e) {
                H();
                if (o == null || o.length == 0) {
                    o = r.children('li:visible:' + e);
                    r.get(0).scrollTop = e == 'first' ? 0 : parseInt(o.get(0).scrollHeight, 10) * (parseInt(r.children('li:visible').length, 10) - Math.round(n.height / 2))
                } else {
                    o.removeClass('auto-focus');
                    o = e == 'first' ? o.nextAll('li:visible:first') : o.prevAll('li:visible:first');
                    var t = parseInt(o.prevAll('li:visible').length, 10),
                        i = parseInt(o.nextAll('li:visible').length, 10);
                    if (((e == 'first' ? t : i) > Math.round(n.height / 2) || (e == 'first' ? t : i) <= Math.round(n.height / 2)) && typeof(o.get(0)) != 'undefined') {
                        r.get(0).scrollTop = parseInt(o.get(0).scrollHeight, 10) * (t - Math.round(n.height / 2))
                    }
                };
                r.children('li').removeClass('auto-focus');
                o.addClass('auto-focus')
            };

            function S(e) {
                c.hide();
                e.preventDefault();
                o = null;
                return !1
            };

            function p() {
                return n.maxitems != 0 && (l.children('li.bit-box').length < n.maxitems)
            };

            function W(t) {
                if (n.newel && p()) {
                    r.children('li[fckb=1]').remove();
                    if (t.length == 0) {
                        return
                    };
                    var i = e('<li rel="' + t + '" fckb="1">').html(d(t));
                    r.prepend(i);
                    g++
                };
                return
            };

            function I(e, t) {
                var n = {};
                for (i = 0; i < t.get(0).attributes.length; i++) {
                    if (t.get(0).attributes[i].nodeValue != null) {
                        n['_' + t.get(0).attributes[i].nodeName] = t.get(0).attributes[i].nodeValue
                    }
                };
                return e.call(e, n)
            };

            function N() {
                if (o == null || o.length == 0) {
                    return !1
                };
                return !0
            };

            function m(e, t) {
                if (typeof t != 'undefined') {
                    for (i = 0; i < e.length; i++) {
                        var n = e.charCodeAt(i);
                        if ((a.exclamation <= n && n <= a.slash) || (a.colon <= n && n <= a.at) || (a.squarebricket_left <= n && n <= a.apostrof)) {
                            e = e.replace(e[i], escape(e[i]))
                        }
                    };
                    e = e.replace(/(\{|\}|\*)/i, '\\$1')
                };
                return e.replace(/script(.*)/g, '')
            };

            function d(e, t) {
                e = e.toString();
                e = e.replace('\\', '');
                if (typeof t != 'undefined') {
                    return e
                };
                return unescape(e)
            };

            function v(e) {
                r.children().remove();
                if (e) {
                    r.hide()
                }
            };

            function M(t) {
                g = 0;
                if (n.json_url && p()) {
                    if (n.cache && k.get(t)) {
                        T(t);
                        D()
                    } else {
                        x++;
                        var i = x;
                        setTimeout(function() {
                            if (i != x) return;
                            e.getJSON(n.json_url, {
                                'tag': d(t)
                            }, function(e) {
                                if (!y) return;
                                T(t, e);
                                k.set(t, 1);
                                D()
                            })
                        }, n.delay)
                    }
                } else {
                    T(t);
                    D()
                }
            };
            var n = e.extend({
                json_url: null,
                width: 522,
                cache: !1,
                height: '10',
                newel: !1,
                addontab: !1,
                addoncomma: !1,
                firstselected: !1,
                filter_case: !1,
                filter_selected: !1,
                filter_begin: !1,
                complete_text: 'Start to type...',
                select_all_text: null,
                maxshownitems: 30,
                maxitems: 10,
                oncreate: null,
                onselect: null,
                onremove: null,
                attachto: null,
                delay: 350,
                input_tabindex: 0,
                input_min_size: 1,
                input_name: '',
                bricket: !0
            }, t);
            var l = null,
                r = null,
                c = null,
                g = 0,
                y = !1,
                o = null,
                b = 0,
                w = 1,
                s = e(this),
                f = s.attr('id'),
                x = 0,
                k = {
                    'set': function(e, t) {
                        var i = s.data('jsoncache');
                        i[e] = t;
                        s.data('jsoncache', i)
                    },
                    'get': function(e) {
                        return s.data('jsoncache')[e] != 'undefined' ? s.data('jsoncache')[e] : null
                    },
                    'init': function() {
                        s.data('jsoncache', {})
                    }
                };
            var a = {
                'enter': 13,
                'tab': 9,
                'comma': 188,
                'backspace': 8,
                'leftarrow': 37,
                'uparrow': 38,
                'rightarrow': 39,
                'downarrow': 40,
                'exclamation': 33,
                'slash': 47,
                'colon': 58,
                'at': 64,
                'squarebricket_left': 91,
                'apostrof': 96
            };
            var E = function() {
                    var i = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz',
                        n = '';
                    for (var t = 0; t < 32; t++) {
                        var e = Math.floor(Math.random() * i.length);
                        n += i.substring(e, e + 1)
                    };
                    return n
                },
                h = {
                    'search': function(t, i) {
                        var r = [],
                            o = new RegExp((n.filter_begin ? '^' : '') + t, (n.filter_case ? 'g' : 'gi'));
                        e.each(s.data('cache'), function(e, t) {
                            if (typeof t.search === 'function') {
                                if (t.search(o) != -1) {
                                    r.push({
                                        'key': e,
                                        'value': t
                                    })
                                }
                            }
                        });
                        return r
                    },
                    'set': function(e, t) {
                        var i = s.data('cache');
                        i[e] = t;
                        s.data('cache', i)
                    },
                    'get': function(e) {
                        return s.data('cache')[e] != 'undefined' ? s.data('cache')[e] : null
                    },
                    'clear': function() {
                        s.data('cache', {})
                    },
                    'length': function() {
                        if (typeof(s.data('cache')) == 'object') {
                            var e = 0;
                            for (i in s.data('cache')) {
                                e++
                            };
                            return e
                        } else {
                            return s.data('cache').length
                        }
                    },
                    'init': function() {
                        if (s.data('cache') == 'undefined') {
                            s.data('cache', {})
                        }
                    }
                };
            O();
            k.init();
            h.init();
            return this
        })
    }
})(jQuery);
(function(e) {
    e.fn.tooManyTabs = function(t) {
        var i = this,
            s = {
                moreTabSelector: '.more-tab',
                dropdownSelector: '.menu-more',
                tabSelector: 'li:not(.action-tab, .drop-tab, .plus-tab)',
                excludeSelector: '.action-tab:visible'
            };
        var r = 2;
        i.readjustTabs = function() {
            i.$moreTab = e(i.config.moreTabSelector, this);
            i.$dropdown = e(i.config.dropdownSelector, this);
            var a = i.$moreTab.outerWidth();
            i.$moreTab.hide();
            var s = e(e(i.config.tabSelector, this).get().reverse());
            s.show();
            var r = (kat.mobile ? 0 : 20);
            e(i.config.excludeSelector, this).each(function() {
                r += parseInt(e(this).outerWidth())
            });
            var o = e(window).width(),
                n = o - r,
                t = 0;
            s.each(function() {
                t += parseInt(e(this).outerWidth())
            });
            i.freeRatio = Math.round(n / t);
            if (t > n) {
                i.$dropdown.html('');
                i.$moreTab.show();
                n -= a;
                s.each(function() {
                    if (t < n) {
                        return !1
                    } else {
                        t -= e(this).outerWidth();
                        i.addTabToDropdown(e(this));
                        e(this).hide()
                    }
                });
                i.$moreTab.hover(function() {
                    clearTimeout(e.data(this, 'timer'));
                    e('ul', this).stop(!0, !0).slideDown(200)
                }, function() {
                    e.data(this, 'timer', setTimeout(e.proxy(function() {
                        e('ul', this).stop(!0, !0).slideUp(200)
                    }, this), 200))
                })
            } else {
                i.$moreTab.hide();
                s.show()
            }
        };
        i.addTabToDropdown = function(t) {
            var n = e('<li class=\'drop-tab\'>' + t.html() + '</li>');
            n.click(function() {
                t.triggerHandler('click');
                e(this).remove()
            });
            i.$dropdown.append(n)
        };
        i.bindEvents = function() {
            e(window).resize(function() {
                i.readjustTabs()
            })
        };
        var n = function(t) {
            i.config = e.extend({}, s, t);
            i.bindEvents();
            i.readjustTabs()
        };
        n(t)
    }
})(jQuery);
(function(e) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], e)
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        e(require('jquery'))
    } else {
        e(jQuery)
    }
}(function(e) {
    e.timeago = function(t) {
        if (t instanceof Date) {
            return i(t)
        } else if (typeof t === 'string') {
            return i(e.timeago.parse(t))
        } else if (typeof t === 'number') {
            return i(new Date(t))
        } else {
            return i(e.timeago.datetime(t))
        }
    };
    var t = e.timeago;
    e.extend(e.timeago, {
        settings: {
            refreshMillis: 60000,
            allowPast: !0,
            allowFuture: !1,
            localeTitle: !1,
            cutoff: 0,
            autoDispose: !0,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: 'ago',
                suffixFromNow: 'from now',
                inPast: 'any moment now',
                now: 'just now',
                seconds: '%d seconds',
                minute: 'a minute',
                minutes: '%d minutes',
                hour: 'an hour',
                hours: '%d&nbsp;hours',
                day: 'a day',
                days: '%d&nbsp;days',
                month: 'about a month',
                months: '%d months',
                year: 'about a year',
                years: '%d&nbsp;years',
                wordSeparator: ' ',
                numbers: []
            },
            addAgo: !0
        },
        inWords: function(t) {
            if (!this.settings.allowPast && !this.settings.allowFuture) {
                throw 'timeago allowPast and allowFuture settings can not both be set to false.'
            };
            var i = this.settings.strings,
                u = i.prefixAgo,
                h = this.settings.addAgo ? i.suffixAgo : '';
            if (this.settings.allowFuture) {
                if (t < 0) {
                    u = i.prefixFromNow;
                    h = i.suffixFromNow
                }
            };
            if (!this.settings.allowPast && t >= 0) {
                return this.settings.strings.inPast
            };
            var s = Math.abs(t) / 1000,
                o = s / 60,
                a = o / 60,
                r = a / 24,
                c = r / 365;

            function n(n, s) {
                var r = e.isFunction(n) ? n(s, t) : n,
                    o = (i.numbers && i.numbers[s]) || s;
                return r.replace(/%d/i, o)
            };
            if (s < 10) {
                return i.now
            };
            var d = s < 10 && n(i.now, Math.round(s)) || s < 45 && n(i.seconds, Math.round(s)) || s < 90 && n(i.minute, 1) || o < 45 && n(i.minutes, Math.round(o)) || o < 90 && n(i.hour, 1) || a < 24 && n(i.hours, Math.round(a)) || a < 42 && n(i.day, 1) || r < 30 && n(i.days, Math.round(r)) || r < 45 && n(i.month, 1) || r < 365 && n(i.months, Math.round(r / 30)) || c < 1.5 && n(i.year, 1) || n(i.years, Math.round(c)),
                l = i.wordSeparator || '';
            if (i.wordSeparator === undefined) {
                l = ' '
            };
            return e.trim([u, d, h].join(l))
        },
        parse: function(t) {
            var i = e.trim(t);
            i = i.replace(/\.\d+/, '');
            i = i.replace(/-/, '/').replace(/-/, '/');
            i = i.replace(/T/, ' ').replace(/Z/, ' UTC');
            i = i.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2');
            i = i.replace(/([\+\-]\d\d)$/, ' $100');
            return new Date(i)
        },
        datetime: function(i) {
            var n = t.isTime(i) ? e(i).attr('datetime') : (e(i).data('date') || e(i).attr('title'));
            return t.parse(n)
        },
        isTime: function(t) {
            return e(t).get(0).tagName.toLowerCase() === 'time'
        }
    });
    var s = {
        init: function() {
            var s = e.proxy(n, this);
            s();
            var i = t.settings;
            if (i.refreshMillis > 0) {
                this._timeagoInterval = setInterval(s, i.refreshMillis)
            }
        },
        update: function(i) {
            var s = (i instanceof Date) ? i : t.parse(i);
            e(this).data('timeago', {
                datetime: s
            });
            if (t.settings.localeTitle) e(this).attr('title', s.toLocaleString());
            n.apply(this)
        },
        updateFromDOM: function() {
            e(this).data('timeago', {
                datetime: t.parse(t.isTime(this) ? e(this).attr('datetime') : (e(this).data('datetime') || e(this).attr('title')))
            });
            n.apply(this)
        },
        dispose: function() {
            if (this._timeagoInterval) {
                window.clearInterval(this._timeagoInterval);
                this._timeagoInterval = null
            }
        }
    };
    e.fn.timeago = function(e, t) {
        var i = e ? s[e] : s.init;
        if (!i) {
            throw new Error('Unknown function name \'' + e + '\' for timeago')
        };
        this.each(function() {
            i.call(this, t)
        });
        return this
    };

    function n() {
        var s = t.settings;
        if (s.autoDispose && !e.contains(document.documentElement, this)) {
            e(this).timeago('dispose');
            return this
        };
        var n = o(this);
        if (!isNaN(n.datetime)) {
            if (s.cutoff == 0 || Math.abs(r(n.datetime)) < s.cutoff) {
                e(this).html(i(n.datetime))
            }
        };
        return this
    };

    function o(i) {
        i = e(i);
        t.settings.addAgo = !i.data('age');
        if (!i.data('timeago')) {
            i.data('timeago', {
                datetime: t.datetime(i)
            });
            var n = e.trim(i.text());
            if (t.settings.localeTitle) {
                i.attr('title', i.data('timeago').datetime.toLocaleString())
            } else if (n.length > 0 && !(t.isTime(i) && i.attr('title'))) {
                i.attr('title', n)
            }
        };
        return i.data('timeago')
    };

    function i(e) {
        return t.inWords(r(e))
    };

    function r(e) {
        return (new Date().getTime() - e.getTime())
    };
    document.createElement('abbr');
    document.createElement('time')
}));
(function(e, t) {
    'use strict';
    t.State = {
        COOKIE_NAME: 'state',
        last: 0,
        get: function() {
            return e.cookie(this.COOKIE_NAME)
        },
        set: function(t) {
            e.cookie(this.COOKIE_NAME, t, {
                path: '/'
            })
        },
        update: function() {
            this.last = new Date().getTime();
            this.set(this.last)
        },
        init: function() {
            var i = this;
            if (!this.get()) {
                this.update()
            };
            e(t).focus(function() {
                i.update()
            })
        },
        isCurrent: function() {
            return (this.last == this.get())
        },
        run: function(e) {
            if (this.isCurrent()) {
                e()
            }
        }
    };
    State.init()
})(jQuery, window);
(function(e, t, i, n) {
    var s = e(t);
    e.fn.lazyload = function(r) {
        var a = this,
            c, o = {
                threshold: 0,
                failure_limit: 0,
                event: 'scroll',
                effect: 'show',
                container: t,
                data_attribute: 'original',
                skip_invisible: !0,
                appear: null,
                load: null,
                placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'
            };

        function l() {
            var t = 0;
            a.each(function() {
                var i = e(this);
                if (o.skip_invisible && !i.is(':visible')) {
                    return
                };
                if (e.abovethetop(this, o) || e.leftofbegin(this, o)) {} else if (!e.belowthefold(this, o) && !e.rightoffold(this, o)) {
                    i.trigger('appear');
                    t = 0
                } else {
                    if (++t > o.failure_limit) {
                        return !1
                    }
                }
            })
        };
        if (r) {
            if (n !== r.failurelimit) {
                r.failure_limit = r.failurelimit;
                delete r.failurelimit
            };
            if (n !== r.effectspeed) {
                r.effect_speed = r.effectspeed;
                delete r.effectspeed
            };
            e.extend(o, r)
        };
        c = (o.container === n || o.container === t) ? s : e(o.container);
        if (0 === o.event.indexOf('scroll')) {
            c.on(o.event, function() {
                return l()
            })
        };
        this.each(function() {
            var i = this,
                t = e(i);
            i.loaded = !1;
            if (t.attr('src') === n || t.attr('src') === !1) {
                if (t.is('img')) {
                    t.attr('src', o.placeholder)
                }
            };
            t.one('appear', function() {
                if (!this.loaded) {
                    if (o.appear) {
                        var n = a.length;
                        o.appear.call(i, n, o)
                    };
                    e('<img />').one('load', function() {
                        var n = t.attr('data-' + o.data_attribute);
                        t.hide();
                        if (t.is('img')) {
                            t.attr('src', n)
                        } else {
                            t.css('background-image', 'url(\'' + n + '\')')
                        };
                        t[o.effect](o.effect_speed);
                        i.loaded = !0;
                        var r = e.grep(a, function(e) {
                            return !e.loaded
                        });
                        a = e(r);
                        if (o.load) {
                            var s = a.length;
                            o.load.call(i, s, o)
                        }
                    }).attr('src', t.attr('data-' + o.data_attribute))
                }
            });
            if (0 !== o.event.indexOf('scroll')) {
                t.on(o.event, function() {
                    if (!i.loaded) {
                        t.trigger('appear')
                    }
                })
            }
        });
        s.on('resize', function() {
            l()
        });
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            s.on('pageshow', function(t) {
                if (t.originalEvent && t.originalEvent.persisted) {
                    a.each(function() {
                        e(this).trigger('appear')
                    })
                }
            })
        };
        e(i).ready(function() {
            l()
        });
        return this
    };
    e.belowthefold = function(i, r) {
        var o;
        if (r.container === n || r.container === t) {
            o = (t.innerHeight ? t.innerHeight : s.height()) + s.scrollTop()
        } else {
            o = e(r.container).offset().top + e(r.container).height()
        };
        return o <= e(i).offset().top - r.threshold
    };
    e.rightoffold = function(i, r) {
        var o;
        if (r.container === n || r.container === t) {
            o = s.width() + s.scrollLeft()
        } else {
            o = e(r.container).offset().left + e(r.container).width()
        };
        return o <= e(i).offset().left - r.threshold
    };
    e.abovethetop = function(i, r) {
        var o;
        if (r.container === n || r.container === t) {
            o = s.scrollTop()
        } else {
            o = e(r.container).offset().top
        };
        return o >= e(i).offset().top + r.threshold + e(i).height()
    };
    e.leftofbegin = function(i, r) {
        var o;
        if (r.container === n || r.container === t) {
            o = s.scrollLeft()
        } else {
            o = e(r.container).offset().left
        };
        return o >= e(i).offset().left + r.threshold + e(i).width()
    };
    e.inviewport = function(t, i) {
        return !e.rightoffold(t, i) && !e.leftofbegin(t, i) && !e.belowthefold(t, i) && !e.abovethetop(t, i)
    };
    e.extend(e.expr[':'], {
        'below-the-fold': function(t) {
            return e.belowthefold(t, {
                threshold: 0
            })
        },
        'above-the-top': function(t) {
            return !e.belowthefold(t, {
                threshold: 0
            })
        },
        'right-of-screen': function(t) {
            return e.rightoffold(t, {
                threshold: 0
            })
        },
        'left-of-screen': function(t) {
            return !e.rightoffold(t, {
                threshold: 0
            })
        },
        'in-viewport': function(t) {
            return e.inviewport(t, {
                threshold: 0
            })
        },
        'above-the-fold': function(t) {
            return !e.belowthefold(t, {
                threshold: 0
            })
        },
        'right-of-fold': function(t) {
            return e.rightoffold(t, {
                threshold: 0
            })
        },
        'left-of-fold': function(t) {
            return !e.rightoffold(t, {
                threshold: 0
            })
        }
    })
})(jQuery, window, document);
(function(e, t) {
    'use strict';
    var i = function(t) {
        this.options = e.extend({
            iconUrl: '',
            acl: 0,
            title: '',
            text: '',
            timeout: 0,
            zIndex: 1100
        }, t);
        this.div = e('<div class="ajaxAlert" style="left: 10px; bottom: 10px; display: none; z-index: ' + this.options.zIndex + ';"><div class="ajaxAlertBody"><div class="commentbody"><div class="userPic"><div class="height50px userPicHeight relative"><img src="' + this.options.iconUrl + '" style="display: inline;"></div></div><div class="commentcontent"><div class="commentownerLeft"><span class="badgeInline"><span class="plain bold aclColor_' + this.options.acl + '">' + this.options.title + '</span></span></div><p class="commentText botmarg5px"></p></div></div></div></div>')
    };
    i.prototype = {
        open: function() {
            e('body').append(this.div);
            e('.commentText', this.div).html(this.options.text);
            i.add(this);
            if (this.options.timeout) {
                var t = this;
                setTimeout(function() {
                    t.close()
                }, this.options.timeout)
            };
            return this
        },
        on: function(e, t) {
            var i = this;
            this.div.on(e, function(e) {
                t.call(i, e)
            });
            return this
        },
        close: function() {
            var e = this;
            this.div.fadeOut('slow', function() {
                e.div.remove();
                i.remove(e);
                e = null
            });
            return this
        },
        move: function(i) {
            if (i == 0) this.div.fadeIn();
            var c = this.div.outerWidth(),
                s = this.div.outerHeight(),
                n = 10,
                r = 10,
                o = Math.floor(e(t).height() / (s + n)),
                a = Math.ceil((i + 1) / o) - 1,
                l = i % o,
                u = a * n + n + a * c,
                h = l * r + r + l * s;
            this.div.animate({
                bottom: h,
                left: u,
                opacity: i == 0 ? 1 : 0.5
            });
            return this
        }
    };
    i._stack = [];
    i.add = function(e) {
        i._stack.push(e);
        i.reorder()
    };
    i.remove = function(t) {
        var n = e.inArray(t, i._stack);
        if (n != -1) {
            i._stack.splice(n, 1);
            i.reorder()
        }
    };
    i.reorder = function() {
        for (var e = i._stack.length - 1, t = 0; e >= 0; e--, t++) {
            i._stack[e].move(t)
        }
    };
    t.AlertWindow = i
})(jQuery, window);
(function(e, t) {
    function i(i) {
        this.state = null;
        this.xhr = null;
        this.options = e.extend({
            element: null,
            multiple: !0,
            maxFiles: 10,
            albumId: 0,
            dragAndDrop: !1,
            select: null,
            dragEnter: null,
            dragLeave: null
        }, i);
        if (this.options.element) {
            var s = this,
                n = e(this.options.element);
            n.click(function() {
                s.open();
                return !1
            });
            if (this.options.dragAndDrop) {
                var r = !1,
                    o = !1;
                if (typeof this.options.dragEnter == 'function' || typeof this.options.dragLeave == 'function') {
                    e(t).bind('dragover', function() {
                        r = !0
                    });
                    e(t).bind('dragleave', function() {
                        r = !1
                    });
                    var a = setInterval(function() {
                        if (!o) {
                            if (r) {
                                if (typeof s.options.dragEnter == 'function') {
                                    s.options.dragEnter.call(s.options.element)
                                }
                            } else {
                                if (typeof s.options.dragLeave == 'function') {
                                    s.options.dragLeave.call(s.options.element)
                                }
                            }
                        }
                    }, 250)
                };
                n.addClass('ui-uploadee');
                n.bind('dragenter dragover', function() {
                    r = !0;
                    return !1
                });
                n.bind('dragleave', function() {
                    r = !1;
                    return !1
                });
                n.bind('drop', function(t) {
                    r = !1;
                    try {
                        var l = [];
                        e.each(t.originalEvent.dataTransfer.files, function() {
                            if (this.type.match(/image\/.+/)) {
                                l.push(this)
                            }
                        });
                        if (l.length) {
                            var a = new FormData();
                            a.append('ajax', 1);
                            e.each(l, function() {
                                a.append('files[]', this)
                            });
                            e.ajax({
                                url: '/image/upload/',
                                type: 'POST',
                                data: a,
                                dataType: 'json',
                                cache: !1,
                                processData: !1,
                                contentType: !1,
                                beforeSend: function() {
                                    o = !0;
                                    n.next('.alertfield').remove();
                                    n.removeClass('ui-uploaded').addClass('ui-uploading')
                                },
                                complete: function() {
                                    o = !1;
                                    n.removeClass('ui-uploading').addClass('ui-uploaded')
                                },
                                success: function(t) {
                                    if (t.method == 'error') {
                                        n.after(e('<div/>').addClass('alertfield').append(t.html))
                                    } else {
                                        s.parseResponse(t.html)
                                    }
                                },
                                error: function(t) {
                                    n.after(e('<div/>').addClass('alertfield').append(t.responseText))
                                }
                            })
                        }
                    } catch (i) {};
                    return !1
                })
            }
        }
    };
    i.prototype.open = function() {
        this.load('/image/select/' + (this.options.albumId ? 'album/' + this.options.albumId : 'recent') + '/')
    };
    i.prototype.load = function(t, i) {
        var n = this;
        e.fancybox.showActivity();
        e.get(t, function(t) {
            e.fancybox.hideActivity();
            if (e.fancybox.isActive() && !i) {
                n.state = e.fancybox.saveState()
            };
            e.fancybox(t.html, {
                onCleanup: function() {
                    return n.abort()
                },
                onComplete: function() {
                    var t = e('#fancybox-content'),
                        i = e('.imageUploadError', t),
                        o = e('.imageUploadFile', t),
                        s = e('.imageUploadUrl', t),
                        r = e('.indicator', t);

                    function a(t) {
                        var i = [];
                        e(t).each(function() {
                            var t = e(this);
                            i.push({
                                id: t.data('imageId'),
                                name: t.data('imageName'),
                                link: t.attr('href'),
                                thumb_link: t.find('img').attr('src')
                            })
                        });
                        n.onSelect(i)
                    };
                    if (n.state) {
                        e('.fancyCustomTop', t).attr('title', 'Back to "' + n.state.title + '"').show().click(function() {
                            e.fancybox.restoreState(n.state);
                            return !1
                        })
                    };
                    e('.pages a', t).click(function() {
                        if (n.abort()) {
                            n.load(e(this).attr('href'), !0)
                        };
                        return !1
                    });
                    e('.imageClose', t).click(function() {
                        n.close()
                    });
                    if (n.options.multiple) {
                        e('.imageSelector', t).selectable({
                            filter: '.galleryThumbSizerStills',
                            stop: function() {
                                var t = e(this),
                                    i = t.find('.ui-selected a'),
                                    s = i.size();
                                t.next('button').remove();
                                if (s == 1) {
                                    a(i)
                                } else if (s < n.options.maxFiles) {
                                    t.after(e('<button type="submit" class="siteButton bigButton"><span>Select ' + s + ' image(s)</span></button>').click(function() {
                                        a(i)
                                    }))
                                }
                            }
                        })
                    } else {
                        e('.imageSelector a', t).click(function() {
                            a(this);
                            return !1
                        })
                    };
                    e('.imageUpload', t).ajaxForm({
                        dataType: 'json',
                        beforeSubmit: function() {
                            try {
                                if (o.is(':visible')) {
                                    var r = e('input[type=file]', o).get(0);
                                    if (!r.files.length && !s.val()) {
                                        throw 'No file(s) selected'
                                    } else if (r.files.length > n.options.maxFiles) {
                                        throw 'Too many files selected'
                                    }
                                } else if (s.is(':visible')) {
                                    var r = e('input[type=text]', s);
                                    if (!r.val()) {
                                        throw 'Please enter URL'
                                    }
                                }
                            } catch (t) {
                                i.html(t).fadeIn('slow');
                                return !1
                            }
                        },
                        beforeSend: function() {
                            i.hide();
                            e.fancybox.showActivity();
                            e('button', t).prop('disabled', !0)
                        },
                        complete: function() {
                            e.fancybox.hideActivity();
                            e('button', t).prop('disabled', !1)
                        },
                        success: function(e) {
                            if (e.method == 'error') {
                                i.html(e.html).fadeIn('slow');
                                r.hide()
                            } else {
                                n.parseResponse(e.html)
                            }
                        },
                        error: function(e) {
                            r.hide();
                            if (!e.aborted) {
                                i.html(e.responseText);
                                i.fadeIn('slow')
                            }
                        },
                        xhr: function() {
                            var t = e.ajaxSettings.xhr();
                            t.upload.addEventListener('progress', function(e) {
                                if (e.lengthComputable) {
                                    var t = (e.loaded / e.total * 100).toFixed(0) + '%';
                                    r.show();
                                    r.find('div').width(t);
                                    r.find('span').html(t)
                                }
                            }, !1);
                            return t
                        }
                    });
                    e('.switcherBox a', t).click(function() {
                        var t = e(this);
                        t.parent().find('a').removeClass('active');
                        t.addClass('active');
                        if (t.hasClass('switchRight')) {
                            s.show();
                            o.hide()
                        };
                        if (t.hasClass('switchLeft')) {
                            s.hide();
                            o.show()
                        }
                    });
                    e('.imageUploadInput input[type=file]', t).attr('multiple', n.options.multiple).customFileInput()
                }
            })
        }, 'json')
    };
    i.prototype.abort = function() {
        if (this.xhr && !this.xhr.aborted) {
            if (confirm('Abort uploading?')) {
                try {
                    this.xhr.abort();
                    return !0
                } catch (e) {}
            } else {
                return !1
            }
        };
        return !0
    };
    i.prototype.close = function() {
        this.state = null;
        e.fancybox.close()
    };
    i.prototype.parseResponse = function(t) {
        var i = [],
            n = e.parseJSON(t);
        e.each(n, function() {
            i.push({
                id: this.id,
                name: this.name,
                link: this.link,
                thumb_link: this.thumb_link
            })
        });
        this.onSelect(i)
    };
    i.prototype.onSelect = function(t) {
        if (this.state) {
            e.fancybox.restoreState(this.state)
        } else {
            this.close()
        };
        if (t.length && typeof this.options.select == 'function') {
            this.options.select.call(this.options.element, t, this)
        }
    };
    t.ImageSelector = i;
    e.fn.imageSelector = function(t) {
        if (this.length) {
            e.each(this, function() {
                t = e.extend({}, t, {
                    element: this
                });
                new i(t)
            })
        };
        return this
    }
})(jQuery, window);
(function(e, t) {
    'use strict';
    var i = {
        playing: !1,
        timeout: 500,
        play: function(e) {
            if (i.playing) return !1;
            i.playing = !0;
            setTimeout(function() {
                i.playing = !1
            }, this.timeout);
            var n = t.createElement('audio');
            if (n && typeof n.canPlayType == 'function') {
                if (n.canPlayType('audio/ogg') != '') {
                    n.src = e + '.ogg';
                    n.play();
                    return !0
                } else if (n.canPlayType('audio/mpeg') != '') {
                    n.src = e + '.mp3';
                    n.play();
                    return !0
                }
            } else {
                var s = t.createElement('embed');
                s.setAttribute('autostart', 'true');
                s.setAttribute('hidden', 'true');
                s.setAttribute('loop', 'false');
                s.setAttribute('src', e + '.mp3');
                t.body.appendChild(s);
                return !0
            };
            return !1
        }
    };
    e.Sound = i
})(window, document);
(function(e, t, i) {
    'use strict';
    e.fn.tabs = function(n) {
        var s = null;
        n = e.extend({
            useHash: !0,
            default: null,
            tabSelector: '> div',
            linkSelector: '.tabNavigation:first a',
            selectedTabClass: 'selectedTab',
            onShow: function() {}
        }, n);

        function r() {
            var e = t.hash.substring(1);
            e = e.replace(/_\d+$/, '');
            e = e.replace(/_.+$/, '');
            return e
        };
        e(this).each(function() {
            var l = e(n.tabSelector, this),
                a = e(n.linkSelector, this);
            l.hide();

            function u(e, r) {
                if (!e) return;
                a.removeClass(n.selectedTabClass);
                l.hide();
                l.filter('#' + e).show();
                l.filter('#tab-' + e).show();
                a.filter('[rel=' + e + ']').addClass(n.selectedTabClass);
                if (n.useHash && r) {
                    if (i.replaceState) {
                        i.replaceState({}, '', '#' + e)
                    } else {
                        t.hash = e
                    }
                };
                s = e
            };
            var o = e(),
                c = r();
            if (n.useHash && c) {
                o = a.filter('[rel=' + c + ']')
            };
            if (!o.length && n.default) {
                o = a.filter('[rel=' + n.default+']')
            };
            if (!o.length) {
                o = a.filter('.' + n.selectedTabClass)
            };
            if (!o.length) {
                o = a.filter(':first')
            };
            u(o.prop('rel'));
            a.click(function() {
                n.onShow(s, e(this));
                u(e(this).prop('rel'), !0);
                return !1
            })
        });
        return this
    };
    e(function() {
        e('.tabSwitcher').tabs()
    })
})(jQuery, document.location, history);

function width(e, t) {
    w = document.documentElement.clientWidth;
    return (w <= e) ? e + 'px' : ((w >= t) ? t + 'px' : 'auto')
};

function Toggle(e, t) {
    var i = $(t);
    $('#' + e).toggle();
    if ($(t).parent().hasClass('folder')) {
        $(t).parent().addClass('folderopen');
        $(t).parent().removeClass('folder')
    } else {
        $(t).parent().addClass('folder');
        $(t).parent().removeClass('folderopen')
    }
};
$(document).on('click', '#openAllFolders', function() {
    var e = $('#torrent_files table'),
        t = $('#closeAllFolders');
    if (e.has(e.css('display', 'none'))) {
        e.css('display', 'table');
        $(this).toggle();
        $(t).toggle()
    };
    $('span').parent().removeClass('folder');
    $('span').parent().addClass('folderopen');
    if ($('td').is('.torTree', '.torFileIcon', '.torFileName', '.torFileSize')) {
        $('td').removeClass('folderopen')
    }
});
$(document).on('click', '#closeAllFolders', function() {
    var e = $('#torrent_files table'),
        t = $('#openAllFolders');
    if (e.has(e.css('display', 'table'))) {
        e.css('display', 'none');
        $(this).toggle();
        $(t).toggle()
    };
    $('span').parent().removeClass('folderopen');
    $('span').parent().addClass('folder');
    if ($('td').hasClass('novertpad')) {
        $('td').removeClass('folder')
    }
});

function Show(e) {
    $('#' + e).show()
};

function Hide(e) {
    $('#' + e).hide()
}(function(e) {
    e.Tache = {
        Data: [],
        Delete: function(e) {
            i(e)
        },
        DeleteAll: function() {
            n()
        },
        Get: function(e) {
            s(e)
        },
        SetTimeout: function(e) {
            r(e)
        },
        Timeout: 600
    };

    function t(e) {
        var t = e.url;
        t += e.data.torrentId;
        t += ((typeof e.dataType == 'string') ? e.dataType : '');
        t += ((typeof e.type == 'string') ? e.type : '');
        return t
    };

    function i(i) {
        if (typeof i.url != 'string') {
            alert('No AJAX URL passed');
            return
        };
        var s = t(i),
            r = new Date();
        for (var n = e.Tache.Data.length; n > 0; n--) {
            if ((((r.valueOf() - e.Tache.Data[n - 1].dtAge.valueOf()) / 1000) > e.Tache.Timeout) || (e.Tache.Data[n - 1].sIdentifier == s)) {
                e.Tache.Data.splice(n - 1, 1)
            }
        }
    };

    function n() {
        e.Tache.Data = []
    };

    function s(i) {
        if (typeof i.url != 'string') {
            alert('No AJAX URL passed');
            return
        };
        var s = t(i),
            o = new Date();
        for (var n = e.Tache.Data.length; n > 0; n--) {
            if (((o.valueOf() - e.Tache.Data[n - 1].dtAge.valueOf()) / 1000) > e.Tache.Timeout) {
                e.Tache.Data.splice(n - 1, 1)
            } else if (e.Tache.Data[n - 1].sIdentifier == s) {
                i.success(e.Tache.Data[n - 1].oData);
                return
            }
        };
        var r = i.success;
        i.success = function(t) {
            e.Tache.Data.push({
                sIdentifier: s,
                oData: t,
                dtAge: new Date()
            });
            r(t)
        };
        e.ajax(i)
    };

    function r(t) {
        e.Tache.Timeout = t
    }
})(jQuery);
$(function() {
    var i = 1000,
        n, e = !0,
        t = $('<div id="previewPopupContainer">   <div class="tail"></div>   <div class="prevAV topOriented darkivorybg" id="prevAV">Loading...</div>   <div id="previewPopupContent"><img style="display:block;" src="/content/images/indicator.gif"></div></div>');
    $('body').append(t);
    $('.icommentjs').on('mouseover', function(i) {
        var a = $(this).attr('rel').split(','),
            r = a[0];
        currentID = a[1];
        if (r == '') return;
        if (e) clearTimeout(e);
        var n = $(this).offset(),
            l = $(this).width(),
            s = n.left - 340;
        if (s > 0) {
            var o = 'leftPlacing previewPopupContainer'
        } else {
            var o = 'rightPlacing previewPopupContainer';
            s = (n.left + 5 + l)
        };
        $('#previewPopupContainer').attr('class', o);
        t.css({
            left: s + 'px',
            top: n.top - 5 + 'px'
        });
        $('#previewPopupContent').html('&nbsp;');
        $('#prevAV').html('Loading...');
        $.Tache.Get({
            type: 'GET',
            url: '/get_comments.php',
            cache: !0,
            data: {
                ajax: '1',
                torrentId: r
            },
            beforeSend: function() {
                $('#previewPopupContent').html('<center style="margin:auto 0;width:340px;"><img style="display:block !important;" src="/content/images/indicator.gif"></center>')
            },
            success: function(e) {
                if (e.indexOf(r) > 0) {
                    $('#previewPopupContent').html(e);
                    var t = $('#previewPopupContent').find('.ratestring').remove();
                    $('#prevAV').html(t);
                    t.show()
                } else {
                    $('#previewPopupContent').html('');
                    $('#prevAV').html('No comments')
                }
            }
        });
        t.fadeIn(500)
    });
    $('.icommentjs').on('mouseout', function() {
        if (e) clearTimeout(e);
        e = setTimeout(function() {
            t.css('display', 'none')
        }, i)
    })
});

function doFade(e) {
    for (var t = 0; t < 3; t++) {
        doFadeOnce(e)
    }
};

function doFadeOnce(e) {
    $(e).css('opacity', 1).animate({
        opacity: 0.0
    }, 500).animate({
        opacity: 1.0
    }, 500)
};

function deleteLocation(e) {
    $.ajax({
        type: 'POST',
        url: '/moderator/torrent/deletelocation/',
        data: {
            ajax: 1,
            location: e
        },
        dataType: 'json',
        success: function(t) {
            $('#tl_' + e).fadeOut(500, function() {
                $('#tl_' + e).remove()
            })
        }
    })
};

function undeleteLocation(e) {
    $.ajax({
        type: 'POST',
        url: '/moderator/torrent/undeletelocation/',
        data: {
            ajax: 1,
            location: e
        },
        dataType: 'json',
        success: function(t) {
            $('#tlc_' + e).fadeOut(500)
        }
    })
};

function setDeleted(e, t, i, n, s) {
    var r = s ? 1 : 0,
        o = $('#del_' + e).html();
    $.ajax({
        type: 'POST',
        url: '/moderator/torrent/' + (n ? '' : 'un') + 'deletetorrent/' + t + '/',
        data: {
            ajax: 1,
            copyright: r
        },
        dataType: 'json',
        beforeSend: function() {
            $('#del_' + e).html('<img src="/content/images/indicator.gif">')
        },
        success: function(s) {
            if (s.method == 'error') {
                alert(s.html);
                $('#del_' + e).html(o);
                return !1
            };
            if (i) {
                $('#del_' + e).html('<a href="javascript: ' + (n ? 'un' : '') + 'deleteTorrent(\'' + e + '\', \'' + t + '\', true);"><i class="ka ka16 ka-delete ka-' + (n ? 'green' : 'red') + '"></i></a>')
            } else {
                $('#del_' + e).html('<a href="javascript: ' + (n ? 'un' : '') + 'deleteTorrent(\'' + e + '\', \'' + t + '\');"><i class="ka ka16 ka-delete ka-' + (n ? 'green' : 'red') + '"></i> ' + (n ? 'un' : '') + 'delete torrent</a>')
            }
        }
    })
};

function deleteTorrent(e, t, i, n) {
    setDeleted(e, t, i, 1, n)
};

function undeleteTorrent(e, t, i) {
    setDeleted(e, t, i, 0)
};

function setVerification(e, t, i) {
    $.ajax({
        type: 'POST',
        url: '/moderator/torrent/' + (i ? '' : 'un') + 'verify/' + t + '/',
        data: {
            ajax: 1,
            hash: t
        },
        dataType: 'json',
        beforeSend: function() {
            $('#ver_' + e).html('<img src="/content/images/indicator.gif">')
        },
        success: function(n) {
            $('#ver_' + e).html('<a href="javascript: ' + (i ? 'un' : '') + 'verifyTorrent(\'' + e + '\', \'' + t + '\');"> <i class="ka ka16 ' + (i ? 'ka-unverify ka-red' : 'ka-verify ka-green') + '"></i></a>')
        }
    })
};

function verifyTorrent(e, t) {
    setVerification(e, t, 1)
};

function unverifyTorrent(e, t) {
    setVerification(e, t, 0)
};

function rateTopComment(e, t) {
    $.ajax({
        type: 'POST',
        url: '/comments/rate/' + (t ? 'like' : 'dislike') + '/' + e + '/',
        dataType: 'json',
        beforeSend: function() {
            $('#topcommrate_' + e).html('<img src="/content/images/indicator.gif">')
        },
        success: function(t) {
            if (t.method == 'show') {
                $('#topratediv_' + e).html(t.html);
                $('a.ajaxLink').fancybox()
            } else {
                $('#topcommrate_' + e).html('error');
                $('#topratediv_' + e).html($('#commrate_' + e))
            }
        },
        error: function(t) {
            $('#topcommrate_' + e).html('error')
        }
    })
};

function rateTopMinus(e) {
    rateTopComment(e, 0)
};

function rateTopPlus(e) {
    rateTopComment(e, 1)
};

function rateComment(e, t) {
    $.ajax({
        type: 'POST',
        url: '/comments/rate/' + (t ? 'like' : 'dislike') + '/' + e + '/',
        dataType: 'json',
        beforeSend: function() {
            $('#commrate_' + e).html('<img src="/content/images/indicator.gif">')
        },
        success: function(i) {
            if (i.method == 'show') {
                if (!t) {
                    if (!$('#cshow_' + e).length) {
                        $('#comment_' + e).find('div.commentownerLeft').append('<a class="siteButton smallButton reject showComment" id="cshow_' + e + '" href="javascript:showComment(' + e + ')"><span>Show comment</span></a>')
                    } else {
                        $('#cshow_' + e).href = 'javascript:showComment(\'+id+\')';
                        $('#cshow_' + e).html('<span>Show comment</span>')
                    };
                    if ($('#comment_' + e).parent().hasClass('reply')) {
                        $('#comment_' + e).parent().parent().addClass('hiddenComment')
                    } else {
                        $('#comment_' + e).parent().addClass('hiddenComment')
                    };
                    $('#cpic_' + e).hide();
                    $('#cdate_' + e).hide();
                    $('#ctext_' + e).hide();
                    $('#rep_link' + e).hide()
                };
                $('#ratediv_' + e).html(i.html);
                $('a.ajaxLink').fancybox()
            } else if (i.method == 'error') {
                alert(i.html);
                $('#commrate_' + e).html('error');
                $('#ratediv_' + e).html($('#commrate_' + e))
            } else {
                $('#commrate_' + e).html('error');
                $('#ratediv_' + e).html($('#commrate_' + e))
            }
        }
    })
};

function rateMinus(e) {
    rateComment(e, 0)
};

function ratePlus(e) {
    rateComment(e, 1)
};

function showComment(e) {
    $('#cpic_' + e).toggle();
    $('#cdate_' + e).css('display', 'inline');
    $('#ctext_' + e).toggle();
    $('#rep_link' + e).toggle();
    if ($('#ctext_' + e + ':visible').length) {
        $('#cshow_' + e).html('<span>Hide</span>')
    } else {
        $('#cshow_' + e).html('<span>Show</span>')
    }
};

function getFiles(e, t, i) {
    $.ajax({
        type: 'POST',
        url: '/torrents/getfiles/' + e + '/',
        data: {
            ajax: 1,
            all: t,
            dir: i
        },
        dataType: 'json',
        beforeSend: function() {
            $('#torrent_files').html('<center style="margin:auto 0;width:100%;"><img src="/content/images/indicator.gif"></center>')
        },
        success: function(e) {
            $('#torrent_files').html(e.html)
        }
    })
};

function updateFeedback(e) {
    e = e || 1;
    var t = $('#menu_feedback .menuValue'),
        n = parseInt(t.text()) || 0,
        i = n + e;
    if (i > 0) {
        t.text(i).show();
        doFade(t.parent())
    } else {
        t.hide()
    }
};

function trim(e, t) {
    return ltrim(rtrim(e, t), t)
};

function ltrim(e, t) {
    t = t || '\\s';
    return e.replace(new RegExp('^[' + t + ']+', 'g'), '')
};

function rtrim(e, t) {
    t = t || '\\s';
    return e.replace(new RegExp('[' + t + ']+$', 'g'), '')
};
String.prototype.ReplaceAll = function(e, t) {
    var i = this;
    if (typeof(e) == String) {
        var n = i.indexOf(e)
    } else {
        var n = i.match(e)
    }
    while (n != -1) {
        i = i.replace(e, t);
        n = i.indexOf(e)
    };
    return i
};
String.prototype.HighlightSpecial = function() {
    var e = this;
    e = e.replace(/(&lt;.+?&gt;)/g, '<span class="highlightTag">$1</span>');
    e = e.replace(/(&lt;\/+?&gt;)/gi, '<span class="highlightTag">$1</span>');
    e = e.replace(/(&amp;.+?;)/gi, '<span class="highlightEntity">$1</span>');
    e = e.replace(/(%\d+)/gi, '<span class="highlightParam">$1</span>');
    return e
};

function doSearch(e) {
    text = e;
    text = text.ReplaceAll(new RegExp(/\s\s+/gi), ' ');
    text = jQuery.trim(text);
    e = encodeURIComponent(text).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
    if (!e) {
        window.location = '/new/';
        return !1
    };
    window.location = '/usearch/' + e + '/';
    return !1
};

function proof(e) {
    $(e).append('<input type="hidden" name="turing" value="iamhuman">')
};

function reportComment(e) {
    $.ajax({
        type: 'POST',
        url: '/comments/report/' + e + '/',
        data: {
            ajax: '1'
        },
        dataType: 'json',
        beforeSend: function() {
            $('#report_comment_' + e).html('<img src="/content/images/indicator.gif">')
        },
        success: function(t) {
            if (t.method == 'error') {
                alert(t.html)
            } else $('#report_comment_' + e).replaceWith('<a class="siteButton smallButton disabledButton"><span>reported</span></a>')
        },
        error: function(t) {
            $('#report_comment_' + e).html('<center>Something nasty happened. Please try to reload a page or visit kastatus.com for details.</center>')
        }
    });
    return !1
};

function reportPost(e) {
    $.ajax({
        type: 'POST',
        url: '/community/report/post/' + e + '/',
        dataType: 'json',
        beforeSend: function() {
            $('#report_post_' + e).removeClass('ka-red ka-report').html('<img src="/content/images/indicator.gif">')
        },
        success: function(t) {
            if (t.method == 'error') {
                $('#report_post_' + e).remove();
                alert(t.html)
            } else {
                $('#report_post_' + e).replaceWith('<span class="kaButton smallButton normalText disabledButton"><i class="ka ka-report"></i>reported</span>')
            }
        },
        error: function(t) {
            $('#report_post_' + e).html('<center>Something nasty happened. Please try to reload a page or visit kastatus.com for details.</center>')
        }
    });
    return !1
};

function reportThread(e, t) {
    if (!e.reason.value) {
        alert('Please fill out the reason field.');
        return !1
    };
    $.fancybox.showActivity();
    var i = $(e).find('button[type=submit]').prop('disabled', !0);
    i.addClass('disabledButton');
    $.ajax({
        type: 'POST',
        url: '/community/report/thread/' + t + '/',
        data: {
            reason: e.reason.value
        },
        dataType: 'json',
        beforeSend: function() {
            $('#report_thread_' + t).html('<img src="/content/images/indicator.gif">')
        },
        success: function(e) {
            if (e.method == 'error') {
                alert(e.html);
                $.fancybox.hideActivity();
                i.removeClass('disabledButton').prop('disabled', !1)
            } else {
                $('#report_thread_' + t).replaceWith('<a class="kaButton smallButton normalText disabledButton"><i class="ka ka-report"></i> reported</a>');
                $.fancybox.close()
            }
        },
        error: function(e) {
            $('#report_thread_' + t).html('<center>Something nasty happened. Please try to reload a page or visit kastatus.com for details.</center>');
            $.fancybox.close()
        }
    });
    return !1
};
last = 0;

function comment(e) {
    if (last) {
        $('cf_' + last).setStyle('display', 'none')
    };
    if (last != e) {
        $('cf_' + e).setStyle('display', 'block');
        $('cf_edit_' + e).focus();
        last = e
    } else {
        last = 0
    }
};

function getPage(e, t, i) {
    var n = '#morecomments_' + e,
        s = $('#tab-comment_comments').length ? '#tab-comment_comments' : '#comments';
    if ($(s).html() == '') {
        n = s
    };
    $.ajax({
        type: 'POST',
        url: '/comments/index/' + i + '/' + t + '/',
        data: {
            ajax: '1',
            page: e
        },
        dataType: 'json',
        beforeSend: function() {
            $((n == s ? n : '#showmore_' + e)).html('<img src="/content/images/indicator.gif">')
        },
        success: function(t) {
            container = $(n);
            container.html(t.html);
            var s = container.find('#comment_votes');
            if (s.length) {
                var r = container.find('#comment_comments');
                container.before($(r.html()));
                r.remove();
                if (s.children().size()) $('#tab-votes_button').show();
                $('#tab-comment_votes').append($(s.html()));
                s.remove()
            };
            $(n).fadeIn('fast');
            $('#showmore_' + e).hide();
            $('a.ajaxLink').fancybox();
            try {
                $('img.lazyjs').lazyload({
                    effect: 'fadeIn',
                    skip_invisible: !1
                })
            } catch (i) {}
        },
        error: function(t) {
            $(n).html('<center>Something nasty happened. Please try to reload a page or visit kastatus.com for details.</center>');
            $(n).center();
            $('#showmore_' + e).hide()
        }
    })
};

function getAll(e, t, i) {
    var n = '#morecomments_' + e,
        s = $('#tab-comment_comments').length ? '#tab-comment_comments' : '#comments';
    if ($(s).html() == '') {
        n = s
    };
    $.ajax({
        type: 'POST',
        url: '/comments/index/' + i + '/' + t + '/',
        data: {
            ajax: '1',
            all: '1',
            page: e
        },
        dataType: 'json',
        beforeSend: function() {
            $((n == s ? n : '#showmore_' + e)).html('<img src="/content/images/indicator.gif">')
        },
        success: function(t) {
            container = $(n);
            container.html(t.html);
            var s = container.find('#comment_votes');
            if (s.length) {
                var r = container.find('#comment_comments');
                container.before($(r.html()));
                r.remove();
                if (s.children().size()) $('#tab-votes_button').show();
                $('#tab-comment_votes').append($(s.html()));
                s.remove()
            };
            $(n).fadeIn('fast');
            $('#showmore_' + e).hide();
            $('a.ajaxLink').fancybox();
            try {
                $('img.lazyjs').lazyload({
                    effect: 'fadeIn',
                    skip_invisible: !1
                })
            } catch (i) {}
        },
        error: function(t) {
            $(n).html('<center>Something nasty happened. Please try to reload a page or visit kastatus.com for details.</center>');
            $(n).center();
            $('#showmore_' + e).hide()
        }
    })
};

function loadTrailers(e) {
    $.ajax({
        type: 'POST',
        url: '/torrents/details/' + e + '/trailer/',
        dataType: 'json',
        beforeSend: function() {
            $('#tab-trailer').html('<img src="/content/images/indicator.gif">')
        },
        success: function(e) {
            $('#tab-trailer').html(e.html).show();
            $('#trailer_link').unbind('click.my')
        },
        error: function(e) {
            $('#tab-trailer').html('<center>Something nasty happened. Please try to reload a page or visit kastatus.com for details.</center>')
        }
    })
};

function validateComment(e) {
    if ((e.content.value == '')) {
        alert('Please fill the comment field');
        return !1
    };
    if ((e.content.value.length < 3)) {
        alert('Comment is too short');
        return !1
    };
    return !0
};

function disableSubmit(e) {
    $(e).find('button[type=submit]').prop('disabled', !0).addClass('disabledButton');
    return !0
};

function addComment(e, t) {
    e.turing.value = 'iamhuman';
    var n = $(e).serialize();
    n = n + '&ajax=1';
    var s = (typeof(e.pid) == 'undefined') ? 0 : e.pid.value;
    if (n.indexOf('audio_rate') == -1) {
        if (!validateComment(e)) return !1
    };
    var r = $(e).find('button[type=submit]');
    r.prop('disabled', !0).addClass('disabledButton');
    var i = $('#tab-comment_comments').length ? '#tab-comment_comments' : '#comments';
    $(i).show();
    $.ajax({
        type: 'POST',
        url: '/comments/create/' + t + '/',
        data: n,
        dataType: 'json',
        success: function(t) {
            if (t.method == 'error') {
                var n = $('<div class="alertfield">' + t.html + '</div>');
                n.prependTo(i);
                return !1
            };
            if (s) {
                var n = $('<div class="reply"><div class="commentThread">' + t.html + '</div></div>');
                n.appendTo($('#comment_' + s).parent());
                hideReply(s)
            } else {
                var n = $('<div class="commentThread">' + t.html + '</div>');
                n.prependTo(i)
            };
            n.hide();
            n.fadeIn('fast');
            n.find('.ajaxLink').fancybox();
            e.reset();
            $(e).find('.galleryThumbSizerStills').remove()
        },
        error: function(e) {
            $(i).html('<center>Something nasty happened. Please try to reload a page or visit kastatus.com for details.</center>');
            $(i).center()
        },
        complete: function() {
            r.prop('disabled', !1).removeClass('disabledButton');
            $('.captcha', e).click()
        }
    });
    return !1
};

function hideReply(e) {
    $('#rep' + e).hide();
    $('#close_link' + e).hide();
    $('#rep_link' + e).show()
};

function showReply(e) {
    $('#rep' + e).show();
    $('#close_link' + e).show();
    $('#rep_link' + e).hide();
    var t = $('#comment_form').find('input[name=pid]').val();
    if (t && t != e) hideReply(t);
    $('#comment_form').appendTo('#rep' + e).show().find('input[name=pid]').val(e);
    $('#rep' + e).find('img.captcha').click()
};

function deleteWidget(e) {
    $.ajax({
        type: 'POST',
        url: '/account/settings/widgets/',
        data: {
            ajax: 1,
            remove: 1,
            id: e
        },
        dataType: 'json',
        success: function(t) {
            $('#order_' + e).fadeOut(250, function() {
                $('#order_' + e).remove()
            })
        }
    })
};

function deletePost(e) {
    $.ajax({
        type: 'POST',
        url: '/community/delete/post/' + e + '/',
        dataType: 'json',
        success: function(t) {
            if (t.method == 'error') {
                alert(t.html)
            } else $('#post' + e).fadeOut(500, function() {
                $('#post' + e).remove()
            })
        },
        error: function(e) {
            console.log(e)
        }
    })
};

function DeleteComment(e) {
    var t = $('#tab-comment_comments').length ? '#tab-comment_comments' : '#comments';
    $.ajax({
        type: 'POST',
        url: '/comments/delete/',
        data: {
            ajax: '1',
            cid: e
        },
        dataType: 'json',
        success: function(t) {
            if (t.method == 'error') {
                alert(t.html)
            } else $('#comment_' + e).fadeOut(500, function() {
                $('#comment_' + e).remove()
            })
        },
        error: function(e) {
            $(t).html('<center>Something nasty happened. Please try to reload a page or visit kastatus.com for details.</center>');
            $(t).center();
            $('#darkenBackground').hide()
        }
    })
};

function unDeleteComment(e, t) {
    var i = $('#tab-comment_comments').length ? '#tab-comment_comments' : '#comments';
    $.ajax({
        type: 'POST',
        url: '/comments/undelete/' + e + '/',
        data: {
            ajax: '1'
        },
        dataType: 'json',
        beforeSend: function() {
            $('#ctext_' + e).html('<img src="/content/images/indicator.gif">')
        },
        success: function(i) {
            $('#ctext_' + e).fadeIn(500, function() {
                $('#ctext_' + e).html(i.html)
            });
            $('#restore_' + e).hide();
            $('#rep_link' + e).html('<a href="javascript: DeleteComment(' + e + ');">delete</a>');
            $(t).removeClass('greenButton');
            $(t).addClass('redButton');
            $(t).attr('onClick', 'DeleteComment(' + e + ');')
        },
        error: function(e) {
            $(i).html('<center>Something nasty happened. Please try to reload a page or visit kastatus.com for details.</center>');
            $(i).center();
            $('#darkenBackground').hide()
        }
    })
};
var current_edit_comment = 0,
    top_edit = !1;

function editComment(e, t) {
    var i = (t ? '#topctext_' : '#ctext_') + e;
    top_edit = t;
    if (current_edit_comment > 0) {
        $((t ? '#topctext_' : '#ctext_') + current_edit_comment).html($('#cbuffer').html())
    } else {
        if ($('#cbuffer').length == 0) $('body').append('<div id="cbuffer" style="display:none"></div>')
    };
    current_edit_comment = e;
    $('#cbuffer').html($(i).html());
    $.ajax({
        type: 'GET',
        url: '/comments/edit/' + e + '/',
        dataType: 'json',
        beforeSend: function() {
            $(i).html('<img src="/content/images/indicator.gif" alt="loading..."/>');
            $(i).fadeIn('fast')
        },
        success: function(t) {
            $('#edited_' + e).remove();
            $(i).html(t.html).find('.ajaxLink').fancybox();
            current_edit_comment = 0
        }
    });
    return !1
};

function cancelEditComment(e) {
    current_edit_comment = 0;
    $((top_edit ? '#topctext_' : '#ctext_') + e).html($('#cbuffer').html());
    return !1
};

function saveComment(e, t) {
    var i = $(e).serialize();
    i = i;
    var n = (typeof(e.pid) == 'undefined') ? 0 : e.pid.value;
    if (!validateComment(e)) return !1;
    e.submit.disabled = !0;
    $.ajax({
        type: 'POST',
        url: '/comments/edit/' + t + '/',
        data: i,
        dataType: 'json',
        beforeSend: function() {
            e.submit.disabled = !0
        },
        success: function(i) {
            if (i.method == 'error') {
                var n = $('<div class="alertfield">' + i.html + '</div>');
                n.prependTo($(e));
                e.submit.disabled = !1;
                return !1
            };
            $((top_edit ? '#topctext_' : '#ctext_') + t).html(i.html).find('.ajaxLink').fancybox()
        },
        error: function(e) {
            $((top_edit ? '#topctext_' : '#ctext_') + t).html('<center>Something nasty happened. Please try to reload a page or visit kastatus.com for details.</center>')
        }
    });
    return !1
};

function replyPost(e) {
    $('#pid').val(e);
    doFadeOnce($('#content_' + e).parent().parent());
    $('#replytext').val('');
    $('#replytext').focus();
    return !1
};
var current_edit_id = 0;

function editPost(e) {
    if (current_edit_id > 0) {
        $('#content_' + current_edit_id).html($('#cbuffer').html())
    };
    current_edit_id = e;
    $('#cbuffer').html($('#content_' + e).html());
    $.ajax({
        type: 'GET',
        url: '/community/edit/' + e + '/',
        dataType: 'json',
        beforeSend: function() {
            $('#content_' + e).html('<img src="/content/images/indicator.gif" alt="loading..."/>');
            $('#content_' + e).fadeIn('fast')
        },
        success: function(t) {
            $('#edited_' + e).remove();
            $('#content_' + e).html(t.html).find('.ajaxLink').fancybox();
            $('#post' + e).find('.smallButtonsline').hide();
            current_edit_id = 0
        }
    });
    return !1
};

function cancelEditPost(e) {
    current_edit_id = 0;
    $('#content_' + e).html($('#cbuffer').html());
    $('#post' + e).find('.smallButtonsline').show();
    return !1
};

function savePost(e, t) {
    var i = $(e).serialize();
    i = i;
    var n = (typeof(e.pid) == 'undefined') ? 0 : e.pid.value;
    if (!validateComment(e)) return !1;
    e.submit.disabled = !0;
    $.ajax({
        type: 'POST',
        url: '/community/edit/' + t + '/',
        data: i,
        dataType: 'json',
        beforeSend: function() {
            e.submit.disabled = !0
        },
        success: function(i) {
            if (i.method == 'error') {
                var n = $('<div class="alertfield">' + i.html + '</div>');
                n.prependTo($(e));
                e.submit.disabled = !1;
                return !1
            };
            $('#content_' + t).html(i.html).find('.ajaxLink').fancybox();
            $('#post' + t).find('.smallButtonsline').show()
        },
        error: function(e) {
            $('#content_' + t).html('<center>Something nasty happened. Please try to reload a page or visit kastatus.com for details.</center>')
        }
    });
    return !1
};

function quotePost(e, t) {
    $('#pid').val(0);
    var i = t != undefined ? '#post_' + e : '#content_' + e,
        n = toBBcode($(i).html()),
        s = $(i).parent().parent().find('.badgeUsernamejs').find('a').html();
    $('#replytext').val($('#replytext').val() + '[quote="' + s + '"]' + n + '[/quote]\n');
    $('#replytext').focus();
    return !1
};

function toBBcode(e) {
    var t = $('<div>' + e + '</div>'),
        i = null,
        s = null;
    t.html(t.html().replace(/<br([^>]*)>/igm, '\r'));
    while (t.find('div.spoiler_container .spoiler_js').length) {
        i = t.find('div.spoiler_container').first();
        i.replaceWith('[spoiler]' + i.find('.spoiler_js').html() + '[/spoiler]')
    }
    while (t.find('div.quote').length) {
        i = t.find('div.quote').first();
        s = '';
        if (i.find('> .quoteAuthor.plain a').length) {
            s = '="' + i.find('> .quoteAuthor.plain a').html() + '"';
            i.find('> .quoteAuthor.plain').remove()
        };
        if (i.find('> .quote-content').length) {
            i.replaceWith('[quote' + s + ']' + i.find('> .quote-content').html() + '[/quote]')
        };
        i.replaceWith('[quote' + s + ']' + i.html() + '[/quote]')
    }
    while (t.find('div.spoiler_body').length) {
        i = t.find('div.spoiler_body').first();
        s = '';
        if (i.find('> .spoiler_header > .spoiler_toggle.spoiler_custom').length) {
            s = '="' + i.find('> .spoiler_header > .spoiler_toggle.spoiler_custom').html() + '"'
        };
        i.replaceWith('[spoiler' + s + ']' + i.find('> .spoiler_js').html() + '[/spoiler]')
    };
    t.find('pre').each(function() {
        if ($(this).find('code').length) {
            $(this).replaceWith('[code]' + $(this).find('code').html() + '[/code]')
        } else {
            $(this).replaceWith('[pre]' + $(this).html() + '[/pre]')
        }
    });
    while (t.find('span[style^="color:"]').length) {
        i = t.find('span[style^="color:"]').first();
        s = i.attr('style').match(/color:(.*)/)[1];
        i.replaceWith('[color=' + s + ']' + i.html() + '[/color]')
    }
    while (t.find('span[style^="text-decoration: underline;"]').length) {
        i = t.find('span[style^="text-decoration: underline;"]').first();
        i.replaceWith('[u]' + i.html() + '[/u]')
    }
    while (t.find('span[style^="font-size:"]').length) {
        i = t.find('span[style^="font-size:"]').first();
        s = i.attr('style').match(/font-size:(.*)/)[1].replace(/%/g, '');
        if (/px/.test(s)) s = '"' + s + '"';
        i.replaceWith('[size=' + s + ']' + i.html() + '[/size]')
    }
    while (t.find('div[class="left"],div[class="center"],div[class="right"],div[class="justify"]').length) {
        i = t.find('div[class="left"],div[class="center"],div[class="right"],div[class="justify"]').first();
        s = i.attr('class');
        i.replaceWith('[' + s + ']' + i.html() + '[/' + s + ']')
    };
    t.html(t.html().replace(/<small>/igm, '[small]').replace(/<\/small>/igm, '[/small]'));
    t.html(t.html().replace(/<hr([^>]*)>/igm, '[hr]'));
    t.html(t.html().replace(/<(b|big|strong)>/ig, '[b]').replace(/<\/(b|big|strong)>/ig, '[/b]'));
    t.html(t.html().replace(/<i>/ig, '[i]').replace(/<\/i>/ig, '[/i]'));
    t.find('iframe[src*="embed/"]').each(function() {
        $(this).replaceWith('[youtube]' + $(this).attr('src').match(/.*embed\/([^"]*)/i)[1] + '[/youtube]')
    });
    t.find('ul').each(function() {
        $(this).replaceWith('[list]' + $(this).html() + '[/list]')
    });
    t.find('ol').each(function() {
        $(this).replaceWith('[list=1]' + $(this).html() + '[/list]')
    });
    t.html(t.html().replace(/<li>/ig, '[*]'));
    t.find('a.ka-widget[widget-type="page"][rel]').each(function() {
        $(this).replaceWith('[' + $(this).attr('rel') + ']')
    });
    t.find('a.ka-widget[widget-type][rel]').each(function() {
        $(this).replaceWith('[' + $(this).attr('widget-type') + '=' + $(this).attr('rel') + ']')
    });
    t.find('.achBadge:has(> a[rel])').each(function() {
        $(this).replaceWith('[achievement=' + $(this).find('> a[rel]').attr('rel') + ']')
    });
    t.find('span.red[title]').each(function() {
        $(this).replaceWith('[user="' + $(this).attr('title') + '"]')
    });
    t.find('.badgeInline').each(function() {
        $(this).replaceWith('[user="' + $(this).find('a.plain').html() + '"]')
    });
    t.find('img[class="emoticon"][src*="/images/smiley/"]').each(function() {
        $(this).replaceWith('[:Q' + $(this).attr('src').match(/\/images\/smiley\/([^>]+).gif/i)[1] + ']')
    });
    t.find('img[src]').each(function() {
        i = $(this);
        s = '';
        var t = i.parent(),
            n = /yuq\.me\/users\/\d+\/\d+\/([a-z0-9]+)\.(gif|png|jpg)/i,
            e = i.is('[data-original]') ? i.attr('data-original') : i.attr('src');
        if (t.is('a[href]')) {
            if (t.is('.ajaxLink')) {
                if (i.is('[width]')) {
                    s = ' width=' + i.attr('width');
                    t.replaceWith('[img' + s + ']' + e + '[/img]')
                } else {
                    e = t.attr('href');
                    t.replaceWith('[image=' + (n.test(e) ? e.match(n)[1] : 'invalid image') + ']')
                }
            } else {
                if (i.is('[width]')) s = ' width=' + i.attr('width');
                i.replaceWith('[img' + s + ']' + e + '[/img]')
            }
        } else {
            if (n.test(e)) {
                i.replaceWith('[image=' + e.match(n)[1] + ']')
            } else {
                i.replaceWith('[img]' + e + '[/img]')
            }
        }
    });
    t.html(t.html().replace(/<a href="[^"]*?\/users\/\d+\/\d+\/([a-z0-9]+)\.(gif|png|jpg)"[^>]*?><img[^>]*?src="[^"]*?"[^>]*?><\/a>/ig, '[image=$1]'));
    t.html(t.html().replace(/<img.*?src=".*?\/u\/\d+\/([a-z0-9]+)\.(gif|png|jpg)".*?>/ig, '[image=$1]'));
    t.html(t.html().replace(/<img src="([^>]+)">/ig, '[img]$1[\/img]'));
    t.html(t.html().replace(/<img[^>]*src=["']?([^>"]+)["'][^>]*?>/ig, '[img]$1[\/img]'));
    t.find('a[href^="/confirm/url/"]').each(function() {
        var e = atob(decodeURIComponent($(this).attr('href').match(/\/confirm\/url\/([^\/]*)/)[1]).replace('_', '/')),
            t = $(this).html();
        if (e == t) {
            $(this).replaceWith('[url]' + e + '[/url]')
        } else {
            $(this).replaceWith('[url="' + e + '"]' + t + '[/url]')
        }
    });
    t.html(t.html().replace(/<span><\/span>/ig, ''));
    t.html(t.html().replace(/<i class="ka ka16 ka-message"><\/i>/ig, ''));
    t.find('.vtipContentjs').remove();
    t.html(t.html().replace(/<span class="blank"><\/span>[^>]+<\/span>/ig, ''));
    var n = t.html();
    n = n.replace(/<a class="plain" href="\/user\/([^>"]+)\/"><strong>([^>]+)<\/strong><\/a>/gi, '[user="$1"]');
    n = n.replace(/<a class="plain" href="\/user\/([^>\/"]+)\/">([^>]+)<\/a>/gi, '[user="$1"]');
    n = n.replace(/<span class="blank"><\/span>[^>]+<\/span>/gi, '');
    n = n.replace(/<a [^>]*href="\/messenger\/create\/[^>]+imessage"><\/a>/gi, '');
    n = n.replace(/class="repValue[^>]+>[^<]+<\/span>/gi, '></span>');
    n = n.replace(/<STRONG>/gi, '[b]');
    n = n.replace(/<\/STRONG>/gi, '[/b]');
    n = n.replace(/<a[^>]*?href="\/confirm\/url[^>]+>(https?[^>]+)<\/a>/gi, '[url]$1[\/url]');
    n = n.replace(/<a rel="nofollow" href="[^>"]+\/user\/([^>\/"]+)\/">.+\/user\/([^>"]+)\/<\/a>/gi, '[user="$1"]$2[\/user]');
    n = n.replace(/<a rel="nofollow" href="[^>"]+\/user\/([^>\/"]+)\/">([^>]+)<\/a>/gi, '[user="$1"]$2[\/user]');
    n = n.replace(/<a rel="nofollow" href="([^>"]+)">([^>]+)<\/a>/gi, '[url="$1"]$2[\/url]');
    n = n.replace(/<P>/gi, '\r\r');
    n = n.replace(/<\/P>/gi, '');
    n = n.replace(/<P [^>]*>/gi, '\r\r');
    n = n.replace(/<a[^>]+href=["']([^>"']+)["'][^>]*>([^>]+)<\/a>/gi, '[url="$1"]$2[\/url]');
    n = n.replace(/<A HREF/i, '[url');
    n = n.replace(/<\/A>/i, '[/url]');
    n = n.replace(/<[^>]*>/g, '');
    n = n.replace(/">/g, '"]');
    n = n.replace(/&lt;/ig, '<').replace(/&gt;/ig, '>');
    return n
};

function showAlbum(e, t) {
    var i = $(e).parent().parent().find('.container_js'),
        n = $(e).parent();
    if (i.is(':visible')) {
        i.fadeOut('fast');
        n.removeClass('versionsUnFolded');
        n.addClass('versionsFolded');
        return !1
    };
    $.ajax({
        type: 'POST',
        url: '/media/getalbum/' + t + '/',
        dataType: 'json',
        error: function() {
            i.html('<center>Something nasty happened. Please try to reload a page or visit kastatus.com for details.</center>')
        },
        beforeSend: function() {
            i.html('<img src="/content/images/indicator.gif" alt="loading..."/>');
            i.fadeIn('fast')
        },
        success: function(e) {
            i.html(e.html);
            n.removeClass('versionsFolded');
            n.addClass('versionsUnFolded')
        }
    });
    return !1
};

function showEpisodeInfo(e, t) {
    var i = $(e).parent().parent().find('.container_js'),
        n = $(e).parent();
    if (i.is(':visible')) {
        i.fadeOut('fast');
        n.removeClass('versionsUnFolded');
        n.addClass('versionsFolded');
        return !1
    };
    $.ajax({
        type: 'POST',
        url: '/media/getepisode/' + t + '/',
        dataType: 'json',
        error: function() {
            i.html('<center>Something nasty happened. Please try to reload a page or visit kastatus.com for details.</center>')
        },
        beforeSend: function() {
            i.html('<img src="/content/images/indicator.gif" alt="loading..."/>');
            i.fadeIn('fast')
        },
        success: function(e) {
            i.html(e.html);
            n.removeClass('versionsFolded');
            n.addClass('versionsUnFolded');
            i.find('.askFeedbackjs').click(askFeedback)
        }
    });
    return !1
};

function showAnimeEpisodeInfo(e, t) {
    var i = $(e).parent().parent().find('.container_js'),
        n = $(e).parent();
    if (i.is(':visible')) {
        i.fadeOut('fast');
        n.removeClass('versionsUnFolded');
        n.addClass('versionsFolded');
        return !1
    };
    $.ajax({
        type: 'POST',
        url: '/media/getanimeepisode/' + t + '/',
        dataType: 'json',
        error: function() {
            i.html('<center>Something nasty happened. Please try to reload a page or visit kastatus.com for details.</center>')
        },
        beforeSend: function() {
            i.html('<img src="/content/images/indicator.gif" alt="loading..."/>');
            i.fadeIn('fast')
        },
        success: function(e) {
            i.html(e.html);
            n.removeClass('versionsFolded');
            n.addClass('versionsUnFolded')
        }
    });
    return !1
};

function toggleQuestions(e, t) {
    if ($('#' + e + '_group').is(':visible')) {
        $('#' + e + '_group').fadeOut('fast');
        $(t).parent().removeClass('questionGroupUnFolded');
        $(t).parent().addClass('questionGroupFolded');
        return !1
    } else {
        $('#' + e + '_group').fadeIn('fast');
        $(t).parent().removeClass('questionGroupFolded');
        $(t).parent().addClass('questionGroupUnFolded')
    }
};

function showNewComments(e) {
    if ($('#torrent_' + e).is(':visible')) {
        $('#torrent_' + e).fadeOut('fast');
        $('#infoList_' + e).removeClass('versionsUnFolded');
        $('#infoList_' + e).addClass('versionsFolded');
        return !1
    };
    $.ajax({
        type: 'POST',
        url: '/account/new_comments/',
        data: {
            ajax: 1,
            torrentId: e
        },
        dataType: 'json',
        beforeSend: function() {
            $('#torrent_' + e).html('<img src="/content/images/indicator.gif" alt="loading..."/>');
            $('#torrent_' + e).fadeIn('fast')
        },
        success: function(t) {
            $('#torrent_' + e).html(t.html);
            $('#infoList_' + e).removeClass('versionsFolded');
            $('#infoList_' + e).addClass('versionsUnFolded')
        }
    });
    return !1
};

function getCategories(e, t) {
    $.ajax({
        type: 'POST',
        url: '/torrents/getcategory/' + t + '/' + e + '/',
        dataType: 'json',
        beforeSend: function() {
            $('#cat_place_' + e).html('<img src="/content/images/indicator.gif" alt="loading..."/>')
        },
        success: function(t) {
            $('#cat_place_' + e).html(t.html).show()
        }
    });
    return !1
};

function validateIdea(e) {
    if ((e.text.value == '')) {
        alert('Please fill the description field');
        return !1
    };
    if ((e.name.value.length < 4)) {
        alert('Idea name is too short');
        return !1
    };
    if ((e.category.value == '')) {
        alert('Please select category');
        return !1
    };
    return !0
};
var force_submit_idea = !1;

function searchSimilarIdeas(e) {
    if (!validateIdea(e)) return !1;
    var t = $(e).serialize();
    t = t + '&ajax=1' + (force_submit_idea ? '&force=1' : '');
    e.submit.disabled = !0;
    $.ajax({
        type: 'POST',
        url: '/ideabox/create/',
        data: t,
        dataType: 'json',
        beforeSend: function() {
            $('#similar_ideas').html('<img src="/content/images/indicator.gif">');
            e.submit.disabled = !0
        },
        success: function(t) {
            e.submit.disabled = !1;
            if (t.idea_link != undefined) {
                document.location = t.idea_link;
                return !1
            } else if (t.method == 'error') {
                $('#similar_ideas').attr('style', 'color: red;')
            } else {
                $('#butsave').html('<span>save</span>')
            };
            $('#similar_ideas').html(t.html);
            $('#similar_ideas').fadeIn('fast');
            force_submit_idea = !0
        },
        error: function(t) {
            $('#similar_ideas').html('<center>Something nasty happened. Please try to reload a page or visit kastatus.com for details.</center>');
            e.submit.disabled = !1
        }
    });
    return !1
};

function getSubcategory(e) {
    $.ajax({
        type: 'POST',
        url: '/torrents/getcategory/' + $('#categoryId_' + e + ' :selected').val() + '/' + e + '/',
        dataType: 'json',
        beforeSend: function() {
            $('#cat_place_' + e).html('<img src="/content/images/indicator.gif">')
        },
        success: function(t) {
            $('#cat_place_' + e).html(t.html)
        }
    });
    return !1
};

function setCategory(e) {
    var t = $('#sub_cat_' + e + ' :selected').val() != undefined ? $('#sub_cat_' + e + ' :selected').val() : 0,
        i = $('#cat_' + e).html();
    $.ajax({
        type: 'POST',
        url: '/moderator/torrent/changecategory/' + e + '/',
        data: {
            ajax: 1,
            categoryId: $('#categoryId_' + e + ' :selected').val(),
            sub_cat: t
        },
        dataType: 'json',
        beforeSend: function() {
            $('#cat_' + e).html('<img src="/content/images/indicator.gif" alt="loading..."/>')
        },
        success: function(t) {
            if (t.method == 'error') {
                alert(t.html);
                $('#cat_' + e).html(i)
            } else {
                $('#cat_' + e).html(t.html)
            };
            $('#cat_place_' + e).hide()
        }
    });
    return !1
};

function requestReseed(e, t) {
    $.ajax({
        type: 'POST',
        url: '/torrents/requestreseed/' + e + '/',
        data: {
            ajax: 1
        },
        dataType: 'json',
        beforeSend: function(e) {
            $(t).html('<img src="/content/images/indicator.gif" alt="loading..."/>')
        },
        success: function(e) {
            $(t).hide();
            $('#reseed_div').html('RESEED HAS BEEN REQUESTED FOR THIS TORRENT').show()
        }
    });
    return !1
};

function hideSidebar() {
    $('#sidebar').hide();
    $('#hidesidebar').hide();
    $('#showsidebar').show();
    $.post('/account/hidesidebar/', {
        hide: 1,
        ajax: 1
    });
    return !1
};

function showSidebar() {
    $('#sidebar').show();
    $('#hidesidebar').show();
    $('#showsidebar').hide();
    $.post('/account/hidesidebar/', {
        hide: 0,
        ajax: 1
    });
    return !1
};

function saveAndClosePartner(e) {
    $.cookie('partner' + e, '1', {
        expires: 365,
        path: '/'
    });
    $('#promoPartner' + e).fadeOut('fast')
};

function saveAndCloseLeech() {
    $.cookie('leech', '1', {
        expires: 365,
        path: '/'
    });
    $('#promoLeechmonster').fadeOut('fast')
};

function saveFriendRequest(e) {
    $.ajax({
        type: 'POST',
        url: e.href,
        data: {
            ajax: '1'
        },
        dataType: 'json',
        success: function(t) {
            if (t.method == 'error') return alert(t.html);
            $(e).parent().parent().parent().fadeOut('fast').remove()
        }
    });
    return !1
};

function uploadChangeCat() {
    $.ajax({
        type: 'POST',
        url: '/torrents/getcategory/' + $('#categoryId :selected').val() + '/',
        dataType: 'json',
        beforeSend: function() {
            $('#subcat').html('<img src="/content/images/indicator.gif">')
        },
        success: function(e) {
            var t = $('#categoryId :selected').val();
            $('#tvshow,#movie,#game,#book,#anime,#music,#langs,#subs,#scrcp,#scrns').hide();
            if (t == 2) {
                $('#movie,#langs,#subs,#scrcp,#scrns,#completeness').show()
            } else if (t == 21) {
                $('#tvshow,#langs,#subs,#scrcp,#scrns,#completeness').show()
            } else if (t == 4) {
                $('#game,#langs,#scrns,#completeness').show()
            } else if (t == 6) {
                $('#scrcp,#scrns,#completeness').show()
            } else if (t == 7) {
                $('#anime,#langs,#subs,#scrcp,#scrns,#completeness').show()
            } else if (t == 9) {
                $('#book').show()
            } else if (t == 12) {
                $('#music').show()
            };
            $('#subcat').html(e.html)
        }
    })
};

function askFeedback() {
    var e = $(this),
        i = e.attr('href'),
        t = e.data('id');
    if (t) {
        $.post('/account/askfeedback/' + t + '/', {}, function(e) {
            if (e.method == 'error') {
                alert('Error: ' + e.html)
            } else {
                updateFeedback();
                document.location.href = i
            }
        }, 'json').error(function(e) {
            console.log(e)
        });
        return !1
    } else {
        updateFeedback()
    }
};

function toggleTags(e, t) {
    t = t || 0;
    if (t) {
        $.ajax({
            type: 'POST',
            url: '/account/toggletagcloud/show/',
            dataType: 'json',
            success: function(e) {
                $('#tagcloud').html(e.html).slideDown('normal')
            }
        });
        $(e).html('<span class="font80perc">&#x25B2;</span>');
        $(e).prop('title', 'Hide tagcloud');
        $(e).attr('onclick', 'toggleTags(this);')
    } else {
        $('#tagcloud').slideUp('normal');
        $.post('/account/toggletagcloud/hide/');
        $(e).prop('title', 'Show tagcloud');
        $(e).html('<span class="font80perc">&#x25BC;</span>');
        $(e).attr('onclick', 'toggleTags(this, 1);')
    }
};

function uploadFile(e) {
    $(e).parent().find('.switchRight').removeClass('active');
    $(e).addClass('active');
    $('#fileinput_container').html('<input type=\'file\' name=\'file\' class=\'primary inputfile\' />').find('input[type=file]').customFileInput();
    return !1
};

function uploadUrl(e) {
    $(e).parent().find('.switchLeft').removeClass('active');
    $(e).addClass('active');
    $('#fileinput_container').html('<input type=\'url\' class=\'primary textinput longtextinput\' name=\'uploadUrl\' value=\'\' />');
    return !1
};

function setLanguage(e, t) {
    $('#langSelectorLine').hide();
    $.cookie('lang_code', e, {
        expires: 365,
        path: '/',
        domain: t
    });
    $.post('/account/switch_language/' + e + '/');
    window.location.reload()
};

function refreshMeta(e) {
    var t = Math.floor(Math.random() * 99999999999);
    $.ajax({
        type: 'POST',
        url: $(e).attr('href'),
        dataType: 'json',
        beforeSend: function() {
            $(e).replaceWith('<img id="prg' + t + '" src="/content/images/indicator.gif">')
        },
        success: function(e) {
            $('#prg' + t).replaceWith('ok')
        }
    });
    return !1
};

function doLogout(e) {
    var t = e ? document[e] : document.logoutform;
    t.submit();
    return !1
};
$.fn.makePost = function(e) {
    if (!$(this).length) {
        return this
    };
    $(this).unbind('click.pst').bind('click.pst', function(e) {
        e.preventDefault();
        $(this).blur();
        $.post($(this).attr('href'), {}, function(e) {
            if (e.method == 'error') {
                alert('Error: ' + e.html)
            } else {
                document.location.reload()
            }
        }, 'json').error(function(e) {
            console.log('XHR Error: ' + e.responseText)
        });
        return
    });
    return this
};
(function(e, t, i, n) {
    e.fn.doubleTapToGo = function(n) {
        if (!('ontouchstart' in t) && !navigator.msMaxTouchPoints && !navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) return !1;
        this.each(function() {
            var t = !1;
            e(this).on('click', function(i) {
                var n = e(this);
                if (n[0] != t[0]) {
                    i.preventDefault();
                    t = n
                }
            });
            e(i).on('click touchstart MSPointerDown', function(i) {
                var s = !0,
                    r = e(i.target).parents();
                for (var n = 0; n < r.length; n++)
                    if (r[n] == t[0]) s = !1;
                if (s) t = !1
            })
        });
        return this
    }
})(jQuery, window, document);
$(function() {
    $('a.ajaxLink').fancybox();
    $('a.postLink').makePost();
    $('#translate_link').fancybox({
        autoDimensions: !1,
        width: 500
    });
    var i = 'ch|tw|bn'.split('|');
    if (i.indexOf($.cookie('lang_code')) >= 0) {
        var t = '#navigation li a .menuItem:not(.usernameProfile), #navigation li .dropdown li a, footer ul li a, .sliderbox ul li span.explanation, .data tr th a, .font11px, small, .font10px, .firstPost strong, #translate_link strong';
        $(t).addClass('thinGlyph')
    };
    $(document).on('click', 'td.forumhideJS', function(e) {
        var r = $(this),
            n = r.attr('rel');
        if (e.target.nodeName == 'A') return;
        var t = $('#forum_' + n),
            s = t.hasClass('hideBlockJS') ? null : 1;
        $.cookie('kat_settings[hide_forum][' + n + ']', s, {
            expires: 365,
            path: '/'
        });
        t.slideToggle('normal');
        var i = $(e.target);
        if (t.hasClass('hideBlockJS')) {
            t.removeClass('hideBlockJS').addClass('showBlockJS');
            i.attr('title', i.data('hide-title'))
        } else {
            t.removeClass('showBlockJS').addClass('hideBlockJS');
            i.attr('title', i.data('show-title'))
        }
    });
    $(document).on('click', '.foldClose', function() {
        var t = $(this).parent().parent().find('ul').attr('rel'),
            e = $('#' + t),
            i = e.hasClass('hideBlockJS') ? null : 1;
        $.cookie('kat_settings[sidebar][' + t + ']', i, {
            expires: 365,
            path: '/'
        });
        if (e.hasClass('hideBlockJS')) {
            e.removeClass('hideBlockJS').addClass('showBlockJS');
            $(this).removeClass('ka-arrow2-down').addClass('ka-arrow2-up')
        } else {
            e.removeClass('showBlockJS').addClass('hideBlockJS');
            $(this).removeClass('ka-arrow2-up').addClass('ka-arrow2-down')
        }
    });
    $(document).on('click', '#toggleAch', function() {
        var e = $('table .achTable'),
            t = e.hasClass('hideBlockJS') ? null : 1;
        $.cookie('kat_settings[hide_achievements]', t, {
            expires: 365,
            path: '/'
        });
        e.toggle();
        if (e.hasClass('hideBlockJS')) {
            e.removeClass('hideBlockJS').addClass('showBlockJS')
        } else {
            e.removeClass('showBlockJS').addClass('hideBlockJS')
        }
    });
    $(document).on('click', '#toggleFriends', function() {
        var e = $('#onlineFriends'),
            t = e.hasClass('hideBlockJS') ? 0 : 1;
        $.cookie('kat_settings[hide_friends]', t, {
            expires: 365,
            path: '/'
        });
        e.toggle();
        if (e.hasClass('hideBlockJS')) {
            e.removeClass('hideBlockJS').addClass('showBlockJS')
        } else {
            e.removeClass('showBlockJS').addClass('hideBlockJS')
        }
    });
    $(document).on('click', '#toggleAwaiting', function() {
        var e = $('#awaitingFriends'),
            t = e.hasClass('hideBlockJS') ? 0 : 1;
        $.cookie('kat_settings[hide_friends_awaiting]', t, {
            expires: 365,
            path: '/'
        });
        e.toggle();
        if (e.hasClass('hideBlockJS')) {
            e.removeClass('hideBlockJS').addClass('showBlockJS')
        } else {
            e.removeClass('showBlockJS').addClass('hideBlockJS')
        }
    });
    $(document).on('click', '#togglePending', function() {
        var e = $('#pendingFriends'),
            t = e.hasClass('hideBlockJS') ? 0 : 1;
        $.cookie('kat_settings[hide_friends_pending]', t, {
            expires: 365,
            path: '/'
        });
        e.toggle();
        if (e.hasClass('hideBlockJS')) {
            e.removeClass('hideBlockJS').addClass('showBlockJS')
        } else {
            e.removeClass('showBlockJS').addClass('hideBlockJS')
        }
    });
    $(document).on('click', '.hideChatBar', function() {
        $.cookie('kat_settings[chatbar]', 1, {
            expires: 365,
            path: '/'
        });
        $('#chat-bar-full').hide();
        $('#chat-bar-short').show();
        $('.chat-bar').addClass('chat-bar-short')
    });
    $(document).on('click', '.showChatBar', function() {
        $.cookie('kat_settings[chatbar]', null, {
            expires: 365,
            path: '/'
        });
        $('#chat-bar-full').show();
        $('#chat-bar-short').hide();
        $('.chat-bar').removeClass('chat-bar-short')
    });
    $(document).on('click', '.closeChatBar', function() {
        $.cookie('kat_settings[chatbar]', 2, {
            expires: 365,
            path: '/'
        });
        $('.chat-bar').hide()
    });
    $(document).on('keypress', '.quicksubmit', function(e) {
        if (e.keyCode === 13 && (e.ctrlKey || e.metaKey)) {
            $(this).parents('form').eq(0).submit();
            return !1
        }
    });
    $('.comareajs').each(function() {
        $(this).bbedit()
    }).one('focus', function(e) {
        var t = $(this).parent().find('.captchaformjs');
        t.show();
        t.find('img').trigger('click')
    });
    $.fancybox.queue($('#achievements').children().toArray(), {
        timeout: 30000,
        onNext: function(e) {
            $.post('/achievement/mark/' + $(e).data('achievement-id') + '/')
        }
    });
    $('#contentSearch').autocomplete({
        cache: !0,
        minLength: 2,
        open: function(e, t) {
            $('#contentSearch').autocomplete('widget').addClass('ui-search-autocomplete')
        },
        source: function(e, t) {
            $.ajax({
                url: '/get_queries.php',
                dataType: 'json',
                data: {
                    query: e.term
                },
                success: function(e) {
                    if (e.query.length == 0) return;
                    t($.map(e.query[0].options, function(e) {
                        return {
                            label: e.text,
                            value: e.text
                        }
                    }))
                }
            })
        },
        select: function(e, t) {
            window.location = '/usearch/' + t.item.value + '/'
        }
    });
    if (kat.detect_lang && $.cookie('lang_detected') == null) {
        $.ajax({
            type: 'POST',
            url: '/detectlang/',
            dataType: 'json',
            success: function(e) {
                if (e != null) $('#langSelectorLine').html(e.html).slideDown('normal')
            }
        })
    };
    try {
        $('img.lazyjs').lazyload({
            effect: 'fadeIn'
        })
    } catch (e) {};
    $(document).on('click', 'img.captcha', function() {
        this.src = '/captcha/show/?' + Math.floor(Math.random() * 10000)
    });
    $(document).on('click', '.captchareload', function() {
        $(this).parent().find('img.captcha').click()
    });
    $(document).on('click', '.spoiler_toggle', function() {
        $(this).parent().parent().toggleClass('spoiler_opened').find('.spoiler_js').first().toggle()
    });
    $('.askFeedbackjs').click(askFeedback);
    $('.voteButton_js').on('click', function(e) {
        e.preventDefault();
        var t = $(this).parent(),
            i = $(this).is('.ka-thumbs-up');
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: $(this).attr('href'),
            beforeSend: function() {
                t.find('.ratemark').html('<img src="/content/images/indicator.gif">').removeClass('plus minus');
                t.find('.ratemark .ka').remove()
            },
            success: function(e) {
                t.find('.ka16').remove();
                if (e.method == 'ok') {
                    t.prepend('<a class="ka kasmall ka16 ' + (i ? 'ka-thumbs-up' : 'ka-thumbs-down') + ' ka-disabled"><span></span></a>');
                    var n = parseInt(e.html);
                    t.find('.ratemark').html(e.html).addClass((n > 0 ? 'plus' : (n < 0 ? 'minus' : ''))).prepend('<i class="ka ka-arrow2-' + (n > 0 ? 'up' : 'down') + '"></i>')
                } else {
                    t.find('.ratemark').html('error')
                }
            },
            error: function() {
                t.find('.ka16').remove();
                t.find('.ratemark').html('error')
            }
        })
    });
    $(document).on('click', '#showHideSearch', function(e) {
        e.preventDefault();
        var t = $(this);
        $('#torrentSearch').slideToggle('fast');
        if (t.hasClass('ka-delete')) t.attr('class', 'ka ka-zoom');
        else if (t.hasClass('ka-zoom')) t.attr('class', 'ka ka-delete')
    });
    if (('ontouchstart' in document.documentElement)) {
        $('#tagcloud').hide().addClass('folded')
    };
    $('#navigation li:has(ul)').doubleTapToGo();
    $('.icommentjs').doubleTapToGo();
    $('.checkboxchecker').each(populateCheckBoxes());
    $('#thnxLink,#fakeLink').click(function() {
        var t = $(this),
            i = t.data('hash'),
            e;
        if (t.is('.jslike')) {
            e = 'like'
        } else if (t.is('.jsunlike')) {
            e = 'unlike'
        } else if (t.is('.jsdislike')) {
            e = 'dislike'
        } else if (t.is('.jsundislike')) {
            e = 'undislike'
        } else {
            return !1
        };
        $.ajax({
            type: 'POST',
            url: '/torrents/vote/' + e + '/' + i + '/',
            dataType: 'json',
            success: function(t) {
                if (t.method == 'error') {
                    alert(t.html);
                    return
                };
                $('#thnxCount span').html(t.thanks_count != 0 ? '+' + t.thanks_count : 0);
                $('#fakeCount span').html(t.fakes_count != 0 ? '-' + t.fakes_count : 0);
                var i = $('#thnxLink'),
                    n = $('#fakeLink');
                switch (e) {
                    case 'like':
                        i.removeClass('jslike').addClass('jsunlike');
                        n.removeClass('jsdislike').addClass('gfunchecked');
                        break;
                    case 'unlike':
                        i.removeClass('jsunlike').addClass('jslike');
                        n.removeClass('gfunchecked').addClass('jsdislike');
                        break;
                    case 'dislike':
                        i.removeClass('jslike').addClass('gfunchecked');
                        n.removeClass('jsdislike').addClass('jsundislike');
                        break;
                    case 'undislike':
                        i.removeClass('gfunchecked').addClass('jslike');
                        n.removeClass('jsundislike').addClass('jsdislike');
                        break
                }
            }
        });
        return !1
    });
    jQuery('.timeago').timeago()
});

function populateCheckBoxes() {
    return function() {
        var e = $(this),
            i = e.data('selector'),
            t = $(i);
        e.click(function(i) {
            t.prop('checked', e.prop('checked'));
            i.stopPropagation()
        });
        t.click(function(i) {
            var n = !0;
            t.each(function() {
                if (!$(this).prop('checked')) {
                    n = !1;
                    return !1
                }
            });
            e.prop('checked', n);
            i.stopPropagation()
        })
    }
};

function updateMessagesCount(e) {
    var t = $('#menu_messages_count');
    if (e > 0) {
        if (!t.length) return;
        t.html(e).parent().show()
    } else {
        t.parent().hide()
    }
};

function confirm_url(e, t) {
    dont = $(e).prop('checked') ? 1 : null;
    $.cookie('kat_settings[dont_ask]', dont, {
        expires: 365,
        path: '/',
        domain: t
    })
};
$(function() {
    $.fn.extend({
        addFilters: function() {
            return this.each(function() {
                $(this).find('tr.firstr > *').each(function() {
                    $(this).attr('style', 'width: ' + $(this).width() + 'px !important')
                });
                $(this).find('tr.firstr > :eq(0)').html('<select class="tableFilter" id="tableFilter_event"><option value="">Event</option></select>');
                $(this).find('tr.firstr > :eq(1)').html('<select class="tableFilter" id="tableFilter_performer"><option value="">Performed by</option></select>');
                filterEvents = [];
                filterPerformers = [];
                var e, t;
                $(this).find('tr:not(.firstr)').each(function() {
                    e = $(this).find(':eq(0)').text();
                    t = $(this).find(':eq(1) .badgeInline .plain').text();
                    if (filterEvents.indexOf(e) < 0) {
                        filterEvents.push(e);
                        $('#tableFilter_event').append('<option value="' + e + '">' + e + '</option>')
                    };
                    if (filterPerformers.indexOf(t) < 0) {
                        filterPerformers.push(t);
                        $('#tableFilter_performer').append('<option value="' + t + '">' + t + '</option>')
                    }
                })
            })
        }
    });
    $(document).delegate('.tableFilter', 'change', function() {
        $(this).closest('table').find('tr:not(.firstr)').each(function() {
            $(this).hide();
            if (($(this).find(':eq(0)').text() == $('#tableFilter_event').val() || $('#tableFilter_event').val() == '') && ($(this).find(':eq(1) .badgeInline .plain').text() == $('#tableFilter_performer').val() || $('#tableFilter_performer').val() == '')) $(this).show()
        })
    })
});
$(function() {
    $('#feedback').click(function() {
        var e = $('<div />').css({
            position: 'absolute',
            zIndex: 9990,
            cursor: 'crosshair',
            left: 0,
            top: 0,
            width: $(document).width(),
            height: $(document).height(),
            background: '#000',
            opacity: 0.5
        }).appendTo('body');
        var t = $('<div />').css({
            color: '#fff',
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '100px',
            marginLeft: '-50px',
            lineHeight: '16px',
            fontWeight: 'bold'
        }).append($('<img />').attr('src', '/content/images/indicator.gif').css({
            marginRight: '5px',
            verticalAlign: 'top'
        })).append('Loading...').appendTo(e);
        $(window).bind('keypress.fb', function(i) {
            if (i.keyCode == 27) {
                $(window).unbind('keypress.fb');
                t.remove();
                e.remove()
            }
        });
        $.getScript('/content/js/feedback/html2canvas.min-' + kat.release_id + '.js', function() {
            $.getJSON('/issue/form/?_=' + new Date().getTime(), function(i) {
                $.getScript('/content/js/feedback/feedback-' + kat.release_id + '.js', function() {
                    t.remove();
                    $(window).unbind('.fb');
                    $('body').feedback(i.html, e);
                    $('.lazyjs').lazyload()
                })
            })
        });
        return !1
    })
});

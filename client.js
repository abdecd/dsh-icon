window.__ModuleLoader__.load({
	id: "dsh-icon",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __copyProps = (to, from, except, desc) => {
			if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
			value: mod,
			enumerable: true
		}) : target, mod));
		//#endregion
		let react = require("react");
		react = __toESM(react, 1);
		let react_dom = require("react-dom");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/client/BlankSessionExpandButton.tsx
		const CSS_TAG_ID = "dsh-icon:hero-expand-button-styles";
		function ensureStyles() {
			if (typeof document === "undefined") return;
			if (document.querySelector(`style[data-plugin-css="${CSS_TAG_ID}"]`) !== null) return;
			const style = document.createElement("style");
			style.dataset.plugin = "dsh-icon";
			style.dataset.pluginCss = CSS_TAG_ID;
			style.textContent = `
    .dsh-icon-hero-expand-btn {
      position: absolute;
      top: 11px;
      right: 12px;
      width: 28px;
      height: 28px;
      color: var(--dsw-alias-label-secondary, rgba(255, 255, 255, 0.65));
      cursor: pointer;
      background: transparent;
      border: none;
      border-radius: 28px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 6px;
      z-index: 25;
      box-sizing: border-box;
      transition: background var(--ds-transition-duration-fast, 0.15s) ease,
                  color var(--ds-transition-duration-fast, 0.15s) ease;
    }
    .dsh-icon-hero-expand-btn:hover {
      background: var(--dsw-alias-interactive-bg-hover, rgba(255, 255, 255, 0.08));
      color: var(--dsw-alias-label-primary, #ffffff);
    }
    .dsh-icon-hero-expand-btn svg {
      width: 15px;
      height: 15px;
      transform: scaleX(-1);
    }
  `;
			document.head.appendChild(style);
		}
		function FallbackPanelIcon() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 16 16",
				fill: "none",
				style: { transform: "scaleX(-1)" },
				xmlns: "http://www.w3.org/2000/svg",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					fillRule: "evenodd",
					clipRule: "evenodd",
					d: "M9.67272 0.522841C10.8339 0.522841 11.76 0.522714 12.4963 0.602493C13.2453 0.683657 13.8789 0.854248 14.4264 1.25197C14.7504 1.48739 15.0355 1.77247 15.2709 2.0965C15.6686 2.64394 15.8392 3.27758 15.9204 4.02655C16.0002 4.7629 16 5.68895 16 6.85014V9.14986C16 10.3111 16.0002 11.2371 15.9204 11.9735C15.8392 12.7224 15.6686 13.3561 15.2709 13.9035C15.0355 14.2275 14.7504 14.5126 14.4264 14.748C13.8789 15.1458 13.2453 15.3163 12.4963 15.3975C11.76 15.4773 10.8339 15.4772 9.67272 15.4772H6.3273C5.16611 15.4772 4.24006 15.4773 3.50371 15.3975C2.75474 15.3163 2.1211 15.1458 1.57366 14.748C1.24963 14.5126 0.964549 14.2275 0.729131 13.9035C0.331407 13.3561 0.160817 12.7224 0.0796529 11.9735C-0.000126137 11.2371 1.25338e-09 10.3111 1.25338e-09 9.14986V6.85014C1.25329e-09 5.68895 -0.000126137 4.7629 0.0796529 4.02655C0.160817 3.27758 0.331407 2.64394 0.729131 2.0965C0.964549 1.77247 1.24963 1.48739 1.57366 1.25197C2.1211 0.854248 2.75474 0.683657 3.50371 0.602493C4.24006 0.522714 5.16611 0.522841 6.3273 0.522841H9.67272ZM5.54303 1.88715V14.1118C5.78636 14.1128 6.04709 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C6.04709 1.88307 5.78636 1.8862 5.54303 1.88715ZM4.1828 1.91166C3.99125 1.9216 3.8148 1.93577 3.65076 1.95353C3.01764 2.02212 2.65034 2.1506 2.37325 2.35179C2.16463 2.50337 1.98052 2.68747 1.82895 2.89609C1.62776 3.17318 1.49928 3.54048 1.43069 4.1736C1.36074 4.81967 1.36023 5.65896 1.36023 6.85014V9.14986C1.36023 10.341 1.36074 11.1803 1.43069 11.8264C1.49928 12.4595 1.62776 12.8268 1.82895 13.1039C1.98052 13.3125 1.82895 13.1039 1.82895 13.1039C1.62776 12.8268 1.49928 12.4595 1.43069 11.8264C1.36074 11.1803 1.36023 10.341 1.36023 9.14986V6.85014C1.36023 5.65896 1.36074 4.81967 1.43069 4.1736C1.49928 3.54048 1.62776 3.17318 1.82895 2.89609C1.98052 2.68747 2.16463 2.50337 2.37325 2.35179C2.65034 2.1506 3.01764 2.02212 3.65076 1.95353C3.8148 1.93577 3.99125 1.9216 4.1828 1.91166Z",
					fill: "currentColor"
				})
			});
		}
		function BlankSessionExpandButton({ ctx }) {
			const [shouldShow, setShouldShow] = (0, react.useState)(false);
			const [targetContainer, setTargetContainer] = (0, react.useState)(null);
			(0, react.useEffect)(() => {
				ensureStyles();
			}, []);
			const checkState = (0, react.useCallback)(() => {
				if (document.querySelector("[data-settings-panel], [data-settings-page]")) {
					setShouldShow(false);
					return;
				}
				const snapshot = ctx.sessions?.list?.getSnapshot?.();
				const currentId = snapshot?.current;
				const currentSession = currentId ? snapshot?.byId?.[currentId] : null;
				const sessionBlank = currentSession ? currentSession.blank : true;
				const heroEl = document.querySelector("[data-phase=\"hero\"]");
				const headerHiddenEl = document.querySelector("header[class*=\"headerHidden\"], [data-slot=\"conversation.session.header\"] > header[class*=\"headerHidden\"]");
				const nativeExpandBtn = document.querySelector("[data-sidebar-right-expand]:not([data-dsh-icon-hero])");
				if (!((sessionBlank || heroEl !== null || headerHiddenEl !== null) && nativeExpandBtn === null)) {
					setShouldShow(false);
					return;
				}
				let isExpanded = false;
				if (ctx.get("sidebarRight")?.isExpanded?.()) isExpanded = true;
				else if (document.querySelector("[data-sidebar-right-open]")) isExpanded = true;
				const show = !isExpanded;
				const container = heroEl || document.querySelector("[data-slot=\"main.conversation\"] > div") || document.querySelector("[class*=\"wSkVaW_root\"]") || document.querySelector("[data-dsh-center-col]") || document.querySelector("[class*=\"centerCol\"]");
				setTargetContainer(container);
				setShouldShow(show);
			}, [ctx]);
			(0, react.useEffect)(() => {
				checkState();
				const unsubSessions = ctx.sessions?.list?.subscribe?.(checkState);
				const observer = new MutationObserver(() => {
					checkState();
				});
				observer.observe(document.body, {
					attributes: true,
					attributeFilter: [
						"data-phase",
						"data-sidebar-right-open",
						"data-rightbar-collapsed",
						"data-sidebar-collapsed",
						"class",
						"aria-hidden"
					],
					subtree: true,
					childList: true
				});
				window.addEventListener("resize", checkState);
				return () => {
					unsubSessions?.();
					observer.disconnect();
					window.removeEventListener("resize", checkState);
				};
			}, [checkState, ctx]);
			const handleExpand = (0, react.useCallback)(() => {
				const sidebarRight = ctx.get("sidebarRight");
				if (sidebarRight) try {
					sidebarRight.toggleExpanded?.();
					setShouldShow(false);
					return;
				} catch (err) {
					console.warn("[dsh-icon] sidebarRight.toggleExpanded failed, trying fallback", err);
				}
				const nativeBtn = document.querySelector("[data-sidebar-right-expand]:not([data-dsh-icon-hero])");
				if (nativeBtn) {
					nativeBtn.click();
					setShouldShow(false);
					return;
				}
				const toggleBtn = document.querySelector("[data-sidebar-right-toggle]");
				if (toggleBtn) {
					toggleBtn.click();
					setShouldShow(false);
					return;
				}
			}, [ctx]);
			if (!shouldShow) return null;
			const label = (() => {
				try {
					const bound = ctx.get("locale")?.bind?.("sidebarRight");
					const text = bound?.("chrome.expand");
					if (text && text !== "chrome.expand") return text;
				} catch {}
				return ctx.get("locale")?.getPreference?.() === "en" ? "Expand sidebar" : "展开侧边栏";
			})();
			const buttonElement = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: "dsh-icon-hero-expand-btn",
				"aria-label": label,
				title: label,
				"data-sidebar-right-expand": "true",
				"data-dsh-icon-hero": "true",
				onClick: handleExpand,
				children: typeof _deepseek_ai_dsh_client_ui_primitives.IconPanelLeftOutline16 !== "undefined" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPanelLeftOutline16, { size: 16 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FallbackPanelIcon, {})
			});
			const content = typeof _deepseek_ai_dsh_client_ui_primitives.Tooltip !== "undefined" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
				label,
				side: "bottom",
				delayMs: 500,
				children: buttonElement
			}) : buttonElement;
			if (targetContainer && targetContainer !== document.body) return (0, react_dom.createPortal)(content, targetContainer);
			return content;
		}
		//#endregion
		//#region src/client/favicon-running.ts
		/**
		* The exact DeepSeek whale SVG path d from favicon.svg (viewBox 0 0 50 50).
		*/
		const WHALE_PATH_D = "M48.8354 10.0479C48.3232 9.79199 48.1025 10.2798 47.8032 10.5278C47.7007 10.6079 47.6143 10.7119 47.5273 10.8076C46.7793 11.624 45.9048 12.1597 44.7622 12.0957C43.0923 12 41.666 12.5356 40.4058 13.8398C40.1377 12.2319 39.2476 11.272 37.8926 10.6558C37.1836 10.3359 36.4668 10.0156 35.9702 9.31982C35.6235 8.82373 35.5293 8.27197 35.356 7.72754C35.2456 7.3999 35.1353 7.06396 34.7651 7.00781C34.3633 6.94385 34.2056 7.2876 34.0479 7.57568C33.418 8.75195 33.1733 10.0479 33.1973 11.3599C33.2524 14.312 34.4736 16.6641 36.8999 18.3359C37.1758 18.5278 37.2466 18.7197 37.1597 19C36.9946 19.5757 36.7974 20.1357 36.624 20.7119C36.5137 21.0801 36.3486 21.1597 35.9624 21C34.6309 20.4321 33.481 19.5918 32.4644 18.5757C30.7393 16.8721 29.1792 14.9917 27.2334 13.52C26.7764 13.1758 26.3193 12.856 25.8467 12.5518C23.8618 10.584 26.1069 8.96777 26.627 8.77588C27.1704 8.57568 26.8159 7.8877 25.0591 7.896C23.3022 7.90381 21.6953 8.50391 19.647 9.30371C19.3477 9.42383 19.0322 9.51172 18.7095 9.58398C16.8501 9.22363 14.9199 9.14355 12.9033 9.37598C9.10596 9.80762 6.07275 11.6396 3.84326 14.7681C1.16455 18.5278 0.53418 22.7998 1.30664 27.2559C2.11768 31.9521 4.46582 35.8398 8.07373 38.8799C11.8159 42.0322 16.1255 43.5762 21.041 43.2803C24.0269 43.104 27.3516 42.6963 31.1016 39.4561C32.0469 39.936 33.0396 40.1279 34.686 40.272C35.9546 40.3921 37.1758 40.208 38.1211 40.0078C39.6021 39.688 39.4995 38.2881 38.9639 38.0322C34.623 35.9678 35.5762 36.8081 34.71 36.1279C36.9155 33.4639 40.2402 30.6958 41.54 21.728C41.6426 21.0161 41.5557 20.5679 41.54 19.9917C41.5322 19.6396 41.6108 19.5039 42.0049 19.4639C43.0923 19.3359 44.1479 19.0317 45.1167 18.4878C47.9292 16.9199 49.064 14.3438 49.3315 11.2559C49.3711 10.7837 49.3237 10.2959 48.8354 10.0479ZM24.3262 37.8398C20.1196 34.4639 18.0791 33.3521 17.2358 33.3999C16.4482 33.4482 16.5898 34.3682 16.7632 34.9678C16.9443 35.5601 17.1812 35.9683 17.5117 36.4878C17.7402 36.832 17.8979 37.3442 17.2832 37.728C15.9282 38.584 13.5728 37.4399 13.4624 37.3838C10.7207 35.7358 8.42822 33.5601 6.81348 30.584C5.25342 27.7197 4.34766 24.6479 4.19775 21.3677C4.1582 20.5757 4.38672 20.2959 5.15869 20.1519C6.17529 19.96 7.22314 19.9199 8.23926 20.0718C12.5327 20.7119 16.1885 22.6719 19.2529 25.7759C21.002 27.5439 22.3252 29.6558 23.6885 31.7202C25.1377 33.9121 26.6978 36 28.6831 37.7119C29.3843 38.312 29.9434 38.7681 30.479 39.104C28.8643 39.2881 26.1699 39.3281 24.3262 37.8398ZM26.3433 24.6001C26.3433 24.248 26.6191 23.9678 26.9658 23.9678C27.0444 23.9678 27.1152 23.9839 27.1782 24.0078C27.2651 24.04 27.3438 24.0879 27.4067 24.1602C27.5171 24.272 27.5801 24.4321 27.5801 24.6001C27.5801 24.9521 27.3042 25.2319 26.9575 25.2319C26.6108 25.2319 26.3433 24.9521 26.3433 24.6001ZM32.6064 27.8799C32.2046 28.0479 31.8027 28.1919 31.4165 28.208C30.8179 28.2397 30.1641 27.9922 29.8096 27.688C29.2583 27.2158 28.8643 26.9521 28.6987 26.1279C28.6279 25.7759 28.6675 25.2319 28.7305 24.9199C28.8721 24.248 28.7144 23.8159 28.2495 23.4238C27.8716 23.104 27.3911 23.0161 26.8633 23.0161C26.666 23.0161 26.4849 22.9277 26.3511 22.856C26.1304 22.7441 25.9492 22.4639 26.1226 22.1201C26.1777 22.0078 26.4458 21.7358 26.5088 21.688C27.2256 21.272 28.0527 21.4077 28.8169 21.7197C29.5259 22.0161 30.0615 22.5601 30.834 23.3281C31.6216 24.2559 31.7632 24.5117 32.2124 25.208C32.5669 25.752 32.8901 26.312 33.1104 26.9521C33.2446 27.3521 33.0713 27.6802 32.6064 27.8799Z";
		var FaviconRunningManager = class {
			ctx;
			originalFaviconHref = null;
			originalFaviconType = "image/svg+xml";
			isRunning = false;
			canvas = null;
			whalePath = null;
			disposeSessionsSub = null;
			mutationObserver = null;
			worker = null;
			workerBlobUrl = null;
			fallbackInterval = null;
			startTime = 0;
			constructor(ctx) {
				this.ctx = ctx;
			}
			start() {
				this.saveOriginalFavicon();
				this.setupWorker();
				this.setupSubscriptions();
				this.check();
			}
			dispose() {
				this.stopAnimation();
				this.restoreOriginalFavicon();
				this.disposeSessionsSub?.();
				this.mutationObserver?.disconnect();
				this.destroyWorker();
			}
			saveOriginalFavicon() {
				if (typeof document === "undefined") return;
				const link = document.querySelector("link[rel*='icon']");
				if (link && link.href) {
					this.originalFaviconHref = link.getAttribute("href") || link.href;
					this.originalFaviconType = link.type || "image/svg+xml";
				} else {
					this.originalFaviconHref = "./favicon.svg";
					this.originalFaviconType = "image/svg+xml";
				}
			}
			restoreOriginalFavicon() {
				if (typeof document === "undefined" || !this.originalFaviconHref) return;
				const links = document.querySelectorAll("link[rel*='icon']");
				if (links.length > 0) links.forEach((link) => {
					link.href = this.originalFaviconHref;
					link.type = this.originalFaviconType;
				});
			}
			/**
			* Set up a dedicated Web Worker timer.
			* Browsers throttle window setTimeout/setInterval to 1000ms in background tabs,
			* but Web Worker timers are exempt from the 1s background tab timer clamp.
			*/
			setupWorker() {
				if (typeof Worker === "undefined" || typeof Blob === "undefined") return;
				try {
					const blob = new Blob([`
        let timer = null;
        self.onmessage = function(e) {
          if (e.data === 'start') {
            if (timer) clearInterval(timer);
            timer = setInterval(function() {
              self.postMessage('tick');
            }, 75);
          } else if (e.data === 'stop') {
            if (timer) {
              clearInterval(timer);
              timer = null;
            }
          }
        };
      `], { type: "application/javascript" });
					this.workerBlobUrl = URL.createObjectURL(blob);
					this.worker = new Worker(this.workerBlobUrl);
					this.worker.onmessage = (e) => {
						if (e.data === "tick" && this.isRunning) this.renderFrame();
					};
				} catch (err) {
					console.warn("[dsh-icon] Dedicated Worker creation failed, using fallback interval", err);
					this.worker = null;
				}
			}
			destroyWorker() {
				if (this.worker) {
					this.worker.terminate();
					this.worker = null;
				}
				if (this.workerBlobUrl) {
					URL.revokeObjectURL(this.workerBlobUrl);
					this.workerBlobUrl = null;
				}
			}
			setupSubscriptions() {
				this.disposeSessionsSub = this.ctx.sessions?.list?.subscribe?.(() => {
					this.check();
				});
				if (typeof MutationObserver !== "undefined" && typeof document !== "undefined") {
					this.mutationObserver = new MutationObserver(() => {
						this.check();
					});
					this.mutationObserver.observe(document.body, {
						attributes: true,
						attributeFilter: [
							"data-running",
							"data-session-running",
							"data-stop-button",
							"aria-label"
						],
						subtree: true,
						childList: true
					});
				}
			}
			check() {
				let running = false;
				const listSnapshot = this.ctx.sessions?.list?.getSnapshot?.();
				const hasSessionState = listSnapshot?.byId !== void 0;
				if (hasSessionState) running = Object.values(listSnapshot.byId).some((s) => s.running === true);
				if (!hasSessionState && !running && listSnapshot?.current) {
					if ((this.ctx.sessions?.binding?.(listSnapshot.current))?.session?.getSnapshot?.()?.running === true) running = true;
				}
				if (!hasSessionState && !running && typeof document !== "undefined") {
					if (document.querySelector("[data-stop-button], button[aria-label*=\"Stop\"], button[aria-label*=\"停止\"], [data-session-running=\"true\"]") !== null) running = true;
				}
				this.updateRunning(running);
			}
			updateRunning(running) {
				if (this.isRunning === running) return;
				this.isRunning = running;
				if (running) this.startAnimation();
				else {
					this.stopAnimation();
					this.restoreOriginalFavicon();
				}
			}
			startAnimation() {
				this.startTime = typeof performance !== "undefined" ? performance.now() : Date.now();
				if (!this.canvas && typeof document !== "undefined") {
					this.canvas = document.createElement("canvas");
					this.canvas.width = 64;
					this.canvas.height = 64;
				}
				if (!this.whalePath && typeof Path2D !== "undefined") try {
					this.whalePath = new Path2D(WHALE_PATH_D);
				} catch (err) {
					console.warn("[dsh-icon] Path2D initialization failed", err);
				}
				this.renderFrame();
				if (this.worker) this.worker.postMessage("start");
				else this.fallbackInterval = setInterval(() => {
					this.renderFrame();
				}, 75);
			}
			stopAnimation() {
				if (this.worker) this.worker.postMessage("stop");
				if (this.fallbackInterval) {
					clearInterval(this.fallbackInterval);
					this.fallbackInterval = null;
				}
			}
			renderFrame() {
				if (!this.canvas) return;
				const ctx = this.canvas.getContext("2d");
				if (!ctx) return;
				const elapsed = ((typeof performance !== "undefined" ? performance.now() : Date.now()) - this.startTime) / 1e3;
				ctx.clearRect(0, 0, 64, 64);
				if (this.whalePath) {
					ctx.save();
					const scale = 36 / 50;
					const offset = (64 - 50 * scale) / 2;
					ctx.translate(offset, offset);
					ctx.scale(scale, scale);
					ctx.fillStyle = "#2b66ff";
					ctx.fill(this.whalePath);
					ctx.restore();
				}
				const angle = elapsed * 3.5 % (2 * Math.PI);
				ctx.save();
				ctx.translate(32, 32);
				ctx.rotate(angle);
				ctx.beginPath();
				ctx.arc(0, 0, 27, 0, 1.25 * Math.PI);
				ctx.strokeStyle = "#00e5ff";
				ctx.lineWidth = 4.5;
				ctx.lineCap = "round";
				ctx.shadowColor = "#00e5ff";
				ctx.shadowBlur = 5;
				ctx.stroke();
				ctx.restore();
				const pulse = (Math.sin(elapsed * 5.2) + 1) / 2;
				ctx.save();
				ctx.beginPath();
				ctx.arc(50, 50, 4.5 + pulse * 1.5, 0, 2 * Math.PI);
				ctx.fillStyle = "#10b981";
				ctx.shadowColor = "#10b981";
				ctx.shadowBlur = 6;
				ctx.fill();
				ctx.restore();
				const dataUrl = this.canvas.toDataURL("image/png");
				this.applyFavicon(dataUrl);
			}
			applyFavicon(dataUrl) {
				if (typeof document === "undefined") return;
				const links = document.querySelectorAll("link[rel*='icon']");
				if (links.length > 0) links.forEach((link) => {
					link.href = dataUrl;
					link.type = "image/png";
				});
				else {
					const link = document.createElement("link");
					link.rel = "icon";
					link.type = "image/png";
					link.href = dataUrl;
					document.head.appendChild(link);
				}
			}
		};
		//#endregion
		//#region src/client/index.ts
		const inject = ["slots", "sessions"];
		function apply(ctx) {
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "dsh-icon:sidebar-expand-hero",
				order: 50
			}, () => react.default.createElement(BlankSessionExpandButton, { ctx })));
			const faviconManager = new FaviconRunningManager(ctx);
			faviconManager.start();
			ctx.effect(() => {
				return () => {
					faviconManager.dispose();
				};
			}, "dsh-icon: favicon running lifecycle");
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map
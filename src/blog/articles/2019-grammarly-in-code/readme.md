# Progressive Rehydration

- Server Side Rendering: An application is rendered on server and the outputted HTML is sent to browser. Browser loads the HTML page and then executes JavaScript which brings interactivity.
- Time to First Paint

The Cost Of Client-side Rehydration

https://addyosmani.com/blog/rehydration/

Rehydration in isomorphic web apps involves re-generating state client-side used to render a page on the server. After rendering HTML, hydration is processing inline JSON state stores client-side (e.g Redux state) for data already in the page and attaching DOM event listeners for the experience.

￼a

Some solutions to the cost of rehydration are:

- Avoid rehydration altogether (purely server render)
- Load and hydrate components based on their visibility
- Hydrate components as soon as users interact with them
- Partial hydration (enable early interaction for some components, while others can use progressive enhancement to add more complexity after initial hydration)

CDN caching of server-rendered HTML.

> The chart talks about TTFB and TTI relative to FCP, but not FCP relative to TTFB... so it misses out on that positive fact that SSR solutions will render faster (https://twitter.com/mikesherov/status/1093842567173718016)

Terminology
Rendering

- SSR: Server-Side Rendering - rendering a client-side or universal app to HTML on the server.
- CSR: Client-Side Rendering - rendering an app in a browser, generally using the DOM.
- Rehydration: “booting up” JavaScript views on the client such that they reuse the server-rendered HTML’s DOM tree and data.
- Prerendering: running a client-side application at build time to capture its initial state as static HTML.
  Performance
- TTFB: Time to First Byte - seen as the time between clicking a link and the first bit of content coming in.
- FP: First Paint - the first time any pixel gets becomes visible to the user.
- FCP: First Contentful Paint - the time when requested content (article body, etc) becomes visible.
- TTI: Time To Interactive - the time at which a page becomes interactive (events wired up, etc).

> Use a road diagram with milestones to display how websites render.

— Server Rendering
— Static Rendering
— Dynamic Rendering (https://developers.google.com/search/docs/guides/dynamic-rendering)
— Client-Side Rendering
— Streaming server rendering and Progressive Rehydration

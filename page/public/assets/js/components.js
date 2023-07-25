class RLHeader extends HTMLElement {
  constructor() {
    // Sempre chame super primeiro no construtor
    super();
    this.attachShadow({ mode: "open" });
    const wrapper = document.createElement("header");

    const title = wrapper.appendChild(document.createElement("h1"));
    title.textContent = "Remote Logger";

    const icon = document.createElement("span");
    icon.innerHTML = ` <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default">
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
  </svg>`;
    const githubLink = wrapper.appendChild(document.createElement("a"));
    githubLink.href = "https://github.com/schirrel/remote-logger";
    githubLink.appendChild(icon);

    const style = document.createElement("style");
    style.textContent = `
    header {
        height: 50px;
        display: flex;
        align-items: center;
        background: #ffaf23;
        display: flex;
        padding: 0 8px;
        justify-content: space-between
    }
     h1 {
        font-weight: bold;
        letter-spacing: 8px;
        margin: 0;
        padding: 0
    }
    svg {
        transition: fill 400ms ease-in-out;
        will-change: color;
    }
    a:hover  svg {
        fill: white
    }`;
    this.shadowRoot.append(style, wrapper);
  }
}

class RLLink extends HTMLElement {
  constructor() {
    // Sempre chame super primeiro no construtor
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    const anchorLink = document.createElement("a");
    console.log(this.getAttribute("href"));
    anchorLink.href = this.getAttribute("href");
    anchorLink.innerHTML = "<slot/>";
    style.textContent = `
      a {
        color: white;
        border-bottom: 1px solid #ffaf23;
        text-decoration: none;
        padding: 0 4px;
        transition: color 300ms ease-in-out, border 300ms ease-in-out,
          padding 300ms ease-in-out;
        will-change: color, border, padding;
      }
      
      a:hover {
        color: #ffaf23;
        border-color: white;
        padding: 0 10px;
      }
      `;
    this.shadowRoot.append(style, anchorLink);
  }
}
class RLFooter extends HTMLElement {
  constructor() {
    // Sempre chame super primeiro no construtor
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    const wrapper = document.createElement("footer");

    const howToUseLink = wrapper.appendChild(document.createElement("rl-link"));
    howToUseLink.href =
      "https://github.com/schirrel/remote-logger/tree/main#usage";
    howToUseLink.textContent = "Docs";

    const sdkLink = wrapper.appendChild(document.createElement("rl-link"));
    sdkLink.href =
      "https://github.com/schirrel/remote-logger/blob/main/lib/remote-logger.min.js";
    sdkLink.textContent = "Download SDK";

    if (this.hasAttribute("show-new-log")) {
      const newLogLink = wrapper.appendChild(document.createElement("rl-link"));
      newLogLink.href = "https://remote-logger.web.app";
      newLogLink.textContent = "Generate New Id";
    }
    const style = document.createElement("style");
    style.textContent = `
      footer {
        height: 50px;
        display: flex;
        align-items: center;
        background: #1f4369;
        justify-content: center;
        gap: 16px
      }
      `;
    this.shadowRoot.append(style, wrapper);
  }
}

customElements.define("rl-footer", RLFooter);
customElements.define("rl-header", RLHeader);
customElements.define("rl-link", RLLink);

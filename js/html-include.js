class HTMLInclude extends HTMLElement {
    constructor(src) {
        super();
        this.attachShadow({mode: "open"});
        if (src) { 
            this.textContent = src;
        }
        setTimeout(() => this._load());
    }
    async _load() {
        let src = this.textContent.trim();

        if (!src) {
            throw new Error("URL missing between <html-import> tags.");
        } 
        // Adjust for local file paths
        if (src.startsWith('/')) {
            src = '.' + src; // Convert to relative path
        }
        let rsp = await fetch(src);

        if (rsp.status != 200) {
            throw new Error(`Failed to load file (${src}) for <html-import>.`);
        }
        this.shadowRoot.innerHTML = await rsp.text();


        // Apply external styles to the shadow dom
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', '/stylesheets/main.css');

        // Attach the created element to the shadow dom
        this.shadowRoot.appendChild(linkElem);
    }
}
customElements.define("html-include", HTMLInclude);

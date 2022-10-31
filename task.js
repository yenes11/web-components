export default class Task extends HTMLElement {
  template = document.createElement('template');
  
  constructor() {
    super();
    const style = document.createElement("style");
    style.textContent = CSS;

    // Adding shodowroot for encapsulation
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(style)
    
    // Creating HTML elements and setting attirbutes
    const container = document.createElement('div');
    container.setAttribute('class', 'container');

    const checked = document.createElement('div');
    checked.setAttribute('id', 'checked');

    const main = document.createElement('div');
    main.setAttribute('class', 'main');
    
    const title = document.createElement('h3');
    title.setAttribute('id', 'title');
    
    const description = document.createElement('p');
    description.setAttribute('id', 'description');

    // Stacking the HTML elements we created
    main.appendChild(title);
    main.appendChild(description);
    container.appendChild(checked);
    container.appendChild(main);

    this.template.content.appendChild(container);

    
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  get id() {
    return this.getAttribute('id');
  }

  get title() {
    return this.getAttribute('title');
  }

  get description() {
    return this.getAttribute('description');
  }

  get checked() {
    return this.getAttribute('checked');
  }

  set checked(val) {
    this.setAttribute('checked', val);
  }

  static get observedAttributes() {
    return ['title', 'description', 'checked'];
  }

  connectedCallback() {
    const container = this.shadowRoot.querySelector('.container');

    container.addEventListener('click', () => {
      if (this.checked === 'true')
        this.checked = false;
      else
        this.checked = true;

      fetch("https://flexxter.de/Tasks/Save",
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            id: this.id,
            title: this.title,
            description: this.description,
            checked: this.checked
          })
      })
    });
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'checked') {
      this.shadowRoot.getElementById(attrName).style.backgroundColor = newValue === 'true' ? '#27ae60' : '#cbd1de';
    }
    else
      this.shadowRoot.getElementById(attrName).innerText = newValue;
  }
}

window.customElements.define('task-item', Task);

const CSS = `
  .container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: #FFF;
    margin-bottom: .5em;
    border-radius: 5px;
    padding: 1em;
    gap: 1em;
  }
  #checked {
    min-height: 50px;
    min-width: 50px;
    background-color: green;
    border-radius: 50%;
    border: 1px solid grey;
  }
`;
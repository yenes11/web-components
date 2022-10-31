import Task from './task.js';

export default class TaskList extends HTMLElement {
  template = document.createElement('template');

  constructor() {
    super();
    const style = document.createElement("style");
    style.textContent = CSS;

    // Adding shodowroot for encapsulation
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(style)
    
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    
    this.template.content.appendChild(container);

    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  connectedCallback() {
    const container = this.shadowRoot.querySelector('.container');

    fetch('https://flexxter.de/Tasks/Get')
      .then(res => res.json())
        .then(data => {
          for (const task of data.tasks) {
            const currentTask = document.createElement('task-item');
            setAttributes(currentTask, task);
            container.appendChild(currentTask);
          }
        })

    this.shadowRoot.appendChild(this.template.content);
  }
}

window.customElements.define('task-list', TaskList);

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

const CSS = `
  .container {
    display: block;
    margin: auto;
    max-width: 40em;
  }
`;
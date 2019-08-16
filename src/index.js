/* GLOBAL VARIABLES
▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇*/ 
const app = document.querySelector("#app");
const settings = document.querySelector("#settingsSelectMenu");

/* FUNCTIONS
▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇*/ 

/* Check Status  
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃ */
const checkStatus = response => response.status === 200 ? response : Promise.reject(new Error(response.statusText));

/* Get JSON
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃ */
const getJSON = response => response.json();

/* Format HTML (Templates)
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃ */
function formatHTML(json) {
  
  /* LEVEL 1 (App)
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */
  const appTEMPLATE = app => `
    ${app.app ? botTEMPLATE(app.app) : ""}
  `;
  
  /* LEVEL 2 (PT)
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */
  const botTEMPLATE = bot => bot.map(bot => `
      ${bot.botSettings ? settingsTEMPLATE(bot.botSettings) : ""}
      `
   ).join("");
  


  /* LEVEL 3 (Settings)
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */
  const settingsTEMPLATE = settings => settings.map(settings => `
    <article class="code-container">
      ${settings.settingsCodes ? codeTEMPLATE(settings.settingsCodes) : "" }
    </article>

    <article class="controls-container">
      ${settings.settingsControls ? controlsTEMPLATE(settings.settingsControls) : "" }
    </article>
    `
  ).join("");



  /* LEVEL 4 (Code)
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */
  const codeTEMPLATE = codes => codes.map(code => `
    <section class="code">
      <code id="${code.codeId}" class="scrollbar">
        ${code.codeLines ? linesTEMPLATE(code.codeLines) : ""}
      </code>
      
      <button class="mdc-fab mini-fab material-icons" aria-label="content_copy">
        <div data-clipboard-action="copy" data-clipboard-target="#${code.codeId}">
          <span class="mdc-fab__icon">
            content_copy
          </span>
        </div>
      </button>

    </section>`
  ).join("");


/* LEVEL 5 (Code Lines)
⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */
const linesTEMPLATE = lines => lines.map(line => `
<pre id="${line.lineId}" data-focus="${line.lineBind}" ${ line.lineOption ? line.lineOption : ''}><span>${ line.lineOption == 'disabled' ? '# ' : ''}<b class="code-key">${line.lineKey}</b><i class="code-equal"> = </i><span class="code-value" data-update="${line.lineBind}">${ line.lineValue ? line.lineValue : ''}</span></span></pre>`
).join("");


  /* LEVEL 4 (Controls)
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */
  const controlsTEMPLATE = controls => controls.map(control => `
    <section class="controls" data-mdc-auto-init="MDCRipple"
            data-count 
            data-count--checked=".checked" 
            data-count--total=".total" 
            data-count--percent=".percent" data-count--chart="bar">

      <nav class="mdc-list mdc-list--two-line mdc-list--avatar-list tab-container" title="${ controls.labelMessage ? controls.labelMessage : ''}">
      
        <!-- graphic -->
        <span class="mdc-list-item__graphic graphic-container" role="presentation">
          <img src="images/icons/${control.controlIcon}" class="material-icons" alt="${control.controlLabel}">
        </span>
        
        <!-- title -->
        <section class="title-container">
          <div class="title">
            <h3 class="mdc-list-item__text">${control.controlLabel}</h3>
            <div class="stats-container mdc-list-item__secondary-text">
              <span class="checked">0</span>
              <span>of</span>
              <span class="total">0</span>
            </div>
          </div> 
          <div class="graph">
            <i class="meter"></i>
          </div>
        </section>
        
        <!-- percent -->
        <b class="percent">0</b>
      </nav>
        
      <form id="${control.controlId}" class="scrollbar">
        <div class="form-container">      
          ${control.controlGroups ? groupTEMPLATE(control.controlGroups) : ""}
        </div>
      </form>
    </section>`
  ).join("");
  
  /* LEVEL 5 (Group)
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */
  const groupTEMPLATE = groups => groups.map(group =>`
    <div id="${group.groupId}" class="mdc-list-group" title="${ group.labelMessage ? group.labelMessage : ''}">
      <h4 class="mdc-list-group__subheader">${group.groupLabel}</h4>
      ${group.groupInputs ? formTEMPLATE(group.groupInputs) : ''}
    </div>`
  ).join("");
  
  /* LEVEL 6 (Form)
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */
  const formTEMPLATE = form => form.map(input => `
    <section class="input-container input-container--${input.inputType}">
      ${typeMap[input.inputType](input)}
    </section>
  `).join("");
  
  /* ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ LEVEL 7 (Inputs) ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */  
  
  /* Textfield
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */
  const textfieldTEMPLATE = text => `
  <div class="${text.inputClass ? text.inputClass : ''}" data-mdc-auto-init="MDCTextField" title="${ text.labelMessage ? text.labelMessage : ''}">
      <input type="${text.inputType}" 
             id="${text.inputId}" 
             class="mdc-text-field__input"
             aria-controls="${text.inputId}" 
             name="${text.inputName}" 
             value="${text.inputValue ? text.inputValue : ''}" 
             data-bind="${text.inputId}" 
             autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" ${text.inputOption ? text.inputOption : ''}>

      <div class="mdc-line-ripple"></div>
      <label class="mdc-floating-label" for="${ text.inputId }">${text.labelText}</label>
      <i class="material-icons mdc-text-field__label" style="left: auto; bottom: 6px; right: calc(100% + 4px);">${ text.labelIcon ? text.labelIcon : '' }</i>
      <a href="${text.labelLink}" class="material-icons wiki-link" tabindex="-1" target="iframe">open_in_new</a>
  </div>
  `;
  
  /* Slider
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */
  const sliderTEMPLATE = slider => `
  <div title="${ slider.labelMessage ? slider.labelMessage : ''}">
    <h5 class="wiki-wrapper"><span>${slider.labelText}</span><a href="${slider.labelLink}" class="material-icons wiki-link" tabindex="-1" target="iframe">open_in_new</a></h5>
    <div class="${slider.inputClass ? slider.inputClass : ''}" 
         tabindex="0" 
         role="slider" 
         aria-valuemin="${slider.inputMin ? slider.inputMin : ''}" 
         aria-valuemax="${slider.inputMax ? slider.inputMax : ''}" 
         data-step="${slider.inputStep ? slider.inputStep : ''}" 
         aria-valuenow="${slider.inputValue ? slider.inputValue : ''}" 
         aria-label="${slider.labelText ? slider.labelText : ''}" 
         id="${slider.inputId}" 
         data-bind="${slider.inputId}" 
         ${slider.inputOption ? 'aria-disabled="true"' : ''} 
         data-mdc-auto-init="MDCSlider">

        <div class="mdc-slider__track-container">
            <div class="mdc-slider__track"></div>
            <div class="mdc-slider__track-marker-container"></div>
        </div>
        
        <div class="mdc-slider__thumb-container">
            <div class="mdc-slider__pin">
                <span class="mdc-slider__pin-value-marker"></span>
            </div>
            <svg class="mdc-slider__thumb" width="21" height="21">
                <circle cx="10.5" cy="10.5" r="7.875"></circle>
            </svg>
            <div class="mdc-slider__focus-ring"></div>
        </div>
    </div>
  </div>
  `;


  
  
  /* Select Menu
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */ 
  const selectTEMPLATE = select => `
    <div class="${select.inputClass ? select.inputClass : ''}" title="${ select.labelMessage ? select.labelMessage : ''}" ${select.inputOption ? select.inputOption : ''} data-mdc-auto-init="MDCSelect">
      <select id="${select.inputId}" data-bind="${select.inputId}" class="mdc-select__native-control">
        ${selectOptionTEMPLATE(select)}
      </select>
      
      <div class="mdc-select__label mdc-select__label--float-above" for="${select.inputId}">${select.labelText}</div>
      <div class="mdc-select__bottom-line"></div>
      <a href="${select.labelLink}" class="material-icons wiki-link" tabindex="-1" target="iframe">open_in_new</a>
    </div>
  `;
  



  /* Select Option
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */
  const selectOptionTEMPLATE = options => options.inputCollection.map(option => `
    <option 
      id="${option.collectionInputId}" 
      data-bind="${option.collectionInputBind}" 
      class="${option.collectionInputClass ? option.collectionInputClass : ''}" 
      name="${option.collectionInputName}" 
      value="${option.collectionInputValue}" 
      ${option.collectionInputOption || ""}>
      ${option.collectionLabelText}
    </option>
  `).join("");
  
  
   /* Radio Option
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */
  const switchTEMPLATE = switches => `
    <div class="mdc-form-field" title="${ switches.labelMessage ? switches.labelMessage : ''}">
      <div class="${switches.inputClass ? switches.inputClass : ''}">
        <input type="checkbox" id="${switches.inputId}" class="mdc-switch__native-control" data-bind="${switches.inputId}" ${switches.inputOption ? switches.inputOption : ''} />
        <div class="mdc-switch__background">
          <div class="mdc-switch__knob"></div>
        </div>
      </div>
      <h5 class="wiki-wrapper">
        <label for="${switches.inputId}" class="mdc-switch-label">${switches.labelText}</label>
        <a href="${switches.labelLink}" class="material-icons wiki-link" tabindex="-1" target="iframe">open_in_new</a>
      </h5>
    </div>
  `;

  /* Radio Group
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */ 
  const radioTEMPLATE = radio => `
    <h5>${radio.labelText}</h5>
    ${radioGroupTEMPLATE(radio)}
  `;
  
  /* Radio Option
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */
  const radioGroupTEMPLATE = radios => radios.inputCollection.map(radio => `
    <div class="mdc-form-field" title="${ switches.labelMessage ? switches.labelMessage : ''}">
      <div class="mdc-radio ${radio.collectionInputClass}" data-mdc-auto-init="MDCRadio">
        <input type="radio" class="mdc-radio__native-control" id="${radio.collectionInputId}" data-bind="${radio.collectionInputId}" name="${radio.collectionInputName}" ${radio.collectionInputOption || ""}>
        <div class="mdc-radio__background">
          <div class="mdc-radio__outer-circle"></div>
          <div class="mdc-radio__inner-circle"></div>
        </div>
      </div>
      <label for="${radio.collectionInputId}">${radio.collectionLabelText}</label>
    </div>
  `).join("");
  
  
  /* Checkbox Group
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */ 
  const checkboxTEMPLATE = checkbox => `
    <h5>${checkbox.labelText}</h5>
    ${checkboxGroupTEMPLATE(checkbox)}
  `;
  
  /* Checkbox Option
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */
  const checkboxGroupTEMPLATE = checkboxes => checkboxes.inputCollection.map(checkbox => `
    <div class="mdc-form-field" title="${ checkbox.labelMessage ? checkbox.labelMessage : ''}">
      <div class="mdc-checkbox ${checkbox.collectionInputClass}" data-mdc-auto-init="MDCCheckbox">
        <input type="checkbox" class="mdc-checkbox__native-control" id="${checkbox.collectionInputId}" data-bind="${checkbox.collectionInputId}" name="${checkbox.collectionInputName}" ${checkbox.collectionInputOption || ""}>
        <div class="mdc-checkbox__background">
          <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
            <path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
          </svg>
          <div class="mdc-checkbox__mixedmark"></div>
        </div>
      </div>
      <label for="${checkbox.collectionInputId}">${checkbox.collectionLabelText}</label>
    </div>
  `).join("");
  
  
  /* ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */  
  
  /* Type Map
  ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ */
  const typeMap = {
    text: textfieldTEMPLATE,
    select: selectTEMPLATE,
    switch: switchTEMPLATE,
    radio: radioTEMPLATE,
    checkbox: checkboxTEMPLATE,
    slider: sliderTEMPLATE
  };

  return json.map(appTEMPLATE).join("");
}

/* Error JSON
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃ */
const errorFunction = e => console.log(e.message);

/* PROMISE
▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇*/ 
function renderHTML(data, $el) {
  fetch(data, {})
    .then(checkStatus)
    .then(getJSON)
    .then(formatHTML)
    .then(newHTML => $el.innerHTML = newHTML)
    .then(mdcInitialize => mdc.autoInit())
    .then(dataChart => dataCHART())
    .then(dataCount => dataCOUNT())
    .then(countEvent => countEVENT())
    .then(copyPaste => clipboard())
    .then(dataBind => dataBIND())
    .then(toolTip => toolTIP())
    .then(hoverFx => hoverFX())
    .then(focusFx => focusFX())
    // .then(dialogBox => dialogBOX())
    .catch(errorFunction);
}


/* RUN FUNCTIONS
▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇*/ 
renderHTML(settings.value, app);

// Listen for change
settings.addEventListener("change", function() {

  if (this.value == 'data/blank-settings.json') {
    renderHTML(settings.value, app);
  }

  else {
    renderHTML(settings.value, app);
  }

}, true);
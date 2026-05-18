class Tooltip {
  #TooltipAttributeValue;
  #AttributeService;
  #ValueService;
  #Tooltip;
  #Text;

  constructor(attribute, valueAttr = "title", valueService = "mostrar") {
    this.#AttributeService = attribute;
    this.#TooltipAttributeValue = valueAttr;
    this.#ValueService = valueService;

    this.#Tooltip = document.createElement("div");
    this.#Text = document.createElement("p");
    this.#Tooltip.appendChild(this.#Text);
 
    document.addEventListener("mousemove", this.#ListeningElements.bind(this));
  }

  #ListeningElements(event) {
    const elem = document.elementFromPoint(event.clientX, event.clientY);
    if (!elem) return;

    if (elem.getAttribute(this.#AttributeService) === this.#ValueService) {
      this.TooltipChangeText(elem.getAttribute(this.#TooltipAttributeValue));
      this.TooltipOpen();
    } else {
      this.TooltipClose();
    }
  }

  TooltipChangeText(text) {
    this.#Text.textContent = text;
  } 
  TooltipOpen() {
    if (!document.body.contains(this.#Tooltip)) {
      document.body.appendChild(this.#Tooltip);
    }
  } 
  TooltipClose() {
    if (document.body.contains(this.#Tooltip)) {
      document.body.removeChild(this.#Tooltip);
    }
  }
}  

class Menus {

  constructor (refElem, entries, className, onSelectCallback, offsetX = 0, offsetY = 0) {
    let self = this;

    let menuElem = document.createElement("div");
    menuElem.className = className + " show";

    if (offsetX !== 0) {
      menuElem.style.marginLeft = offsetX + "px";
    }

    if (offsetY !== 0) {
      menuElem.style.marginTop = offsetY + "px";
    }

    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i];

      let dropItem = document.createElement("div");

      if (entry === Menus.SEPARATOR) {
        dropItem.className = "hr";
      } else {
        dropItem.className = "drop-item";

        if (Array.isArray(entry)) {
         dropItem.innerHTML = entry[0] + ` <i class="fa fa-caret-right" aria-hidden="true"></i>`;

          dropItem.onmouseenter = (event) => {
            Menus.dropDownRight(dropItem, entry.slice(1), onSelectCallback);
          };

          dropItem.onmouseleave = (event) => {
            dropItem.innerHTML = entry[0] + ` <i class="fa fa-caret-right" aria-hidden="true"></i>`;
          };
        } else {
          dropItem.innerHTML = Object.keys(entry)[0];

          dropItem.onclick = (event) => {

            // if we have nested menu
            if (offsetX !== 0 || offsetY !== 0) {
              menuElem.parentElement.parentElement.remove();
            } else {
              menuElem.remove();
            }

            onSelectCallback(entry[Object.keys(entry)[0]]);
            event.stopPropagation();
          };
        }
      }

      menuElem.appendChild(dropItem);

    }

    refElem.appendChild(menuElem);

    // if menu is running out of right screen then move it to left
    if (getElementPosition(menuElem).x + menuElem.clientWidth > document.body.clientWidth) {
      menuElem.style.marginLeft = '-' + (((getElementPosition(menuElem).x + menuElem.clientWidth) - document.body.clientWidth) + 20) + 'px';
    }

    let counter = 0;
    let removeMenuHandler = (event) => {
      counter++;

      // filter out out first initial menu click
      if (counter >= 2) {
        //console.log(event);

        try {
          menuElem.remove();
        } catch (e) {
          // Nothing
        }

        document.removeEventListener("click", removeMenuHandler);
      }
    };

    document.addEventListener("click", removeMenuHandler);
  }

  static dropUp (refElem, entries, onSelectCallback) {
    return new Menus(refElem, entries, 'dropup-content', onSelectCallback);
  }

  static dropDown (refElem, entries, onSelectCallback) {
    return new Menus(refElem, entries, 'dropdown-content', onSelectCallback);
  }

  static dropDownRight(refElem, entries, onSelectCallback) {
    return new Menus(refElem, entries, 'dropdown-content', onSelectCallback, refElem.clientWidth - 18, -21);
  }

}

Menus.SEPARATOR = "Menus.separator";

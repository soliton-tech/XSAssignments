/* create HTML elements */
export function createDivElement(className){
    let div = document.createElement("div");
    div.className = className;
    return div;
}

export function createParagraphElement(className,text){
    let p = document.createElement("p");
    p.className = className;
    p.appendChild(document.createTextNode(text));
    return p;
}

export function createImageElement(src,alt,className){
    let img = document.createElement("img");
    img.classList.add(...className);
    img.src = src;
    img.alt = alt;
    return img;
}

let theme = {
  redColor: 90,
  greenColor: 219,
  blueColor: 196,

  get getRedColor(){
    return this.redColor;
  },
  
  get getGreenColor(){
    return this.greenColor;
  },
  
  get getBlueColor(){
    return this.blueColor;
  },

  set setRed(value){
    this.redColor=value;
  },
  set setGreen(value){
    this.greenColor=value;
  },
  set setBlue(value){
    this.blueColor=value;
  },

}

const tagData = [
  {
    tagName: "div",
    keyword: ["block"],
  },
  {
    tagName: "p",
    keyword: ["block"],
  },
  {
    tagName: "span",
    keyword: ["inline"],
  },
  {
    tagName: "a",
    keyword: ["inline"],
  },
  {
    tagName: "img",
    keyword: ["inline"],
  },
  {
    tagName: "ul",
    keyword: ["block"],
  },
  {
    tagName: "ol",
    keyword: ["block"],
  },
  {
    tagName: "li",
    keyword: ["block"],
  },
  {
    tagName: "header",
    keyword: ["block", "semantic"],
  },
  {
    tagName: "nav",
    keyword: ["block", "semantic"],
  },
  {
    tagName: "main",
    keyword: ["block", "semantic"],
  },
  {
    tagName: "aside",
    keyword: ["block", "semantic"],
  },
  {
    tagName: "section",
    keyword: ["block", "semantic"],
  },
  {
    tagName: "article",
    keyword: ["block", "semantic"],
  },
  {
    tagName: "footer",
    keyword: ["block", "semantic"],
  },
  {
    tagName: "summary",
    keyword: ["block", "semantic"],
  },
  {
    tagName: "details",
    keyword: ["block", "semantic"],
  },
  {
    tagName: "figure",
    keyword: ["block", "semantic"],
  },
  {
    tagName: "figcaption",
    keyword: ["block", "semantic"],
  },
  {
    tagName: "mark",
    keyword: ["inline", "semantic"],
  },
  {
    tagName: "h1",
    keyword: ["block"],
  },
  {
    tagName: "h2",
    keyword: ["block"],
  },
  {
    tagName: "h3",
    keyword: ["block"],
  },
  {
    tagName: "h4",
    keyword: ["block"],
  },
  {
    tagName: "h5",
    keyword: ["block"],
  },
  {
    tagName: "h6",
    keyword: ["block"],
  },
  {
    tagName: "fieldset",
    keyword: ["block"],
  },
  {
    tagName: "form",
    keyword: ["block"],
  },
  {
    tagName: "label",
    keyword: ["inline"],
  },
  {
    tagName: "input",
    keyword: ["block"],
  },
  {
    tagName: "button",
    keyword: ["block"],
  },
  {
    tagName: "select",
    keyword: ["block"],
  },
  {
    tagName: "strong",
    keyword: ["inline"],
  },
  {
    tagName: "b",
    keyword: ["inline"],
  },
  {
    tagName: "i",
    keyword: ["inline"],
  },
  {
    tagName: "em",
    keyword: ["inline"],
  },
  {
    tagName: "u",
    keyword: ["inline"],
  },
  {
    tagName: "textarea",
    keyword: ["block"],
  },
  {
    tagName: "address",
    keyword: ["block"],
  },
  {
    tagName: "small",
    keyword: ["inline"],
  },
  {
    tagName: "dl",
    keyword: ["block"],
  },
  {
    tagName: "dt",
    keyword: ["block"],
  },
  {
    tagName: "dd",
    keyword: ["block"],
  },
  {
    tagName: "iframe",
    keyword: ["block"],
  },
  {
    tagName: "sup",
    keyword: ["inline"],
  },
  {
    tagName: "abbr",
    keyword: ["inline"],
  },
  {
    tagName: "code",
    keyword: ["inline"],
  },
];

let theme = {
  redColor: 220,
  greenColor: 239,
  blueColor: 253,

  setColor(red, green, blue){
    this.redColor = red;
    this.greenColor = green;
    this.blueColor = blue;
  }
}

const colorMatch = {};

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
    tagName: "hgroup",
    keyword: ["block"],
  },
  {
    tagName: "strong",
    keyword: ["inline"],
  },
  {
    tagName: "em",
    keyword: ["inline"],
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
    keyword: ["inline"],
  },
  {
    tagName: "button",
    keyword: ["inline"],
  },
  {
    tagName: "select",
    keyword: ["inline"],
  },
  {
    tagName: "textarea",
    keyword: ["inline"],
  },
  {
    tagName: "q",
    keyword: ["inline"],
  },
  {
    tagName: "blockquote",
    keyword: ["block"],
  },
  {
    tagName: "cite",
    keyword: ["inline"],
  },
  {
    tagName: "hr",
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
    tagName: "video",
    keyword: ["inline"],
  },
  {
    tagName: "audio",
    keyword: ["inline"],
  },
  {
    tagName: "iframe",
    keyword: ["inline"],
  },
  {
    tagName: "table",
    keyword: ["block"],
  },
  {
    tagName: "caption",
    keyword: ["block"],
  },
  {
    tagName: "colgroup",
    keyword: ["block"],
  },
  {
    tagName: "col",
    keyword: ["block"],
  },
  {
    tagName: "thead",
    keyword: ["block"],
  },
  {
    tagName: "tbody",
    keyword: ["block"],
  },
  {
    tagName: "tfoot",
    keyword: ["block"],
  },
  {
    tagName: "tr",
    keyword: ["block"],
  },
  {
    tagName: "th",
    keyword: ["block"],
  },
  {
    tagName: "td",
    keyword: ["block"],
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
    tagName: "u",
    keyword: ["inline"],
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
    tagName: "pre",
    keyword: ["block"],
  },
  {
    tagName: "code",
    keyword: ["inline"],
  },
];
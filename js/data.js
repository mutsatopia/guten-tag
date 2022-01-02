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
    gridY: 1,
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
    gridY: 2,
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
    gridY: 5,
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
    tagName: "details",
    keyword: ["block", "semantic"],
  },
  {
    tagName: "summary",
    keyword: ["block", "semantic"],
    gridY: 2,
  },
  {
    tagName: "figure",
    keyword: ["block", "semantic"],
    gridY: 5,
  },
  {
    tagName: "figcaption",
    keyword: ["block", "semantic"],
    gridY: 1,
  },
  {
    tagName: "mark",
    keyword: ["inline", "semantic"],
    gridY: 2,
  },
  {
    tagName: "h1",
    keyword: ["block"],
    gridY: 2,
  },
  {
    tagName: "h2",
    keyword: ["block"],
    gridY: 2,
  },
  {
    tagName: "h3",
    keyword: ["block"],
    gridY: 2,
  },
  {
    tagName: "h4",
    keyword: ["block"],
    gridY: 2,
  },
  {
    tagName: "h5",
    keyword: ["block"],
    gridY: 2,
  },
  {
    tagName: "h6",
    keyword: ["block"],
    gridY: 2,
  },
  {
    tagName: "hgroup",
    keyword: ["block"],
  },
  {
    tagName: "strong",
    keyword: ["inline"],
    gridX: 15,
    gridY: 1,
  },
  {
    tagName: "em",
    keyword: ["inline"],
    gridX: 15,
    gridY: 1,
  },
  {
    tagName: "fieldset",
    keyword: ["block"],
    gridY: 5,
  },
  {
    tagName: "legend",
    keyword: ["block"],
    gridY: 1,
  },
  {
    tagName: "form",
    keyword: ["block"],
  },
  {
    tagName: "label",
    keyword: ["inline"],
    gridY: 2,
  },
  {
    tagName: "input",
    keyword: ["inline"],
    gridY: 2,
  },
  {
    tagName: "button",
    keyword: ["inline"],
    gridY: 2,
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
    gridX: 15,
    gridY: 1,
  },
  {
    tagName: "blockquote",
    keyword: ["block"],
  },
  {
    tagName: "cite",
    keyword: ["inline"],
    gridY: 1,
  },
  {
    tagName: "hr",
    keyword: ["block"],
    gridY: 1,
  },
  {
    tagName: "address",
    keyword: ["block"],
  },
  {
    tagName: "small",
    keyword: ["inline"],
    gridY: 1,
  },
  {
    tagName: "dl",
    keyword: ["block"],
  },
  {
    tagName: "dt",
    keyword: ["block"],
    gridY: 1,
  },
  {
    tagName: "dd",
    keyword: ["block"],
    gridY: 1,
  },
  {
    tagName: "video",
    keyword: ["inline"],
    gridX: 9,
    gridY: 4,
  },
  {
    tagName: "audio",
    keyword: ["inline"],
    gridY: 2,
  },
  {
    tagName: "iframe",
    keyword: ["inline"],
    gridX: 11,
  },
  {
    tagName: "table",
    keyword: ["block"],
  },
  {
    tagName: "caption",
    keyword: ["block"],
    gridY: 1,
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
    gridY: 1,
  },
  {
    tagName: "b",
    keyword: ["inline"],
    gridY: 1,
  },
  {
    tagName: "i",
    keyword: ["inline"],
    gridY: 1,
  },
  {
    tagName: "u",
    keyword: ["inline"],
    gridY: 1,
  },
  {
    tagName: "var",
    keyword: ["inline"],
    gridY: 2,
  },
  {
    tagName: "sup",
    keyword: ["inline"],
    gridY: 1,
  },
  {
    tagName: "abbr",
    keyword: ["inline"],
    gridY: 1,
  },
  {
    tagName: "pre",
    keyword: ["block"],
  },
  {
    tagName: "code",
    keyword: ["inline"],
    gridY: 1,
  },
];

const gridMatch = {};
tagData.forEach(({ tagName, gridX, gridY }) => {
  gridMatch[tagName] = {
    gridX: gridX ?? 7,
    gridY: gridY ?? 3
  };
});
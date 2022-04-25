let datatable = {
  view: "datatable",
  id: "mydata",
  scrollX: false,
  scrollY: true,
  columns: [
    { id: "id", header: "", width: 50, css: "gray", sort: "int" },
    {
      id: "title",
      header: ["Film title", { content: "textFilter" }],
      fillspace: true,
      sort: "string",
    },
    {
      id: "categoryId",
      collection: options,
      header: ["Category", { content: "textFilter" }],
      sort: "string",
    },
    {
      id: "votes",
      header: ["Votes", { content: "textFilter" }],
      sort: "int",
    },
    {
      id: "rating",
      header: ["Rating", { content: "textFilter" }],
      sort: "int",
    },
    {
      id: "rank",
      header: ["Rank", { content: "textFilter" }],
      sort: "int",
    },
    {
      id: "year",
      header: "Year",
      sort: "int",
    },
    { id: "del", header: "", template: "{common.trashIcon()}" },
  ],
  onClick: {
    "wxi-trash": function (event, id) {
      this.remove(id);
      return false;
    },
  },
  url: "data.js",
  select: true,
  hover: "myhover",
  scheme: {
    $init: function (obj) {
      this.each(function (obj) {
        return (obj.categoryId = (
          Math.floor(Math.random() * 4) + 1
        ).toString());
      });
    },
  },
};

let today = new Date();

let form = {
  view: "form",
  id: "myform",
  maxWidth: 300,
  elements: [
    { type: "section", template: "Edit Films" },
    {
      view: "text",
      label: "Title",
      height: 50,
      name: "title",
      invalidMessage: "Enter a title",
    },
    {
      view: "text",
      type: "number",
      label: "Year",
      height: 50,
      name: "year",
      invalidMessage: "Enter a year between 1970 and current",
    },
    {
      view: "text",
      label: "Rating",
      height: 50,
      name: "rating",
      invalidMessage: "Enter a number except 0",
    },
    {
      view: "text",
      label: "Votes",
      height: 50,
      name: "votes",
      invalidMessage: "Enter a number less than 100000",
    },
    {
      margin: 15,
      cols: [
        {
          view: "button",
          value: "Clear",
          click: function () {
            webix
              .confirm({
                title: "Form will be cleared",
                text: "Do you still want to continue?",
              })
              .then(function () {
                const form = $$("myform");
                form.clear();
                form.clearValidation();
              });
          },
        },
      ],
    },
    { view: "spacer" },
  ],
  // rules: {
  //   title: webix.rules.isNotEmpty,
  //   year: function (value) {
  //     return value >= 1970 && value <= today.getFullYear();
  //   },
  //   rating: function (value) {
  //     return value != 0 && webix.rules.isNotEmpty(value);
  //   },
  //   votes: function (value) {
  //     return value < 100000;
  //   },
  // },
};

let tabs = {
  view: "segmented",
  id: "selector",
  options: [
    { id: 1, value: "All" },
    { id: 2, value: "Old" },
    { id: 3, value: "Modern" },
    { id: 4, value: "New" },
  ],
  on: {
    onChange: function () {
      $$("mydata").filterByAll();
    },
  },
};

export { datatable, form, tabs };

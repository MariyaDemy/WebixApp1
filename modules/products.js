let treetable = {
  view: "treetable",
  id: "treetable",
  editable: true,
  select: "cell",
  columns: [
    { id: "id", header: "" },
    {
      id: "title",
      header: "Title",
      template: "{common.treetable()} #title#",
      fillspace: true,
      editor: "text",
    },
    {
      id: "price",
      header: "Price",
      fillspace: true,
      editor: "text",
    },
  ],
  rules: {
    title: webix.rules.isNotEmpty,
    price: webix.rules.isNumber,
  },
  scrollX: false,
  url: "products.js",
  ready: function () {
    this.openAll();
  },
};

export { treetable };

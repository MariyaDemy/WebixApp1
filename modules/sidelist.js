let list = {
  view: "list",
  scroll: false,
  maxWidth: 200,
  select: true,
  on: {
    onAfterSelect: function (id) {
      $$(id).show();
    },
  },
  ready: function () {
    const id = this.getFirstId();
    this.select(id);
  },
  data: ["Dashboard", "Users", "Products", "Admin"],
};

let label = {
  view: "label",
  label: "<span class='webix_icon wxi-check'></span> Connected",
  css: "greenLabel",
};

export { list, label };

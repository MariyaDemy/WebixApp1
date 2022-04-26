import { header } from "./modules/header.js";
import { list, label } from "./modules/sidelist.js";
import { categoriesCollection, datatable, form, tabs } from "./modules/dashboard.js";
import { usersCollection, toolbar, usersList, chart } from "./modules/users.js";
import { treetable } from "./modules/products.js";
import { footer } from "./modules/footer.js";
import {categoriesTable, categoriesForm } from "./modules/admin.js";

let multiview = {
  view: "multiview",
  cells: [
    { id: "Dashboard", cols: [{ rows: [tabs, datatable] }, form] },
    { id: "Users", rows: [toolbar, usersList, chart] },
    { id: "Products", rows: [treetable] },
    { id: "Admin", cols: [categoriesTable, categoriesForm] },
  ],
};

let main = {
  cols: [{ rows: [list, label] }, { view: "resizer" }, multiview],
};

webix.protoUI(
  {
    name: "editlist",
  },
  webix.EditAbility,
  webix.ui.list
);

webix.ui({
  view: "popup",
  id: "popup",
  body: {
    view: "list",
    data: ["Settings", "Log Out"],
    scroll: false,
    autoheight: true,
  },
});

webix.ui({
  rows: [header, main, footer],
});

$$("myform").bind($$("mydata"));

$$("mydata").registerFilter(
  $$("selector"),
  {
    columnId: "year",
    compare: function (year, filter, item) {
      if (filter == 2) return year < 2000;
      if (filter == 3) return year > 2000 && year < 2010;
      if (filter == 4) return year > 2010;
      else return true;
    },
  },
  {
    getValue: function (node) {
      return node.getValue();
    },
    setValue: function (node, value) {
      node.setValue(value);
    },
  }
);


$$("usersList").sync(usersCollection);
$$("chart").sync(usersCollection, function () {
  this.group({
    by: "country",
    map: {
      people: ["country", "count"],
    },
  });
  this.sort("people", "asc");
});

$$("categoriesTable").sync(categoriesCollection);



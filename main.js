import {header} from './modules/header.js';
import {list, label} from './modules/sidelist.js';
import {datatable, form, tabs} from './modules/dashboard.js';
import {toolbar, usersList, chart} from './modules/users.js';
import {treetable} from './modules/products.js';
import {footer} from './modules/footer.js';

let multiview = {
    view: "multiview",
    cells: [
      { id: "Dashboard", cols: [{ rows: [tabs, datatable] }, form] },
      { id: "Users", rows: [toolbar, usersList, chart] },
      { id: "Products", rows: [treetable] },
      { id: "Admin", template: "" },
    ],
  };

  let main = {
    cols: [{ rows: [list, label] }, { view: "resizer" }, multiview],
  };

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

  webix.protoUI(
    {
      name: "editlist",
    },
    webix.EditAbility,
    webix.ui.list
  );

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
        else return year === year;
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

  $$("chart").sync($$("usersList"), function () {
    this.group({
      by: "country",
      map: {
        people: ["country", "count"],
      },
    });
  });

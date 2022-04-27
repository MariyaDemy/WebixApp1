import {
  categoriesCollection
} from "./dashboard.js";

const valuesToForm = (id) => {
  let val = $$("categoriesTable").getItem(id);
  $$("categoriesForm").setValues(val);
};

let categoriesTable = {
  view: "datatable",
  id: "categoriesTable",
  select: true,
  scrollX: false,
  scrollY: false,
  columns: [{
      id: "value",
      header: "Category",
      fillspace: true
    },
    {
      id: "del",
      header: "",
      template: "{common.trashIcon()}"
    },
  ],
  onClick: {
    "wxi-trash": function (event, id) {
      categoriesCollection.remove(id);
      return false;
    },
  },
  on: {
    onAfterSelect: valuesToForm,
  },
};

let categoriesForm = {
  view: "form",
  id: "categoriesForm",
  maxWidth: 300,
  elements: [{
      type: "section",
      template: "Edit Categories"
    },
    {
      view: "text",
      label: "Category",
      height: 50,
      name: "value",
    },
    {
      cols: [{
        view: "button",
        value: "Save",
        css: "webix_primary",
        click: function () {
          let form = $$("categoriesForm");
          let value = form.getValues();
          if (value.id && form.validate()) {
            categoriesCollection.updateItem(value.id, value);
          } else if (form.validate()){
            categoriesCollection.add(value);
            form.clear();
          }
        },
      },
      {
        view: "button",
        value: "Clear",
        css: "webix_primary",
        click: function () {
          let form = $$("categoriesForm");
          form.clear();
          form.clearValidation();
          $$("categoriesTable").unselectAll();
        },
      },
     ],
    },
    {
      view: "spacer"
    },
  ],
  rules: {
    value: webix.rules.isNotEmpty,
  },
};

export {
  categoriesTable,
  categoriesForm
};
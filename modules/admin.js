import { categoriesCollection} from "./dashboard.js";

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
    columns: [
      {id: "value", header: "Category",  fillspace: true },
      { id: "del", header: "", template: "{common.trashIcon()}" },
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
  elements: [
    { type: "section", template: "Edit Categories" },
    {
      view: "text",
      label: "Category",
      height: 50,
      name: "value",
    },
    {
      cols: [
        {
          view: "button",
          value: "Save",
          css: "webix_primary",
          click: function () {
            let form = $$("categoriesForm");
            let table = $$("categoriesTable");
            let value = form.getValues();
            if (value.id){
              table.updateItem(value.id, value);
            } else {
              categoriesCollection.add(value);
            }
            },        
        },
      ],
    },
    { view: "spacer" },
  ],

  };

  export {categoriesTable, categoriesForm};
  
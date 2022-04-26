let usersCollection = new webix.DataCollection({
  url: "users.js"
});

let countries = [
  "USA",
  "Germany",
  "Canada",
  "Russia",
  "China",
  "France",
  "Italy",
  "Spain",
];
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function random(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

let toolbar = {
  view: "toolbar",
  cols: [
    {
      view: "text",
      id: "usersList_input",
      on: {
        onTimedKeyPress: function (id) {
          let value = this.getValue().toLowerCase();
          $$("usersList").filter("#name#", value);
        },
      },
    },

    {
      view: "button",
      value: "Sort asc",
      maxWidth: 100,
      css: "webix_primary",
      click: function () {
        $$("usersList").sort("#name#", "asc", "string");
      },
    },
    {
      view: "button",
      value: "Sort desc",
      maxWidth: 100,
      css: "webix_primary",
      click: function () {
        $$("usersList").sort("#name#", "desc", "string");
      },
    },
    {
      view: "button",
      value: "Add user",
      maxWidth: 100,
      css: "webix_primary",
      click: function () {
        usersCollection.add({
          name: "Aurora",
          age: (Math.floor(Math.random() * 100) + 1).toString(),
          country: random(countries),
        });
      },
    },
  ],
};

let usersList = {
  view: "editlist",
  editable: true,
  editor: "text",
  editValue: "name",
  rules: {
    name: webix.rules.isNotEmpty,
  },
  id: "usersList",
  template:
    "#name#, #age#, from #country# <span class='webix_icon wxi-close removeBtn'></span>",
  css: "userslist",
  onClick: {
    removeBtn: function (event, id) {
      usersCollection.remove(id);
      return false;
    },
  },
  scheme: {
    $init: function (obj) {
      if (obj.age < 26) {
        $$("usersList").addCss(obj.id, "yellow");
      }
    },
  },
};

let chart = {
  id: "chart",
  view: "chart",
  type: "bar",
  value: "#people#",
  xAxis: {
    template: "#country#",
    title: "Country",
  },
  yAxis: {}
};

export { usersCollection, toolbar, usersList, chart };

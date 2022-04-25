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
        $$("usersList").add({
          id: this.id + 1,
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
  url: "users.js",
  onClick: {
    removeBtn: function (event, id) {
      this.remove(id);
      return false;
    },
  },
  ready: function () {
    for (let index = 0; index < 5; index++) {
      let id = this.data.getIdByIndex(index);
      this.addCss(id, "highlight");
    }
  },
  scheme: {
    $init: function (obj) {
      this.each(function (obj) {
        if (obj.age < 26) {
          $$("usersList").addCss(obj.id, "yellow");
        }
      });
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
  yAxis: {},
  url: "users.js",
};

export { toolbar, usersList, chart };

let header = {
    padding: 10,
    css: "header",
    cols: [
      { view: "label", label: "My App", css: "myLabel" },
      {
        view: "button",
        id: "profile",
        type: "icon",
        icon: "wxi-user",
        label: "Profile",
        maxWidth: 100,
        css: "myBtn",
        click: function () {
          if (!$$("popup").isVisible()) {
            $$("popup").show($$("profile").getNode(), {
              pos: "bottom",
              x: 0,
              y: 5,
            });
          }
        },
      },
    ],
  };



export {header};
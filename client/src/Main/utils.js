const shelfs = {
  currentlyReading: {
    books: [],
    component: {
      shelfLabel: "Currently Reading"
    },
    css: {
      blockClass: "currently-reading",
      headerClass: "currently-reading__header",
      categoryColor: "#273c75"
    }
  },
  wantToRead: {
    books: [],
    component: {
      shelfLabel: "Want to Read"
    },
    css: {
      blockClass: "wanna-read",
      headerClass: "wanna-read__header",
      categoryColor: "#005744"
    }
  },
  read: {
    books: [],
    component: {
      shelfLabel: "Read"
    },
    css: {
      blockClass: "read",
      headerClass: "read__header",
      categoryColor: "#b33939"
    }
  },
  none: {
    books: [],
    component: {
      shelfLabel: "No Category"
    },
    css: {
      blockClass: "none",
      headerClass: "none__header",
      categoryColor: "#5f27cd"
    }
  }
};

export default shelfs;

const watchButton = document.querySelector("#watchButton");
const loggerDevtools = document.querySelector("#loggerDevtools");

const db = firebase.firestore();

const render = (list) => {
  const elements = list
    .map((doc) => doc.data())
    .sort((a, b) => {
      return new Date(b.args.date) - new Date(a.args.date);
    })
    .map((data) => {
      const log = data.args;
      return `
    <li class="${log.type}">
      ${log.date}
      ${JSON.stringify(log.arguments)}
    </li>
    `;
    })
    .join("");

  loggerDevtools.innerHTML = `<ul>
  ${elements}
  </ul>`;
};

const startWatcher = (id) => {
  db.collection("logger")
    .doc(id)
    .collection("messages")
    .get((doc) => {
      render(doc.docs);
    });

  db.collection("logger")
    .doc(id)
    .collection("messages")
    .onSnapshot((doc) => {
      render(doc.docs);
    });
};

watchButton.addEventListener("click", () => {
  if (loggerId.value && loggerId.value.length >= 20)
    startWatcher(loggerId.value);
});

if (window.location.search) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (id) {
    loggerId.value = id;
    startWatcher(id);
  }
}

const watchButton = document.querySelector("#watchButton");
const table = document.querySelector("table");
const tableTbody = document.querySelector("table tbody");

const db = firebase.firestore();
const getArgumentsFormatted = (args) => {
  if (Object.keys(args) && Object.keys(args).length === 1) {
    return args[0];
  }
  return JSON.stringify(args, null, 4);
  ß;
};
const renderTable = (list) => {
  const trs = list
    .map((doc) => doc.data())
    .sort((a, b) => {
      return new Date(b.args.date) - new Date(a.args.date);
    })
    .map((data) => {
      const log = data.args;
      return `
    <tr class="${log.type}">
    <td class="date-col">
    <code>${log.date}</code>
    </td><td>
    <small>${log.type} </small>
    </td>
    <td class="item">
    <pre>
    ${getArgumentsFormatted(log.arguments)}
    </pre>
    </td>
    <td>
    <pre>
    ${JSON.stringify(data.info, null, 4)}
    </pre>
    </td>
    </tr>
    `;
    })
    .join("");

  tableTbody.innerHTML = trs;
};

const startWatcher = (id) => {
  tableTbody.innerHTML = ``;
  table.removeAttribute("hidden");
  db.collection("logger")
    .doc(id)
    .collection("messages")
    .get((doc) => {
      renderTable(doc.docs);
    });

  db.collection("logger")
    .doc(id)
    .collection("messages")
    .onSnapshot((doc) => {
      renderTable(doc.docs);
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

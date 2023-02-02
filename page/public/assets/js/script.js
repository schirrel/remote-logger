const toast = document.querySelector("#toast");
const loading = document.querySelector("#loading");
const generateButton = document.querySelector("#generateButton");
const loggerId = document.querySelector("#loggerId");

const db = firebase.firestore();

generateButton.addEventListener("click", () => {
  loading.open = true;
  db.collection("logger")
    .add({})
    .then((docRef) => {
      loggerId.value = docRef.id;
    })
    .finally(() => {
      loading.open = false;
    });
});
const clipboard = new ClipboardJS("#copyButton");

clipboard.on("success", function (e) {
  toast.open = true;
  setTimeout(() => {
    toast.open = false;
  }, 2000);
  e.clearSelection();
});

clipboard.on("error", function (e) {
  console.error("Action:", e.action);
  console.error("Trigger:", e.trigger);
});

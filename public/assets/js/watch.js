const watchButton = document.querySelector("#watchButton");
const loggerDevtools = document.querySelector("#loggerDevtools");
//bl6yI38e8vzg2w9kvIcv
const firebaseConfig = {
  apiKey: "AIzaSyBbw1RTq9m98_xWtn2AonjJW8cQA_-VM5E",
  authDomain: "schirrel.firebaseapp.com",
  databaseURL: "https://schirrel-default-rtdb.firebaseio.com",
  projectId: "schirrel",
  storageBucket: "schirrel.appspot.com",
  messagingSenderId: "845512652775",
  appId: "1:845512652775:web:adbc33bbcd641b1f1def42",
  measurementId: "G-QSGVVHFVCN",
};

const app = firebase.initializeApp(firebaseConfig);

const analytics = firebase.analytics(app);
const db = firebase.firestore();

const render = (list) => {
  const elements = list
    .map((doc) => {
      const data = doc.data();
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
    .onSnapshot((doc) => {
      render(doc.docs);
    });
};

watchButton.addEventListener("click", () => {
  if (loggerId.value && loggerId.value.length >= 20)
    startWatcher(loggerId.value);
});

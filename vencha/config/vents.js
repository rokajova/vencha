import { firestore } from "./firebase";

const getVents = async () => {
  const snapshot = await firestore.collection("Vents").get();
  snapshot.docs.forEach((doc) => console.log(doc.data()));
};

export { getVents };

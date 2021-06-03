import firebase from "../../config/firebase";
import Link from "next/link";

const Vent = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  );
};
export const getServerSideProps = async ({ query }) => {
  const content = {};
  await firebase
    .firestore()
    .collection("Vents")
    .doc(query.id)
    .get()
    .then((result) => {
      content["title"] = result.data().title;
      content["content"] = result.data().content;
    });
  return {
    props: {
      title: content.title,
      content: content.content,
    },
  };
};

export default Vent;

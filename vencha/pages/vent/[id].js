import firebase from "../../config/firebase";
import Link from "next/link";

const Vent = (props) => {
  return (
    <div>
      <img style={{ maxHeight: "100px" }} src={props.featureImage} />
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  );
};

// Setting the required props from firebase db to be used in return props
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
      content["featureImage"] = result.data().featureImage;
    });
  return {
    props: {
      title: content.title,
      content: content.content,
      featureImage: content.featureImage,
    },
  };
};

export default Vent;

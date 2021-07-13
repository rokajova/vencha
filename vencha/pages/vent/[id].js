import firebase from "../../config/firebase";
import Link from "next/link";

const timeStampToString = (ts) => {
  const date = new Date(ts * 1000);
  return (
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getDate() +
    " " +
    (date.getHours() < 10 ? "0" : "") +
    date.getHours() +
    ":" +
    (date.getMinutes() < 10 ? "0" : "") +
    date.getMinutes() +
    ":" +
    (date.getSeconds() < 10 ? "0" : "") +
    date.getSeconds()
  );
};

const Vent = (props) => {
  return (
    <div>
      <img style={{ maxHeight: "100px" }} src={props.featureImage} />
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <p>{timeStampToString(props.createDate)}</p>
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
      content["createDate"] = result.data().createDate.seconds;
    });
  return {
    props: {
      title: content.title,
      content: content.content,
      featureImage: content.featureImage,
      createDate: content.createDate,
    },
  };
};

export default Vent;

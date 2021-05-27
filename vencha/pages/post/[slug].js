import { useRouter } from "next/router";

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Hello, from post: {slug}!</h1>
    </div>
  );
};

export default PostPage;

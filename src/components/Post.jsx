import { Card, Avatar } from "antd";
import { HeartTwoTone } from "@ant-design/icons";

export default function Post({ post, setPhotoList }) {
  const likeButton = () => {
    fetch(`https://express-ts-at.web.app/photos/${post.photoId}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
    })
      .then((results) => results.json())
      .then((newListOfPhotos) => {
        setPhotoList(newListOfPhotos);
      })
      .catch(alert);
  };

  return (
    <Card
      hoverable
      actions={[<button onClick={likeButton}><HeartTwoTone twoToneColor="#eb2f96"/>Likes: {post.likes.toLocaleString()}</button>]}
      style={{ width: 300 }}
      cover={<img alt={post.description} src={post.photo}></img>}
    >
      <Card.Meta
        avatar={<Avatar src="https://randomuser.me/api/portraits/men/10.jpg" />}
        title={post.username}
        description={post.description}
      />
    </Card>
  );
}

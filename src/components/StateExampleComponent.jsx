

const BlogPost = (props) => (
    <div>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <Comments comments={props.comments} />
    </div>
  );
//!.......................................

function Comments (props) {
    return (
      <div>
        <h2>Yorumlar</h2>
        <ul>
          {props.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <AddComment />
      </div>
    );
  }
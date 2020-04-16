import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
const token = "sdfdfsdf"
let socket = io.connect('https://jp-server-kltn.herokuapp.com/', { query: 'token=' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbmxhbTEyMzQ1QGdtYWlsLmNvbSIsIl9pZCI6IjVlOTFmZDQ1MDBmZDZiMzg2NGNhNGFiMSIsInR5cGUiOiJhY2Nlc3MiLCJyb2xlIjoidXNlciIsImlhdCI6MTU4NjY3NDI2NSwiZXhwIjoxNTg3Mjc5MDY1fQ.fXCNweogw0KNf-V2z0Pri6ug4ZRYv4ZMK_gAHsVvsjs" });
const testConnet = () => {
  socket = io.connect('https://jp-server-kltn.herokuapp.com/', { query: 'token=' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbmxhbTEyM0BnbWFpbC5jb20iLCJfaWQiOiI1ZTU1ZmIwNzA4NzIyNTQ2ZDAxMDRiNmMiLCJ0eXBlIjoiYWNjZXNzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg2Njg3MzA3LCJleHAiOjE1ODcyOTIxMDd9.xf0S1_OEmmPjyC2tL0gRBUA4eaBrTiE_lAVZiz9fv-M" });
}
socket.on("authenticate", (data) => {
  console.log(data)
  alert(JSON.stringify(data))
})
socket.on("validation", (data) => {
  console.log(data)
  alert(JSON.stringify(data))
})
const list_comments_default = [
  {
    idcha: "1", comments: [
      { id: 11, comment: "Hello" },
      { id: 12, comment: "work" },
      { id: 13, comment: "cuccu" }]
  },
  {
    idcha: "2", comments: [
      { id: 21, comment: "challenge21" },
      { id: 22, comment: "challenge22" },
      { id: 23, comment: "challenge23" }]
  }
]
socket.on("connect", () => {
  console.log("what on?")
  socket.emit("join", { room: 1 }, () => {
    console.log("connect done!" + `${1} fake`)
  });

});
const connectToRoom = (room) => {
  console.log("vao ham", room)

  socket.emit("join", { room }, () => {
    console.log("connect done!" + `${room}`)
  });

};
const App = () => {
  const [initialized, setInitialized] = useState(false);
  const [list_comments, setListComments] = useState(list_comments_default[0]);
  const [comment, setComment] = useState("");
  const [room, setRoom] = useState("1");

  const _submitComment = () => {
    socket.emit("createComment", { comment, room }, () => {
      console.log("send!")
    })
    setComment("");
    setRoom("");
  };

  socket.on("newComment", comment => {
    const commentnew = {
      id: list_comments.comments.length,
      comment: comment.comment
    };
    let newlist = { ...list_comments }
    setListComments({
      ...newlist,
      comments: [
        ...(newlist.comments),
        commentnew
      ]
    });
    setInitialized(true);
  })

  useEffect(() => {
    console.log(0)
    if (!initialized) {
      //getMessages();
      console.log(1)
      connectToRoom(room);
      setInitialized(true);
    }
  })

  const changeChalleng = () => {
    if (list_comments.idcha == "1") {
      setListComments(list_comments_default[1])
      setRoom(list_comments_default[1].idcha)
      setInitialized(false)
    }
    else {
      setListComments(list_comments_default[0])
      setRoom(list_comments_default[0].idcha)
      setInitialized(false)
    }
  }

  const _onChange = e => {
    var { target } = e;
    console.log(target)
    var { id, value } = target;
    setComment(value);
    setRoom(id)
  };
  const _renderComment = list_commentsdata => {
    console.log(room, initialized)
    let xhtml = list_commentsdata.map((comment, index) => {
      return (
        <div>
          <p>{comment.comment}</p>
          <div className="dropdown-divider"></div>
        </div>
      );
    });
    return xhtml;
  };
  return (
    // <div>
    //   <p>You clicked {count} times</p>
    //   <button onClick={() => setCount(count + 1)}>
    //     Click me
    //   </button>
    // </div>

    <div style={{ marginLeft: 20 }}>
      <button onClick={() => testConnet()}>test</button>
      <h1>List comment</h1>
      {_renderComment(list_comments.comments)}
      <div style={{ marginTop: 20 }}>
        <input
          id={list_comments.idcha}
          name="comment"
          placeholder="tao comment moi"
          onChange={e => _onChange(e)}
          value={comment}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => _submitComment()}
        >
          Primary
        </button>
      </div>
      <button onClick={() => changeChalleng()}>test</button>
    </div>
  );
};

export default App;
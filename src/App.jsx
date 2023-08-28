import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { db, auth, storage } from "./config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  //get movies state
  const [moviesList, setMoviesList] = useState([]);
  //add movies to state
  const [addMovie, setAddMovie] = useState({
    title: "",
    releasedDate: 0,
    award: false,
  });
  //update movie title
  const [updateTitle, setUpdateTitle] = useState("");

  //file upload
  const [fileUpload, setFileUpload] = useState(null);

  useEffect(() => {
    getMoviesList();
  }, []);

  //connect to db and movies collection
  const moviesCollectionRef = collection(db, "movies");

  //add or submit movie
  const movieAdd = async () => {
    try {
      console.log("movies add", addMovie);
      const docRef = await addDoc(moviesCollectionRef, {
        title: addMovie.title,
        award: addMovie.award,
        releasedDate: addMovie.releasedDate,
        userId: auth?.currentUser?.uid,
      });
      console.log("Document written with ID: ", docRef.id);
      getMoviesList();
    } catch (error) {
      console.log(error);
    }
  };

  //read from db
  const getMoviesList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMoviesList(filterData);
    } catch (error) {
      console.log(error);
    }
  };

  //delete movie
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };
  //update movie title
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updateTitle });
  };

  //upload files
  const SubmitFile = async () => {
    if (!fileUpload) return;
    const filesUploaded = ref(storage, `upload/${fileUpload.name}`);
    try {
      await uploadBytes(filesUploaded, fileUpload);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2>firebase crud</h2>
      <Auth />
      <div>
        <h3>Add Movie</h3>
        <input
          type="text"
          placeholder="Enter movie"
          value={addMovie.title}
          onChange={(e) => setAddMovie({ ...addMovie, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Release Date"
          value={addMovie.releasedDate}
          onChange={(e) =>
            setAddMovie({ ...addMovie, releasedDate: Number(e.target.value) })
          }
        />
        <input
          type="checkbox"
          checked={addMovie.award}
          onChange={(e) =>
            setAddMovie({ ...addMovie, award: e.target.checked })
          }
        />{" "}
        <label>Award Received</label>
        <button
          style={{
            fontSize: "12px",
            background: "red",
            color: "white",
            padding: "10px",
          }}
          onClick={movieAdd}
        >
          Add Movie
        </button>
      </div>
      <div>
        {moviesList.map((movie, index) => (
          <div key={index}>
            <h3>
              id : <span>{movie.id}</span> <br />
              Title : <span>{movie.title}</span>
            </h3>
            <p>
              Date : <span>{movie.releasedDate}</span>
            </p>
            <p>
              Award : <span>{movie.award ? "Oscar" : "Sorry, no awards"}</span>
            </p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input
              type="text"
              onChange={(e) => setUpdateTitle(e.target.value)}
              placeholder="update title"
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update Title
            </button>

            <div>
              <input
                type="file"
                onChange={(e) => setFileUpload(e.target.files[0])}
              />
              <button onClick={SubmitFile}>upload image</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

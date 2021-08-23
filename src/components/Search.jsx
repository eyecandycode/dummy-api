import React, { useState, useContext } from "react";
import { AppContext } from "../context/Context";
import axios from "axios";
import Post from "./post/Post";
import styled from "styled-components";

const SearchStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 100px);
  .search-container {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    margin: 0rem 0;
    padding: 1.3rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    max-width: 600px;
  }
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 0;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    width: 240px;
    border-radius: 16px;
    padding-left: 6px;
    margin-left: 1rem;
    border: 2px solid rgba(0, 0, 0, 0.4);
  }
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border: 2px solid rgba(0, 0, 0, 0.4);
  }
  button:disabled {
    background: rgba(0, 0, 0, 0.3);
    color: rgba(0, 0, 0, 0.1);
    border: 2px solid rgba(0, 0, 0, 0.1);
  }
  button[type="submit"] {
    margin: 1rem 0;
  }
`;

function Search() {
  const [userString, setUserString] = useState("");
  const [textString, setTextString] = useState("");
  const [tagString, setTagString] = useState("");
  const [matchedPosts, setMatchedPosts] = useState([]);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [searchNumber, setSearchNumber] = useState(0);

  const ctx = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userString && !textString && !tagString) return;
    filterPosts();
  };

  const filterPosts = async () => {
    const res = await axios.get(
      `https://dummyapi.io/data/v1/post?limit=${ctx.data.total}`,
      {
        headers: {
          "app-id": process.env.REACT_APP_APP_ID,
        },
      }
    );

    // if field is left empty, the filter is bypassed
    const filtered = res.data.data
      .filter((post) => {
        // User's name
        if (!userString) return true;
        const fullName = `${post.owner.firstName.toLowerCase()} ${post.owner.firstName.toLowerCase()}`;
        return fullName.includes(userString.toLowerCase());
      })
      .filter((post) => {
        // Tags
        if (!tagString) return true;
        return post.tags.find(
          (tag) => tag.toLowerCase() === tagString.toLowerCase()
        );
      })
      .filter((post) => {
        // Post text
        if (!textString) return true;
        return post.text.toLowerCase().includes(textString.toLowerCase());
      });
    setMatchedPosts(filtered);

    setPreviousSearches([
      { userString, textString, tagString },
      ...previousSearches,
    ]);
    setUserString("");
    setTextString("");
    setTagString("");
  };

  const prevSearch = () => {
    if (previousSearches.length > searchNumber) {
      const {
        userString: prevString,
        textString: prevText,
        tagString: prevTag,
      } = previousSearches[searchNumber];
      setUserString(prevString);
      setTextString(prevText);
      setTagString(prevTag);
      setSearchNumber(searchNumber + 1);
    }
  };
  const nextSearch = () => {
    if (searchNumber > 0) {
      const {
        userString: prevString,
        textString: prevText,
        tagString: prevTag,
      } = previousSearches[searchNumber - 1];
      setUserString(prevString);
      setTextString(prevText);
      setTagString(prevTag);
      setSearchNumber(searchNumber - 1);
    }
    if (searchNumber === 1) {
      setUserString("");
      setTextString("");
      setTagString("");
    }
  };

  return (
    <SearchStyles>
      <div className="search-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="user">
            User:{` `}
            <input
              type="text"
              name="user"
              id="user"
              placeholder="Enter name..."
              value={userString}
              onChange={(e) => setUserString(e.target.value)}
            />
          </label>
          <label htmlFor="text">
            Text:{` `}
            <input
              type="text"
              name="text"
              id="text"
              placeholder="Enter text..."
              value={textString}
              onChange={(e) => setTextString(e.target.value)}
            />
          </label>
          <label htmlFor="tag">
            Tag:{` `}
            <input
              type="text"
              name="tag"
              id="tag"
              placeholder="Enter tag..."
              value={tagString}
              onChange={(e) => setTagString(e.target.value)}
            />
          </label>

          <button type="submit">Search</button>
        </form>
        {previousSearches.length > 0 ? (
          <div className="button-container">
            <button
              disabled={searchNumber >= previousSearches.length}
              onClick={() => prevSearch()}
            >
              ←
            </button>
            <p style={{ margin: "0 1rem" }}>Previous Searches</p>
            <button disabled={searchNumber === 0} onClick={() => nextSearch()}>
              →
            </button>
          </div>
        ) : null}
      </div>
      {matchedPosts
        ? matchedPosts.map((post) => <Post key={post.id} data={post} />)
        : null}
    </SearchStyles>
  );
}

export default Search;

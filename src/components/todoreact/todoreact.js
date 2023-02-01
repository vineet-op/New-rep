import React, { useState, useEffect } from "react";
import "./style.css";

//*Getting local storage data
const getLocaleData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todoreact = () => {
  const [inputdata, Setinputdata] = useState("");
  const [items, Setitems] = useState(getLocaleData());
  const [isEdited, setisEdited] = useState("");
  const [ToggleBtn, setToggleBtn] = useState(false);

  //*Editing the items
  const editItems = (index) => {
    const item_todo_edited = items.find((curEle) => {
      return curEle.id === index;
    });

    Setinputdata(item_todo_edited.name);
    setisEdited(index);
    setToggleBtn(true);
  };

  //*Add the items function
  const addItems = () => {
    if (!inputdata) {
      alert("Please enter the data");
    } else if (inputdata && ToggleBtn) {
      Setitems(
        items.map((curEle) => {
          if (curEle.id === isEdited) {
            return { ...curEle, name: inputdata };
          }
          return curEle;
        })
      );

      Setinputdata("");
      setisEdited(null);
      setToggleBtn(false);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      Setitems([...items, newInputData]);
      Setinputdata("");
    }
  };

  //*Deleting Items

  const deleteItems = (index) => {
    const updatedItems = items.filter((curEle) => {
      return curEle.id !== index;
    });

    Setitems(updatedItems);
  };

  //*Remove all the elemnts

  const removeAll = () => {
    Setitems([]);
  };

  //*Adding data to local storage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.png" alt="todo-image" />
            <figcaption>Add your list here ✌️</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add your text here"
              className="form-control"
              value={inputdata}
              onChange={(event) => {
                Setinputdata(event.target.value);
              }}
            />

            {ToggleBtn ? (
              <i className="far fa-edit add-btn" onClick={addItems}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItems}></i>
            )}
          </div>
          {/* Show our items */}
          <div className="showItems">
            //Looping the items and displaying it
            {items.map((curEle, index) => {
              return (
                <div className="eachItem" key={curEle.id}>
                  <h3>{curEle.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItems(curEle.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItems(curEle.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="REMOVE ALL"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todoreact;

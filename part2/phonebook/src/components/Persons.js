import React from "react";

const Persons = ({ persons, delHandler }) =>
  persons.map((person) => {
    return (
      <p key={person.id}>
        {person.name} {person.number}{" "}
        <button onClick={() => delHandler(person)}>Delete</button>
      </p>
    );
  });

export default Persons;

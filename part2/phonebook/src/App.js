import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personsService from "./services/persons";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "23415", id: 1 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  useEffect(() => {
    personsService.getAll().then((persons) => {
      setPersons(persons);
      setFilteredPersons(persons);
    });
  }, []);

  const addEntry = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newName);
    if (person) {
      const result = window.confirm(`You sure you want to update ${newName}?`);
      if (!result) {
        return;
      }
      personsService
        .update({ ...person, number: newNumber })
        .then((newPerson) => {
          const newPersons = persons.map((person) =>
            person.id === newPerson.id ? newPerson : person
          );
          setPersons(newPersons);
          applyFilter(filter, newPersons);
          displayMessage(`${person.name} phone updated`, "success");
        })
        .catch((error) => {
          displayMessage(`${person.name} has been removed`, "error");
          const newPersons = persons.filter((p) => p.id !== person.id);
          setPersons(newPersons);
          applyFilter(filter, newPersons);
        });
    }
    if (!person) {
      personsService
        .create({ name: newName, number: newNumber })
        .then((newPerson) => {
          const newPersons = persons.concat(newPerson);
          setPersons(newPersons);
          applyFilter(filter, newPersons);
          displayMessage(`${newName} phone added`, "success");
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const displayMessage = (text, msgClass) => {
    setMessage({ text, msgClass });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const filterHandler = (event) => {
    const filter = event.target.value;
    setFilter(filter);
    applyFilter(filter, persons);
  };

  const applyFilter = (filter, persons) => {
    if (filter === "") {
      setFilteredPersons(persons);
      return;
    }
    const lower_filter = filter.toLowerCase();
    const filtered_persons = persons.filter((person) =>
      person.name.toLowerCase().includes(lower_filter)
    );
    setFilteredPersons(filtered_persons);
  };

  const formProps = {
    addEntry: addEntry,
    newName: newName,
    newNumber: newNumber,
    setNewName: setNewName,
    setNewNumber: setNewNumber,
  };

  const delHandler = (person) => {
    const result = window.confirm(
      `You sure you want to delete ${person.name}?`
    );
    if (!result) {
      return;
    }
    const id = person.id;
    personsService.delete(id);
    const newPersons = persons.filter((person) => person.id !== id);
    setPersons(newPersons);
    setFilteredPersons(newPersons);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <Filter filter={filter} applyFilter={filterHandler} />
      <PersonForm props={formProps} />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} delHandler={delHandler} />
    </div>
  );
};

export default App;

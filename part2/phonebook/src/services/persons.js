import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (person) => {
  const request = axios.put(`${baseUrl}/${person.id}`, person);
  return request.then((response) => response.data);
};

const personsService = {
  getAll,
  create,
  delete: deletePerson,
  update,
};

export default personsService;

const getTodos = `
  query GetTodos($limit: Int!) {
    todos(limit: $limit) {
      id
      text
      isDone
    }
  }
`;

export {
    getTodos
}
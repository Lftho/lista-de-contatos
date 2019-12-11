const api = 'http://localhost:5001'

let token = localStorage.token;

if(!token) 
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}
// Buscando no input
export const searchAll = () => {
  fetch(`${api}/contacts`, {headers})
  .then(res => res.json())
  .then(data => data.contacts)
}

// Removendo os usuários
export const remove = (contact) => {
  fetch(`${api}/contacts/${contact.id}`,{
    method: 'DELETE',
    headers
  })
  .then(res => res.json())
  .then(data => data.contact)
}
// Criando os contatos 
export const CreateUser = (body) => {
  fetch(`${api}/contacts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json());
}
const Number = ({person, handleDelete}) => {
  return (
    <> 
      <li> {person.name} {person.number ? person.number : '' } <button onClick={handleDelete}>delete</button> </li>
    </>
  )
}
/*
const Numbers = ({persons}) => {
  return (
    <ul>
      {persons.map(person => <Number key={person.name} person={person}/>)}
    </ul>
  )
}
*/

export default Number
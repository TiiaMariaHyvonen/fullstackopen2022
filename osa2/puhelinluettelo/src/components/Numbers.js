const Number = ({person}) => {
  return (
    <> 
      <li> {person.name} {person.number ? person.number : '' } </li>
    </>
  )
}

const Numbers = ({persons}) => {
  return (
    <ul>
      {persons.map(person => <Number key={person.name} person={person}/>)}
    </ul>
  )
}


export default Numbers
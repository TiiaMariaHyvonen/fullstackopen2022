const Number = ({person, handleDelete}) => {
  return (
    <> 
      <li> {person.name} {person.number ? person.number : '' } <button onClick={handleDelete}>delete</button> </li>
    </>
  )
}

export default Number
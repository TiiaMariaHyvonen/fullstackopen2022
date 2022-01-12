const Country = ({country}) => {
    const languages = Object.values(country.languages).map(language=> <li key={language}> {language}</li>)
    return (
      <>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <div>region {country.region}</div>
        <h3>languages</h3>
        <ul>{languages}</ul>
        <p>{country.flag}</p>
      </>
    )
  
  }
  
  const Countries = ({countries}) => {
    const countriesToShow = countries.map(country => <li key={country.name.common}> {country.name.common} </li>)
    const length = countries.length
    if (length > 10) {
      return ( 
      <>
      <p> Too many matches, specify another filter </p>
      </>)
    }
    if (length === 1) {
      return(
        <div>
          <Country country={countries[0]}/>
        </div>
      )
    }
    return (
      <ul>
        {countriesToShow}
      </ul>
    )
  }

  export default Countries
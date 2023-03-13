import {useEffect, useState} from 'react'
import axios from 'axios';

export default function App() {

  const [character,setCharacter] = useState("");
  const [number,setNumber] = useState(5)
  const [quotes,setQuotes] = useState([])

  useEffect(()=>{
    getQuotes()
  },[])

  const handleChange = (event) => {
    if (event.target.id == "character-name"){
      setCharacter(event.target.value)
    }
    if (event.target.id == "quotes-number"){
      setNumber(event.target.value)
    }
    console.log(character)
  }

  const getQuotes = () =>{
    let characterParam
    let params

    if(character != ""){
      characterParam = `&character=${character}`
    }
    params = `?count=${number}&${characterParam}`
    axios.get(`https://thesimpsonsquoteapi.glitch.me/quotes/${params}`)
    .then(val => setQuotes(val.data))

  }

  return (
    <div className="box-border ">
       <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        nombre personaje
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="character-name"
                        autoComplete="given-name"
                        onChange={handleChange}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                        numero
                      </label>
                      <input
                        type="number"
                        name="last-name"
                        id="quotes-number"
                        onChange={handleChange}
                        autoComplete="family-name"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    onClick={getQuotes}
                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
          </div>
      <ul className="divide-y divide-gray-200">
        {quotes.length > 0 ? quotes.map((character) => (
          <li key={character.email} className="py-4 flex">
            <img className="h-30 w-20 rounded-full" src={character.image} alt="" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{character.character}</p>
              <p className="text-sm text-gray-500">{character.quote}</p>
            </div>
          </li>
        )) : <p>loading...</p>}
      </ul>
    </div>
  )
}

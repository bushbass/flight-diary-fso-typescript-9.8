import { DiaryEntry } from '../../../src/types'
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [inputError, setInputError] = useState('')

  useEffect(() => {
    axios
      .get<DiaryEntry[]>('http://localhost:3000/api/diaries/')
      .then((response): void => {
        console.log(response.data)
        setDiaries(response.data)
      })
  }, [])

  const createDiary = (event: React.SyntheticEvent) => {
    setInputError('')
    event.preventDefault()
    const diaryEntryToAdd = {
      date,
      weather,
      visibility,
      comment,
    }

    axios
      .post('http://localhost:3000/api/diaries/', diaryEntryToAdd)
      .then(function (response) {
        setDiaries([...diaries, response.data])
        setWeather('')
        setDate('')
        setVisibility('')
        setComment('')
      })
      .catch((error) => {
        setInputError(error.response.data)
      })
  }

  return (
    <>
      <h2>Add Diary Entry</h2>
      {inputError ? <p style={{"color":"red"}}>{inputError}</p> : null}

      <form onSubmit={createDiary}>
        <label htmlFor='date'>date</label>{' '}
        <input
          type='date'
          id='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />
        <label htmlFor='weather'>weather</label>{' '}
        <select
          value={weather}
          name='weather'
          id='weather'
          onChange={(event) => setWeather(event.target.value)}>
          <option value=''></option>
          <option value='sunny'>Sunny</option>
          <option value='rainy'>Rainy</option>
          <option value='cloudy'>Cloudy</option>
          <option value='stormy'>Stormy</option>
          <option value='windy'>Windy</option>
        </select>
        <br />
        <label htmlFor='visibility'>visibility</label>{' '}
        <select
          value={visibility}
          name='visibility'
          id='visibility'
          onChange={(event) => setVisibility(event.target.value)}>
          <option value=''></option>
          <option value='great'>Great</option>
          <option value='good'>Good</option>
          <option value='ok'>Ok</option>
          <option value='poor'>Poor</option>
        </select>
        <br />
        <label htmlFor='comment'>comment</label>{' '}
        <input
          id='comment'
          type='text'
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <br />
        <button type='submit'>add</button>
      </form>

      {diaries.map((entry) => {
        return (
          <div key={entry.id}>
            ID - {entry.id}
            <br />
            Date: {entry.date}
            <br />
            Weather - {entry.weather}
            <br />
            Visibility - {entry.visibility}
            <br />
            comment: {entry.comment}
          </div>
        )
      })}
    </>
  )
}

export default App

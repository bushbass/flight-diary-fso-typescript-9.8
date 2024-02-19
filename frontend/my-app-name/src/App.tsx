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

  useEffect(() => {
    axios
      .get<DiaryEntry[]>('http://localhost:3000/api/diaries/')
      .then((response): void => {
        console.log(response.data)
        setDiaries(response.data)
      })
  }, [])

  const createDiary = (event: React.SyntheticEvent) => {
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
      })
      .catch(function (error) {
        console.log(error)
      })

    setDate('')
  }

  return (
    <>
      <h1>home</h1>
      <form onSubmit={createDiary}>
        <label htmlFor='date'>date</label>{' '}
        <input
          id='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br /> <label htmlFor='weather'>weather</label>{' '}
        <input
          id='weather'
          type='text'
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
        />
        <br /> <label htmlFor='visibility'>visibility</label>{' '}
        <input
          id='visibility'
          type='text'
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        />
        <br /> <label htmlFor='comment'>comment</label>{' '}
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
            <p>
              {entry.id} -{entry.date} -{entry.weather}- {entry.visibility}
            </p>
            <p>comment: {entry.comment}</p>
          </div>
        )
      })}
    </>
  )
}

export default App

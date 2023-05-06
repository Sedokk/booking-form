import React, { useState } from "react"
import Select from "react-select"
import { floorOptions, roomOptions, towerOptions } from "../data"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./App.scss"
import "./selects.scss"

const App = () => {
  const [data, setData] = useState({
    tower: null,
    floor: null,
    room: null,
    startAt: null,
    endAt: null,
    comments: "",
  })

  const changeHandler = (newData, name) => {
    setData({ ...data, [name]: newData })
  }

  const onClear = () => {
    setData({
      tower: null,
      floor: null,
      room: null,
      startAt: null,
      endAt: null,
      comments: "",
    })
  }

  const isFilled = () => {
    const { tower, floor, room, startAt, endAt } = data
    return !!(tower && floor && room && startAt && endAt && startAt !== endAt)
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    console.log(JSON.stringify(data))
  }

  return (
    <form onSubmit={onSubmit}>
      <h1 className='title'>Бронирование переговорной</h1>
      <div className='selects'>
        <div className='selects__container'>
          <h3 className='selects__label'>Выберите башню:</h3>
          <Select
            classNamePrefix='rs'
            options={towerOptions}
            isClearable
            isSearchable={false}
            placeholder='Выберите башню...'
            onChange={(data) => changeHandler(data?.value ?? data, "tower")}
            value={towerOptions.find((el) => el.value === data.tower) ?? null}
          />
        </div>
        <div className='selects__container'>
          <h3 className='selects__label'>Выберите этаж:</h3>
          <Select
            classNamePrefix='rs'
            options={floorOptions}
            isClearable
            isSearchable={false}
            placeholder='Выберите этаж...'
            onChange={(data) => changeHandler(data?.value ?? data, "floor")}
            value={floorOptions.find((el) => el.value === data.floor) ?? null}
          />
        </div>
        <div className='selects__container'>
          <h3 className='selects__label'>Выберите переговорку:</h3>
          <Select
            classNamePrefix='rs'
            options={roomOptions}
            isClearable
            isSearchable={false}
            placeholder='Выберите переговорку...'
            onChange={(data) => changeHandler(data?.value ?? data, "room")}
            value={roomOptions.find((el) => el.value === data.room) ?? null}
          />
        </div>
      </div>
      <div className='date'>
        <div className='date__item'>
          <h3 className='date__label'>Начало бронирования:</h3>
          <DatePicker
            selected={data.startAt}
            showTimeSelect
            timeIntervals={15}
            dateFormat='dd.MM.yyyy HH:mm'
            timeFormat='HH:mm'
            onChange={(date) => changeHandler(date, "startAt")}
            isClearable
          />
        </div>
        <div className='date__item'>
          <h3 className='date__label'>Окончание бронирования:</h3>
          <DatePicker
            selected={data.endAt}
            showTimeSelect
            timeIntervals={15}
            dateFormat='dd.MM.yyyy HH:mm'
            timeFormat='HH:mm'
            onChange={(date) => changeHandler(date, "endAt")}
            isClearable
          />
        </div>
      </div>
      <div className='comments'>
        <h3 className='comments__label'>Комментарий:</h3>
        <textarea
          name='comments'
          placeholder='Введите комментарий...'
          value={data.comments}
          onChange={(ev) => changeHandler(ev.target.value, "comments")}
        ></textarea>
      </div>
      <div className='buttons'>
        <button disabled={isFilled() ? 0 : 1} type='submit'>
          Отправить
        </button>
        <button onClick={onClear} type='button'>
          Очистить
        </button>
      </div>
    </form>
  )
}

export default App

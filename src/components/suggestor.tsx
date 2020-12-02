import { TextField } from '@fluentui/react'
import React, { useRef, useState } from 'react'
import getCaretCoordinates from 'textarea-caret'

const Suggestor = () => {

  const [showSuggestor, setShowSuggestor] = useState(false)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [textareaValue, setTextareaValue] = useState('')
  const inputRef = useRef(null)

  const [users, setUsers] = useState([
    'Charmander',
    'Squirtle',
    'Bulbasaur',
    'Pikachu1',
    'Pikachu2',
    'Pikachu3',
    'Pikachu4',
  ])
  const [text, setText] = useState(null)
  const [currentSelection, setCurrentSelection] = useState(0)
  const [startPosition, setStartPosition] = useState(null)

  const toggleSuggestor = (metaInformation: any) => {

    const caret = getCaretCoordinates(metaInformation.target, metaInformation.target.selectionEnd)

    const re = /{((?:[^{}]|{{[^}]*}})*)}/g
    const matchAll = metaInformation.target.value.matchAll(re)
    const matchAllw = Array.from(matchAll)
    const currentItem: any = matchAllw.find((match: any) =>
      match.index < metaInformation.target.selectionStart &&
      metaInformation.target.selectionStart < (match.index + match[0].length),
    )

    setText(currentItem ? currentItem[1] : '')
    setShowSuggestor(currentItem)
    setLeft(caret.left)
    setTop(caret.top + 27)
    setStartPosition(metaInformation.target.selectionStart)

    /*
      TODO
      - get sp context
      - make dropdown selectable

    */
  }

  const handleKeyDown = (event: any) => {
    const { which } = event

    if (which === 40) {
      event.preventDefault()
      setCurrentSelection((currentSelection + 1) % users.length)
    }

    if (which === 38) {
      event.preventDefault()
      setCurrentSelection((((currentSelection - 1) === -1 ? users.length - 1 : currentSelection - 1)) % users.length)
    }

    if (which === 13) { // 13 is the character code for enter

      const user = users[currentSelection]

      const newText = `${textareaValue.slice(0, startPosition! - 1)}{${user}}${textareaValue.slice(startPosition! + 1, textareaValue.length)}`

      setTextareaValue(newText)
      setText(null)
      setShowSuggestor(false)
      setLeft(0)
      setTop(0)
      setStartPosition(null)

    }
  }

  return (
    <div
      style={{
        position: 'relative',
      }}
      onKeyDown={handleKeyDown}
    >
      <TextField
        value={textareaValue}
        onChange={(x, val) => setTextareaValue(val ?? '')}
        // onChange={(x) => toggleSuggestor(x)}
        onKeyUp={(x) => toggleSuggestor(x)}
        componentRef={inputRef}
      />

      <div
        id='dropdown'
        style={{
          position: 'absolute',
          width: '200px',
          borderRadius: '6px',
          background: 'white',
          boxShadow: 'rgba(0, 0, 0, 0.4) 0px 1px 4px',
          zIndex: 1000,
          display: showSuggestor ? 'block' : 'none',
          top,
          left,
        }}
      >
        {
          users
           .filter((user: any) => user.indexOf(text) !== -1)
            .map((user, index) => (
              <div
                key={index}
                style={{
                  padding: '10px 20px',
                  background: index === currentSelection ? '#eee' : '',
                }}
              >
                { user }
              </div>
            ))
        }
      </div>
    </div>

  )
}

export default Suggestor
